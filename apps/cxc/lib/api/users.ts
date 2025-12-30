import { createApiError } from "./errors";

export interface UserEmail {
  id: string;
  email: string;
}

export interface GetUserEmailsResponse {
  emails: UserEmail[];
}

/**
 * Get all user emails for team member selection
 */
export async function getUserEmails(): Promise<GetUserEmailsResponse> {
  const response = await fetch("/api/users/emails", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw createApiError(data, response.status);
  }

  return data;
}

