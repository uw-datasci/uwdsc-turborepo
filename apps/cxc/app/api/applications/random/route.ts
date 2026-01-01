import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { AdminReviewService } from "@uwdsc/server/cxc/services/adminReviewService";

/**
 * GET /api/applications/random
 * Returns the application with least number of reviews (ties broken lexicographically)
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

    // Get next application for review
    const adminReviewService = new AdminReviewService();

    // Create a helper function to get resume URL
    const getResumeUrl = async (profileId: string): Promise<string | null> => {
      try {
        const { createResumeService } = await import("@/lib/services");
        const resumeService = await createResumeService();
        const resumeResult = await resumeService.getSignedResumeUrl(
          profileId,
          3600,
        );
        if (resumeResult.success && resumeResult.url) {
          return resumeResult.url;
        }
        return null;
      } catch (error) {
        console.error("Error fetching resume signed URL:", error);
        return null;
      }
    };

    const application =
      await adminReviewService.getNextApplicationForReview(
        user.id,
        getResumeUrl,
      );

    if (!application) {
      return NextResponse.json(
        { error: "No applications available for review" },
        { status: 404 },
      );
    }

    return NextResponse.json({ application });
  } catch (err: unknown) {
    console.error("Error in random application route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
