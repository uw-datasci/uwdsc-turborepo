import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import { ApiError } from "../../../core/src/utils/errors";

export interface ApplicationData {
  profile_id: string;
  [key: string]: unknown;
}

export class ApplicationRepository extends BaseRepository {
  /**
   * Fetch an application by profile ID
   */
  async getApplication(profileId: string): Promise<ApplicationData | null> {
    try {
      const result = await this.sql<ApplicationData[]>`
        SELECT *
        FROM applications
        WHERE profile_id = ${profileId}
      `;

      if (result.length === 0) return null;

      return result[0] ?? null;
    } catch (error) {
      throw new ApiError(
        `Failed to fetch application: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Create a new application
   */
  async createApplication(data: ApplicationData): Promise<void> {
    try {
      await this.sql`
        INSERT INTO applications ${this.sql(data)}
      `;
    } catch (error) {
      throw new ApiError(
        `Failed to create application: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Update an existing application
   */
  async updateApplication(
    profileId: string,
    data: Partial<ApplicationData>,
  ): Promise<void> {
    try {
      // Automatically add updated_at timestamp
      await this.sql`
        UPDATE applications
        SET ${this.sql(data)}, updated_at = NOW()
        WHERE profile_id = ${profileId}
      `;
    } catch (error) {
      throw new ApiError(
        `Failed to update application: ${(error as Error).message}`,
        500,
      );
    }
  }
}
