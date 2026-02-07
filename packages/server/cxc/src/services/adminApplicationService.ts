import {
  AdminApplicationRepository,
  ApplicationSummary,
  FullApplicationDetails,
} from "../repository/adminApplicationRepository";

export class AdminApplicationService {
  private readonly repository: AdminApplicationRepository;

  constructor() {
    this.repository = new AdminApplicationRepository();
  }

  /**
   * Get all application summaries for admin table
   */
  async getAllApplicationSummaries(): Promise<ApplicationSummary[]> {
    return this.repository.getAllApplicationSummaries();
  }

  /**
   * Get full application details by ID
   */
  async getApplicationById(
    applicationId: string,
  ): Promise<FullApplicationDetails | null> {
    return this.repository.getApplicationById(applicationId);
  }

  /**
   * Get application dietary restrictions by profile ID
   */
  async getApplicationByProfileId(
    profileId: string,
  ): Promise<{ dietary_restrictions: string | null } | null> {
    return this.repository.getApplicationByProfileId(profileId);
  }
}
