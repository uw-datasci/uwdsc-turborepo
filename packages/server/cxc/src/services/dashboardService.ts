import { ApiError } from "@uwdsc/server/core/utils/errors";
import {
  DashboardRepository,
  DashboardStatistics,
  RSVPTimelineData,
} from "../repository/dashboardRepository";

export class DashboardService {
  private readonly repository: DashboardRepository;

  constructor() {
    this.repository = new DashboardRepository();
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStatistics(): Promise<DashboardStatistics> {
    try {
      return await this.repository.getDashboardStatistics();
    } catch (error) {
      throw new ApiError(
        `Failed to get dashboard statistics: ${(error as Error).message}`,
        500,
      );
    }
  }

  /**
   * Get RSVP timeline data
   * @param intervalHours - 1 for hourly, 24 for daily intervals
   */
  async getRSVPTimeline(
    intervalHours: 1 | 24 = 24,
  ): Promise<RSVPTimelineData[]> {
    try {
      // Always fetch hourly data, then aggregate if needed
      const hourlyData = await this.repository.getRSVPTimelineHourly();

      if (intervalHours === 1) {
        return hourlyData;
      }

      // Aggregate into daily intervals
      const aggregated = new Map<string, { count: number; timestamp: Date }>();

      for (const item of hourlyData) {
        const date = new Date(item.timestamp);

        // Create daily bucket (start of day)
        const bucketDate = new Date(date);
        bucketDate.setHours(0, 0, 0, 0);

        const bucketKey = bucketDate.toISOString();

        if (!aggregated.has(bucketKey)) {
          aggregated.set(bucketKey, {
            count: 0,
            timestamp: bucketDate,
          });
        }

        const bucket = aggregated.get(bucketKey)!;
        bucket.count += item.count;
      }

      // Convert map to array and format
      return Array.from(aggregated.entries())
        .map(([, value]) => ({
          time_period: value.timestamp.toISOString().slice(0, 10) + ' 00:00',
          count: value.count,
          timestamp: value.timestamp,
        }))
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    } catch (error) {
      throw new ApiError(
        `Failed to get RSVP timeline: ${(error as Error).message}`,
        500,
      );
    }
  }
}
