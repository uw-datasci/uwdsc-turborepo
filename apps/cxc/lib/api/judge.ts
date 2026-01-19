/**
 * Judge Dashboard API Functions
 *
 * This file contains all judge dashboard-related API calls.
 */

import { createApiError } from "./errors";

// ============================================================================
// Types
// ============================================================================

export interface JudgeAssignment {
  id: string;
  project_id: string;
  project_title: string;
  team_name: string | null;
  judge_id: string;
  group_id: string;
  start_time: string;
  created_at: string;
}

export interface ProjectScore {
  id: string;
  project_id: string;
  judge_id: string;
  criterion_1_score: number;
  criterion_2_score: number;
  criterion_3_score: number;
  criterion_4_score: number;
  comments: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubmitScoreRequest {
  project_id: string;
  criterion_1_score: number;
  criterion_2_score: number;
  criterion_3_score: number;
  criterion_4_score: number;
  comments?: string | null;
}

// ============================================================================
// Judge API Functions
// ============================================================================

/**
 * Get all projects assigned to the current judge
 */
export async function getJudgeAssignments(): Promise<{
  assignments: JudgeAssignment[];
}> {
  const response = await fetch("/api/judge/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(
      error.message || "Failed to fetch judge assignments",
      response.status,
    );
  }

  return response.json();
}

/**
 * Get score for a specific project by the current judge
 */
export async function getScoreByProject(
  projectId: string,
): Promise<{ score: ProjectScore | null }> {
  const response = await fetch(`/api/judge/scores/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to fetch score", response.status);
  }

  return response.json();
}

/**
 * Create or update a project score
 */
export async function submitScore(
  data: SubmitScoreRequest,
): Promise<{ score: ProjectScore }> {
  const response = await fetch("/api/judge/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to submit score", response.status);
  }

  return response.json();
}
