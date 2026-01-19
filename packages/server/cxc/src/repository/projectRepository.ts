import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";

export interface Project {
  id: string;
  team_id: string | null;
  title: string;
  description: string | null;
  devpost_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectData {
  team_id?: string | null;
  title: string;
  description?: string | null;
  devpost_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  video_url?: string | null;
}

export interface UpdateProjectData {
  title?: string;
  description?: string | null;
  devpost_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  video_url?: string | null;
}

export interface ProjectWithTeam {
  id: string;
  team_id: string | null;
  team_name: string | null;
  title: string;
  description: string | null;
  devpost_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export class ProjectRepository extends BaseRepository {
  /**
   * Get all projects
   */
  async getAllProjects(): Promise<Project[]> {
    try {
      const result = await this.sql<Project[]>`
        SELECT 
          id,
          team_id,
          title,
          description,
          devpost_url,
          github_url,
          demo_url,
          video_url,
          created_at,
          updated_at
        FROM projects
        ORDER BY created_at DESC
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  /**
   * Get all projects with team information
   */
  async getAllProjectsWithTeams(): Promise<ProjectWithTeam[]> {
    try {
      const result = await this.sql<ProjectWithTeam[]>`
        SELECT 
          p.id,
          p.team_id,
          t.team_name,
          p.title,
          p.description,
          p.devpost_url,
          p.github_url,
          p.demo_url,
          p.video_url,
          p.created_at,
          p.updated_at
        FROM projects p
        LEFT JOIN teams t ON p.team_id = t.id
        ORDER BY p.created_at DESC
      `;

      return result.map(row => ({
        ...row,
        team_name: row.team_name ?? null,
      }));
    } catch (error: unknown) {
      console.error("Error fetching projects with teams:", error);
      throw error;
    }
  }

  /**
   * Get project by ID
   */
  async getProjectById(projectId: string): Promise<Project | null> {
    try {
      const result = await this.sql<Project[]>`
        SELECT 
          id,
          team_id,
          title,
          description,
          devpost_url,
          github_url,
          demo_url,
          video_url,
          created_at,
          updated_at
        FROM projects
        WHERE id = ${projectId}
      `;

      if (result.length === 0) return null;
      return result[0] ?? null;
    } catch (error: unknown) {
      console.error("Error fetching project:", error);
      throw error;
    }
  }

  /**
   * Get project by team ID
   */
  async getProjectByTeamId(teamId: string): Promise<Project | null> {
    try {
      const result = await this.sql<Project[]>`
        SELECT 
          id,
          team_id,
          title,
          description,
          devpost_url,
          github_url,
          demo_url,
          video_url,
          created_at,
          updated_at
        FROM projects
        WHERE team_id = ${teamId}
      `;

      if (result.length === 0) return null;
      return result[0] ?? null;
    } catch (error: unknown) {
      console.error("Error fetching project by team ID:", error);
      throw error;
    }
  }

  /**
   * Create a new project
   */
  async createProject(data: CreateProjectData): Promise<Project> {
    try {
      const result = await this.sql<Project[]>`
        INSERT INTO projects (
          team_id,
          title,
          description,
          devpost_url,
          github_url,
          demo_url,
          video_url
        )
        VALUES (
          ${data.team_id ?? null},
          ${data.title},
          ${data.description ?? null},
          ${data.devpost_url ?? null},
          ${data.github_url ?? null},
          ${data.demo_url ?? null},
          ${data.video_url ?? null}
        )
        RETURNING *
      `;

      if (result.length === 0) {
        throw new Error("Failed to create project - no rows returned");
      }

      return result[0]!;
    } catch (error: unknown) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  /**
   * Update a project
   */
  async updateProject(
    projectId: string,
    data: UpdateProjectData,
  ): Promise<Project> {
    try {
      const result = await this.sql<Project[]>`
        UPDATE projects
        SET 
          title = COALESCE(${data.title ?? null}, title),
          description = ${data.description ?? null},
          devpost_url = ${data.devpost_url ?? null},
          github_url = ${data.github_url ?? null},
          demo_url = ${data.demo_url ?? null},
          video_url = ${data.video_url ?? null},
          updated_at = NOW()
        WHERE id = ${projectId}
        RETURNING *
      `;

      if (result.length === 0) {
        throw new Error("Failed to update project - no rows returned");
      }

      return result[0]!;
    } catch (error: unknown) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    try {
      await this.sql`
        DELETE FROM projects
        WHERE id = ${projectId}
      `;
    } catch (error: unknown) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }
}
