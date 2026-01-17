import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import { ApiError } from "../../../core/src/utils/errors";

export interface ApplicationWithReviewCount {
  id: string;
  profile_id: string;
  status: string;
  team_members?: string | null;
  review_count: number;
  [key: string]: unknown;
}

export interface TeamMemberWithName {
  email: string;
  display_name: string | null;
}

export interface ReviewData {
  id: string;
  application_id: string;
  reviewer_id: string;
  resume_score: number;
  links_score: number;
  q1_score: number;
  q2_score: number;
  reviewed_at: string;
  [key: string]: unknown;
}

export class AdminReviewRepository extends BaseRepository {
  /**
   * Get a random application with the least number of reviews
   * Excludes applications already reviewed by the specified reviewer
   * Randomly selects from all applications with the minimum review count
   * Uses efficient random offset instead of ORDER BY RANDOM() for better performance
   */
  async getApplicationWithLeastReviews(
    reviewerId: string,
  ): Promise<ApplicationWithReviewCount | null> {
    try {
      // First, get the count of applications with minimum review count
      const countResult = await this.sql<Array<{ total: number }>>`
        WITH review_counts AS (
          SELECT 
            application_id,
            COUNT(*)::int as review_count
          FROM reviews
          GROUP BY application_id
        ),
        applications_with_counts AS (
          SELECT 
            a.*,
            COALESCE(rc.review_count, 0)::int as review_count
          FROM applications a
          LEFT JOIN review_counts rc ON a.id = rc.application_id
          WHERE a.status = 'submitted'
            AND NOT EXISTS (
              SELECT 1
              FROM reviews r
              WHERE r.application_id = a.id AND r.reviewer_id = ${reviewerId}
            )
        ),
        min_review_count AS (
          SELECT MIN(review_count) as min_count
          FROM applications_with_counts
        )
        SELECT COUNT(*)::int as total
        FROM applications_with_counts
        WHERE review_count = (SELECT min_count FROM min_review_count)
      `;

      const total = countResult[0]?.total ?? 0;
      if (total === 0) return null;

      // Generate a random offset for maximum randomness
      // Using Math.random() which provides cryptographically strong randomness
      const randomOffset = Math.floor(Math.random() * total);

      // Select one application at the random offset position
      // Using ORDER BY id for stable ordering (required for OFFSET to work correctly)
      const applications = await this.sql<ApplicationWithReviewCount[]>`
        WITH review_counts AS (
          SELECT 
            application_id,
            COUNT(*)::int as review_count
          FROM reviews
          GROUP BY application_id
        ),
        applications_with_counts AS (
          SELECT 
            a.*,
            COALESCE(rc.review_count, 0)::int as review_count
          FROM applications a
          LEFT JOIN review_counts rc ON a.id = rc.application_id
          WHERE a.status = 'submitted'
            AND NOT EXISTS (
              SELECT 1
              FROM reviews r
              WHERE r.application_id = a.id AND r.reviewer_id = ${reviewerId}
            )
        ),
        min_review_count AS (
          SELECT MIN(review_count) as min_count
          FROM applications_with_counts
        )
        SELECT *
        FROM applications_with_counts
        WHERE review_count = (SELECT min_count FROM min_review_count)
        ORDER BY id
        LIMIT 1
        OFFSET ${randomOffset}
      `;

      if (applications.length === 0) return null;

      return applications[0] ?? null;
    } catch (error) {
      throw new ApiError(
        `Failed to fetch application with least reviews: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get user email by profile ID (user ID)
   */
  async getUserEmail(profileId: string): Promise<string | null> {
    try {
      const emailResults = await this.sql<Array<{ email: string }>>`
        SELECT email 
        FROM auth.users 
        WHERE id = ${profileId} 
        LIMIT 1
      `;

      if (emailResults.length === 0 || !emailResults[0]) return null;

      return emailResults[0].email;
    } catch (error) {
      throw new ApiError(
        `Failed to fetch user email: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get team member names by email addresses
   */
  async getTeamMembersByEmails(
    emails: string[],
  ): Promise<TeamMemberWithName[]> {
    try {
      if (emails.length === 0) return [];

      const teamMemberResults = await this.sql<TeamMemberWithName[]>`
        SELECT 
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
        WHERE au.email = ANY(${emails})
      `;

      return teamMemberResults;
    } catch (error) {
      throw new ApiError(
        `Failed to fetch team members: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get team name by member email addresses
   * Returns the team name if any of the emails belong to a team
   * (Since team members in an application should all be in the same team)
   */
  async getTeamNameByMemberEmails(emails: string[]): Promise<string | null> {
    try {
      if (emails.length === 0) return null;

      // Find team where any of these emails are members
      // Use the first email to find the team (all team members should be in the same team)
      const firstEmail = emails[0];
      if (!firstEmail) return null;

      const teamResult = await this.sql<Array<{ team_name: string }>>`
        SELECT t.team_name
        FROM teams t
        WHERE (
          t.team_member_1 = ${firstEmail}
          OR t.team_member_2 = ${firstEmail}
          OR t.team_member_3 = ${firstEmail}
          OR t.team_member_4 = ${firstEmail}
        )
        LIMIT 1
      `;

      return teamResult.length > 0 && teamResult[0]
        ? teamResult[0].team_name
        : null;
    } catch (error) {
      console.error("Error fetching team name:", error);
      return null;
    }
  }

  /**
   * Check if a reviewer has already reviewed an application
   */
  async hasReviewerReviewedApplication(
    applicationId: string,
    reviewerId: string,
  ): Promise<boolean> {
    try {
      const result = await this.sql<Array<{ id: string }>>`
        SELECT id
        FROM reviews
        WHERE application_id = ${applicationId}
          AND reviewer_id = ${reviewerId}
        LIMIT 1
      `;

      return result.length > 0;
    } catch (error) {
      throw new ApiError(
        `Failed to check existing review: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Insert a new review
   */
  async createReview(reviewData: {
    application_id: string;
    reviewer_id: string;
    resume_score: number;
    links_score: number;
    q1_score: number;
    q2_score: number;
  }): Promise<ReviewData> {
    try {
      const result = await this.sql<ReviewData[]>`
        INSERT INTO reviews (
          application_id,
          reviewer_id,
          resume_score,
          links_score,
          q1_score,
          q2_score,
          reviewed_at
        )
        VALUES (
          ${reviewData.application_id},
          ${reviewData.reviewer_id},
          ${reviewData.resume_score},
          ${reviewData.links_score},
          ${reviewData.q1_score},
          ${reviewData.q2_score},
          NOW()
        )
        RETURNING *
      `;

      if (result.length === 0 || !result[0]) {
        throw new Error("Failed to create review");
      }

      return result[0];
    } catch (error) {
      throw new ApiError(
        `Failed to save review: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get total review count for a reviewer
   */
  async getReviewCountByReviewer(reviewerId: string): Promise<number> {
    try {
      const result = await this.sql<Array<{ count: number }>>`
        SELECT COUNT(*)::int as count
        FROM reviews
        WHERE reviewer_id = ${reviewerId}
      `;

      return result[0]?.count ?? 0;
    } catch (error) {
      throw new ApiError(
        `Failed to get review count: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get leaderboard data - all reviewers with their review counts and names
   */
  async getLeaderboard(): Promise<
    Array<{
      reviewer_id: string;
      review_count: number;
      name: string | null;
      email: string;
    }>
  > {
    try {
      // Get review counts first, then join with user data
      // This avoids grouping by JSONB which can cause issues
      const result = await this.sql<
        Array<{
          reviewer_id: string;
          review_count: number;
          name: string | null;
          email: string;
        }>
      >`
        WITH review_counts AS (
          SELECT 
            reviewer_id,
            COUNT(*)::int as review_count
          FROM reviews
          GROUP BY reviewer_id
        )
        SELECT 
          rc.reviewer_id,
          rc.review_count,
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
          END as name,
          COALESCE(au.email, '') as email
        FROM review_counts rc
        LEFT JOIN auth.users au ON rc.reviewer_id = au.id
        ORDER BY rc.review_count DESC
      `;

      return result;
    } catch (error) {
      console.error("Error in getLeaderboard:", error);
      throw new ApiError(
        `Failed to get leaderboard: ${(error as Error).message}`,
        500,
      );
    }
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
    try {
      const result = await this.sql<
        Array<{
          total_applications: number;
          total_reviews: number;
          total_reviewers: number;
          avg_reviews_per_application: number;
          avg_resume_score: number;
          avg_links_score: number;
          avg_q1_score: number;
          avg_q2_score: number;
        }>
      >`
        WITH application_stats AS (
          SELECT COUNT(DISTINCT id)::int as total_applications
          FROM applications
          WHERE status = 'submitted'
        ),
        review_stats AS (
          SELECT 
            COUNT(*)::int as total_reviews,
            COUNT(DISTINCT reviewer_id)::int as total_reviewers
          FROM reviews
        ),
        avg_reviews AS (
          SELECT 
            CASE 
              WHEN COUNT(DISTINCT application_id) > 0 
              THEN ROUND(COUNT(*)::numeric / COUNT(DISTINCT application_id)::numeric, 2)
              ELSE 0
            END as avg_reviews_per_application
          FROM reviews
        ),
        avg_scores AS (
          SELECT 
            CASE WHEN COUNT(*) > 0 THEN ROUND(AVG(resume_score)::numeric, 2) ELSE 0 END as avg_resume_score,
            CASE WHEN COUNT(*) > 0 THEN ROUND(AVG(links_score)::numeric, 2) ELSE 0 END as avg_links_score,
            CASE WHEN COUNT(*) > 0 THEN ROUND(AVG(q1_score)::numeric, 2) ELSE 0 END as avg_q1_score,
            CASE WHEN COUNT(*) > 0 THEN ROUND(AVG(q2_score)::numeric, 2) ELSE 0 END as avg_q2_score
          FROM reviews
        )
        SELECT 
          COALESCE(aps.total_applications, 0) as total_applications,
          COALESCE(rs.total_reviews, 0) as total_reviews,
          COALESCE(rs.total_reviewers, 0) as total_reviewers,
          COALESCE(ar.avg_reviews_per_application, 0) as avg_reviews_per_application,
          COALESCE(avs.avg_resume_score, 0) as avg_resume_score,
          COALESCE(avs.avg_links_score, 0) as avg_links_score,
          COALESCE(avs.avg_q1_score, 0) as avg_q1_score,
          COALESCE(avs.avg_q2_score, 0) as avg_q2_score
        FROM application_stats aps
        CROSS JOIN review_stats rs
        CROSS JOIN avg_reviews ar
        CROSS JOIN avg_scores avs
      `;

      return (
        result[0] ?? {
          total_applications: 0,
          total_reviews: 0,
          total_reviewers: 0,
          avg_reviews_per_application: 0,
          avg_resume_score: 0,
          avg_links_score: 0,
          avg_q1_score: 0,
          avg_q2_score: 0,
        }
      );
    } catch (error) {
      console.error("Error in getStatistics:", error);
      throw new ApiError(
        `Failed to get statistics: ${(error as Error).message}`,
        500,
      );
    }
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
    try {
      const result = await this.sql<
        Array<{
          avg_resume_score: number;
          avg_links_score: number;
          avg_q1_score: number;
          avg_q2_score: number;
          total_reviews: number;
        }>
      >`
        SELECT 
          ROUND(AVG(resume_score)::numeric, 2) as avg_resume_score,
          ROUND(AVG(links_score)::numeric, 2) as avg_links_score,
          ROUND(AVG(q1_score)::numeric, 2) as avg_q1_score,
          ROUND(AVG(q2_score)::numeric, 2) as avg_q2_score,
          COUNT(*)::int as total_reviews
        FROM reviews
        WHERE reviewer_id = ${reviewerId}
      `;

      return (
        result[0] ?? {
          avg_resume_score: 0,
          avg_links_score: 0,
          avg_q1_score: 0,
          avg_q2_score: 0,
          total_reviews: 0,
        }
      );
    } catch (error) {
      throw new ApiError(
        `Failed to get reviewer average scores: ${(error as Error).message}`,
        500,
      );
    }
  }
}
