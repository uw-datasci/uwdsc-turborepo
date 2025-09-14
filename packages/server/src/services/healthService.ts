import { HealthRepository } from "../repository/healthRepository";
import { ApiError } from "../types/common";
import { HealthCheck } from "../types/health";

export class HealthService {
  private repository: HealthRepository;

  constructor() {
    this.repository = new HealthRepository();
  }

  /**
   * Get comprehensive system health information
   */
  async getSystemHealth(): Promise<HealthCheck> {
    try {
      return await this.repository.getSystemHealth();
    } catch (error) {
      throw new ApiError(
        `Failed to get system health: ${(error as Error).message}`,
        500
      );
    }
  }
}
