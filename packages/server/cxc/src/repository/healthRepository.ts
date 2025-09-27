import { BaseCxcRepository } from "./baseCxcRepository";
import { HealthCheck } from "../types/health";

export class HealthRepository extends BaseCxcRepository {
  /**
   * Get system health information
   */
  async getSystemHealth(): Promise<HealthCheck> {
    // Test Supabase connection
    let supabaseConnected = true;
    let supabaseError = null;
    try {
      await this.pool.query(`SELECT 1`);
    } catch {
      supabaseConnected = false;
      supabaseError = "Connection failed";
    }

    const healthData: HealthCheck = {
      id: "system-health",
      service: "uwdsc-cxc-v3",
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
