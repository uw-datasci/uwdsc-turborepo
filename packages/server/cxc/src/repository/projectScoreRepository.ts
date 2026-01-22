import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";

export interface ProjectScore {
  id: string;
  project_id: string;
  judge_id: string;
  criterion_1_score: number;
  criterion_2_score: number;
  criterion_3_score: number;
  criterion_4_score: number;
  comments: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProjectScoreData {
  project_id: string;
  judge_id: string;
  criterion_1_score: number;
  criterion_2_score: number;
  criterion_3_score: number;
  criterion_4_score: number;
  comments?: string | null;
}

export interface UpdateProjectScoreData {
  criterion_1_score?: number;
  criterion_2_score?: number;
  criterion_3_score?: number;
  criterion_4_score?: number;
  comments?: string | null;
}

export interface ProjectScoreWithProject {
  id: string;
  project_id: string;
  project_title: string;
  team_name: string;
  judge_id: string;
  criterion_1_score: number;
  criterion_2_score: number;
  criterion_3_score: number;
  criterion_4_score: number;
  comments: string | null;
  created_at: Date;
  updated_at: Date;
}

export class ProjectScoreRepository extends BaseRepository {
  /**
   * Get score for a project by a judge
   */
  async getScoreByProjectAndJudge(
    projectId: string,
    judgeId: string,
  ): Promise<ProjectScore | null> {
    try {
      const result = await this.sql<ProjectScore[]>`
        SELECT 
          id,
          project_id,
          judge_id,
          criterion_1_score,
          criterion_2_score,
          criterion_3_score,
          criterion_4_score,
          comments,
          created_at,
          updated_at
        FROM project_scores
        WHERE project_id = ${projectId} AND judge_id = ${judgeId}
      `;

      if (result.length === 0) return null;
      return result[0] ?? null;
    } catch (error: unknown) {
      console.error("Error fetching project score:", error);
      throw error;
    }
  }

  /**
   * Get all scores for a judge
   */
  async getScoresByJudgeId(
    judgeId: string,
  ): Promise<ProjectScoreWithProject[]> {
    try {
      const result = await this.sql<ProjectScoreWithProject[]>`
        SELECT 
          ps.id,
          ps.project_id,
          p.title as project_title,
          t.team_name,
          ps.judge_id,
          ps.criterion_1_score,
          ps.criterion_2_score,
          ps.criterion_3_score,
          ps.criterion_4_score,
          ps.comments,
          ps.created_at,
          ps.updated_at
        FROM project_scores ps
        INNER JOIN projects p ON ps.project_id = p.id
        LEFT JOIN teams t ON p.team_id = t.id::text
        WHERE ps.judge_id = ${judgeId}
        ORDER BY ps.created_at DESC
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching judge scores:", error);
      throw error;
    }
  }

  /**
   * Get all scores for a project
   */
  async getScoresByProjectId(projectId: string): Promise<ProjectScore[]> {
    try {
      const result = await this.sql<ProjectScore[]>`
        SELECT 
          id,
          project_id,
          judge_id,
          criterion_1_score,
          criterion_2_score,
          criterion_3_score,
          criterion_4_score,
          comments,
          created_at,
          updated_at
        FROM project_scores
        WHERE project_id = ${projectId}
        ORDER BY created_at DESC
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching project scores:", error);
      throw error;
    }
  }

  /**
   * Create or update a project score
   */
  async upsertScore(
    data: CreateProjectScoreData,
  ): Promise<ProjectScore> {
    try {
      const result = await this.sql<ProjectScore[]>`
        INSERT INTO project_scores (
          project_id,
          judge_id,
          criterion_1_score,
          criterion_2_score,
          criterion_3_score,
          criterion_4_score,
          comments
        )
        VALUES (
          ${data.project_id},
          ${data.judge_id},
          ${data.criterion_1_score},
          ${data.criterion_2_score},
          ${data.criterion_3_score},
          ${data.criterion_4_score},
          ${data.comments ?? null}
        )
        ON CONFLICT (project_id, judge_id) DO UPDATE SET
          criterion_1_score = EXCLUDED.criterion_1_score,
          criterion_2_score = EXCLUDED.criterion_2_score,
          criterion_3_score = EXCLUDED.criterion_3_score,
          criterion_4_score = EXCLUDED.criterion_4_score,
          comments = EXCLUDED.comments,
          updated_at = NOW()
        RETURNING *
      `;

      if (result.length === 0) {
        throw new Error("Failed to upsert score - no rows returned");
      }

      return result[0]!;
    } catch (error: unknown) {
      console.error("Error upserting project score:", error);
      throw error;
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
      const result = await this.sql<ProjectScore[]>`
        UPDATE project_scores
        SET 
          criterion_1_score = COALESCE(${data.criterion_1_score}, criterion_1_score),
          criterion_2_score = COALESCE(${data.criterion_2_score}, criterion_2_score),
          criterion_3_score = COALESCE(${data.criterion_3_score}, criterion_3_score),
          criterion_4_score = COALESCE(${data.criterion_4_score}, criterion_4_score),
          comments = ${data.comments},
          updated_at = NOW()
        WHERE project_id = ${projectId} AND judge_id = ${judgeId}
        RETURNING *
      `;

      if (result.length === 0) {
        throw new Error("Failed to update score - no rows returned");
      }

      return result[0]!;
    } catch (error: unknown) {
      console.error("Error updating project score:", error);
      throw error;
    }
  }
}
