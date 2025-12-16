import { SupabaseClient } from "@supabase/supabase-js";
import { ApiError } from "../../../core/src/utils/errors";

export interface ApplicationData {
  profile_id: string;
  [key: string]: unknown;
}

export class ApplicationRepository {
  private readonly supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  /**
   * Fetch an application by profile ID
   */
  async getApplication(profileId: string): Promise<ApplicationData | null> {
    try {
      const { data, error } = await this.supabase
        .from("applications")
        .select("*")
        .eq("profile_id", profileId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows found
          return null;
        }
        throw error;
      }

      return data;
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
      const { error } = await this.supabase.from("applications").insert(data);

      if (error) {
        throw error;
      }
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
      const { error } = await this.supabase
        .from("applications")
        .update(data)
        .eq("profile_id", profileId);

      if (error) {
        throw error;
      }
    } catch (error) {
      throw new ApiError(
        `Failed to update application: ${(error as Error).message}`,
        500,
      );
    }
  }
}
