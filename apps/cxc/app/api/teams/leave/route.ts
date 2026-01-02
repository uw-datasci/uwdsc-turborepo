import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { cookies } from "next/headers";

/**
 * POST /api/teams/leave
 * Leave the current user's team
 */
export async function POST() {
  try {
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

    console.log("[Leave Team API] Finding team for user:", userEmail);
    // Find team where user is a member
    const { data: teams, error: findError } = await supabase
      .from("teams")
      .select("*")
      .or(
        `team_member_1.eq.${userEmail},team_member_2.eq.${userEmail},team_member_3.eq.${userEmail},team_member_4.eq.${userEmail}`,
      )
      .limit(1);

    if (findError) {
      console.error("[Leave Team API] Error finding team:", findError);
      return NextResponse.json(
        { error: "Failed to find team" },
        { status: 500 },
      );
    }

    if (!teams || teams.length === 0) {
      console.log("[Leave Team API] User is not in any team");
      return NextResponse.json(
        { error: "You are not in a team" },
        { status: 400 },
      );
    }

    const team = teams[0];
    console.log("[Leave Team API] Found team:", {
      id: team.id,
      team_name: team.team_name,
      members: {
        m1: team.team_member_1,
        m2: team.team_member_2,
        m3: team.team_member_3,
        m4: team.team_member_4,
      },
    });

    // Determine which slot the user is in and set it to null
    const updateData: {
      team_member_1?: string | null;
      team_member_2?: string | null;
      team_member_3?: string | null;
      team_member_4?: string | null;
    } = {};

    if (team.team_member_1 === userEmail) {
      updateData.team_member_1 = null;
      console.log("[Leave Team API] Removing from slot 1");
    } else if (team.team_member_2 === userEmail) {
      updateData.team_member_2 = null;
      console.log("[Leave Team API] Removing from slot 2");
    } else if (team.team_member_3 === userEmail) {
      updateData.team_member_3 = null;
      console.log("[Leave Team API] Removing from slot 3");
    } else if (team.team_member_4 === userEmail) {
      updateData.team_member_4 = null;
      console.log("[Leave Team API] Removing from slot 4");
    } else {
      console.log("[Leave Team API] User email not found in any slot");
      return NextResponse.json(
        { error: "User not found in team" },
        { status: 400 },
      );
    }

    console.log("[Leave Team API] Updating team with:", updateData);
    console.log("[Leave Team API] Team ID:", team.id);

    // Update team to remove user - use ID instead of team_name for reliability
    // Get the updated row count to verify the update worked
    const {
      data: updatedData,
      error: updateError,
      count,
    } = await supabase
      .from("teams")
      .update(updateData)
      .eq("id", team.id)
      .select();

    console.log("[Leave Team API] Update result:", {
      data: updatedData,
      error: updateError,
      count: count,
      rowsUpdated: updatedData?.length || 0,
    });

    if (updateError) {
      console.error("[Leave Team API] Error updating team:", updateError);
      return NextResponse.json(
        { error: "Failed to leave team" },
        { status: 500 },
      );
    }

    if (!updatedData || updatedData.length === 0) {
      console.warn("[Leave Team API] No rows updated - team might not exist");
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const updatedTeam = updatedData[0];
    console.log("[Leave Team API] Updated team data from update query:", {
      id: updatedTeam.id,
      team_name: updatedTeam.team_name,
      members: {
        m1: updatedTeam.team_member_1,
        m2: updatedTeam.team_member_2,
        m3: updatedTeam.team_member_3,
        m4: updatedTeam.team_member_4,
      },
    });

    // Check the returned data first - this is the actual updated state
    const userStillInReturnedData =
      updatedTeam.team_member_1 === userEmail ||
      updatedTeam.team_member_2 === userEmail ||
      updatedTeam.team_member_3 === userEmail ||
      updatedTeam.team_member_4 === userEmail;

    if (userStillInReturnedData) {
      console.error(
        "[Leave Team API] Update failed - user still in returned team data!",
      );
      console.error(
        "[Leave Team API] This suggests the update query did not work",
      );
      return NextResponse.json(
        { error: "Failed to leave team - update did not take effect" },
        { status: 500 },
      );
    }

    console.log(
      "[Leave Team API] Update successful - user removed from returned data",
    );

    // Additional verification: fetch the team again to double-check
    const { data: verifyTeams, error: verifyError } = await supabase
      .from("teams")
      .select("*")
      .eq("id", team.id)
      .single();

    if (verifyError) {
      console.error("[Leave Team API] Error verifying update:", verifyError);
      // Still return success since the update query returned correct data
    } else if (verifyTeams) {
      const stillInTeam =
        verifyTeams.team_member_1 === userEmail ||
        verifyTeams.team_member_2 === userEmail ||
        verifyTeams.team_member_3 === userEmail ||
        verifyTeams.team_member_4 === userEmail;

      if (stillInTeam) {
        console.error(
          "[Leave Team API] Verification query shows user still in team! Team data:",
          {
            id: verifyTeams.id,
            members: {
              m1: verifyTeams.team_member_1,
              m2: verifyTeams.team_member_2,
              m3: verifyTeams.team_member_3,
              m4: verifyTeams.team_member_4,
            },
          },
        );
        return NextResponse.json(
          { error: "Failed to leave team - verification failed" },
          { status: 500 },
        );
      } else {
        console.log(
          "[Leave Team API] Verification successful - user not in team",
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully left team",
    });
  } catch (error) {
    console.error("Error in leave team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
