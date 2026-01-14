import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { AdminApplicationService } from "@uwdsc/server/cxc/services/adminApplicationService";

interface ApplicationParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/applications/[id]
 * Get full application details by ID
 * Admin only endpoint
 */
export async function GET(request: Request, { params }: ApplicationParams) {
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

    const { id: applicationId } = await params;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 },
      );
    }

    // Get application details
    const adminApplicationService = new AdminApplicationService();
    const application =
      await adminApplicationService.getApplicationById(applicationId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    // Get resume URL if available (use admin service to bypass RLS)
    let resumeUrl: string | null = null;
    try {
      const { createAdminResumeService } = await import("@/lib/services");
      const adminResumeService = createAdminResumeService();
      const resumeResult = await adminResumeService.getSignedResumeUrl(
        application.profile_id,
        3600,
      );
      if (resumeResult.success && resumeResult.url) {
        resumeUrl = resumeResult.url;
      }
    } catch (error) {
      console.error("Error fetching resume signed URL:", error);
      // Continue without resume URL
    }

    return NextResponse.json({
      application: {
        ...application,
        resume_url: resumeUrl,
      },
    });
  } catch (error) {
    console.error("Error fetching application details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
