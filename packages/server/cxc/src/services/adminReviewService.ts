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
  resume_score: number;
  links_score: number;
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
    this.validateScore(reviewScores.resume_score, "resume_score", 0, 3);
    this.validateScore(reviewScores.links_score, "links_score", 0, 2);
    this.validateScore(reviewScores.q1_score, "q1_score", 0, 7);
    this.validateScore(reviewScores.q2_score, "q2_score", 0, 3);

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
      resume_score: reviewScores.resume_score,
      links_score: reviewScores.links_score,
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
   * Validate that a score is within the specified range
   */
  private validateScore(
    score: number,
    fieldName: string,
    min: number = 0,
    max: number = 10,
  ): void {
    if (typeof score !== "number" || score < min || score > max) {
      throw new Error(`${fieldName} must be between ${min} and ${max}`);
    }
  }

  /**
   * Get leaderboard data - all reviewers with their review counts
   */
  async getLeaderboard(): Promise<Array<{
    reviewer_id: string;
    review_count: number;
    name: string | null;
    email: string;
  }>> {
    return await this.repository.getLeaderboard();
  }

  /**
   * Get overall statistics for the dashboard
   */
  async getStatistics(): Promise<{
    total_applications: number;
    total_reviews: number;
    total_reviewers: number;
    avg_reviews_per_application: number;
    avg_resume_score: number;
    avg_links_score: number;
    avg_q1_score: number;
    avg_q2_score: number;
  }> {
    return await this.repository.getStatistics();
  }

  /**
   * Get average scores per question for a specific reviewer
   */
  async getReviewerAverageScores(reviewerId: string): Promise<{
    avg_resume_score: number;
    avg_links_score: number;
    avg_q1_score: number;
    avg_q2_score: number;
    total_reviews: number;
  }> {
    return await this.repository.getReviewerAverageScores(reviewerId);
  }
}
