#!/usr/bin/env python3
import os
import re
import argparse
from typing import Any, Dict, List, Optional, Tuple

import pandas as pd
from supabase import create_client, Client

from dotenv import load_dotenv
load_dotenv()

# -----------------------------
# Config
# -----------------------------
DEFAULT_WEIGHTS = {
    "resume_score": 3,
    "links_score": 2,
    "q1_score": 7,
    "q2_score": 3,
}

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

def sb_client() -> Client:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY")
    if not url or not key:
        raise SystemExit(
            "Missing env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (preferred) or SUPABASE_KEY."
        )
    return create_client(url, key)

def fetch_all(sb: Client, table: str, select: str = "*", page_size: int = 1000) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    start = 0
    while True:
        end = start + page_size - 1
        resp = sb.table(table).select(select).range(start, end).execute()
        data = resp.data or []
        out.extend(data)
        if len(data) < page_size:
            break
        start += page_size
    return out

def normalize_email(s: str) -> str:
    return s.strip().lower()

def parse_team_members_csv(team_members: Any) -> List[str]:
    """
    applications.team_members is TEXT containing a CSV list of teammate emails (up to 3).
    Example: "athayyil@uwaterloo.ca,mmushaik@uwaterloo.ca"
    """
    if team_members is None:
        return []
    s = str(team_members).strip()
    if not s:
        return []
    parts = [normalize_email(p) for p in s.split(",")]
    parts = [p for p in parts if p and EMAIL_RE.match(p)]
    return sorted(set(parts))

def find_team_by_subset(all_emails: List[str], team_id_map: Dict[str, Dict[str, Any]]) -> Optional[str]:
    """
    Return the team_id whose team emails contain all_emails (subset match).
    If multiple teams match, pick the smallest team (tightest fit); if still tied, deterministic by team_id.
    """
    target = set(all_emails)
    if not target:
        return None

    matches = []
    for tid, info in team_id_map.items():
        team_emails = set(info["emails"])
        if target.issubset(team_emails):
            matches.append((len(team_emails), tid))

    if not matches:
        return None

    matches.sort()  # smallest team first, then team_id
    return matches[0][1]

def load_users_csv(path: str) -> Dict[str, str]:
    """
    users.csv has columns at least: id,email
    Returns {auth_user_id: email}
    """
    df = pd.read_csv(path)
    if "id" not in df.columns or "email" not in df.columns:
        raise SystemExit(f"{path} must contain columns: id,email")

    df["id"] = df["id"].astype(str)
    df["email"] = df["email"].astype(str).map(normalize_email)
    df = df[df["email"].str.contains("@", na=False)]
    return dict(zip(df["id"], df["email"]))


def email_set_key(emails: List[str]) -> str:
    """
    Canonical key for matching teams by emails. (Internal use only.)
    Uses '|' to avoid CSV commas.
    """
    clean = [normalize_email(e) for e in emails if e and EMAIL_RE.match(normalize_email(e))]
    return "|".join(sorted(set(clean)))

def build_team_email_lookup(teams_df: pd.DataFrame) -> Tuple[Dict[str, Dict[str, Any]], Dict[str, str]]:
    """
    Returns:
      team_id -> {team_name, emails(list)}
      email_key -> team_id
    """
    team_id_map: Dict[str, Dict[str, Any]] = {}
    emailkey_to_teamid: Dict[str, str] = {}

    if teams_df.empty:
        raise SystemExit("teams table is empty; cannot map applications to teams.")

    for _, row in teams_df.iterrows():
        tid = str(row.get("id")).strip() if pd.notna(row.get("id")) else ""
        tname = str(row.get("team_name")).strip() if pd.notna(row.get("team_name")) else ""

        if not tid:
            continue

        emails: List[str] = []
        for col in ["team_member_1", "team_member_2", "team_member_3", "team_member_4"]:
            v = row.get(col)
            if pd.notna(v):
                e = normalize_email(str(v))
                if e and EMAIL_RE.match(e):
                    emails.append(e)

        emails = sorted(set(emails))
        team_id_map[tid] = {"team_name": tname or tid, "emails": emails}

        k = email_set_key(emails)
        if k:
            # If collisions happen (two teams with same email set), last wins.
            emailkey_to_teamid[k] = tid

    return team_id_map, emailkey_to_teamid

def zscore_normalize_by_reviewer(reviews_df: pd.DataFrame, score_cols: List[str]) -> pd.DataFrame:
    """
    Adds normalized columns: <col>_norm
    Per reviewer_id and per score col: (x - mean) / std
    If std==0 or NaN -> 0
    """
    out = reviews_df.copy()

    for col in score_cols:
        if col not in out.columns:
            out[col] = pd.NA

    grp = out.groupby("reviewer_id", dropna=False)

    for col in score_cols:
        mean = grp[col].transform("mean")
        std = grp[col].transform("std")
        norm = (out[col] - mean) / std
        norm = norm.where(std.notna() & (std > 0), 0.0)
        out[col + "_norm"] = norm.astype(float)

    return out

def compute_review_weighted_total(reviews_norm_df: pd.DataFrame, weights: Dict[str, int]) -> pd.Series:
    total = 0.0
    for col, w in weights.items():
        total += w * reviews_norm_df[col + "_norm"]
    return total

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="team_scores.csv", help="Output CSV path")
    ap.add_argument("--users", default="users.csv", help="Path to users.csv (id,email,...)")
    ap.add_argument("--no-dry-run", dest="dry_run", action="store_false", help="Update application statuses (disable dry-run)")
    ap.add_argument("--offer-top", type=int, default=0,
                    help="If >0, only offer top N teams by team_score (otherwise offer all teams)")
    ap.add_argument("--min-reviews", type=int, default=1,
                    help="Minimum #reviews required for an application to be scored")
    ap.add_argument("--weights", default="resume_score=3,links_score=2,q1_score=7,q2_score=3",
                    help="Comma list like resume_score=3,links_score=2,q1_score=7,q2_score=3")
    ap.add_argument("--status-column", default="status",
                    help="applications status column name (default 'status'; set to 'application_status' if needed)")
    ap.set_defaults(dry_run=True)
    args = ap.parse_args()

    # weights
    weights: Dict[str, int] = {}
    for part in args.weights.split(","):
        k, v = part.split("=")
        weights[k.strip()] = int(v.strip())
    score_cols = list(weights.keys())

    # users.csv mapping
    profile_to_email = load_users_csv(args.users)

    # fetch supabase tables
    sb = sb_client()

    apps = fetch_all(
        sb,
        "applications",
        select=f"id,profile_id,team_members,{args.status_column}",
    )
    revs = fetch_all(sb, "reviews", select="application_id,reviewer_id,q1_score,q2_score,resume_score,links_score")
    teams = fetch_all(sb, "teams", select="id,team_name,team_member_1,team_member_2,team_member_3,team_member_4")

    apps_df = pd.DataFrame(apps)
    revs_df = pd.DataFrame(revs)
    teams_df = pd.DataFrame(teams)

    if apps_df.empty:
        raise SystemExit("No applications found.")
    if revs_df.empty:
        raise SystemExit("No reviews found.")
    if teams_df.empty:
        raise SystemExit("No teams found.")

    # ---- FILTER TO SUBMITTED APPLICATIONS ONLY ----
    if args.status_column not in apps_df.columns:
        raise SystemExit(f"applications table missing column '{args.status_column}'")

    submitted_apps_df = apps_df[apps_df[args.status_column] == "submitted"].copy()

    print(f"Submitted applications: {len(submitted_apps_df)}")

    if submitted_apps_df.empty:
        raise SystemExit("No submitted applications to process.")


    team_id_map, emailkey_to_teamid = build_team_email_lookup(teams_df)

    # Map each application -> team_id by email set match
    team_ids: List[str] = []
    team_names: List[str] = []
    team_sizes: List[int] = []
    team_emails_strs: List[str] = []

    missing_email_profiles: List[str] = []
    unmatched_apps: List[str] = []

    for _, row in submitted_apps_df.iterrows():
        app_id = str(row["id"])
        pid = str(row["profile_id"])

        my_email = profile_to_email.get(pid, "").strip()
        if not my_email or not EMAIL_RE.match(my_email):
            missing_email_profiles.append(pid)
            # keep going to report all issues
            my_email = ""

        teammates = parse_team_members_csv(row.get("team_members"))

        all_emails = sorted(set(([normalize_email(my_email)] if my_email else []) + teammates))
        k = email_set_key(all_emails)

        tid = find_team_by_subset(all_emails, team_id_map)
        if not tid:
            """
            if len(unmatched_apps) <= 10:
                print("\nUNMATCHED", app_id)
                print("  applicant_email:", my_email)
                print("  teammates:", teammates)
                print("  all_emails:", all_emails)
            """
            unmatched_apps.append(app_id)
            # fallback team_id as synthetic key so grouping still works
            tid = "UNMATCHED:" + email_set_key(all_emails)
            tname = ";".join(all_emails) if all_emails else "UNMATCHED"
            tsize = len(all_emails) if all_emails else 1
            temails = all_emails
        else:
            tname = team_id_map[tid]["team_name"]
            temails = team_id_map[tid]["emails"]
            tsize = len(temails)

        team_ids.append(tid)
        team_names.append(tname)
        team_sizes.append(tsize)
        team_emails_strs.append(";".join(temails))  # <-- safe delimiter for CSV

    if missing_email_profiles:
        uniq = sorted(set(missing_email_profiles))
        raise SystemExit(
            "Some applications.profile_id values are missing from users.csv (or have invalid emails).\n"
            f"Missing count={len(uniq)}. Example profile_ids:\n  " + "\n  ".join(uniq[:20]) +
            ("\n  ... (truncated)" if len(uniq) > 20 else "")
        )

    # Check if anything didn't match teams table
    if unmatched_apps:
        print(f"WARNING: {len(unmatched_apps)} applications could not be matched to a teams row by emails.")
        print("[DEBUG]: First few application_ids:", unmatched_apps[:10])

    submitted_apps_df["team_id"] = team_ids
    submitted_apps_df["team_name"] = team_names
    submitted_apps_df["team_size"] = team_sizes
    submitted_apps_df["team_emails"] = team_emails_strs

    # Normalize reviews per reviewer
    revs_norm = zscore_normalize_by_reviewer(revs_df, score_cols)
    revs_norm["review_total"] = compute_review_weighted_total(revs_norm, weights)

    # Application score = mean of normalized weighted totals across reviews
    app_scores = (
        revs_norm.groupby("application_id", as_index=False)
        .agg(num_reviews=("review_total", "count"), app_score=("review_total", "mean"))
    )

    scored_apps = submitted_apps_df.merge(app_scores, left_on="id", right_on="application_id", how="left")

    # Fill missing review info
    scored_apps["num_reviews"] = scored_apps["num_reviews"].fillna(0).astype(int)

    # If an app has no reviews, give it a very low score so it still appears (and naturally ranks low)
    scored_apps["app_score"] = scored_apps["app_score"].fillna(-1e9)

    # Apply min_reviews ONLY to matched teams; keep UNMATCHED visible for auditing
    mask_keep = (scored_apps["num_reviews"] >= args.min_reviews)
    scored_apps = scored_apps[mask_keep].copy()

    if scored_apps.empty:
        raise SystemExit("No applications meet the min review requirement.")

    # Team aggregation by *real* team_id
    team_rows: List[Dict[str, Any]] = []
    for team_id, g in scored_apps.groupby("team_id"):
        team_name = g["team_name"].iloc[0]
        team_size = int(g["team_size"].iloc[0])
        team_emails = g["team_emails"].iloc[0]

        members = []
        for _, r in g.iterrows():
            members.append((str(r["profile_id"]), str(r["id"]), float(r["app_score"])))

        # Drop lowest member score if team has >= 2 ppl
        member_scores = sorted([s for _, _, s in members])
        used_scores = member_scores
        if team_size >= 2 and len(member_scores) >= 2:
            used_scores = member_scores[1:]  # drop lowest

        team_score = sum(used_scores) / len(used_scores) if used_scores else float("nan")

        team_rows.append({
            "team_id": team_id,
            "team_name": team_name,
            "team_score": team_score,
            "team_size": team_size,
            "team_emails": team_emails,  # already ';' separated
            "profile_ids": ";".join(sorted({pid for pid, _, _ in members})),
            "application_ids": ";".join(sorted({aid for _, aid, _ in members})),
        })

    teams_out = pd.DataFrame(team_rows).sort_values("team_score", ascending=False).reset_index(drop=True)

    #print("DEBUG: scored_apps team_id value_counts:")
    #print(scored_apps["team_id"].value_counts().head(20))

    #print("DEBUG: number of UNMATCHED apps in scored_apps:",
        #int((scored_apps["team_id"] == "UNMATCHED").sum()))


    # Write CSV
    teams_out.to_csv(args.out, index=False)
    print(f"Wrote {args.out} with {len(teams_out)} teams.")

    # ---- SELECT TEAMS UNTIL WE REACH TARGET #SUBMITTED APPS (round by team) ----
    target = TEST

    # Count how many submitted applications each team actually has (this is the real "people we can offer")
    team_actual_counts = submitted_apps_df.groupby("team_id")["profile_id"].nunique().to_dict()

    selected_team_ids: List[str] = []
    people_count = 0

    reached_target = False

    for _, row in teams_out.iterrows():
        tid = str(row["team_id"])
        add = int(team_actual_counts.get(tid, 0))
        if add == 0:
            continue

        # once we have reached/exceeded target, we still take ONE more team then stop
        if reached_target:
            selected_team_ids.append(tid)
            people_count += add
            break

        selected_team_ids.append(tid)
        people_count += add

        if people_count >= target:
            reached_target = True

    # Offer = ALL submitted applications from the selected teams (not from roster size)
    offer_apps_df = submitted_apps_df[submitted_apps_df["team_id"].isin(selected_team_ids)].copy()
    offer_app_ids = sorted(set(offer_apps_df["id"].astype(str).tolist()))

    # Now these match by construction
    people_offered = offer_apps_df["profile_id"].astype(str).nunique()

    print(f"Target people: {target}")
    print(f"Selected teams: {len(selected_team_ids)}")
    print(f"People offered (rounded by team): {people_offered}")
    print(f"Applications to offer: {len(offer_app_ids)}")

    with open("offered_app_ids.txt", "w") as f:
        for app_id in offer_app_ids:
            f.write(app_id + "\n")

    # ---- WRITE OFFERED TEAMS CSV (for testing / auditing) ----
    offered_teams_df = teams_out[teams_out["team_id"].isin(selected_team_ids)].copy()

    offered_teams_df.to_csv("offered_teams.csv", index=False)

    print(f"Wrote offered_teams.csv with {len(offered_teams_df)} teams")


    if args.dry_run:
        print("DRY RUN: not updating application statuses.")
        return
    
    if not args.dry_run:
        confirm = input("Type 'YES' to confirm database updates: ")
        if confirm != "YES":
            print("Aborted.")
            return

    # Update application statuses
    CHUNK = 200
    updated = 0
    for i in range(0, len(offer_app_ids), CHUNK):
        chunk_ids = offer_app_ids[i:i + CHUNK]
        resp = (
            sb.table("applications")
            .update({args.status_column: "accepted"})
            .in_("id", chunk_ids)
            .execute()
        )
        updated += len(resp.data or [])
        print(f"Updated {updated} applications to {args.status_column}='accepted'.")


if __name__ == "__main__":
    main()
