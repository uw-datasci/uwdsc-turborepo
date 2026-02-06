import { NextResponse } from "next/server";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { createAuthService } from "@/lib/services";

const profileService = new ProfileService();

/**
 * GET /api/admin/nfc
 * Get or generate NFC ID for the current user
 * GET /api/admin/nfc?nfc_id=xxx
 * Get profile by NFC ID
 * Admin, superadmin, and volunteer endpoint
 */
export async function GET(request: Request) {
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

    // If nfc_id query param is provided, get profile by NFC ID
    if (nfcId) {
      const profile = await profileService.getProfileByNfcId(nfcId);

      if (!profile) {
        return NextResponse.json(
          { error: "Not Found", message: "Profile not found for NFC ID" },
          { status: 404 },
        );
      }

      // Get user email and metadata
      const email = await profileService.getUserEmail(profile.id);
      const metadata = await profileService.getUserMetadata(profile.id);

      return NextResponse.json(
        {
          profile: {
            id: profile.id,
            email: email,
            nfc_id: profile.nfc_id,
            first_name: metadata?.first_name || null,
            last_name: metadata?.last_name || null,
          },
        },
        { status: 200 },
      );
    }

    // Otherwise, get or generate NFC ID for current user
    const nfcIdForUser = await profileService.getOrGenerateNfcId(user.id);
    return NextResponse.json({ nfc_id: nfcIdForUser }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in NFC route:", error);
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
