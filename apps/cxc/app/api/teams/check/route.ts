import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { cookies } from "next/headers";

/**
 * GET /api/teams/check?team_name=...
 * Check if a team name already exists
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const team_name = searchParams.get("team_name");

    if (!team_name) {
      return NextResponse.json(
        { error: "Missing team_name parameter" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      set() {
        // No-op for server
      },
    });

    // Check if team name already exists
    const { data: existingTeam, error: nameCheckError } = await supabase
      .from("teams")
      .select("team_name")
      .eq("team_name", team_name.trim())
      .limit(1);

    if (nameCheckError) {
      console.error("Error checking team name:", nameCheckError);
      return NextResponse.json(
        { error: "Failed to check team name" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      exists: existingTeam && existingTeam.length > 0,
    });
  } catch (error) {
    console.error("Error in check team name:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
