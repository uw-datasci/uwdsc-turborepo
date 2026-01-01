import { NextRequest, NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { cookies } from "next/headers";

/**
 * POST /api/teams/join
 * Join an existing team with a password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { team_name, password } = body;

    console.log("[Join Team API] Request received:", { team_name, hasPassword: !!password });

    if (!team_name || !password) {
      console.log("[Join Team API] Missing team_name or password");
      return NextResponse.json(
        { error: "Missing team_name or password" },
        { status: 400 },
      );
    }

    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's email
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      set() {
        // No-op for server
      },
    });

    const { data: userData } = await supabase.auth.getUser();
    const userEmail = userData?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Could not get user email" },
        { status: 500 },
      );
    }

    // Check if user is already in a team
    console.log("[Join Team API] Checking if user is already in a team:", userEmail);
    const { data: existingTeams, error: checkError } = await supabase
      .from("teams")
      .select("*")
      .or(
        `team_member_1.eq.${userEmail},team_member_2.eq.${userEmail},team_member_3.eq.${userEmail},team_member_4.eq.${userEmail}`,
      )
      .limit(1);

    console.log("[Join Team API] Existing teams check:", {
      found: existingTeams?.length || 0,
      error: checkError?.message,
      teamName: existingTeams?.[0]?.team_name,
    });

    if (checkError) {
      console.error("[Join Team API] Error checking existing team:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing team" },
        { status: 500 },
      );
    }

    if (existingTeams && existingTeams.length > 0) {
      const existingTeam = existingTeams[0];
      // Double-check: verify user is actually in one of the slots
      const isInTeam = 
        existingTeam.team_member_1 === userEmail ||
        existingTeam.team_member_2 === userEmail ||
        existingTeam.team_member_3 === userEmail ||
        existingTeam.team_member_4 === userEmail;
      
      if (isInTeam) {
        console.log("[Join Team API] User is confirmed to be in team:", existingTeam.team_name);
        return NextResponse.json(
          { error: "You are already in a team" },
          { status: 400 },
        );
      } else {
        console.log("[Join Team API] User not actually in team (stale data?), proceeding...");
        // If somehow the query returned a team but user isn't in it, proceed
      }
    }

    // Find team by name and verify password
    console.log("[Join Team API] Searching for team:", team_name);
    const { data: teams, error: findError } = await supabase
      .from("teams")
      .select("*")
      .eq("team_name", team_name)
      .limit(1);

    console.log("[Join Team API] Team search result:", { 
      found: teams?.length || 0, 
      error: findError?.message,
      teamName: teams?.[0]?.team_name 
    });

    if (findError) {
      console.log("[Join Team API] Error finding team:", findError);
      return NextResponse.json(
        { error: "Failed to find team" },
        { status: 500 },
      );
    }

    if (!teams || teams.length === 0) {
      console.log("[Join Team API] Team not found");
      return NextResponse.json(
        { error: "Team not found" },
        { status: 404 },
      );
    }

    const team = teams[0];

    console.log("[Join Team API] Verifying password...");
    if (team.password !== password) {
      console.log("[Join Team API] Password mismatch");
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 },
      );
    }

    console.log("[Join Team API] Password verified, finding available slot...");

    // Find first available slot
    const updateData: {
      team_member_1?: string;
      team_member_2?: string;
      team_member_3?: string;
      team_member_4?: string;
    } = {};

    console.log("[Join Team API] Current team members:", {
      member1: team.team_member_1,
      member2: team.team_member_2,
      member3: team.team_member_3,
      member4: team.team_member_4,
    });

    if (!team.team_member_1) {
      updateData.team_member_1 = userEmail;
      console.log("[Join Team API] Adding to slot 1");
    } else if (!team.team_member_2) {
      updateData.team_member_2 = userEmail;
      console.log("[Join Team API] Adding to slot 2");
    } else if (!team.team_member_3) {
      updateData.team_member_3 = userEmail;
      console.log("[Join Team API] Adding to slot 3");
    } else if (!team.team_member_4) {
      updateData.team_member_4 = userEmail;
      console.log("[Join Team API] Adding to slot 4");
    } else {
      console.log("[Join Team API] Team is full");
      return NextResponse.json(
        { error: "Team is full (4 members)" },
        { status: 400 },
      );
    }

    console.log("[Join Team API] Updating team with:", updateData);
    // Update team
    const { data: updatedTeam, error: updateError } = await supabase
      .from("teams")
      .update(updateData)
      .eq("team_name", team_name)
      .select()
      .single();

    if (updateError) {
      console.error("[Join Team API] Error updating team:", updateError);
      return NextResponse.json(
        { error: "Failed to join team" },
        { status: 500 },
      );
    }

    console.log("[Join Team API] Successfully joined team:", updatedTeam?.team_name);
    return NextResponse.json({
      success: true,
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Error in join team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

