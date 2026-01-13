import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { AdminApplicationService } from "@uwdsc/server/cxc/services/adminApplicationService";

/**
 * GET /api/admin/applications
 * Get all submitted applications with summary data for admin table
 * Admin only endpoint
 */
export async function GET() {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin role
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);

    if (profile?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    // Get all application summaries
    const adminApplicationService = new AdminApplicationService();
    const applications =
      await adminApplicationService.getAllApplicationSummaries();

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
