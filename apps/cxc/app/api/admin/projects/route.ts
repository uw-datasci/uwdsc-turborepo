import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@uwdsc/server/cxc/services/projectService";
import { JudgeAssignmentService } from "@uwdsc/server/cxc/services/judgeAssignmentService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const projectService = new ProjectService();
const judgeAssignmentService = new JudgeAssignmentService();
const profileService = new ProfileService();

/**
 * GET /api/admin/projects
 * Get all projects with team information
 * Superadmin only endpoint
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

    // Check if user is superadmin
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden", message: "Superadmin access required" },
        { status: 403 },
      );
    }

    console.log("[API] Fetching all projects with teams...");
    const projects = await projectService.getAllProjectsWithTeams();
    console.log("[API] Found projects:", projects.length);

    // Get assignments for all projects
    const projectsWithAssignments = await Promise.all(
      projects.map(async (project) => {
        const assignments = await judgeAssignmentService.getAssignmentsByProjectId(project.id);
        return {
          ...project,
          assignments,
        };
      }),
    );

    return NextResponse.json({ projects: projectsWithAssignments }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch projects",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/projects
 * Create a new project
 * Superadmin only endpoint
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

    // Check if user is superadmin
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden", message: "Superadmin access required" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { team_id, title, description, devpost_url, github_url, demo_url, video_url } = body;

    if (!team_id || !title) {
      return NextResponse.json(
        { error: "Bad Request", message: "team_id and title are required" },
        { status: 400 },
      );
    }

    const project = await projectService.createProject({
      team_id,
      title,
      description: description ?? null,
      devpost_url: devpost_url ?? null,
      github_url: github_url ?? null,
      demo_url: demo_url ?? null,
      video_url: video_url ?? null,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to create project",
      },
      { status: 500 },
    );
  }
}
