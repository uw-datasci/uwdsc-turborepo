import { ApiError } from "@uwdsc/server/core/utils/errors";
import {
  ProjectRepository,
  Project,
  CreateProjectData,
  UpdateProjectData,
  ProjectWithTeam,
} from "../repository/projectRepository";

export class ProjectService {
  private readonly repository: ProjectRepository;

  constructor() {
    this.repository = new ProjectRepository();
  }

  /**
   * Get all projects
   */
  async getAllProjects(): Promise<Project[]> {
    try {
      return await this.repository.getAllProjects();
    } catch (error) {
      throw new ApiError(
        `Failed to get projects: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all projects with team information
   */
  async getAllProjectsWithTeams(): Promise<ProjectWithTeam[]> {
    try {
      return await this.repository.getAllProjectsWithTeams();
    } catch (error) {
      throw new ApiError(
        `Failed to get projects with teams: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get project by ID
   */
  async getProjectById(projectId: string): Promise<Project | null> {
    try {
      return await this.repository.getProjectById(projectId);
    } catch (error) {
      throw new ApiError(
        `Failed to get project: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get project by team ID
   */
  async getProjectByTeamId(teamId: string): Promise<Project | null> {
    try {
      return await this.repository.getProjectByTeamId(teamId);
    } catch (error) {
      throw new ApiError(
        `Failed to get project by team ID: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Create a new project
   */
  async createProject(data: CreateProjectData): Promise<Project> {
    try {
      // Validate required fields
      if (!data.title) {
        throw new ApiError("Title is required", 400);
      }

      // Check if team already has a project (only if team_id is provided)
      if (data.team_id) {
        const existingProject = await this.repository.getProjectByTeamId(
          data.team_id,
        );
        if (existingProject) {
          throw new ApiError("Team already has a project", 400);
        }
      }

      return await this.repository.createProject(data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Failed to create project: ${(error as Error).message}`,
        500,
      );
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
      const project = await this.repository.getProjectById(projectId);
      if (!project) {
        throw new ApiError("Project not found", 404);
      }

      return await this.repository.updateProject(projectId, data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Failed to update project: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    try {
      const project = await this.repository.getProjectById(projectId);
      if (!project) {
        throw new ApiError("Project not found", 404);
      }

      await this.repository.deleteProject(projectId);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Failed to delete project: ${(error as Error).message}`,
        500,
      );
    }
  }
}
