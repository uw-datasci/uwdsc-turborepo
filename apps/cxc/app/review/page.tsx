"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@uwdsc/ui";
import { getRandomApplication, submitReview } from "@/lib/api";
import { Loader2, RefreshCw } from "lucide-react";

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
  const [basicInfoScore, setBasicInfoScore] = useState<number | null>(null);
  const [q1Score, setQ1Score] = useState<number | null>(null);
  const [q2Score, setQ2Score] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplication = async () => {
    setLoading(true);
    setError(null);
    setBasicInfoScore(null);
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

  const handleSubmit = async () => {
    if (
      !application ||
      basicInfoScore === null ||
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
        basic_info_score: basicInfoScore,
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

  const ScoreButtons = ({
    selected,
    onSelect,
    label,
  }: {
    selected: number | null;
    onSelect: (score: number) => void;
    label: string;
  }) => (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
          <Button
            key={score}
            type="button"
            variant={selected === score ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(score)}
            className={
              selected === score ? "bg-white text-black hover:bg-white/90" : ""
            }
          >
            {score}
          </Button>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24 md:pt-28">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading application...</p>
        </div>
      </div>
    );
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
            <Button onClick={fetchApplication} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
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
            <Button onClick={fetchApplication} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Review Another Application
            </Button>
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
          <Button
            onClick={fetchApplication}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get New Application
          </Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                {application.email && (
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {application.email}
                  </div>
                )}
                {application.phone_number && (
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    {application.phone_number}
                  </div>
                )}
                {application.discord && (
                  <div>
                    <span className="font-medium">Discord:</span>{" "}
                    {application.discord}
                  </div>
                )}
                {application.t_shirt && (
                  <div>
                    <span className="font-medium">T-Shirt Size:</span>{" "}
                    {application.t_shirt}
                  </div>
                )}
                {application.dietary_restrictions && (
                  <div>
                    <span className="font-medium">Dietary Restrictions:</span>{" "}
                    {application.dietary_restrictions}
                  </div>
                )}
                {application.gender && (
                  <div>
                    <span className="font-medium">Gender:</span>{" "}
                    {application.gender}
                  </div>
                )}
                {application.ethnicity && (
                  <div>
                    <span className="font-medium">Ethnicity:</span>{" "}
                    {application.ethnicity}
                  </div>
                )}
                {application.uni_name && (
                  <div>
                    <span className="font-medium">University:</span>{" "}
                    {application.uni_name}
                  </div>
                )}
                {application.uni_program && (
                  <div>
                    <span className="font-medium">Program:</span>{" "}
                    {application.uni_program}
                  </div>
                )}
                {application.year_of_study && (
                  <div>
                    <span className="font-medium">Year of Study:</span>{" "}
                    {application.year_of_study}
                  </div>
                )}
                {application.prior_hack_exp && (
                  <div>
                    <span className="font-medium">
                      Prior Hackathon Experience:
                    </span>{" "}
                    {application.prior_hack_exp}
                  </div>
                )}
                {application.num_hackathons && (
                  <div>
                    <span className="font-medium">Hackathons Attended:</span>{" "}
                    {application.num_hackathons}
                  </div>
                )}
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
                {application.resume_url && (
                  <div className="pt-2">
                    <span className="font-medium">Resume:</span>{" "}
                    <a
                      href={application.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline font-medium"
                      onClick={(e) => {
                        // Ensure the link opens in a new tab
                        e.stopPropagation();
                      }}
                    >
                      View Resume ↗
                    </a>
                  </div>
                )}
                {application.team_members &&
                  application.team_members.trim() && (
                    <div className="pt-2">
                      <span className="font-medium block mb-2">
                        Team Members:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {application.team_members_with_names &&
                        application.team_members_with_names.length > 0
                          ? // Display with names if available
                            application.team_members_with_names.map(
                              (member, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg rounded-md border border-primary/20"
                                >
                                  <span className="text-foreground">
                                    {member.display_name ? (
                                      <>
                                        <span>{member.display_name}</span>
                                        <span className="text-muted-foreground">
                                          {" "}
                                          ({member.email})
                                        </span>
                                      </>
                                    ) : (
                                      <span>{member.email}</span>
                                    )}
                                  </span>
                                </div>
                              ),
                            )
                          : // Fallback to just emails if names not available
                            application.team_members
                              .split(",")
                              .map((email, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg rounded-md border border-primary/20"
                                >
                                  <span className="text-foreground">
                                    {email.trim()}
                                  </span>
                                </div>
                              ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className="pt-4 border-t">
                <ScoreButtons
                  selected={basicInfoScore}
                  onSelect={setBasicInfoScore}
                  label="Rate Basic Information (1-10)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Application Question 1 Section */}
          {application.cxc_q1 && (
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
                    label="Rate Question 1 (1-10)"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Question 2 Section */}
          {application.cxc_q2 && (
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
                    label="Rate Question 2 (1-10)"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={handleSubmit}
              disabled={
                submitting ||
                basicInfoScore === null ||
                q1Score === null ||
                q2Score === null
              }
              className="w-full"
              size="lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
            {basicInfoScore === null || q1Score === null || q2Score === null ? (
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
