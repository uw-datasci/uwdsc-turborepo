/**
 * File Upload API Functions
 *
 * This file contains all file upload-related API calls.
 * Components should use these functions instead of making direct fetch calls.
 */

import { createApiError } from "./errors";

// ============================================================================
// Types
// ============================================================================

export interface UploadResumeResponse {
  message: string;
  key: string;
}

export interface GetResumeResponse {
  resume: {
    name: string;
    [key: string]: unknown;
  } | null;
  url: string | null;
  key: string | null;
}

// ============================================================================
// File Upload API Functions
// ============================================================================

/**
 * Upload a resume file for the current user (replaces existing resume)
 *
 * @param file - The resume file to upload (PDF, DOC, or DOCX)
 * @returns Promise with upload response containing the file key
 * @throws Error if upload fails (invalid file type, too large, unauthorized, etc.)
 */
export async function uploadResume(file: File): Promise<UploadResumeResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/applications/resumes", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data;
}

/**
 * Get the current user's resume
 *
 * @returns Promise with resume data and URL, or null if no resume exists
 * @throws Error only if request fails (not for 404/missing resume)
 */
export async function getResume(): Promise<GetResumeResponse> {
  const response = await fetch("/api/applications/resumes", {
    method: "GET",
  });

  const data = await response.json();

  // If response is not ok and it's not a missing resume case, throw error
  if (!response.ok && response.status !== 200) {
    // If we got null values, that's fine - no resume exists
    if (data.resume === null && data.url === null) {
      return data;
    }
    throw createApiError(data, response.status);
  }

  return data;
}
