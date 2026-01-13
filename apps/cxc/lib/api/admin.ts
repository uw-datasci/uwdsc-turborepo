import { createApiError } from "./errors";
import type {
  GetAllApplicationsResponse,
  GetApplicationDetailsResponse,
} from "@/types/api";

/**
 * Admin API calls for managing applications
 */

/**
 * Get all submitted applications with summary data
 *
 * @returns Promise with all application summaries
 * @throws Error if request fails
 */
export async function getAllApplications(): Promise<GetAllApplicationsResponse> {
  const response = await fetch("/api/admin/applications");

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data;
}

/**
 * Get full application details by ID
 *
 * @param applicationId - The application ID
 * @returns Promise with full application details
 * @throws Error if request fails
 */
export async function getApplicationDetails(
  applicationId: string,
): Promise<GetApplicationDetailsResponse> {
  const response = await fetch(`/api/admin/applications/${applicationId}`);

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data;
}
