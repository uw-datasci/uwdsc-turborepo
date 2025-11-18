import { ApiError } from "@uwdsc/server/core/utils/errors";
import { ProfileRepository, ProfileUpdateData } from "../repository/profileRepository";

export class ProfileService {
  private readonly repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  /**
   * Get profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<any> {
    try {
      return await this.repository.getProfileByUserId(userId);
    } catch (error) {
      throw new ApiError(
        `Failed to get profile: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    data: ProfileUpdateData,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      return await this.repository.updateProfile(userId, data);
    } catch (error) {
      throw new ApiError(
        `Failed to update profile: ${(error as Error).message}`,
        500,
      );
    }
  }

}
