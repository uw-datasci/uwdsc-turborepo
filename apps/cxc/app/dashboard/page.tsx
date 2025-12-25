"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fetchApplication } from "@/lib/api/application";
import { StatusCard, ProfileCard, TeamSection } from "@/components/dashboard";
import type { HackerApplication } from "@/types/application";

export default function DashboardPage() {
  const { user } = useAuth();
  const [application, setApplication] = useState<HackerApplication | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      if (!user?.id) return;

      try {
        const data = await fetchApplication(user.id);
        setApplication(data as HackerApplication | null);
      } catch (error) {
        console.error("Error loading application:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadApplication();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Skeleton loading */}
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-40 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome back
            {user?.first_name ? `, ${user.first_name}` : ""}!
          </h1>
          <p className="text-white/60 mt-1">
            Here&apos;s an overview of your CxC hackathon journey.
          </p>
        </motion.div>

        {/* Application Status */}
        <StatusCard
          status={application?.status ?? null}
          submittedAt={application?.submitted_at}
        />

        {/* Profile Overview */}
        {user && <ProfileCard user={user} application={application} />}

        {/* Team Section */}
        <TeamSection teamMembers={application?.team_members} />

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <a
            href="/dashboard/schedule"
            className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Event Schedule</p>
                <p className="text-white/40 text-sm">
                  View workshops & activities
                </p>
              </div>
            </div>
          </a>

          <a
            href="/dashboard/application"
            className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Your Application</p>
                <p className="text-white/40 text-sm">
                  Review submitted details
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
