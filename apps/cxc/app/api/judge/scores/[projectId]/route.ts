import { NextRequest, NextResponse } from "next/server";
import { ProjectScoreService } from "@uwdsc/server/cxc/services/projectScoreService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const projectScoreService = new ProjectScoreService();
const profileService = new ProfileService();

/**
 * GET /api/judge/scores/[projectId]
 * Get score for a specific project by the current judge
 * Judge only endpoint
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } },
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

    // Check if user is a judge
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "judge") {
      return NextResponse.json(
        { error: "Forbidden", message: "Judge access required" },
        { status: 403 },
      );
    }

    const score = await projectScoreService.getScoreByProjectAndJudge(
      params.projectId,
      user.id,
    );

    return NextResponse.json({ score }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching score:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch score",
      },
      { status: 500 },
    );
  }
}
