import {
  AdminReviewRepository,
  TeamMemberWithName,
  ReviewData,
} from "../repository/adminReviewRepository";

export interface ApplicationForReview {
  id: string;
  profile_id: string;
  status: string;
  email: string | null;
  resume_url: string | null;
  team_name: string | null;
  team_members_with_names: TeamMemberWithName[];
  [key: string]: unknown;
}

export interface ReviewScores {
  application_id: string;
  basic_info_score: number;
  q1_score: number;
  q2_score: number;
}

export interface SubmitReviewResult {
  review: ReviewData;
  total_reviews: number;
}

export class AdminReviewService {
  private readonly repository: AdminReviewRepository;

  constructor() {
    this.repository = new AdminReviewRepository();
  }

  /**
   * Get the next application for review (least reviewed)
   * Excludes applications already reviewed by the specified reviewer
   * Includes applicant email, resume URL, and team member details
   */
  async getNextApplicationForReview(
    reviewerId: string,
    getResumeUrl: (profileId: string) => Promise<string | null>,
  ): Promise<ApplicationForReview | null> {
    // Get the application with least reviews (excluding those already reviewed by this reviewer)
    const application =
      await this.repository.getApplicationWithLeastReviews(reviewerId);

    if (!application) {
      return null;
    }

    // Remove review_count from the data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { review_count, ...applicationData } = application;

    // Get user email
    let email: string | null = null;
    try {
      email = await this.repository.getUserEmail(application.profile_id);
    } catch (error) {
      console.error("Error fetching user email:", error);
    }

    // Get resume URL using the provided function
    let resumeUrl: string | null = null;
    try {
      resumeUrl = await getResumeUrl(application.profile_id);
    } catch (error) {
      console.error("Error fetching resume URL:", error);
    }

    // Get team member details and team name
    let teamMembersWithNames: TeamMemberWithName[] = [];
    let teamName: string | null = null;
    try {
      const teamMembersStr = application.team_members;
      if (teamMembersStr) {
        const teamMemberEmails = teamMembersStr
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);

        if (teamMemberEmails.length > 0) {
          teamMembersWithNames =
            await this.repository.getTeamMembersByEmails(teamMemberEmails);

          // Get team name from teams table
          teamName =
            await this.repository.getTeamNameByMemberEmails(teamMemberEmails);
        }
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }

    return {
      ...applicationData,
      email,
      resume_url: resumeUrl,
      team_members_with_names: teamMembersWithNames,
      team_name: teamName,
    };
  }

  /**
   * Submit a review for an application
   * Checks if reviewer has already reviewed this application
   * Returns the created review and total review count for the reviewer
   */
  async submitReview(
    reviewScores: ReviewScores,
    reviewerId: string,
  ): Promise<SubmitReviewResult> {
    // Validate scores
    this.validateScore(reviewScores.basic_info_score, "basic_info_score");
    this.validateScore(reviewScores.q1_score, "q1_score");
    this.validateScore(reviewScores.q2_score, "q2_score");

    if (!reviewScores.application_id) {
      throw new Error("application_id is required");
    }

    // Check if reviewer has already reviewed this application
    const hasReviewed = await this.repository.hasReviewerReviewedApplication(
      reviewScores.application_id,
      reviewerId,
    );

    if (hasReviewed) {
      throw new Error("You have already reviewed this application");
    }

    // Create the review
    const review = await this.repository.createReview({
      application_id: reviewScores.application_id,
      reviewer_id: reviewerId,
      basic_info_score: reviewScores.basic_info_score,
      q1_score: reviewScores.q1_score,
      q2_score: reviewScores.q2_score,
    });

    // Get total review count
    const totalReviews =
      await this.repository.getReviewCountByReviewer(reviewerId);

    return {
      review,
      total_reviews: totalReviews,
    };
  }

  /**
   * Validate that a score is between 1 and 10
   */
  private validateScore(score: number, fieldName: string): void {
    if (typeof score !== "number" || score < 1 || score > 10) {
      throw new Error(`${fieldName} must be between 1 and 10`);
    }
  }
}
