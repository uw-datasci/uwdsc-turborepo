import { createApiError } from "./errors";

export interface ScheduleEvent {
  id: number;
  name: string;
  description?: string;
  location?: string;
  start_time: string;
  buffered_start_time: string;
  end_time: string;
  buffered_end_time: string;
  image_id?: number;
  created_at: string;
  updated_at: string;
}

export async function getSchedule(): Promise<ScheduleEvent[]> {
  const response = await fetch("/api/schedule");
  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data.events;
}
