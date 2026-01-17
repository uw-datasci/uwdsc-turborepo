import { NextRequest, NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { AdminReviewService } from "@uwdsc/server/cxc/services/adminReviewService";

/**
 * GET /api/admin/leaderboard
 * Get leaderboard data and statistics
 * Superadmin only endpoint
 * 
 * Query params:
 * - reviewerId: Optional, if provided returns average scores for that reviewer
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is superadmin - simple check from profiles table
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);

    if (!profile || profile.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden: Superadmin access required" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const reviewerId = searchParams.get("reviewerId");

    // If reviewerId is provided, return that reviewer's average scores
    if (reviewerId) {
      const adminReviewService = new AdminReviewService();
      const reviewerScores = await adminReviewService.getReviewerAverageScores(reviewerId);
      return NextResponse.json({ reviewerScores });
    }

    // Otherwise, get leaderboard and statistics
    const adminReviewService = new AdminReviewService();
    
    try {
      // Use Promise.allSettled to handle partial failures gracefully
      const [leaderboardResult, statisticsResult] = await Promise.allSettled([
        adminReviewService.getLeaderboard(),
        adminReviewService.getStatistics(),
      ]);

      const leaderboard = leaderboardResult.status === 'fulfilled' 
        ? (leaderboardResult.value || [])
        : [];
      
      const statistics = statisticsResult.status === 'fulfilled'
        ? statisticsResult.value
        : {
            total_applications: 0,
            total_reviews: 0,
            total_reviewers: 0,
            avg_reviews_per_application: 0,
            avg_resume_score: 0,
            avg_links_score: 0,
            avg_q1_score: 0,
            avg_q2_score: 0,
          };

      if (leaderboardResult.status === 'rejected') {
        console.error("Error fetching leaderboard:", leaderboardResult.reason);
      }
      if (statisticsResult.status === 'rejected') {
        console.error("Error fetching statistics:", statisticsResult.reason);
      }

      return NextResponse.json({
        leaderboard,
        statistics,
      });
    } catch (serviceError) {
      console.error("Error fetching leaderboard data:", serviceError);
      throw serviceError;
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in leaderboard route:", {
      error: errorMessage,
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
