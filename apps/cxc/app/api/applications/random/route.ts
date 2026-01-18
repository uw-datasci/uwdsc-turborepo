import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { AdminReviewService } from "@uwdsc/server/cxc/services/adminReviewService";

/**
 * GET /api/applications/random
 * Returns the application with least number of reviews (ties broken lexicographically)
 * Admin and superadmin only endpoint
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

    // Get next application for review
    const adminReviewService = new AdminReviewService();

    // Create a helper function to get resume URL
    // Use admin resume service (service role) to bypass RLS for admin operations
    // Note: profileId should be the same as userId (auth.users.id)
    const getResumeUrl = async (profileId: string): Promise<string | null> => {
      try {
        const { createAdminResumeService } = await import("@/lib/services");
        const adminResumeService = createAdminResumeService();
        const resumeResult = await adminResumeService.getSignedResumeUrl(
          profileId,
          3600,
        );
        if (resumeResult.success && resumeResult.url) {
          return resumeResult.url;
        }
        // Log when resume is not found for debugging
        if (!resumeResult.success) {
          console.log(
            `Resume not found for profileId ${profileId}:`,
            resumeResult.error,
          );
        }
        return null;
      } catch (error) {
        console.error(
          `Error fetching resume signed URL for profileId ${profileId}:`,
          error,
        );
        return null;
      }
    };

    const application = await adminReviewService.getNextApplicationForReview(
      user.id,
      getResumeUrl,
    );

    if (!application) {
      console.log(`[API] No applications found for reviewer ${user.id}. This could mean:
        1. No applications with status='submitted' exist
        2. All submitted applications have already been reviewed by this user
        3. There was an error fetching applications`);
      return NextResponse.json(
        {
          error: "No applications available for review",
          message:
            "Either there are no submitted applications, or you have already reviewed all available applications.",
        },
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
