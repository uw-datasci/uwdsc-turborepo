import { NextRequest, NextResponse } from "next/server";
import { EventService } from "@uwdsc/server/cxc/services/eventService";
import { createAuthService } from "@/lib/services";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

const eventService = new EventService();
const profileService = new ProfileService();

/**
 * PATCH /api/admin/events/[id]
 * Update an existing event
 * Admin and superadmin only endpoint
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Verify admin access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();
    const { id } = await params;

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Check if user is admin or superadmin
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "admin" && profile?.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 },
      );
    }

    const eventId = Number(id);
    if (isNaN(eventId)) {
      console.error(id);
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid event ID: " + id },
        { status: 400 },
      );
    }

    const body = await request.json();
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

    // Build update data with only provided fields
    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description ?? null;
    if (location !== undefined) updateData.location = location ?? null;
    if (start_time !== undefined) updateData.start_time = new Date(start_time);
    if (buffered_start_time !== undefined)
      updateData.buffered_start_time = new Date(buffered_start_time);
    if (end_time !== undefined) updateData.end_time = new Date(end_time);
    if (buffered_end_time !== undefined)
      updateData.buffered_end_time = new Date(buffered_end_time);
    if (image_id !== undefined)
      updateData.image_id = image_id ? Number(image_id) : null;

    const event = await eventService.updateEvent(eventId, updateData);

    return NextResponse.json({ event }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to update event",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/events/[id]
 * Delete an existing event
 * Admin and superadmin only endpoint
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Verify admin access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();
    const { id } = await params;

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // Check if user is admin or superadmin
    const profile = await profileService.getProfileByUserId(user.id);
    if (profile?.role !== "admin" && profile?.role !== "superadmin") {
      return NextResponse.json(
        { error: "Forbidden", message: "Admin access required" },
        { status: 403 },
      );
    }

    const eventId = Number(id);
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid event ID: " + id },
        { status: 400 },
      );
    }

    // Check if event exists
    const existingEvent = await eventService.getEventById(eventId);
    if (!existingEvent) {
      return NextResponse.json(
        { error: "Not Found", message: "Event not found" },
        { status: 404 },
      );
    }

    // Delete the event (this will also delete all attendance records)
    await eventService.deleteEvent(eventId);

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Failed to delete event",
      },
      { status: 500 },
    );
  }
}
