"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRandomApplication, submitReview } from "@/lib/api";
import { Loader2, RefreshCw } from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import CxCButton from "@/components/CxCButton";
import { ScoreButtons, BasicInformation } from "@/components/admin/review";

interface Application {
  id: string;
  profile_id: string;
  // Contact info
  phone_number?: string;
  discord?: string;
  email?: string;
  // Personal info
  t_shirt?: string;
  dietary_restrictions?: string;
  gender?: string;
  ethnicity?: string;
  // Education
  uni_name?: string;
  uni_program?: string;
  year_of_study?: string;
  // Hackathon experience
  prior_hack_exp?: string;
  num_hackathons?: string;
  // Social links
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  other_url?: string;
  // Application questions
  cxc_q1?: string;
  cxc_q2?: string;
  // Team members
  team_members?: string;
  team_name?: string | null;
  team_members_with_names?: Array<{
    email: string;
    display_name: string | null;
  }>;
  // Resume
  resume_url?: string;
}

export default function ReviewPage() {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [linksScore, setLinksScore] = useState<number | null>(null);
  const [q1Score, setQ1Score] = useState<number | null>(null);
  const [q2Score, setQ2Score] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplication = async () => {
    setLoading(true);
    setError(null);
    setResumeScore(null);
    setLinksScore(null);
    setQ1Score(null);
    setQ2Score(null);
    setSubmitted(false);
    try {
      const data = await getRandomApplication();
      setApplication(data.application);
    } catch (err) {
      console.error("Error fetching application:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load application. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  // Auto-click score of 0 if fields don't exist
  useEffect(() => {
    if (!application) return;

    // Auto-set resume score to 0 if resume doesn't exist
    if (!application.resume_url && resumeScore === null) {
      setResumeScore(0);
    }

    // Auto-set links score to 0 if no links exist
    if (
      !application.github_url &&
      !application.linkedin_url &&
      !application.website_url &&
      !application.other_url &&
      linksScore === null
    ) {
      setLinksScore(0);
    }

    // Auto-set Q1 score to 0 if Q1 doesn't exist
    if (!application.cxc_q1 && q1Score === null) {
      setQ1Score(0);
    }

    // Auto-set Q2 score to 0 if Q2 doesn't exist
    if (!application.cxc_q2 && q2Score === null) {
      setQ2Score(0);
    }
  }, [application, resumeScore, linksScore, q1Score, q2Score]);

  const handleSubmit = async () => {
    if (
      !application ||
      resumeScore === null ||
      linksScore === null ||
      q1Score === null ||
      q2Score === null
    ) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitReview({
        application_id: application.id,
        resume_score: resumeScore,
        links_score: linksScore,
        q1_score: q1Score,
        q2_score: q2Score,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit review. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="LOADING APPLICATION..." />;
  }

  if (error && !application) {
    return (
      <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-black border border-red-500/50 p-6"
          >
            <h2 className="text-xl font-bold text-red-400 mb-4">
              Error Loading Application
            </h2>
            <p className="text-white/60 mb-6">{error}</p>
            <CxCButton onClick={fetchApplication} className="px-4 py-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </CxCButton>
          </motion.div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-black border border-green-500/50 p-6"
          >
            <h2 className="text-xl font-bold text-green-400 mb-4">
              Review Submitted Successfully!
            </h2>
            <p className="text-white/60 mb-6">
              Thank you for reviewing this application. Your scores have been
              saved.
            </p>
            <CxCButton
              onClick={() => globalThis.location.reload()}
              className="w-full px-4 py-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Review Another Application
            </CxCButton>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-black border border-white/20 p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              No Applications Available
            </h2>
            <p className="text-white/60">
              There are no applications available for review at this time.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-white/10 pb-6 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              Application Review
            </h1>
            <p className="text-white/60 mt-1">
              Review and score this application submission.
            </p>
          </div>
          <CxCButton
            onClick={() => globalThis.location.reload()}
            disabled={loading}
            className="px-4 py-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Application
          </CxCButton>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black border border-red-500/50 p-4"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <div className="space-y-6">
          {/* Basic Information Section */}
          <BasicInformation application={application} />

          {/* Resume Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-black border border-white/20"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Resume</h2>
            </div>
            <div className="p-6 space-y-4">
              {application.resume_url ? (
                <div className="space-y-2">
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium inline-block transition-colors"
                  >
                    View Resume ↗
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-white/40">No resume provided</p>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <ScoreButtons
                  selected={resumeScore}
                  onSelect={setResumeScore}
                  label="Rate Resume (0-3)"
                  maxScore={3}
                />
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-black border border-white/20"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Links</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2 text-sm">
                {application.github_url && (
                  <div>
                    <span className="font-medium text-white">GitHub:</span>{" "}
                    <a
                      href={application.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {application.github_url}
                    </a>
                  </div>
                )}
                {application.linkedin_url && (
                  <div>
                    <span className="font-medium text-white">LinkedIn:</span>{" "}
                    <a
                      href={application.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {application.linkedin_url}
                    </a>
                  </div>
                )}
                {application.website_url && (
                  <div>
                    <span className="font-medium text-white">Website/X:</span>{" "}
                    <a
                      href={application.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {application.website_url}
                    </a>
                  </div>
                )}
                {application.other_url && (
                  <div>
                    <span className="font-medium text-white">Other Link:</span>{" "}
                    <a
                      href={application.other_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {application.other_url}
                    </a>
                  </div>
                )}
                {!application.github_url &&
                  !application.linkedin_url &&
                  !application.website_url &&
                  !application.other_url && (
                    <div>
                      <p className="text-sm text-white/40">No links provided</p>
                    </div>
                  )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <ScoreButtons
                  selected={linksScore}
                  onSelect={setLinksScore}
                  label="Rate Links (0-2)"
                  maxScore={2}
                />
              </div>
            </div>
          </motion.div>

          {/* Application Question 1 Section */}
          {application.cxc_q1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-black border border-white/20"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">
                  Tell us about a technical project that you have worked on.
                  What did you learn? What challenges did you face?
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-white/80 whitespace-pre-wrap">
                    {application.cxc_q1}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <ScoreButtons
                    selected={q1Score}
                    onSelect={setQ1Score}
                    label="Rate Question 1 (0-7)"
                    maxScore={7}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-black border border-white/20"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">
                  Tell us about a technical project that you have worked on.
                  What did you learn? What challenges did you face?
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-white/40">No answer provided</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <ScoreButtons
                    selected={q1Score}
                    onSelect={setQ1Score}
                    label="Rate Question 1 (0-7)"
                    maxScore={7}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Application Question 2 Section */}
          {application.cxc_q2 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-black border border-white/20"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">
                  Write us a Haiku
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-white/80 whitespace-pre-wrap">
                    {application.cxc_q2}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <ScoreButtons
                    selected={q2Score}
                    onSelect={setQ2Score}
                    label="Rate Question 2 (0-3)"
                    maxScore={3}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-black border border-white/20"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">
                  Write us a Haiku
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-white/40">No answer provided</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <ScoreButtons
                    selected={q2Score}
                    onSelect={setQ2Score}
                    label="Rate Question 2 (0-3)"
                    maxScore={3}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-black border border-white/20 p-6"
        >
          <CxCButton
            onClick={handleSubmit}
            disabled={
              submitting ||
              resumeScore === null ||
              linksScore === null ||
              q1Score === null ||
              q2Score === null
            }
            className="w-full px-6 py-3"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </CxCButton>
          {resumeScore === null ||
          linksScore === null ||
          q1Score === null ||
          q2Score === null ? (
            <p className="text-sm text-white/40 text-center mt-2">
              Please rate all sections before submitting
            </p>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
