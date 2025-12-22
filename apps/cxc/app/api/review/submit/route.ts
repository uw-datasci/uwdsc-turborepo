import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import type { CookieOptions } from "@supabase/ssr";
import { createAuthService } from "@/lib/services";

type ReviewScores = {
  application_id: string;
  basic_info_score: number; // 1-10
  q1_score: number; // 1-10
  q2_score: number; // 1-10
};

/**
 * POST /api/review/submit
 * Saves review scores to the user's profile
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { application_id, basic_info_score, q1_score, q2_score }: ReviewScores =
      body;

    // Validate scores
    if (
      typeof basic_info_score !== "number" ||
      basic_info_score < 1 ||
      basic_info_score > 10
    ) {
      return NextResponse.json(
        { error: "basic_info_score must be between 1 and 10" },
        { status: 400 },
      );
    }

    if (
      typeof q1_score !== "number" ||
      q1_score < 1 ||
      q1_score > 10
    ) {
      return NextResponse.json(
        { error: "q1_score must be between 1 and 10" },
        { status: 400 },
      );
    }

    if (
      typeof q2_score !== "number" ||
      q2_score < 1 ||
      q2_score > 10
    ) {
      return NextResponse.json(
        { error: "q2_score must be between 1 and 10" },
        { status: 400 },
      );
    }

    if (!application_id) {
      return NextResponse.json(
        { error: "application_id is required" },
        { status: 400 },
      );
    }

    // Create Supabase client
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      set(name: string, value: string, options?: CookieOptions) {
        cookieStore.set(name, value, options);
      },
    });

    // Get current user metadata
    const {
      data: { user: authUser },
      error: getUserError,
    } = await supabase.auth.getUser();

    if (getUserError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get existing scores from user metadata
    const currentScores =
      (authUser.user_metadata?.review_scores as Array<{
        application_id: string;
        basic_info_score: number;
        q1_score: number;
        q2_score: number;
        reviewed_at: string;
      }>) || [];

    // Add new score
    const newScore = {
      application_id,
      basic_info_score,
      q1_score,
      q2_score,
      reviewed_at: new Date().toISOString(),
    };

    const updatedScores = [...currentScores, newScore];

    // Update user metadata with new scores
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        review_scores: updatedScores,
      },
    });

    if (updateError) {
      console.error("Error updating user scores:", updateError);
      return NextResponse.json(
        { error: "Failed to save scores" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Scores saved successfully",
      total_reviews: updatedScores.length,
    });
  } catch (err: unknown) {
    console.error("Error in review submit route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

