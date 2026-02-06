"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getApplication } from "@/lib/api/application";
import { getMyTeam, type Team } from "@/lib/api";
import { StatusCard, ProfileCard, TeamSection } from "@/components/dashboard";
import { AppFormValues } from "@/lib/schemas/application";

export default function DashboardPage() {
  const { user } = useAuth();
  const [application, setApplication] = useState<AppFormValues | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      if (!user?.id) return;

      try {
        const data = await getApplication(user.id);
        setApplication(data as AppFormValues | null);
      } catch (error) {
        console.error("Error loading application:", error);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadTeam() {
      try {
        const result = await getMyTeam();
        if (result.success && result.team) {
          setTeam(result.team);
        }
      } catch (error) {
        console.error("Error loading team:", error);
      }
    }

    loadApplication();
    loadTeam();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Skeleton loading */}
          <div className="h-8 w-48 bg-white/10 animate-pulse" />
          <div className="h-40 bg-white/5 border border-white/10 animate-pulse" />
          <div className="h-32 bg-white/5 border border-white/10 animate-pulse" />
          <div className="h-32 bg-white/5 border border-white/10 animate-pulse" />
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
          className="border-b border-white/10 pb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome back
            {user?.first_name ? `, ${user.first_name}` : ""}
          </h1>
          <p className="text-white/60 mt-1">
            Here&apos;s an overview of your CxC hackathon journey.
          </p>
        </motion.div>

        {/* Discord Invite - Only for non-declined/default users */}
        {user && user.role !== "declined" && user.role !== "default" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-2 border-indigo-400/50 p-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-500 p-3">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Join Our Discord Community!
                  </h3>
                  <p className="text-white/80">
                    Connect with fellow hackers, get updates, and stay in the
                    loop
                  </p>
                </div>
              </div>
              <a
                href="https://discord.gg/MZnFcmVDy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 ml-auto"
              >
                Join Discord
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        )}

        {/* Application Status */}
        <StatusCard
          status={application?.status ?? null}
          submittedAt={application?.submitted_at}
        />

        {/* Profile Overview */}
        {user && <ProfileCard user={user} application={application} />}

        {/* Team Section */}
        <TeamSection team={team} />

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <a
            href="/dashboard/application"
            className="p-4 bg-black border border-white/20 hover:bg-white hover:text-black transition-colors group"
          >
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5"
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
              <div>
                <p className="font-medium">Your Application</p>
                <p className="text-sm opacity-60">Review submitted details</p>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
