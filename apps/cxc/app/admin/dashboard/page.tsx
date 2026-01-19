"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@uwdsc/ui";
import {
  FileText,
  Send,
  CheckCircle,
  Users,
  XCircle,
  BarChart3,
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import CxCButton from "@/components/CxCButton";
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

  const fetchDashboardData = useCallback(async () => {
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
  }, [interval]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return <LoadingScreen message="LOADING DASHBOARD..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-black border border-red-500/50 rounded-none">
            <CardContent className="pt-6">
              <p className="text-red-400 text-sm">{error}</p>
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
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Superadmin Dashboard
          </h1>
          <p className="text-white/60 mt-1 text-sm sm:text-base">
            Application and RSVP statistics overview
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.statistics.total_applications}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Submitted
              </CardTitle>
              <Send className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.statistics.total_submitted}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Offered
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.statistics.total_offered}
              </div>
              <p className="text-xs text-white/60 mt-1">
                {offerRate}% of applications
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                RSVPed (Hackers)
              </CardTitle>
              <Users className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.statistics.total_rsvped}
              </div>
              <p className="text-xs text-white/60 mt-1">
                {rsvpRate}% of offered
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Declined
              </CardTitle>
              <XCircle className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.statistics.total_declined}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RSVP Timeline Chart */}
        <Card className="bg-black border border-white/20 rounded-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5" />
                RSVP Timeline
              </CardTitle>
              <div className="flex gap-2">
                <CxCButton
                  onClick={() => setInterval("24")}
                  className={
                    interval === "24"
                      ? "!bg-white !text-black"
                      : "!bg-black !text-white border border-white/40 hover:!bg-white/10"
                  }
                >
                  Daily
                </CxCButton>
                <CxCButton
                  onClick={() => setInterval("1")}
                  className={
                    interval === "1"
                      ? "!bg-white !text-black"
                      : "!bg-black !text-white border border-white/40 hover:!bg-white/10"
                  }
                >
                  Hourly
                </CxCButton>
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
                  <YAxis tick={{ fill: "white", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000000",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0",
                      color: "#ffffff",
                      padding: "12px",
                      minWidth: "200px",
                    }}
                    labelStyle={{
                      color: "#ffffff",
                      fontWeight: 600,
                      marginBottom: "8px",
                      fontSize: "14px",
                    }}
                    itemStyle={{
                      color: "#ffffff",
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
                    stroke="#ffffff"
                    strokeWidth={2}
                    name="RSVPs"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[450px] text-white/60">
                <p>No RSVP data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Conversion Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">
                  Application → Offer
                </span>
                <span className="text-lg font-semibold text-white">
                  {offerRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Offer → RSVP</span>
                <span className="text-lg font-semibold text-white">
                  {rsvpRate}%
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/20">
                <span className="text-sm font-medium text-white">
                  Overall Acceptance Rate
                </span>
                <span className="text-lg font-bold text-white">
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

          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Status Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Pending</span>
                <span className="text-lg font-semibold text-white">
                  {data.statistics.total_applications -
                    data.statistics.total_offered}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Awaiting RSVP</span>
                <span className="text-lg font-semibold text-white">
                  {data.statistics.total_offered -
                    data.statistics.total_rsvped -
                    data.statistics.total_declined}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/20">
                <span className="text-sm font-medium text-white">
                  Total Active Hackers
                </span>
                <span className="text-lg font-bold text-white">
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
