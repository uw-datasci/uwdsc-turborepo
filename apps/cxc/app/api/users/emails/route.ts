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

    // Get all user emails from auth.users
    const result = await sql<Array<{ id: string; email: string }>>`
      SELECT id, email
      FROM auth.users
      WHERE email IS NOT NULL
      ORDER BY email ASC
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

