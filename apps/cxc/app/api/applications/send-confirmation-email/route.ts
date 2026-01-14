import { createAuthService } from "@/lib/services";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { ApplicationService } from "@uwdsc/server/cxc/services/applicationService";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/applications/send-confirmation-email
 * Send a confirmation email to the user when they submit their application
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's email
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      set() {
        // No-op for server
      },
    });

    const { data: userData } = await supabase.auth.getUser();
    const userEmail = userData?.user?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Could not get user email" },
        { status: 500 },
      );
    }

    // Create application service with Supabase client
    const applicationService = new ApplicationService(supabase);

    // Send confirmation email
    await applicationService.sendApplicationConfirmationEmail(userEmail);

    return NextResponse.json({
      success: true,
      message: "Confirmation email sent successfully",
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't fail the request - email sending is not critical
    return NextResponse.json({
      success: false,
      error: "Failed to send confirmation email, but application was submitted",
    });
  }
}
