import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";

export interface Event {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  start_time: Date;
  buffered_start_time: Date;
  end_time: Date;
  buffered_end_time: Date;
  image_id: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateEventData {
  name: string;
  description?: string;
  location?: string;
  start_time: Date;
  buffered_start_time: Date;
  end_time: Date;
  buffered_end_time: Date;
  image_id?: number;
}

export interface EventAttendance {
  id: number;
  event_id: number;
  profile_id: string;
  checked_in: boolean;
  created_at: Date;
}

export class EventRepository extends BaseRepository {
  /**
   * Get all events
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      const result = await this.sql<Event[]>`
        SELECT *
        FROM events
        ORDER BY start_time DESC
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  /**
   * Get event by ID
   */
  async getEventById(eventId: number): Promise<Event | null> {
    try {
      const result = await this.sql<Event[]>`
        SELECT *
        FROM events
        WHERE id = ${eventId}
      `;

      if (result.length === 0) {
        return null;
      }

      return result[0] ?? null;
    } catch (error: unknown) {
      console.error("Error fetching event:", error);
      return null;
    }
  }

  /**
   * Create a new event
   */
  async createEvent(data: CreateEventData): Promise<Event> {
    console.log("[REPO] createEvent called with data:", {
      ...data,
      start_time: data.start_time.toString(),
      buffered_start_time: data.buffered_start_time.toString(),
      end_time: data.end_time.toString(),
      buffered_end_time: data.buffered_end_time.toString(),
    });
    try {
      console.log("[REPO] Executing SQL INSERT...");
      const result = await this.sql<Event[]>`
        INSERT INTO events (
          name,
          description,
          location,
          start_time,
          buffered_start_time,
          end_time,
          buffered_end_time,
          image_id
        )
        VALUES (
          ${data.name},
          ${data.description ?? null},
          ${data.location ?? null},
          ${data.start_time},
          ${data.buffered_start_time},
          ${data.end_time},
          ${data.buffered_end_time},
          ${data.image_id ?? null}
        )
        RETURNING *
      `;

      console.log("[REPO] SQL INSERT completed, result length:", result.length);

      if (result.length === 0) {
        console.error("[REPO] No rows returned from INSERT");
        throw new Error("Failed to create event - no rows returned");
      }

      console.log("[REPO] Event created successfully:", result[0]);
      return result[0]!;
    } catch (error: unknown) {
      console.error("[REPO] Error creating event:", error);
      if (error instanceof Error) {
        console.error("[REPO] Error message:", error.message);
        console.error("[REPO] Error stack:", error.stack);
      }
      throw error;
    }
  }

  /**
   * Get or create event attendance record
   */
  async getOrCreateAttendance(
    eventId: number,
    profileId: string,
  ): Promise<EventAttendance> {
    try {
      // Try to get existing attendance
      const existing = await this.sql<EventAttendance[]>`
        SELECT *
        FROM event_attendance
        WHERE event_id = ${eventId} AND profile_id = ${profileId}
      `;

      if (existing.length > 0) {
        return existing[0]!;
      }

      // Create new attendance record
      const result = await this.sql<EventAttendance[]>`
        INSERT INTO event_attendance (event_id, profile_id, checked_in)
        VALUES (${eventId}, ${profileId}, false)
        RETURNING *
      `;

      if (result.length === 0) {
        throw new Error("Failed to create attendance record");
      }

      return result[0]!;
    } catch (error: unknown) {
      console.error("Error getting or creating attendance:", error);
      throw error;
    }
  }

  /**
   * Check in a user for an event
   */
  async checkInUser(
    eventId: number,
    profileId: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // First ensure attendance record exists
      await this.getOrCreateAttendance(eventId, profileId);

      // Update checked_in status
      const result = await this.sql`
        UPDATE event_attendance
        SET checked_in = true
        WHERE event_id = ${eventId} AND profile_id = ${profileId}
        RETURNING *
      `;

      if (result.length === 0) {
        return {
          success: false,
          error: "Failed to check in user",
        };
      }

      return { success: true };
    } catch (error: unknown) {
      console.error("Error checking in user:", error);
      return {
        success: false,
        error: (error as Error).message || "Failed to check in user",
      };
    }
  }

  /**
   * Get attendance for an event
   */
  async getEventAttendance(eventId: number): Promise<EventAttendance[]> {
    try {
      const result = await this.sql<EventAttendance[]>`
        SELECT *
        FROM event_attendance
        WHERE event_id = ${eventId}
        ORDER BY created_at DESC
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching event attendance:", error);
      throw error;
    }
  }

  /**
   * Update an existing event
   */
  async updateEvent(
    eventId: number,
    data: Partial<CreateEventData>,
  ): Promise<Event> {
    try {
      // Build update object with only provided fields
      const updateFields: Record<string, unknown> = {};

      if (data.name !== undefined) updateFields.name = data.name;
      if (data.description !== undefined)
        updateFields.description = data.description ?? null;
      if (data.location !== undefined)
        updateFields.location = data.location ?? null;
      if (data.start_time !== undefined)
        updateFields.start_time = data.start_time;
      if (data.buffered_start_time !== undefined)
        updateFields.buffered_start_time = data.buffered_start_time;
      if (data.end_time !== undefined) updateFields.end_time = data.end_time;
      if (data.buffered_end_time !== undefined)
        updateFields.buffered_end_time = data.buffered_end_time;
      if (data.image_id !== undefined)
        updateFields.image_id = data.image_id ?? null;

      // Always update the updated_at timestamp
      updateFields.updated_at = new Date();

      if (Object.keys(updateFields).length === 0) {
        // No fields to update, just return the existing event
        const existing = await this.getEventById(eventId);
        if (!existing) {
          throw new Error("Event not found");
        }
        return existing;
      }

      const result = await this.sql<Event[]>`
        UPDATE events
        SET ${this.sql(updateFields)}
        WHERE id = ${eventId}
        RETURNING *
      `;

      if (result.length === 0) {
        throw new Error("Event not found or update failed");
      }

      return result[0]!;
    } catch (error: unknown) {
      console.error("Error updating event:", error);
      throw error;
    }
  }
}
