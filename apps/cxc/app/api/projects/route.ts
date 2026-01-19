import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@uwdsc/server/cxc/services/projectService";
import { createAuthService } from "@/lib/services";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { cookies } from "next/headers";

const projectService = new ProjectService();

/**
 * GET /api/projects
 * Get project for the current user's team
 * Authenticated users only
 */
export async function GET() {
  try {
    // Verify authentication
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Get user's email to find their team
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
        { error: "Bad Request", message: "User email not found" },
        { status: 400 },
      );
    }

    // Find team by email in team_member fields
    const { data: teams, error: teamError } = await supabase
      .from("teams")
      .select("id")
      .or(
        `team_member_1.eq.${userEmail},team_member_2.eq.${userEmail},team_member_3.eq.${userEmail},team_member_4.eq.${userEmail}`,
      )
      .limit(1);

    if (teamError) {
      console.error("Error finding team:", teamError);
      return NextResponse.json(
        {
          error: "Internal server error",
          message: "Failed to find team",
        },
        { status: 500 },
      );
    }

    if (!teams || teams.length === 0) {
      // User is not in a team, check for solo project
      const allProjects = await projectService.getAllProjects();
      const soloProject = allProjects.find(p => !p.team_id);
      return NextResponse.json({ project: soloProject || null }, { status: 200 });
    }

    const team = teams[0]!;
    // Convert team.id to string if it's not already
    const teamId = typeof team.id === "string" ? team.id : String(team.id);
    const project = await projectService.getProjectByTeamId(teamId);
    return NextResponse.json({ project }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch project",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/projects
 * Create or update project for the current user's team
 * Authenticated users only
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Get user's email to find their team
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
        { error: "Bad Request", message: "User email not found" },
        { status: 400 },
      );
    }

    // Try to find team by email in team_member fields (optional)
    const { data: teams, error: teamError } = await supabase
      .from("teams")
      .select("id")
      .or(
        `team_member_1.eq.${userEmail},team_member_2.eq.${userEmail},team_member_3.eq.${userEmail},team_member_4.eq.${userEmail}`,
      )
      .limit(1);

    if (teamError) {
      console.error("Error finding team:", teamError);
      // Continue anyway - team is optional
    }

    const teamId = teams && teams.length > 0 
      ? (typeof teams[0]!.id === "string" ? teams[0]!.id : String(teams[0]!.id))
      : null;

    const body = await request.json();
    const { title, description, devpost_url, github_url, demo_url, video_url } = body;

    console.log("Project submission request:", {
      userEmail,
      teamId,
      hasTitle: !!title,
      titleLength: title?.length,
    });

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Bad Request", message: "title is required" },
        { status: 400 },
      );
    }

    let project;

    if (teamId) {
      // Check if project already exists for this team
      const existingProject = await projectService.getProjectByTeamId(teamId);
      if (existingProject) {
        // Update existing project
        project = await projectService.updateProject(existingProject.id, {
          title,
          description: description ?? null,
          devpost_url: devpost_url ?? null,
          github_url: github_url ?? null,
          demo_url: demo_url ?? null,
          video_url: video_url ?? null,
        });
      } else {
        // Create new project with team
        project = await projectService.createProject({
          team_id: teamId,
          title: title.trim(),
          description: description?.trim() || null,
          devpost_url: devpost_url?.trim() || null,
          github_url: github_url?.trim() || null,
          demo_url: demo_url?.trim() || null,
          video_url: video_url?.trim() || null,
        });
      }
    } else {
      // Solo hacker - create project without team
      // For now, allow creating new solo projects (we can add user_id tracking later if needed)
      project = await projectService.createProject({
        team_id: null,
        title: title.trim(),
        description: description?.trim() || null,
        devpost_url: devpost_url?.trim() || null,
        github_url: github_url?.trim() || null,
        demo_url: demo_url?.trim() || null,
        video_url: video_url?.trim() || null,
      });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error creating/updating project:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to create/update project",
      },
      { status: 500 },
    );
  }
}
