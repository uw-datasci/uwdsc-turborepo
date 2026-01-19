import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import type { Profile } from "../types/profile";

export interface Judge {
  id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export class JudgeRepository extends BaseRepository {
  /**
   * Get all judges (profiles with judge role)
   */
  async getAllJudges(): Promise<Judge[]> {
    try {
      const result = await this.sql<Judge[]>`
        SELECT 
          id,
          role,
          created_at,
          updated_at
        FROM profiles
        WHERE role = 'judge'
        ORDER BY created_at DESC
      `;

      return result;
    } catch (error: unknown) {
      console.error("Error fetching judges:", error);
      throw error;
    }
  }

  /**
   * Get judge by ID
   */
  async getJudgeById(judgeId: string): Promise<Judge | null> {
    try {
      const result = await this.sql<Judge[]>`
        SELECT 
          id,
          role,
          created_at,
          updated_at
        FROM profiles
        WHERE id = ${judgeId} AND role = 'judge'
      `;

      if (result.length === 0) return null;
      return result[0] ?? null;
    } catch (error: unknown) {
      console.error("Error fetching judge:", error);
      throw error;
    }
  }

  /**
   * Get judges with their email addresses
   */
  async getAllJudgesWithEmails(): Promise<(Judge & { email: string | null })[]> {
    try {
      console.log("[JudgeRepository] Fetching judges with emails...");
      const result = await this.sql<(Judge & { email: string | null })[]>`
        SELECT 
          p.id,
          p.role,
          p.created_at,
          p.updated_at,
          u.email
        FROM profiles p
        LEFT JOIN auth.users u ON p.id = u.id
        WHERE p.role = 'judge'
        ORDER BY p.created_at DESC
      `;
      console.log("[JudgeRepository] Found judges:", result.length);
      return result;
    } catch (error: unknown) {
      console.error("Error fetching judges with emails:", error);
      throw error;
    }
  }
}
