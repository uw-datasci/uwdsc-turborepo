/**
 * Teams API Functions
 *
 * This file contains all team-related API calls.
 */

import { createApiError } from "./errors";

// ============================================================================
// Types
// ============================================================================

export interface Team {
  team_name: string;
  team_member_1: string | null;
  team_member_2: string | null;
  team_member_3: string | null;
  team_member_4: string | null;
  created_at: string;
}

export interface CreateTeamRequest {
  team_name: string;
  password: string;
}

export interface CreateTeamResponse {
  success: boolean;
  team: Team;
}

export interface JoinTeamRequest {
  team_name: string;
  password: string;
}

export interface JoinTeamResponse {
  success: boolean;
  team: Team;
}

export interface GetMyTeamResponse {
  success: boolean;
  team: Team | null;
}

export interface LeaveTeamResponse {
  success: boolean;
  message: string;
}

export interface CheckTeamNameResponse {
  exists: boolean;
}

// ============================================================================
// Teams API Functions
// ============================================================================

/**
 * Check if a team name already exists
 */
export async function checkTeamName(
  teamName: string,
): Promise<CheckTeamNameResponse> {
  const response = await fetch(
    `/api/teams/check?team_name=${encodeURIComponent(teamName)}`,
    {
      method: "GET",
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw createApiError(result, response.status);
  }

  return result;
}

/**
 * Create a new team
 */
export async function createTeam(
  data: CreateTeamRequest,
): Promise<CreateTeamResponse> {
  const response = await fetch("/api/teams/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw createApiError(result, response.status);
  }

  return result;
}

/**
 * Join an existing team
 */
export async function joinTeam(
  data: JoinTeamRequest,
): Promise<JoinTeamResponse> {
  const response = await fetch("/api/teams/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw createApiError(result, response.status);
  }

  return result;
}

/**
 * Get the current user's team
 */
export async function getMyTeam(): Promise<GetMyTeamResponse> {
  const response = await fetch("/api/teams/my-team", {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok) {
    throw createApiError(result, response.status);
  }

  return result;
}

/**
 * Leave the current user's team
 */
export async function leaveTeam(): Promise<LeaveTeamResponse> {
  const response = await fetch("/api/teams/leave", {
    method: "POST",
  });

  const result = await response.json();

  if (!response.ok) {
    throw createApiError(result, response.status);
  }

  return result;
}
