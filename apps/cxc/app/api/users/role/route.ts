import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { role } = body;

    if (!["hacker", "declined", "default"].includes(role)) {
      return NextResponse.json(
        { error: "Forbidden role. Allowed roles: hacker, declined, default" },
        { status: 403 },
      );
    }

    // Get current user profile to check existing role
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Prevent changing from hacker or declined (one-time decision)
    if (profile.role === "hacker" || profile.role === "declined") {
      return NextResponse.json(
        {
          error: "RSVP decision is final",
          message:
            "You have already made your RSVP decision and cannot change it.",
        },
        { status: 403 },
      );
    }

    // update role for rsvp
    const result = await profileService.updateUserRole(user.id, role);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Internal server error",
          message: result.error || "Failed to update user role",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully assigned role "${role}" to user`,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error in user assign route:", error);
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
