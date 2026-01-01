import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import { ApiError } from "../../../core/src/utils/errors";

export interface ApplicationData {
  profile_id: string;
  [key: string]: unknown;
}

export interface UserEmailData {
  id: string;
  email: string;
  display_name: string | null;
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
      // Remove profile_id from update data if present
      const updateData = { ...data };
      delete updateData.profile_id;

      // Filter out undefined and null values
      const fieldsToUpdate = Object.entries(updateData).filter(
        ([, value]) => value !== undefined && value !== null,
      );

      if (fieldsToUpdate.length === 0) {
        // Nothing to update, just update the timestamp
        await this.sql`
          UPDATE applications
          SET updated_at = NOW()
          WHERE profile_id = ${profileId}
        `;
        return;
      }

      // Build SET clause using postgres.js template syntax
      // Create an object with only the fields to update
      const updateObject: Record<string, unknown> = {};
      fieldsToUpdate.forEach(([key, value]) => {
        updateObject[key] = value;
      });
      updateObject.updated_at = new Date();

      // Use postgres.js sql template with the update object
      // This safely handles all column names and values
      await this.sql`
        UPDATE applications
        SET ${this.sql(updateObject)}
        WHERE profile_id = ${profileId}
      `;
    } catch (error) {
      throw new ApiError(
        `Failed to update application: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all user emails with display names
   * Display name is constructed from first_name and last_name in raw_user_meta_data
   */
  async getAllUserEmails(): Promise<UserEmailData[]> {
    try {
      const result = await this.sql<UserEmailData[]>`
        SELECT 
          au.id,
          au.email,
          CASE 
            WHEN au.raw_user_meta_data->>'first_name' IS NOT NULL 
              AND au.raw_user_meta_data->>'last_name' IS NOT NULL
            THEN TRIM(
              COALESCE(au.raw_user_meta_data->>'first_name', '') || ' ' || 
              COALESCE(au.raw_user_meta_data->>'last_name', '')
            )
            WHEN au.raw_user_meta_data->>'first_name' IS NOT NULL
            THEN au.raw_user_meta_data->>'first_name'
            WHEN au.raw_user_meta_data->>'last_name' IS NOT NULL
            THEN au.raw_user_meta_data->>'last_name'
            ELSE NULL
          END as display_name
        FROM auth.users au
        WHERE au.email IS NOT NULL
        ORDER BY au.email ASC
      `;

      return result;
    } catch (error) {
      throw new ApiError(
        `Failed to fetch user emails: ${(error as Error).message}`,
        500,
      );
    }
  }
}
