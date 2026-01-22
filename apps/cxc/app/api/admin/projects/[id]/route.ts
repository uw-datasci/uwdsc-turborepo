import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@uwdsc/server/cxc/services/projectService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const projectService = new ProjectService();
const profileService = new ProfileService();

/**
 * GET /api/admin/projects/[id]
 * Get a project by ID
 * Superadmin only endpoint
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    const project = await projectService.getProjectById(params.id);
    if (!project) {
      return NextResponse.json(
        { error: "Not Found", message: "Project not found" },
        { status: 404 },
      );
    }

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
 * PUT /api/admin/projects/[id]
 * Update a project
 * Superadmin only endpoint
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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
    const { title, description, devpost_url, github_url, demo_url, video_url } = body;

    const project = await projectService.updateProject(params.id, {
      title,
      description: description ?? null,
      devpost_url: devpost_url ?? null,
      github_url: github_url ?? null,
      demo_url: demo_url ?? null,
      video_url: video_url ?? null,
    });

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to update project",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Delete a project
 * Superadmin only endpoint
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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

    await projectService.deleteProject(params.id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to delete project",
      },
      { status: 500 },
    );
  }
}
