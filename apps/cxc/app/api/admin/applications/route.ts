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

    // Check if user has admin or superadmin role
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);

    if (profile?.role !== "admin" && profile?.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    // Get all application summaries
    const adminApplicationService = new AdminApplicationService();

    try {
      const applications =
        await adminApplicationService.getAllApplicationSummaries();

      console.log(`[API] Found ${applications.length} applications`);
      return NextResponse.json({ applications });
    } catch (serviceError) {
      console.error("Error fetching applications:", serviceError);
      throw serviceError;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in applications route:", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
