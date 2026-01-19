import { NextRequest, NextResponse } from "next/server";
import { JudgeAssignmentService } from "@uwdsc/server/cxc/services/judgeAssignmentService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const judgeAssignmentService = new JudgeAssignmentService();
const profileService = new ProfileService();

/**
 * POST /api/admin/judges/assign
 * Assign judges to projects randomly
 * Superadmin only endpoint
 * Body: {
 *   judgesPerGroup: number,
 *   timesJudged: number,
 *   startDate: string (ISO datetime),
 *   timeslotDurationMinutes: number
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

    // Check if user is superadmin
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden", message: "Superadmin access required" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const {
      judgesPerGroup,
      timesJudged,
      startDate,
      timeslotDurationMinutes,
    } = body;

    // Validate required fields
    if (
      judgesPerGroup === undefined ||
      timesJudged === undefined ||
      !startDate ||
      timeslotDurationMinutes === undefined
    ) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message:
            "judgesPerGroup, timesJudged, startDate, and timeslotDurationMinutes are required",
        },
        { status: 400 },
      );
    }

    // Validate values
    if (judgesPerGroup < 1) {
      return NextResponse.json(
        { error: "Bad Request", message: "judgesPerGroup must be at least 1" },
        { status: 400 },
      );
    }

    if (timesJudged < 1) {
      return NextResponse.json(
        { error: "Bad Request", message: "timesJudged must be at least 1" },
        { status: 400 },
      );
    }

    if (timeslotDurationMinutes < 1) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "timeslotDurationMinutes must be at least 1",
        },
        { status: 400 },
      );
    }

    const start = new Date(startDate);

    if (isNaN(start.getTime())) {
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid date format" },
        { status: 400 },
      );
    }

    await judgeAssignmentService.assignJudgesToProjects({
      judgesPerGroup,
      timesJudged,
      startDate: start,
      timeslotDurationMinutes,
    });

    return NextResponse.json(
      { success: true, message: "Judges assigned successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error assigning judges:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to assign judges",
      },
      { status: 500 },
    );
  }
}
