import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { cookies } from "next/headers";

/**
 * GET /api/teams/my-team
 * Get the current user's team
 */
export async function GET() {
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

    // Find team where user is a member
    const { data: teams, error: findError } = await supabase
      .from("teams")
      .select("*")
      .or(
        `team_member_1.eq.${userEmail},team_member_2.eq.${userEmail},team_member_3.eq.${userEmail},team_member_4.eq.${userEmail}`,
      )
      .limit(1);

    if (findError) {
      console.error("Error finding team:", findError);
      return NextResponse.json(
        { error: "Failed to find team" },
        { status: 500 },
      );
    }

    if (!teams || teams.length === 0) {
      // Not found - user is not in a team
      return NextResponse.json({
        success: true,
        team: null,
      });
    }

    const team = teams[0];

    // Don't return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...teamWithoutPassword } = team;

    return NextResponse.json({
      success: true,
      team: teamWithoutPassword,
    });
  } catch (error) {
    console.error("Error in get my team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
