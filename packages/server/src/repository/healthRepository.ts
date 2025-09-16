import { BaseRepository } from "./baseRepository";
import { HealthCheck } from "../types/health";

export class HealthRepository extends BaseRepository {
  protected tableName = "_";

  constructor() {
    super();
  }

  /**
   * Get system health information
   */
  async getSystemHealth(): Promise<HealthCheck> {
    // Test Supabase connection
    let supabaseConnected = false;
    let supabaseError = null;
    let projectInfo = null;
    try {
      const { data, error } = await this.client
        .from(this.tableName)
        .select("*");

      // If we get a specific error about the table not existing, connection is working
      supabaseConnected = !error || error.message.includes("does not exist");
      if (error && !error.message.includes("does not exist")) {
        supabaseError = error.message;
      }
      projectInfo = data;
    } catch {
      supabaseConnected = false;
      supabaseError = "Connection failed";
    }

    const healthData: HealthCheck = {
      id: "system-health",
      service: "uwdsc-website-v3",
      project: projectInfo,
      status: supabaseConnected ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      services: {
        supabase: {
          status: supabaseConnected ? "connected" : "disconnected",
          error: supabaseError,
        },
      },
    };

    return healthData;
  }
}
