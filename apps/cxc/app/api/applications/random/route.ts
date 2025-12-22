import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import type { CookieOptions } from "@supabase/ssr";
import { createAuthService } from "@/lib/services";
import { sql } from "@uwdsc/server/core/database/connection";

/**
 * GET /api/applications/random
 * Returns a random application for review
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      set(name: string, value: string, options?: CookieOptions) {
        cookieStore.set(name, value, options);
      },
    });

    // Get a random submitted application
    const { count, error: countError } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "submitted");

    if (countError) {
      console.error("Error counting applications:", countError);
      return NextResponse.json(
        { error: "Failed to fetch application" },
        { status: 500 },
      );
    }

    if (!count || count === 0) {
      return NextResponse.json(
        { error: "No applications available for review" },
        { status: 404 },
      );
    }

    // Get a random offset and fetch
    const randomOffset = Math.floor(Math.random() * count);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("status", "submitted")
      .range(randomOffset, randomOffset)
      .single();

    if (error) {
      console.error("Error fetching random application:", error);
      if (error.code === "PGRST116") {
        // No applications found (throw error and return)
        return NextResponse.json(
          { error: "No applications available for review" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch application" },
        { status: 500 },
      );
    }

    if (!data) {
      // No applications to review
      return NextResponse.json(
        { error: "No applications available for review" },
        { status: 404 },
      );
    }

    // Get user email from auth.users using profile_id (which is the user id)
    // Note: profile_id in applications table is the same as auth.users.id
    // We'll query auth.users directly using the database connection
    let email: string | null = null;

    try {
      const rows = await sql<{ email: string }[]>`
        SELECT email
        FROM auth.users
        WHERE id = ${data.profile_id}
        LIMIT 1
      `;

      if (rows.length > 0) email = rows[0].email;
    } catch (emailError) {
      console.error("Error fetching user email:", emailError);
    }

    // Add email to application data if available
    const applicationWithEmail = {
      ...data,
      email: email,
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

