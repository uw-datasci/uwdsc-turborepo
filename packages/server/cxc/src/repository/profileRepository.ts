import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import type { Profile } from "../types/profile";

export class ProfileRepository extends BaseRepository {
  /**
   * Get user profile by user ID
   * @param userId - The auth.users.id (UUID)
   */
  async getProfileByUserId(userId: string): Promise<Profile | null> {
    try {
      const result = await this.sql<Profile[]>`
        SELECT *
        FROM profiles
        WHERE id = ${userId}
      `;

      if (result.length === 0) return null;

      return result[0] ?? null;
    } catch (error: unknown) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }
}
