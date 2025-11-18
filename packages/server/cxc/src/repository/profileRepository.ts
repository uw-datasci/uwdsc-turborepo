import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";

export class ProfileRepository extends BaseRepository {
  /**
   * Get user profile by user ID
   * @param userId - The auth.users.id (UUID)
   */
  async getProfileByUserId(userId: string): Promise<any> {
    try {
      const query = `
        SELECT *
        FROM profiles
        WHERE id = $1
      `;

      const result = await this.db.query(query, [userId]);

      if (result.rowCount === 0) return null;

      return result.rows[0];
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }
}
