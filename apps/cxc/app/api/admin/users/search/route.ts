import { NextResponse } from "next/server";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { createAuthService } from "@/lib/services";

const profileService = new ProfileService();

/**
 * GET /api/admin/users/search?email=xxx
 * Search users by email
 * Superadmin only endpoint
 */
export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const emailQuery = searchParams.get("email");

    if (!emailQuery || emailQuery.trim().length === 0) {
      return NextResponse.json(
        { error: "Bad Request", message: "Email query parameter is required" },
        { status: 400 },
      );
    }

    // Search users by email
    const users = await profileService.searchUsersByEmail(emailQuery.trim());

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in user search route:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 },
    );
  }
}
