import { NextRequest, NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { cookies } from "next/headers";

/**
 * POST /api/teams/create
 * Create a new team with a name and password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { team_name, password } = body;

    if (!team_name || !password) {
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
    const { data: existingTeams, error: checkError } = await supabase
      .from("teams")
      .select("*")
      .or(
        `team_member_1.eq.${userEmail},team_member_2.eq.${userEmail},team_member_3.eq.${userEmail},team_member_4.eq.${userEmail}`,
      );

    if (checkError) {
      console.error("Error checking existing team:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing team" },
        { status: 500 },
      );
    }

    if (existingTeams && existingTeams.length > 0) {
      return NextResponse.json(
        { error: "You are already in a team" },
        { status: 400 },
      );
    }

    // Create new team with creator as first member
    const { data: newTeam, error: createError } = await supabase
      .from("teams")
      .insert({
        team_name,
        password,
        team_member_1: userEmail,
        team_member_2: null,
        team_member_3: null,
        team_member_4: null,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating team:", createError);
      return NextResponse.json(
        { error: "Failed to create team" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      team: newTeam,
    });
  } catch (error) {
    console.error("Error in create team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

