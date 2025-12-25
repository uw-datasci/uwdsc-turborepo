"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getApplication } from "@/lib/api/application";
import { ApplicationSummary } from "@/components/dashboard";
import CxCButton from "@/components/CxCButton";
import type { HackerApplication } from "@/types/application";
import { Card, CardContent, FileTextIcon } from "@uwdsc/ui";
import { transformDatabaseDataToForm } from "@/lib/utils/formDataTransformer";

export default function ApplicationPage() {
  const { user } = useAuth();
  const [application, setApplication] = useState<HackerApplication | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      if (!user?.id) return;

      try {
        const data = await getApplication(user.id);
        if (!data) return;

        setApplication(
          transformDatabaseDataToForm(data) as HackerApplication | null
        );
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
          <div className="h-8 w-64 bg-white/10 rounded animate-pulse" />
          <div className="h-48 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-48 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-48 bg-white/5 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  // No application state
  if (!application) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="py-12 flex flex-col items-center text-center">
                <div className="p-4 bg-white/10 rounded-full mb-6">
                  <FileTextIcon className="w-12 h-12 text-white/60" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  No Application Found
                </h2>
                <p className="text-white/60 mb-6 max-w-md">
                  You haven&apos;t started your application yet. Apply now to
                  join CxC and be part of an amazing hackathon experience!
                </p>
                <Link href="/apply">
                  <CxCButton>Start Your Application</CxCButton>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Draft application state
  if (application.status === "draft") {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Your Application
            </h1>
            <p className="text-white/60 mt-1">
              Your application is saved as a draft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="bg-yellow-500/10 border-yellow-500/20 backdrop-blur-sm">
              <CardContent className="py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-yellow-400 font-medium mb-1">
                      Application In Progress
                    </h3>
                    <p className="text-yellow-400/70 text-sm">
                      Your application hasn&apos;t been submitted yet. Continue
                      where you left off to complete it.
                    </p>
                  </div>
                  <Link href="/apply">
                    <CxCButton className="whitespace-nowrap">
                      Continue Application
                    </CxCButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Show partial application data */}
          <ApplicationSummary application={application} />
        </div>
      </div>
    );
  }

  // Submitted/reviewed application
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Your Application
          </h1>
          <p className="text-white/60 mt-1">
            Review your submitted application details below.
          </p>
        </motion.div>

        {/* Submission info banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-blue-500/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-400 font-medium">
                    Application Submitted
                  </p>
                  {application.submitted_at && (
                    <p className="text-blue-400/70 text-sm">
                      Submitted on{" "}
                      {new Date(application.submitted_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Full application summary */}
        <ApplicationSummary application={application} />
      </div>
    </div>
  );
}
