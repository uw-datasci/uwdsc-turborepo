import { ApiError } from "@uwdsc/server/core/utils/errors";
import { ProfileRepository } from "../repository/profileRepository";
import type { Profile } from "../types/profile";

export class ProfileService {
  private readonly repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  /**
   * Get profile by user ID
   */
  async getProfileByUserId(userId: string): Promise<Profile | null> {
    try {
      return await this.repository.getProfileByUserId(userId);
    } catch (error) {
      throw new ApiError(
        `Failed to get profile: ${(error as Error).message}`,
        500
      );
    }
  }
}
