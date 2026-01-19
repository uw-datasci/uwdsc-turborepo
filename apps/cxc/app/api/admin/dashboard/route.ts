import { NextRequest, NextResponse } from "next/server";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";
import { DashboardService } from "@uwdsc/server/cxc/services/dashboardService";

/**
 * GET /api/admin/dashboard
 * Get dashboard statistics and RSVP timeline
 * Superadmin only endpoint
 *
 * Query params:
 * - interval: '1' for hourly, '24' for daily intervals (default: '24')
 */
export async function GET(request: NextRequest) {
  try {
    console.log("[Dashboard API] Starting request");
    
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      console.log("[Dashboard API] Unauthorized:", userErr);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[Dashboard API] User authenticated:", user.id);

    // Check if user is superadmin
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);

    if (!profile || profile.role !== "superadmin") {
      console.log("[Dashboard API] Forbidden - role:", profile?.role);
      return NextResponse.json(
        { error: "Forbidden: Superadmin access required" },
        { status: 403 },
      );
    }

    console.log("[Dashboard API] User is superadmin, fetching data");

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const intervalParam = searchParams.get("interval");
    const intervalHours: 1 | 24 =
      intervalParam === "1" ? 1 : (24 as 1 | 24);

    console.log("[Dashboard API] Interval:", intervalHours);

    // Get dashboard data
    const dashboardService = new DashboardService();

    console.log("[Dashboard API] Fetching statistics...");
    const statistics = await dashboardService.getDashboardStatistics();
    console.log("[Dashboard API] Statistics fetched:", statistics);

    console.log("[Dashboard API] Fetching timeline...");
    const timeline = await dashboardService.getRSVPTimeline(intervalHours);
    console.log("[Dashboard API] Timeline fetched, count:", timeline.length);

    return NextResponse.json({
      statistics,
      timeline,
    });
  } catch (error) {
    console.error("[Dashboard API] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to fetch dashboard data",
      },
      { status: 500 },
    );
  }
}
