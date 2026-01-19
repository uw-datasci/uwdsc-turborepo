import { NextResponse } from "next/server";
import { JudgeService } from "@uwdsc/server/cxc/services/judgeService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const judgeService = new JudgeService();
const profileService = new ProfileService();

/**
 * GET /api/admin/judges
 * Get all judges with email addresses
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

    console.log("[API] Fetching all judges with emails...");
    const judges = await judgeService.getAllJudgesWithEmails();
    console.log("[API] Found judges:", judges.length);
    return NextResponse.json({ judges }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching judges:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to fetch judges",
      },
      { status: 500 },
    );
  }
}
