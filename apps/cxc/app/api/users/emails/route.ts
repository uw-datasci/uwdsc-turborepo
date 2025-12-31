import { NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ApplicationService } from "@uwdsc/server/cxc/services/applicationService";

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

    // Get all user emails
    const applicationService = new ApplicationService();
    const emails = await applicationService.getAllUserEmails();

    return NextResponse.json({ emails });
  } catch (err: unknown) {
    console.error("Error fetching user emails:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
