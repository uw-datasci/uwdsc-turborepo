import { NextResponse } from "next/server";
import { EventService } from "@uwdsc/server/cxc/services/eventService";

const eventService = new EventService();

/**
 * GET /api/schedule
 * Get all public events for the schedule page
 * Public endpoint - no authentication required
 */
export async function GET() {
  try {
    const events = await eventService.getAllEvents();

    // Sort events by start time
    const sortedEvents = events.sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
    );

    return NextResponse.json({ events: sortedEvents }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to fetch schedule",
      },
      { status: 500 },
    );
  }
}
