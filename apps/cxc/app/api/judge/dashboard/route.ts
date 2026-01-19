import { NextResponse } from "next/server";
import { JudgeAssignmentService } from "@uwdsc/server/cxc/services/judgeAssignmentService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const judgeAssignmentService = new JudgeAssignmentService();
const profileService = new ProfileService();

/**
 * GET /api/judge/dashboard
 * Get all projects assigned to the current judge
 * Judge only endpoint
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

    // Check if user is a judge
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "judge") {
      return NextResponse.json(
        { error: "Forbidden", message: "Judge access required" },
        { status: 403 },
      );
    }

    const assignments = await judgeAssignmentService.getAssignmentsByJudgeId(
      user.id,
    );
    return NextResponse.json({ assignments }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching judge dashboard:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch judge dashboard",
      },
      { status: 500 },
    );
  }
}
