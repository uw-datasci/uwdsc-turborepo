import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { sql } from "@uwdsc/server/core/database/connection";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

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
    
    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
    }

    // Get application with least number of reviews
    // Ties are broken lexicographically by application id
    const applications = await sql<Array<Record<string, unknown> & { review_count: number }>>`
      SELECT 
        a.*,
        COALESCE(review_counts.review_count, 0)::int as review_count
      FROM applications a
      LEFT JOIN (
        SELECT 
          application_id,
          COUNT(*)::int as review_count
        FROM reviews
        GROUP BY application_id
      ) review_counts ON a.id = review_counts.application_id
      WHERE a.status = 'submitted'
      ORDER BY 
        COALESCE(review_counts.review_count, 0) ASC,
        a.id ASC
      LIMIT 1
    `;

    if (applications.length === 0) {
      return NextResponse.json(
        { error: "No applications available for review" },
        { status: 404 },
      );
    }

    const data = applications[0];
    if (!data) {
      return NextResponse.json(
        { error: "No applications available for review" },
        { status: 404 },
      );
    }
    
    // Remove review_count from the data before returning
    const { review_count: _review_count, ...applicationData } = data;

    // Get user email from auth.users using profile_id (which is the user id)
    let email: string | null = null;
    let resumeUrl: string | null = null;

    try {
      const profileId = applicationData.profile_id as string;
      if (profileId) {
        const emailResults = await sql<Array<{ email: string }>>`
          SELECT email FROM auth.users WHERE id = ${profileId} LIMIT 1
        `;

        if (emailResults.length > 0 && emailResults[0]) {
          email = emailResults[0].email;
        }

        // Get resume URL by user ID (resume is stored by user ID in storage)
        try {
          const { createResumeService } = await import("@/lib/services");
          const resumeService = await createResumeService();
          const resumeResult = await resumeService.getUserResume(profileId);
          if (resumeResult.success && resumeResult.url) {
            resumeUrl = resumeResult.url;
          }
        } catch (resumeError) {
          console.error("Error fetching resume URL:", resumeError);
        }
      }
    } catch (emailError) {
      console.error("Error fetching user email:", emailError);
    }

    // Add email and resume URL to application data if available
    const applicationWithEmail = {
      ...applicationData,
      email: email,
      resume_url: resumeUrl,
    };

    return NextResponse.json({ application: applicationWithEmail });
  } catch (err: unknown) {
    console.error("Error in random application route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

