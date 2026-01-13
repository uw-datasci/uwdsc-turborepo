"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@uwdsc/ui";
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
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 md:pt-28">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Error Loading Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <CxCButton onClick={fetchApplication} className="px-4 py-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </CxCButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 md:pt-28">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Review Submitted Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
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
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 md:pt-28">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>No Applications Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              There are no applications available for review at this time.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Application Review</h1>
          <CxCButton
            onClick={() => globalThis.location.reload()}
            disabled={loading}
            className="px-4 py-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Application
          </CxCButton>
        </div>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {/* Basic Information Section */}
          <BasicInformation application={application} />

          {/* Resume Section */}
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.resume_url ? (
                <div className="space-y-2">
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-medium inline-block"
                  >
                    View Resume ↗
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No resume provided
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <ScoreButtons
                  selected={resumeScore}
                  onSelect={setResumeScore}
                  label="Rate Resume (0-3)"
                  maxScore={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Links Section */}
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                {application.github_url && (
                  <div>
                    <span className="font-medium">GitHub:</span>{" "}
                    <a
                      href={application.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {application.github_url}
                    </a>
                  </div>
                )}
                {application.linkedin_url && (
                  <div>
                    <span className="font-medium">LinkedIn:</span>{" "}
                    <a
                      href={application.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {application.linkedin_url}
                    </a>
                  </div>
                )}
                {application.website_url && (
                  <div>
                    <span className="font-medium">Website/X:</span>{" "}
                    <a
                      href={application.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {application.website_url}
                    </a>
                  </div>
                )}
                {application.other_url && (
                  <div>
                    <span className="font-medium">Other Link:</span>{" "}
                    <a
                      href={application.other_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
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
                      <p className="text-sm text-muted-foreground">
                        No links provided
                      </p>
                    </div>
                  )}
              </div>

              <div className="pt-4 border-t">
                <ScoreButtons
                  selected={linksScore}
                  onSelect={setLinksScore}
                  label="Rate Links (0-2)"
                  maxScore={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Application Question 1 Section */}
          {application.cxc_q1 ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  Tell us about a technical project that you have worked on.
                  What did you learn? What challenges did you face?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {application.cxc_q1}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <ScoreButtons
                    selected={q1Score}
                    onSelect={setQ1Score}
                    label="Rate Question 1 (0-7)"
                    maxScore={7}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  Tell us about a technical project that you have worked on.
                  What did you learn? What challenges did you face?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No answer provided
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <ScoreButtons
                    selected={q1Score}
                    onSelect={setQ1Score}
                    label="Rate Question 1 (0-7)"
                    maxScore={7}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Question 2 Section */}
          {application.cxc_q2 ? (
            <Card>
              <CardHeader>
                <CardTitle>Write us a Haiku</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {application.cxc_q2}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <ScoreButtons
                    selected={q2Score}
                    onSelect={setQ2Score}
                    label="Rate Question 2 (0-3)"
                    maxScore={3}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Write us a Haiku</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No answer provided
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <ScoreButtons
                    selected={q2Score}
                    onSelect={setQ2Score}
                    label="Rate Question 2 (0-3)"
                    maxScore={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
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
              <p className="text-sm text-muted-foreground text-center mt-2">
                Please rate all sections before submitting
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
