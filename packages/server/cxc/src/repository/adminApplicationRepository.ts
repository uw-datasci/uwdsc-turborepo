import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import { ApiError } from "../../../core/src/utils/errors";
import { splitCommaSeparatedString } from "@uwdsc/server/core/utils/dataTransformers";

export interface ApplicationSummary {
  id: string;
  profile_id: string;
  name: string | null;
  email: string;
  uni_name: string | null;
  gender: string | null;
  review_count: number;
  status: string;
  submitted_at: Date | null;
  created_at: Date;
}

export interface FullApplicationDetails {
  id: string;
  profile_id: string;
  name: string | null;
  email: string;
  phone_number: string | null;
  discord: string | null;
  t_shirt: string | null;
  dietary_restrictions: string | null;
  gender: string | null;
  ethnicity: string[];
  uni_name: string | null;
  uni_program: string | null;
  year_of_study: string | null;
  prior_hack_exp: string[];
  num_hackathons: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  other_url: string | null;
  cxc_q1: string | null;
  cxc_q2: string | null;
  team_members: string | null;
  team_name: string | null;
  team_members_with_names?: Array<{
    email: string;
    display_name: string | null;
  }>;
  resume_url: string | null;
  age: number | null;
  country_of_residence: string | null;
  mlh_agreed_code_of_conduct: boolean | null;
  mlh_authorize_info_sharing: boolean | null;
  mlh_email_opt_in: boolean | null;
  status: string;
  submitted_at: Date | null;
  created_at: Date;
  updated_at: Date;
  review_count: number;
}

export class AdminApplicationRepository extends BaseRepository {
  /**
   * Get all applications with summary data for the admin table
   * Includes: name, email, university, gender, review count
   */
  async getAllApplicationSummaries(): Promise<ApplicationSummary[]> {
    try {
      // First check if there are any applications at all
      const countResult = await this.sql<Array<{ count: number }>>`
        SELECT COUNT(*)::int as count FROM applications
      `;

      console.log(
        `[Repository] Total applications in database: ${countResult[0]?.count ?? 0}`,
      );

      if (countResult[0]?.count === 0) {
        return [];
      }

      // Use CTE approach to avoid grouping by JSONB - similar to leaderboard fix
      const result = await this.sql<ApplicationSummary[]>`
        WITH review_counts AS (
          SELECT 
            application_id,
            COUNT(*)::int as review_count
          FROM reviews
          GROUP BY application_id
        ),
        applications_with_counts AS (
          SELECT 
            a.id,
            a.profile_id,
            a.uni_name,
            a.gender::text,
            COALESCE(rc.review_count, 0)::int as review_count,
            a.status::text,
            a.submitted_at,
            a.created_at
          FROM applications a
          LEFT JOIN review_counts rc ON a.id = rc.application_id
        )
        SELECT 
          awc.id,
          awc.profile_id,
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
          COALESCE(au.email, '') as email,
          awc.uni_name,
          awc.gender,
          awc.review_count,
          awc.status,
          awc.submitted_at,
          awc.created_at
        FROM applications_with_counts awc
        LEFT JOIN auth.users au ON awc.profile_id = au.id
        ORDER BY awc.submitted_at DESC NULLS LAST, awc.created_at DESC
      `;

      console.log(`[Repository] Returning ${result.length} applications`);
      return result;
    } catch (error) {
      console.error("Error in getAllApplicationSummaries:", error);
      throw new ApiError(
        `Failed to fetch application summaries: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get full application details by application ID
   */
  async getApplicationById(
    applicationId: string,
  ): Promise<FullApplicationDetails | null> {
    try {
      // Get application with user info
      const applicationResult = await this.sql<FullApplicationDetails[]>`
        WITH review_counts AS (
          SELECT 
            application_id,
            COUNT(*)::int as review_count
          FROM reviews
          WHERE application_id = ${applicationId}
          GROUP BY application_id
        )
        SELECT 
          a.id,
          a.profile_id,
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
          au.email,
          a.phone_number,
          a.discord,
          a.t_shirt::text,
          a.dietary_restrictions,
          a.gender::text,
          a.ethnicity,
          a.uni_name,
          a.uni_program,
          a.year_of_study::text,
          a.prior_hack_exp,
          a.num_hackathons::text,
          a.github_url,
          a.linkedin_url,
          a.website_url,
          a.other_url,
          a.cxc_q1,
          a.cxc_q2,
          a.team_members,
          a.age,
          a.country_of_residence,
          a.mlh_agreed_code_of_conduct,
          a.mlh_authorize_info_sharing,
          a.mlh_email_opt_in,
          a.status::text,
          a.submitted_at,
          a.created_at,
          a.updated_at,
          COALESCE(rc.review_count, 0)::int as review_count,
          NULL::text as team_name,
          NULL::text as resume_url
        FROM applications a
        LEFT JOIN auth.users au ON a.profile_id = au.id
        LEFT JOIN review_counts rc ON a.id = rc.application_id
        WHERE a.id = ${applicationId}
        LIMIT 1
      `;

      if (applicationResult.length === 0 || !applicationResult[0]) {
        return null;
      }

      let application = applicationResult[0];

      // Transform comma-separated strings to arrays using shared utility
      const ethnicityString = application.ethnicity as unknown as string | null;
      const priorHackExpString = application.prior_hack_exp as unknown as
        | string
        | null;

      application = {
        ...application,
        ethnicity: splitCommaSeparatedString(ethnicityString),
        prior_hack_exp: splitCommaSeparatedString(priorHackExpString),
      };

      // Get team name if team members exist
      if (application.team_members) {
        const emails = application.team_members
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);

        if (emails.length > 0) {
          // Use the first email to find the team (all team members should be in the same team)
          const firstEmail = emails[0];
          if (firstEmail) {
            const teamNameResult = await this.sql<Array<{ team_name: string }>>`
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

            if (teamNameResult.length > 0 && teamNameResult[0]) {
              application.team_name = teamNameResult[0].team_name;
            }
          }

          // Get team member names
          const teamMemberResults = await this.sql<
            Array<{ email: string; display_name: string | null }>
          >`
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

          application.team_members_with_names = teamMemberResults;
        }
      }

      return application;
    } catch (error) {
      throw new ApiError(
        `Failed to fetch application details: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get application by profile ID
   */
  async getApplicationByProfileId(
    profileId: string,
  ): Promise<{ dietary_restrictions: string | null } | null> {
    try {
      const result = await this.sql<
        Array<{ dietary_restrictions: string | null }>
      >`
        SELECT dietary_restrictions
        FROM applications
        WHERE profile_id = ${profileId}
        LIMIT 1
      `;

      if (result.length === 0 || !result[0]) {
        return null;
      }

      return result[0];
    } catch (error) {
      throw new ApiError(
        `Failed to fetch application by profile ID: ${(error as Error).message}`,
        500,
      );
    }
  }
}
