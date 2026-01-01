import { NextRequest, NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import {
  AdminReviewService,
  ReviewScores,
} from "@uwdsc/server/cxc/services/adminReviewService";

/**
 * POST /api/review/submit
 * Saves review scores to database
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const reviewScores: ReviewScores = body;

    const adminReviewService = new AdminReviewService();

    try {
      const result = await adminReviewService.submitReview(
        reviewScores,
        profile.id,
      );

      return NextResponse.json({
        success: true,
        message: "Review saved successfully",
        review: result.review,
        total_reviews: result.total_reviews,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // Handle validation errors and duplicate review errors
      if (
        errorMessage.includes("must be between 1 and 10") ||
        errorMessage.includes("is required") ||
        errorMessage.includes("already reviewed")
      ) {
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }

      throw error; // Re-throw for 500 handler
    }
  } catch (err: unknown) {
    console.error("Error in review submit route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
