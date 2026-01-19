import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import { ApiError } from "../../../core/src/utils/errors";

export interface DashboardStatistics {
  total_applications: number;
  total_submitted: number;
  total_offered: number;
  total_rsvped: number;
  total_declined: number;
}

export interface RSVPTimelineData {
  time_period: string;
  count: number;
  timestamp: Date;
}

export class DashboardRepository extends BaseRepository {
  /**
   * Get dashboard statistics
   * - Total applications
   * - Total offered (applications with status 'accepted')
   * - Total RSVPed (profiles with role 'hacker')
   * - Total declined (profiles with role 'declined')
   */
  async getDashboardStatistics(): Promise<DashboardStatistics> {
    try {
      console.log("[DashboardRepository] Fetching statistics...");
      
      // Run queries sequentially to identify which one hangs
      // Use CASE statements instead of FILTER for better compatibility
      console.log("[DashboardRepository] Querying applications table...");
      const appStats = await this.sql<Array<{ total_applications: number; total_submitted: number; total_offered: number }>>`
        SELECT 
          COUNT(*)::int as total_applications,
          SUM(CASE WHEN status::text = 'submitted' THEN 1 ELSE 0 END)::int as total_submitted,
          SUM(CASE WHEN status::text = 'accepted' THEN 1 ELSE 0 END)::int as total_offered
        FROM applications
      `;
      console.log("[DashboardRepository] App stats query completed:", appStats);

      console.log("[DashboardRepository] Querying profiles table...");
      const profileStats = await this.sql<Array<{ total_rsvped: number; total_declined: number }>>`
        SELECT 
          SUM(CASE WHEN role::text = 'hacker' THEN 1 ELSE 0 END)::int as total_rsvped,
          SUM(CASE WHEN role::text = 'declined' THEN 1 ELSE 0 END)::int as total_declined
        FROM profiles
      `;
      console.log("[DashboardRepository] Profile stats query completed:", profileStats);

      const appData = appStats[0] || { total_applications: 0, total_submitted: 0, total_offered: 0 };
      const profileData = profileStats[0] || { total_rsvped: 0, total_declined: 0 };

      const result = {
        total_applications: appData.total_applications,
        total_submitted: appData.total_submitted,
        total_offered: appData.total_offered,
        total_rsvped: profileData.total_rsvped,
        total_declined: profileData.total_declined,
      };
      
      console.log("[DashboardRepository] Statistics result:", result);
      return result;
    } catch (error) {
      console.error("[DashboardRepository] Error fetching dashboard statistics:", error);
      throw new ApiError(
        `Failed to fetch dashboard statistics: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get RSVP timeline data grouped by hour
   * Always returns hourly data - aggregation to 4-hour intervals is done in service layer
   */
  async getRSVPTimelineHourly(): Promise<RSVPTimelineData[]> {
    try {
      console.log("[DashboardRepository] Fetching hourly timeline...");
      
      const result = await this.sql<RSVPTimelineData[]>`
        SELECT 
          TO_CHAR(date_trunc('hour', updated_at), 'YYYY-MM-DD HH24:00') as time_period,
          COUNT(*)::int as count,
          date_trunc('hour', updated_at) as timestamp
        FROM profiles
        WHERE role = 'hacker'
          AND updated_at IS NOT NULL
        GROUP BY date_trunc('hour', updated_at)
        ORDER BY date_trunc('hour', updated_at) ASC
      `;

      console.log("[DashboardRepository] Timeline result count:", result.length);
      return result;
    } catch (error) {
      console.error("[DashboardRepository] Error fetching RSVP timeline:", error);
      throw new ApiError(
        `Failed to fetch RSVP timeline: ${(error as Error).message}`,
        500,
      );
    }
  }
}
