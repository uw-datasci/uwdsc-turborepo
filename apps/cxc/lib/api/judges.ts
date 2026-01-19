/**
 * Judges API Functions
 *
 * This file contains all judge-related API calls.
 */

import { createApiError } from "./errors";

// ============================================================================
// Types
// ============================================================================

export interface Judge {
  id: string;
  role: string;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssignJudgesRequest {
  judgesPerGroup: number;
  timesJudged: number;
  startDate: string; // ISO datetime string
  timeslotDurationMinutes: number;
}

// ============================================================================
// Admin API Functions (Superadmin only)
// ============================================================================

/**
 * Get all judges with email addresses (superadmin only)
 */
export async function getAllJudges(): Promise<{ judges: Judge[] }> {
  const response = await fetch("/api/admin/judges", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to fetch judges", response.status);
  }

  return response.json();
}

/**
 * Assign judges to projects randomly (superadmin only)
 */
export async function assignJudges(
  data: AssignJudgesRequest,
): Promise<{ success: boolean; message: string }> {
  const response = await fetch("/api/admin/judges/assign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to assign judges", response.status);
  }

  return response.json();
}
