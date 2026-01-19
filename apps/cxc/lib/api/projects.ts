/**
 * Projects API Functions
 *
 * This file contains all project-related API calls.
 */

import { createApiError } from "./errors";

// ============================================================================
// Types
// ============================================================================

export interface Project {
  id: string;
  team_id: string | null;
  title: string;
  description: string | null;
  devpost_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectWithTeam extends Project {
  team_name: string | null;
}

export interface ProjectWithAssignments extends ProjectWithTeam {
  assignments: Array<{
    id: string;
    project_id: string;
    judge_id: string;
    judge_email: string | null;
    group_id: string;
    start_time: string;
  }>;
}

export interface CreateProjectRequest {
  team_id?: string | null;
  title: string;
  description?: string | null;
  devpost_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  video_url?: string | null;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string | null;
  devpost_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  video_url?: string | null;
}

// ============================================================================
// Admin API Functions (Superadmin only)
// ============================================================================

/**
 * Get all projects with team information (superadmin only)
 */
export async function getAllProjects(): Promise<{
  projects: ProjectWithAssignments[];
}> {
  const response = await fetch("/api/admin/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to fetch projects", response.status);
  }

  return response.json();
}

/**
 * Get a project by ID (superadmin only)
 */
export async function getProjectById(projectId: string): Promise<{
  project: Project;
}> {
  const response = await fetch(`/api/admin/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to fetch project", response.status);
  }

  return response.json();
}

/**
 * Create a new project (superadmin only)
 */
export async function createProject(
  data: CreateProjectRequest,
): Promise<{ project: Project }> {
  const response = await fetch("/api/admin/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to create project", response.status);
  }

  return response.json();
}

/**
 * Update a project (superadmin only)
 */
export async function updateProject(
  projectId: string,
  data: UpdateProjectRequest,
): Promise<{ project: Project }> {
  const response = await fetch(`/api/admin/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to update project", response.status);
  }

  return response.json();
}

/**
 * Delete a project (superadmin only)
 */
export async function deleteProject(projectId: string): Promise<void> {
  const response = await fetch(`/api/admin/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to delete project", response.status);
  }
}

// ============================================================================
// User API Functions
// ============================================================================

/**
 * Get project for the current user's team
 */
export async function getMyProject(): Promise<{ project: Project | null }> {
  const response = await fetch("/api/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw createApiError(error.message || "Failed to fetch project", response.status);
  }

  return response.json();
}

/**
 * Create or update project for the current user's team
 */
export async function submitProject(
  data: Omit<CreateProjectRequest, "team_id">,
): Promise<{ project: Project }> {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      error: "Failed to submit project",
      message: "Failed to submit project" 
    }));
    console.error("Project submission error:", { status: response.status, error });
    throw createApiError(error, response.status);
  }

  return response.json();
}
