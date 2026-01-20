import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing env vars: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_KEY).");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Supabase returns 50 users per page by default; you can set perPage. :contentReference[oaicite:3]{index=3}
async function main() {
  const perPage = 1000;
  let page = 1;
  let all = [];

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    const users = data?.users ?? [];
    all.push(...users);

    if (users.length < perPage) break;
    page += 1;
  }

  // Export just what you need
  const rows = all.map(u => ({
    id: u.id,
    email: u.email ?? "",
    created_at: u.created_at ?? "",
    last_sign_in_at: u.last_sign_in_at ?? "",
  }));

  // Write CSV
  const header = Object.keys(rows[0] ?? { id: "", email: "" }).join(",");
  const lines = rows.map(r =>
    [r.id, r.email, r.created_at, r.last_sign_in_at]
      .map(v => `"${String(v).replaceAll('"', '""')}"`)
      .join(",")
  );

  const csv = [header, ...lines].join("\n");
  fs.writeFileSync("users.csv", csv, "utf8");
  console.log(`Wrote users.csv (${rows.length} users)`);
}

main().catch(e => {
  console.error("Export failed:", e);
  process.exit(1);
});
