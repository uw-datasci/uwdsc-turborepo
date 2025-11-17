import { NextResponse } from "next/server";
import { ProfileService } from "@uwdsc/server/web/services/profileService";
import { createAuthService } from "@/lib/services";

const profileService = new ProfileService();

/**
 * GET /api/admin/memberships
 * Get all user profiles with membership statistics
 * Admin only endpoint
 */
export async function GET(request: Request) {
  try {
    // Verify admin access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // TODO: Add proper admin role check here
    // For now, any authenticated user can access
    // In production, you should verify the user has an admin role

    // Get query parameter to determine what data to return
    const { searchParams } = new URL(request.url);
    const statsOnly = searchParams.get("stats") === "true";

    if (statsOnly) {
      // Return only statistics
      const stats = await profileService.getMembershipStats();
      return NextResponse.json({ stats }, { status: 200 });
    }

    // Return all profiles
    const profiles = await profileService.getAllProfiles();
    return NextResponse.json({ profiles }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching memberships:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message || "Failed to fetch membership data",
      },
      { status: 500 },
    );
  }
}
