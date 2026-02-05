"use client";

import useSWR from "swr";
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline";
import { getSchedule } from "@/lib/api/schedule";
import { Calendar, Loader2 } from "lucide-react";

export default function SchedulePage() {
  const {
    data: events,
    error,
    isLoading,
  } = useSWR("/api/schedule", getSchedule, {
    refreshInterval: 60000, // Refresh every minute
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-600 dark:text-red-400">
            Failed to load schedule. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Events Scheduled
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for upcoming hackathon events!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Hackathon Schedule
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Stay updated with all the events happening during the hackathon
        </p>
      </div>

      {/* Events display */}
      <ScheduleTimeline events={events} />
    </div>
  );
}
