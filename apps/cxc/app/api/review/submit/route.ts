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

    // Check if user has admin role
    const { ProfileService } = await import("@uwdsc/server/cxc/services/profileService");
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);
    
    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 },
      );
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

    // Check if reviewer has already reviewed this application
    const { data: existingReview, error: checkError } = await supabase
      .from("reviews")
      .select("id")
      .eq("application_id", application_id)
      .eq("reviewer_id", profile.id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 means no row found, which is fine
      console.error("Error checking existing review:", checkError);
      return NextResponse.json(
        { error: "Failed to check existing review" },
        { status: 500 },
      );
    }

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this application" },
        { status: 400 },
      );
    }

    // Insert review into reviews table
    const { data: reviewData, error: insertError } = await supabase
      .from("reviews")
      .insert({
        application_id,
        reviewer_id: profile.id,
        basic_info_score,
        q1_score,
        q2_score,
        reviewed_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (insertError) {
      console.error("Error inserting review:", insertError);
      return NextResponse.json(
        { error: "Failed to save review" },
        { status: 500 },
      );
    }

    // Get total review count for this reviewer
    const { count } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("reviewer_id", profile.id);

    return NextResponse.json({
      success: true,
      message: "Review saved successfully",
      review: reviewData,
      total_reviews: count || 0,
    });
  } catch (err: unknown) {
    console.error("Error in review submit route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

