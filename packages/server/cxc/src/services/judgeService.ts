import { ApiError } from "@uwdsc/server/core/utils/errors";
import {
  JudgeRepository,
  Judge,
} from "../repository/judgeRepository";

export class JudgeService {
  private readonly repository: JudgeRepository;

  constructor() {
    this.repository = new JudgeRepository();
  }

  /**
   * Get all judges
   */
  async getAllJudges(): Promise<Judge[]> {
    try {
      return await this.repository.getAllJudges();
    } catch (error) {
      throw new ApiError(
        `Failed to get judges: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get all judges with email addresses
   */
  async getAllJudgesWithEmails(): Promise<(Judge & { email: string | null })[]> {
    try {
      return await this.repository.getAllJudgesWithEmails();
    } catch (error) {
      throw new ApiError(
        `Failed to get judges with emails: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get judge by ID
   */
  async getJudgeById(judgeId: string): Promise<Judge | null> {
    try {
      return await this.repository.getJudgeById(judgeId);
    } catch (error) {
      throw new ApiError(
        `Failed to get judge: ${(error as Error).message}`,
        500,
      );
    }
  }
}
