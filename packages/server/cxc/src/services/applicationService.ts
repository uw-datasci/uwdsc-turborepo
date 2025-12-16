import { SupabaseClient } from "@supabase/supabase-js";
import { ApplicationRepository } from "../repository/applicationRepository";

export interface ApplicationData {
  profile_id: string;
  [key: string]: unknown;
}

export class ApplicationService {
  private readonly repository: ApplicationRepository;

  constructor(supabaseClient: SupabaseClient) {
    this.repository = new ApplicationRepository(supabaseClient);
  }

  /**
   * Fetch an application by profile ID
   */
  async getApplication(profileId: string): Promise<ApplicationData | null> {
    return this.repository.getApplication(profileId);
  }

  /**
   * Create a new application
   */
  async createApplication(data: ApplicationData): Promise<void> {
    return this.repository.createApplication(data);
  }

  /**
   * Update an existing application
   */
  async updateApplication(
    profileId: string,
    data: Partial<ApplicationData>,
  ): Promise<void> {
    return this.repository.updateApplication(profileId, data);
  }
}
