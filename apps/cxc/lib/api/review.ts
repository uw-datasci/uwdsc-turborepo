import { createApiError } from "./errors";

/**
 * Review API calls and formdata
 */

export interface Application {
  id: string;
  profile_id: string;
  [key: string]: unknown;
}

export interface GetRandomApplicationResponse {
  application: Application;
}

export interface SubmitReviewRequest {
  application_id: string;
  basic_info_score: number;
  q1_score: number;
  q2_score: number;
}

export interface SubmitReviewResponse {
  success: boolean;
  message: string;
  total_reviews: number;
}

/**
 * Get a random submitted application for review
 *
 * @returns Promise with a random application
 * @throws Error if no applications are available or request fails
 */
export async function getRandomApplication(): Promise<GetRandomApplicationResponse> {
  const response = await fetch("/api/applications/random");

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data;
}

/**
 * Submit review scores for an application
 *
 * @param scores - The review scores (application_id, basic_info_score, questions_score)
 * @returns Promise with submission result
 * @throws Error if submission fails
 */
export async function submitReview(
  scores: SubmitReviewRequest,
): Promise<SubmitReviewResponse> {
  const response = await fetch("/api/review/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scores),
  });

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data;
}
