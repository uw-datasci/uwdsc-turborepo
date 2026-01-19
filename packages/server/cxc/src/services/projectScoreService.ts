import { ApiError } from "@uwdsc/server/core/utils/errors";
import {
  ProjectScoreRepository,
  ProjectScore,
  CreateProjectScoreData,
  UpdateProjectScoreData,
  ProjectScoreWithProject,
} from "../repository/projectScoreRepository";

export class ProjectScoreService {
  private readonly repository: ProjectScoreRepository;

  constructor() {
    this.repository = new ProjectScoreRepository();
  }

  /**
   * Get score for a project by a judge
   */
  async getScoreByProjectAndJudge(
    projectId: string,
    judgeId: string,
  ): Promise<ProjectScore | null> {
    try {
      return await this.repository.getScoreByProjectAndJudge(
        projectId,
        judgeId,
      );
    } catch (error) {
      throw new ApiError(
        `Failed to get score: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all scores for a judge
   */
  async getScoresByJudgeId(
    judgeId: string,
  ): Promise<ProjectScoreWithProject[]> {
    try {
      return await this.repository.getScoresByJudgeId(judgeId);
    } catch (error) {
      throw new ApiError(
        `Failed to get judge scores: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all scores for a project
   */
  async getScoresByProjectId(projectId: string): Promise<ProjectScore[]> {
    try {
      return await this.repository.getScoresByProjectId(projectId);
    } catch (error) {
      throw new ApiError(
        `Failed to get project scores: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Create or update a project score
   */
  async upsertScore(data: CreateProjectScoreData): Promise<ProjectScore> {
    try {
      // Validate scores (assuming 0-10 scale, adjust as needed)
      const scores = [
        data.criterion_1_score,
        data.criterion_2_score,
        data.criterion_3_score,
        data.criterion_4_score,
      ];

      for (const score of scores) {
        if (score < 0 || score > 10) {
          throw new ApiError(
            "Scores must be between 0 and 10",
            400,
          );
        }
      }

      return await this.repository.upsertScore(data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Failed to upsert score: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Update a project score
   */
  async updateScore(
    projectId: string,
    judgeId: string,
    data: UpdateProjectScoreData,
  ): Promise<ProjectScore> {
    try {
      // Validate scores if provided
      const scores = [
        data.criterion_1_score,
        data.criterion_2_score,
        data.criterion_3_score,
        data.criterion_4_score,
      ].filter((s) => s !== undefined);

      for (const score of scores) {
        if (score !== undefined && (score < 0 || score > 10)) {
          throw new ApiError(
            "Scores must be between 0 and 10",
            400,
          );
        }
      }

      return await this.repository.updateScore(projectId, judgeId, data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        `Failed to update score: ${(error as Error).message}`,
        500,
      );
    }
  }
}
