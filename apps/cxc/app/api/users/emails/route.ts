import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { sql } from "@uwdsc/server/core/database/connection";

/**
 * GET /api/users/emails
 * Get all user emails for team member selection
 */
export async function GET() {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all user emails and display names from auth.users
    // Construct display_name from first_name + last_name in raw_user_meta_data
    const result = await sql<
      Array<{ id: string; email: string; display_name: string | null }>
    >`
      SELECT 
        au.id,
        au.email,
        CASE 
          WHEN au.raw_user_meta_data->>'first_name' IS NOT NULL 
            AND au.raw_user_meta_data->>'last_name' IS NOT NULL
          THEN TRIM(
            COALESCE(au.raw_user_meta_data->>'first_name', '') || ' ' || 
            COALESCE(au.raw_user_meta_data->>'last_name', '')
          )
          WHEN au.raw_user_meta_data->>'first_name' IS NOT NULL
          THEN au.raw_user_meta_data->>'first_name'
          WHEN au.raw_user_meta_data->>'last_name' IS NOT NULL
          THEN au.raw_user_meta_data->>'last_name'
          ELSE NULL
        END as display_name
      FROM auth.users au
      WHERE au.email IS NOT NULL
      ORDER BY au.email ASC
    `;

    return NextResponse.json({ emails: result });
  } catch (err: unknown) {
    console.error("Error fetching user emails:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
