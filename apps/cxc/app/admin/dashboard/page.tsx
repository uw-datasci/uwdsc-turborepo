"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@uwdsc/ui";
import {
  FileText,
  Send,
  CheckCircle,
  Users,
  XCircle,
  BarChart3,
  Loader2,
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardStatistics {
  total_applications: number;
  total_submitted: number;
  total_offered: number;
  total_rsvped: number;
  total_declined: number;
}

interface RSVPTimelineData {
  time_period: string;
  count: number;
  timestamp: string;
}

interface DashboardData {
  statistics: DashboardStatistics;
  timeline: RSVPTimelineData[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<"1" | "24">("24");

  useEffect(() => {
    fetchDashboardData();
  }, [interval]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/admin/dashboard?interval=${interval}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to load dashboard data");
      }

      const dashboardData: DashboardData = await response.json();
      setData(dashboardData);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="LOADING DASHBOARD..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Format timeline data for chart
  const chartData = data.timeline.map((item) => {
    const date = new Date(item.timestamp);
    const timeLabel =
      interval === "24"
        ? date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
          });

    return {
      time: timeLabel,
      count: item.count,
      fullTime: item.time_period,
    };
  });

  // Calculate conversion rates
  const offerRate =
    data.statistics.total_applications > 0
      ? (
          (data.statistics.total_offered / data.statistics.total_applications) *
          100
        ).toFixed(1)
      : "0.0";

  const rsvpRate =
    data.statistics.total_offered > 0
      ? (
          (data.statistics.total_rsvped / data.statistics.total_offered) *
          100
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Superadmin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Application and RSVP statistics overview
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.statistics.total_applications}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.statistics.total_submitted}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.statistics.total_offered}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {offerRate}% of applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                RSVPed (Hackers)
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.statistics.total_rsvped}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {rsvpRate}% of offered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Declined</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.statistics.total_declined}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RSVP Timeline Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                RSVP Timeline
              </CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={() => setInterval("24")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    interval === "24"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setInterval("1")}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    interval === "1"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Hourly
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={450}>
                <LineChart
                  data={chartData}
                  margin={{ bottom: 100, top: 20, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval="preserveStartEnd"
                    tick={{ fill: "white", fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                      padding: "12px",
                      minWidth: "200px",
                    }}
                    labelStyle={{
                      color: "hsl(var(--foreground))",
                      fontWeight: 600,
                      marginBottom: "8px",
                      fontSize: "14px",
                    }}
                    itemStyle={{
                      color: "hsl(var(--foreground))",
                      fontSize: "14px",
                    }}
                    formatter={(value: number) => [value, "RSVPs"]}
                    labelFormatter={(label) => `Time: ${label}`}
                    wrapperStyle={{ zIndex: 1000 }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="RSVPs"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[450px] text-muted-foreground">
                <p>No RSVP data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conversion Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Application → Offer
                </span>
                <span className="text-lg font-semibold">{offerRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Offer → RSVP
                </span>
                <span className="text-lg font-semibold">{rsvpRate}%</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">
                  Overall Acceptance Rate
                </span>
                <span className="text-lg font-bold">
                  {data.statistics.total_applications > 0
                    ? (
                        (data.statistics.total_rsvped /
                          data.statistics.total_applications) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="text-lg font-semibold">
                  {data.statistics.total_applications -
                    data.statistics.total_offered}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Awaiting RSVP
                </span>
                <span className="text-lg font-semibold">
                  {data.statistics.total_offered -
                    data.statistics.total_rsvped -
                    data.statistics.total_declined}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">
                  Total Active Hackers
                </span>
                <span className="text-lg font-bold">
                  {data.statistics.total_rsvped}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
