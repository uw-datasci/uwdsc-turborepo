/**
 * Application API Functions
 *
 * This file contains all application-related API calls.
 * Components should use these functions instead of making direct fetch calls.
 */

import { createApiError } from "./errors";

// ============================================================================
// Types
// ============================================================================

export interface ApiResponse {
  success: boolean;
  error?: string;
}

// ============================================================================
// Application API Functions
// ============================================================================

/**
 * Create a new blank application for the user
 *
 * @param profileId - The profile ID of the user
 * @returns Promise with success response
 * @throws Error if creation fails
 */
export async function createApplication(
  profileId: string,
): Promise<ApiResponse> {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile_id: profileId }),
  });

  const data = await response.json();
  if (!response.ok) throw createApiError(data, response.status);

  return data;
}

/**
 * Updates the application data in the backend
 *
 * @param formData - The application form data to be sent to the backend
 * @returns Promise with success response
 * @throws Error if update fails
 */
export async function updateApplication(
  formData: Record<string, unknown>,
): Promise<ApiResponse> {
  const response = await fetch("/api/applications", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) throw createApiError(data, response.status);

  return data;
}

/**
 * Fetches the existing application data for the user
 *
 * @param profileId - The profile ID of the user
 * @returns Promise with application data or null if not found
 * @throws Error if fetch fails (except 404)
 */
export async function getApplication(
  profileId: string,
): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(`/api/applications?profile_id=${profileId}`, {
      method: "GET",
    });

    // For 404 on application endpoint, return null instead of throwing
    if (response.status === 404) return null;

    const data = await response.json();

    if (!response.ok) throw createApiError(data, response.status);

    return data;
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
}
