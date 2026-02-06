import { ApiError } from "@uwdsc/server/core/utils/errors";
import {
  EventRepository,
  CreateEventData,
  Event,
  EventAttendance,
} from "../repository/eventRepository";

export class EventService {
  private readonly repository: EventRepository;

  constructor() {
    this.repository = new EventRepository();
  }

  /**
   * Get all events
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      return await this.repository.getAllEvents();
    } catch (error) {
      throw new ApiError(
        `Failed to get events: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get events that are currently happening (now within buffered_start_time and buffered_end_time).
   */
  async getEventsHappeningNow(): Promise<Event[]> {
    try {
      return await this.repository.getEventsHappeningNow();
    } catch (error) {
      throw new ApiError(
        `Failed to get events happening now: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get event by ID
   */
  async getEventById(eventId: number): Promise<Event | null> {
    try {
      return await this.repository.getEventById(eventId);
    } catch (error) {
      throw new ApiError(
        `Failed to get event: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Create a new event
   */
  async createEvent(data: CreateEventData): Promise<Event> {
    try {
      return await this.repository.createEvent(data);
    } catch (error) {
      throw new ApiError(
        `Failed to create event: ${(error as Error).message}`,
        500,
      );
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
      return await this.repository.checkInUser(eventId, profileId);
    } catch (error) {
      throw new ApiError(
        `Failed to check in user: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get attendance for an event
   */
  async getEventAttendance(eventId: number): Promise<EventAttendance[]> {
    try {
      return await this.repository.getEventAttendance(eventId);
    } catch (error) {
      throw new ApiError(
        `Failed to get event attendance: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Check if a user is already checked in for an event
   */
  async isUserCheckedIn(eventId: number, profileId: string): Promise<boolean> {
    try {
      return await this.repository.isUserCheckedIn(eventId, profileId);
    } catch (error) {
      throw new ApiError(
        `Failed to check user check-in status: ${(error as Error).message}`,
        500,
      );
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
      return await this.repository.updateEvent(eventId, data);
    } catch (error) {
      throw new ApiError(
        `Failed to update event: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Delete an event
   */
  async deleteEvent(eventId: number): Promise<void> {
    try {
      await this.repository.deleteEvent(eventId);
    } catch (error) {
      throw new ApiError(
        `Failed to delete event: ${(error as Error).message}`,
        500,
      );
    }
  }
}
