/**
 * Application API Functions
 *
 * This file contains all application-related API calls.
 * Components should use these functions instead of making direct fetch calls.
 */

import type { AppFormValues } from "@/lib/schemas/application";
import type { SubmitApplicationResponse } from "@/types/api";
import { getUserProfile } from "./user";
import { uploadResume } from "./resume";
import { createApiError } from "./errors";

/**
 * Submit an application with all form data
 *
 * @param formData - The application form values
 * @returns Promise with the submitted application data
 * @throws Error if submission fails (not authenticated, validation error, etc.)
 */
export async function submitApplication(
  formData: AppFormValues,
): Promise<SubmitApplicationResponse> {
  const profile = await getUserProfile();
  if (!profile) {
    throw createApiError(
      { error: "User profile not found. Please ensure you are logged in." },
      401,
    );
  }

  let resumeId: string | undefined;
  if (formData.resume) {
    try {
      const uploadResult = await uploadResume(formData.resume);
      resumeId = uploadResult.key;
    } catch (error) {
      // If resume upload fails, throw error
      console.error("Resume upload failed:", error);
      throw error;
    }
  }

  // Step 3: Change payload to match supabase
  const submitPayload: Record<string, unknown> = {
    profile_id: profile.id,
    resume_id: resumeId,
    phone: formData.phone,
    discord: formData.discord,
    tshirt_size: formData.tshirt_size,
    dietary_restrictions: formData.dietary_restrictions,
    dietary_restrictions_other: formData.dietary_restrictions_other,
    gender: formData.gender,
    ethnicity: formData.ethnicity,
    university_name: formData.university_name,
    university_name_other: formData.university_name_other,
    program: formData.program,
    program_other: formData.program_other,
    year_of_study: formData.year_of_study,
    prior_hackathon_experience: formData.prior_hackathon_experience,
    hackathons_attended: formData.hackathons_attended,
    github: formData.github || undefined,
    linkedin: formData.linkedin || undefined,
    x: formData.x || undefined,
    other_link: formData.other_link || undefined,
    cxc_gain: formData.cxc_gain,
    silly_q: formData.silly_q,
    // Team members (not in form yet, but add for future use)
    // team_members: [],
  };

  Object.keys(submitPayload).forEach((key) => {
    if (submitPayload[key] === undefined || submitPayload[key] === "") {
      delete submitPayload[key];
    }
  });

  // Submit the application
  const response = await fetch("/api/applications/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submitPayload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }
}

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
export async function fetchApplication(
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
