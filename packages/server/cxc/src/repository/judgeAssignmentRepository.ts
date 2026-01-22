import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";

export interface JudgeAssignment {
  id: string;
  project_id: string;
  judge_id: string;
  group_id: string;
  start_time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateJudgeAssignmentData {
  project_id: string;
  judge_id: string;
  group_id: string;
  start_time: Date;
}

export interface JudgeAssignmentWithProject {
  id: string;
  project_id: string;
  project_title: string;
  team_name: string | null;
  judge_id: string;
  group_id: string;
  start_time: Date;
  created_at: Date;
}

export interface JudgeAssignmentWithJudge {
  id: string;
  project_id: string;
  judge_id: string;
  judge_email: string | null;
  group_id: string;
  start_time: Date;
}

export class JudgeAssignmentRepository extends BaseRepository {
  /**
   * Create a judge assignment
   */
  async createAssignment(
    data: CreateJudgeAssignmentData,
  ): Promise<JudgeAssignment> {
    try {
      // First try with ON CONFLICT clause
      try {
        const result = await this.sql<JudgeAssignment[]>`
          INSERT INTO judge_assignments (
            project_id,
            judge_id,
            group_id,
            start_time
          )
          VALUES (
            ${data.project_id},
            ${data.judge_id},
            ${data.group_id},
            ${data.start_time}
          )
          ON CONFLICT ON CONSTRAINT judge_assignments_project_id_judge_id_start_time_key DO UPDATE SET
            group_id = EXCLUDED.group_id,
            updated_at = NOW()
          RETURNING *
        `;

        if (result.length === 0) {
          throw new Error("Failed to create assignment - no rows returned");
        }

        return result[0]!;
      } catch (conflictError: unknown) {
        const errorMsg = conflictError instanceof Error ? conflictError.message : String(conflictError);
        
        // If constraint doesn't exist, try without ON CONFLICT
        if (errorMsg.includes("no unique or exclusion constraint")) {
          console.warn("Constraint not found, inserting without ON CONFLICT clause");
          const result = await this.sql<JudgeAssignment[]>`
            INSERT INTO judge_assignments (
              project_id,
              judge_id,
              group_id,
              start_time
            )
            VALUES (
              ${data.project_id},
              ${data.judge_id},
              ${data.group_id},
              ${data.start_time}
            )
            RETURNING *
          `;

          if (result.length === 0) {
            throw new Error("Failed to create assignment - no rows returned");
          }

          return result[0]!;
        }
        
        // Re-throw other errors
        throw conflictError;
      }
    } catch (error: unknown) {
      console.error("Error creating judge assignment:", error);
      throw error;
    }
  }

  /**
   * Create multiple judge assignments (bulk insert)
   */
  async createAssignments(
    assignments: CreateJudgeAssignmentData[],
  ): Promise<JudgeAssignment[]> {
    try {
      if (assignments.length === 0) {
        return [];
      }

      // Use individual inserts with error handling for constraint issues
      // This is safer than bulk insert when dealing with unique constraints
      const results: JudgeAssignment[] = [];
      for (const assignment of assignments) {
        try {
          const result = await this.createAssignment(assignment);
          results.push(result);
        } catch (err) {
          // If it's a constraint violation, that's okay - assignment already exists
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes("unique constraint") || errorMessage.includes("duplicate key")) {
            console.log(`Assignment already exists for project ${assignment.project_id}, judge ${assignment.judge_id}, time ${assignment.start_time}`);
            // Try to fetch the existing assignment
            try {
              const existing = await this.sql<JudgeAssignment[]>`
                SELECT * FROM judge_assignments
                WHERE project_id = ${assignment.project_id}
                  AND judge_id = ${assignment.judge_id}
                  AND start_time = ${assignment.start_time}
                LIMIT 1
              `;
              if (existing.length > 0) {
                results.push(existing[0]!);
              }
            } catch (fetchErr) {
              console.error("Error fetching existing assignment:", fetchErr);
            }
          } else {
            // Re-throw other errors
            throw err;
          }
        }
      }
      return results;
    } catch (error: unknown) {
      console.error("Error creating judge assignments:", error);
      throw error;
    }
  }

  /**
   * Get assignments for a judge
   */
  async getAssignmentsByJudgeId(
    judgeId: string,
  ): Promise<JudgeAssignmentWithProject[]> {
    try {
      const result = await this.sql<JudgeAssignmentWithProject[]>`
        SELECT 
          ja.id,
          ja.project_id,
          p.title as project_title,
          t.team_name,
          ja.judge_id,
          ja.group_id,
          ja.start_time,
          ja.created_at
        FROM judge_assignments ja
        INNER JOIN projects p ON ja.project_id = p.id
        LEFT JOIN teams t ON p.team_id = t.id
        WHERE ja.judge_id = ${judgeId}
        ORDER BY ja.start_time
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching judge assignments:", error);
      throw error;
    }
  }

  /**
   * Get assignments for a project
   */
  async getAssignmentsByProjectId(
    projectId: string,
  ): Promise<JudgeAssignmentWithJudge[]> {
    try {
      const result = await this.sql<JudgeAssignmentWithJudge[]>`
        SELECT 
          ja.id,
          ja.project_id,
          ja.judge_id,
          u.email as judge_email,
          ja.group_id,
          ja.start_time
        FROM judge_assignments ja
        LEFT JOIN auth.users u ON ja.judge_id = u.id
        WHERE ja.project_id = ${projectId}
        ORDER BY ja.start_time
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching project assignments:", error);
      throw error;
    }
  }

  /**
   * Get all assignments grouped by group_id
   */
  async getAllAssignmentsGrouped(): Promise<
    Record<string, JudgeAssignmentWithProject[]>
  > {
    try {
      const result = await this.sql<JudgeAssignmentWithProject[]>`
        SELECT 
          ja.id,
          ja.project_id,
          p.title as project_title,
          t.team_name,
          ja.judge_id,
          ja.group_id,
          ja.start_time,
          ja.created_at
        FROM judge_assignments ja
        INNER JOIN projects p ON ja.project_id = p.id
        LEFT JOIN teams t ON p.team_id = t.id
        ORDER BY ja.group_id, ja.start_time
      `;

      // Group by group_id
      const grouped: Record<string, JudgeAssignmentWithProject[]> = {};
      for (const assignment of result) {
        if (!grouped[assignment.group_id]) {
          grouped[assignment.group_id] = [];
        }
        grouped[assignment.group_id]!.push(assignment);
      }

      return grouped;
    } catch (error: unknown) {
      console.error("Error fetching grouped assignments:", error);
      throw error;
    }
  }

  /**
   * Delete all assignments for a project
   */
  async deleteAssignmentsByProjectId(projectId: string): Promise<void> {
    try {
      await this.sql`
        DELETE FROM judge_assignments
        WHERE project_id = ${projectId}
      `;
    } catch (error: unknown) {
      console.error("Error deleting assignments:", error);
      throw error;
    }
  }

  /**
   * Delete all assignments
   */
  async deleteAllAssignments(): Promise<void> {
    try {
      await this.sql`
        DELETE FROM judge_assignments
      `;
    } catch (error: unknown) {
      console.error("Error deleting all assignments:", error);
      throw error;
    }
  }
}
