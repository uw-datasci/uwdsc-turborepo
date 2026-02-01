import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@uwdsc/server/cxc/services/eventService";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { createAuthService } from "@/lib/services";

const eventService = new EventService();
const profileService = new ProfileService();

/**
 * GET /api/admin/checkin?nfc_id=xxx&event_id=xxx
 * Check if a user is already checked in for an event
 * Admin, superadmin, and volunteer endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin/volunteer access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Check if user is admin, superadmin, or volunteer
    const adminProfile = await profileService.getProfileByUserId(user.id);
    if (
      adminProfile?.role !== "admin" &&
      adminProfile?.role !== "superadmin" &&
      adminProfile?.role !== "volunteer"
    ) {
      return NextResponse.json(
        { error: "Forbidden", message: "Admin or volunteer access required" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const nfcId = searchParams.get("nfc_id");
    const eventId = searchParams.get("event_id");

    if (!nfcId || !eventId) {
      return NextResponse.json(
        { error: "Bad Request", message: "Missing nfc_id or event_id" },
        { status: 400 },
      );
    }

    // Get profile by NFC ID
    const profile = await profileService.getProfileByNfcId(nfcId);
    if (!profile) {
      return NextResponse.json(
        { error: "Not Found", message: "Profile not found for NFC ID" },
        { status: 404 },
      );
    }

    // Check if user is already checked in
    const isCheckedIn = await eventService.isUserCheckedIn(
      Number(eventId),
      profile.id,
    );

    return NextResponse.json(
      {
        isCheckedIn,
        profile: {
          id: profile.id,
          role: profile.role,
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error checking user check-in status:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to check user check-in status",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/checkin
 * Check in a user for an event using NFC ID
 * Admin, superadmin, and volunteer endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin/volunteer access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Check if user is admin, superadmin, or volunteer
    const adminProfile = await profileService.getProfileByUserId(user.id);
    if (
      adminProfile?.role !== "admin" &&
      adminProfile?.role !== "superadmin" &&
      adminProfile?.role !== "volunteer"
    ) {
      return NextResponse.json(
        { error: "Forbidden", message: "Admin or volunteer access required" },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { nfc_id, event_id } = body;

    if (!nfc_id || !event_id) {
      return NextResponse.json(
        { error: "Bad Request", message: "Missing nfc_id or event_id" },
        { status: 400 },
      );
    }

    // Get profile by NFC ID
    const profile = await profileService.getProfileByNfcId(nfc_id);
    if (!profile) {
      return NextResponse.json(
        { error: "Not Found", message: "Profile not found for NFC ID" },
        { status: 404 },
      );
    }

    // Check in user
    const result = await eventService.checkInUser(Number(event_id), profile.id);

    if (!result.success) {
      return NextResponse.json(
        { error: "Internal Server Error", message: result.error },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User checked in successfully",
        profile: {
          id: profile.id,
          role: profile.role,
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error checking in user:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to check in user",
      },
      { status: 500 },
    );
  }
}
