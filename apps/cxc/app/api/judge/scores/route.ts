import { NextRequest, NextResponse } from "next/server";
import { ProjectScoreService } from "@uwdsc/server/cxc/services/projectScoreService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const projectScoreService = new ProjectScoreService();
const profileService = new ProfileService();

/**
 * POST /api/judge/scores
 * Create or update a project score
 * Judge only endpoint
 * Body: {
 *   project_id: string,
 *   criterion_1_score: number,
 *   criterion_2_score: number,
 *   criterion_3_score: number,
 *   criterion_4_score: number,
 *   comments?: string
 * }
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

    // Check if user is a judge
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "judge") {
      return NextResponse.json(
        { error: "Forbidden", message: "Judge access required" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const {
      project_id,
      criterion_1_score,
      criterion_2_score,
      criterion_3_score,
      criterion_4_score,
      comments,
    } = body;

    // Validate required fields
    if (
      !project_id ||
      criterion_1_score === undefined ||
      criterion_2_score === undefined ||
      criterion_3_score === undefined ||
      criterion_4_score === undefined
    ) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message:
            "project_id and all four criterion scores are required",
        },
        { status: 400 },
      );
    }

    const score = await projectScoreService.upsertScore({
      project_id,
      judge_id: user.id,
      criterion_1_score,
      criterion_2_score,
      criterion_3_score,
      criterion_4_score,
      comments: comments ?? null,
    });

    return NextResponse.json({ score }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error creating/updating score:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to create/update score",
      },
      { status: 500 },
    );
  }
}
