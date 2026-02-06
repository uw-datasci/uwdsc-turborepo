import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@uwdsc/server/cxc/services/eventService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const eventService = new EventService();
const profileService = new ProfileService();

/**
 * GET /api/admin/events
 * Get all events, or only events currently happening (within buffer times).
 * Query: current_only=true to restrict to events where now is between buffered_start_time and buffered_end_time.
 * Admin, superadmin, and volunteer endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Check if user is admin, superadmin, or volunteer
    const profile = await profileService.getProfileByUserId(user.id);
    if (
      profile?.role !== "admin" &&
      profile?.role !== "superadmin" &&
      profile?.role !== "volunteer"
    ) {
      return NextResponse.json(
        { error: "Forbidden", message: "Admin or volunteer access required" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const currentOnly = searchParams.get("current_only") === "true";

    const events = currentOnly
      ? await eventService.getEventsHappeningNow()
      : await eventService.getAllEvents();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to fetch events",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/events
 * Create a new event
 * Admin and superadmin only endpoint
 */
export async function POST(request: NextRequest) {
  console.log("[API] POST /api/admin/events - Starting");
  try {
    // Verify admin access
    console.log("[API] Creating auth service...");
    const authService = await createAuthService();
    console.log("[API] Getting current user...");
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      console.log("[API] Authentication failed:", userError);
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    console.log("[API] User authenticated:", user.id);

    // Check if user is admin or superadmin
    console.log("[API] Checking admin role...");
    const profile = await profileService.getProfileByUserId(user.id);
    console.log("[API] Profile:", profile);
    if (profile?.role !== "admin" && profile?.role !== "superadmin") {
      console.log("[API] User is not admin, role:", profile?.role);
      return NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 },
      );
    }

    console.log("[API] Parsing request body...");
    const body = await request.json();
    console.log("[API] Request body:", body);
    const {
      name,
      description,
      location,
      start_time,
      buffered_start_time,
      end_time,
      buffered_end_time,
      image_id,
    } = body;

    // Validate required fields
    console.log("[API] Validating required fields...");
    if (
      !name ||
      !start_time ||
      !buffered_start_time ||
      !end_time ||
      !buffered_end_time
    ) {
      console.log("[API] Validation failed - missing fields:", {
        name: !!name,
        start_time: !!start_time,
        buffered_start_time: !!buffered_start_time,
        end_time: !!end_time,
        buffered_end_time: !!buffered_end_time,
      });
      return NextResponse.json(
        { error: "Bad Request", message: "Missing required fields" },
        { status: 400 },
      );
    }

    console.log("[API] Creating event with data:", {
      name,
      description,
      location,
      start_time: new Date(start_time),
      buffered_start_time: new Date(buffered_start_time),
      end_time: new Date(end_time),
      buffered_end_time: new Date(buffered_end_time),
    });

    const event = await eventService.createEvent({
      name,
      description,
      location,
      start_time: new Date(start_time),
      buffered_start_time: new Date(buffered_start_time),
      end_time: new Date(end_time),
      buffered_end_time: new Date(buffered_end_time),
      image_id: image_id ? Number(image_id) : undefined,
    });

    console.log("[API] Event created successfully:", event);
    return NextResponse.json({ event }, { status: 201 });
  } catch (error: unknown) {
    console.error("[API] Error creating event:", error);
    if (error instanceof Error) {
      console.error("[API] Error stack:", error.stack);
    }
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to create event",
      },
      { status: 500 },
    );
  }
}
