import { HealthService } from "@uwdsc/server/services/healthService";
import { NextRequest, NextResponse } from "next/server";

// Initialize the service
const healthService = new HealthService();

// Handle GET requests - comprehensive health check
export async function GET(request: NextRequest) {
  try {
    const healthData = await healthService.getSystemHealth();

    // Return 200 if main service is up, even if Supabase is down (degraded service)
    const status = healthData.status === "unhealthy" ? 503 : 200;

    return NextResponse.json(healthData, { status });
  } catch {
    // Return unhealthy status if something goes wrong
    const errorData = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      service: "uwdsc-website-v3",
      error: "Health check failed",
    };

    return NextResponse.json(errorData, { status: 503 });
  }
}
