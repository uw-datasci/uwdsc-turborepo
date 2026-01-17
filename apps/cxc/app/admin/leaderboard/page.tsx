"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@uwdsc/ui";
import {
  Trophy,
  Users,
  FileText,
  Star,
  Medal,
  FileCheck,
  Link2,
  MessageSquare,
  MessageSquareQuote,
  Loader2,
} from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  reviewer_id: string;
  review_count: number;
  name: string | null;
  email: string;
}

interface Statistics {
  total_applications: number;
  total_reviews: number;
  total_reviewers: number;
  avg_reviews_per_application: number;
  avg_resume_score: number;
  avg_links_score: number;
  avg_q1_score: number;
  avg_q2_score: number;
}

interface ReviewerScores {
  avg_resume_score: number;
  avg_links_score: number;
  avg_q1_score: number;
  avg_q2_score: number;
  total_reviews: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReviewer, setSelectedReviewer] =
    useState<LeaderboardEntry | null>(null);
  const [reviewerScores, setReviewerScores] = useState<ReviewerScores | null>(
    null,
  );
  const [loadingScores, setLoadingScores] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      let response: Response;
      try {
        response = await fetch("/api/admin/leaderboard", {
          signal: controller.signal,
        });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          throw new Error(
            "Request timed out. Please check your connection and try again.",
          );
        }
        throw new Error(
          "Network error. Please check your connection and try again.",
        );
      }

      clearTimeout(timeoutId);

      let data: {
        leaderboard?: LeaderboardEntry[];
        statistics?: Statistics;
        error?: string;
        message?: string;
      };
      try {
        const text = await response.text();
        if (!text) {
          throw new Error("Empty response from server");
        }
        data = JSON.parse(text) as {
          leaderboard?: LeaderboardEntry[];
          statistics?: Statistics;
          error?: string;
          message?: string;
        };
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        throw new Error("Invalid response from server. Please try again.");
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || `Server error: ${response.status}`,
        );
      }

      setLeaderboard(data.leaderboard || []);
      setStatistics(data.statistics || null);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError(
            "Request timed out. Please check your connection and try again.",
          );
        } else {
          setError(
            err.message || "Failed to load leaderboard. Please try again.",
          );
        }
      } else {
        setError("Failed to load leaderboard. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReviewerClick = async (reviewer: LeaderboardEntry) => {
    setSelectedReviewer(reviewer);
    setModalOpen(true);
    setLoadingScores(true);
    setReviewerScores(null);

    try {
      const response = await fetch(
        `/api/admin/leaderboard?reviewerId=${reviewer.reviewer_id}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load reviewer scores");
      }

      setReviewerScores(data.reviewerScores || null);
    } catch (err) {
      console.error("Error fetching reviewer scores:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load reviewer scores. Please try again.",
      );
    } finally {
      setLoadingScores(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="LOADING LEADERBOARD..." />;
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

  const topThree = leaderboard.slice(0, 3);

  const getPodiumHeight = (position: number) => {
    if (position === 0) return "h-32"; // 1st place - tallest
    if (position === 1) return "h-24"; // 2nd place - medium
    return "h-20"; // 3rd place - shortest
  };

  const getPodiumColor = (position: number) => {
    if (position === 0) return "bg-yellow-500/20 border-yellow-500/50";
    if (position === 1) return "bg-gray-300/20 border-gray-300/50";
    return "bg-orange-600/20 border-orange-600/50";
  };

  const getMedalIcon = (position: number) => {
    if (position === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (position === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    return <Medal className="w-6 h-6 text-orange-600" />;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Review Leaderboard</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Track reviewer performance and statistics
          </p>
        </div>

        {/* Statistics Cards */}
        {statistics && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Applications
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.total_applications}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Reviews
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.total_reviews}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Reviewers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.total_reviewers}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Reviews/App
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Number(statistics.avg_reviews_per_application).toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Average Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Resume Score
                  </CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Number(statistics.avg_resume_score || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Out of 3</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Links Score
                  </CardTitle>
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Number(statistics.avg_links_score || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Out of 2</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Q1 Score
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Number(statistics.avg_q1_score || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Out of 7</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg Q2 Score
                  </CardTitle>
                  <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Number(statistics.avg_q2_score || 0).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Out of 3</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Reviewers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-center gap-4 md:gap-8 pb-8">
                {/* 2nd Place */}
                {topThree[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => handleReviewerClick(topThree[1]!)}
                  >
                    <div
                      className={`w-24 md:w-32 ${getPodiumHeight(1)} ${getPodiumColor(1)} border-2 rounded-t-lg flex flex-col items-center justify-center p-4 relative hover:opacity-80 transition-opacity`}
                    >
                      <div className="absolute -top-8">{getMedalIcon(1)}</div>
                      <div className="text-3xl font-bold">
                        {topThree[1].review_count}
                      </div>
                      <div className="text-xs text-muted-foreground">2nd</div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-semibold">
                        {topThree[1].name || "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {topThree[1].email || topThree[1].reviewer_id}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => handleReviewerClick(topThree[0]!)}
                  >
                    <div
                      className={`w-28 md:w-36 ${getPodiumHeight(0)} ${getPodiumColor(0)} border-2 rounded-t-lg flex flex-col items-center justify-center p-4 relative hover:opacity-80 transition-opacity`}
                    >
                      <div className="absolute -top-8">{getMedalIcon(0)}</div>
                      <div className="text-4xl font-bold">
                        {topThree[0].review_count}
                      </div>
                      <div className="text-xs text-muted-foreground">1st</div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-semibold text-lg">
                        {topThree[0].name || "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {topThree[0].email || topThree[0].reviewer_id}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => handleReviewerClick(topThree[2]!)}
                  >
                    <div
                      className={`w-20 md:w-28 ${getPodiumHeight(2)} ${getPodiumColor(2)} border-2 rounded-t-lg flex flex-col items-center justify-center p-4 relative hover:opacity-80 transition-opacity`}
                    >
                      <div className="absolute -top-8">{getMedalIcon(2)}</div>
                      <div className="text-2xl font-bold">
                        {topThree[2].review_count}
                      </div>
                      <div className="text-xs text-muted-foreground">3rd</div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-semibold">
                        {topThree[2].name || "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {topThree[2].email || topThree[2].reviewer_id}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Full Leaderboard */}
        {leaderboard.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Full Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.reviewer_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleReviewerClick(entry)}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/10 hover:cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">
                          {entry.name || "Unknown"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.email || entry.reviewer_id}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {entry.review_count}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {entry.review_count === 1 ? "review" : "reviews"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {leaderboard.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No reviews yet. Start reviewing applications to see the
                leaderboard!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Reviewer Detail Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedReviewer?.name || "Unknown"} - Review Statistics
              </DialogTitle>
            </DialogHeader>
            {loadingScores ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : reviewerScores ? (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {selectedReviewer?.email || selectedReviewer?.reviewer_id}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Resume Score
                      </CardTitle>
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Number(reviewerScores.avg_resume_score || 0).toFixed(
                          2,
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Out of 3
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Links Score
                      </CardTitle>
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Number(reviewerScores.avg_links_score || 0).toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Out of 2
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Q1 Score
                      </CardTitle>
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Number(reviewerScores.avg_q1_score || 0).toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Out of 7
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Q2 Score
                      </CardTitle>
                      <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {Number(reviewerScores.avg_q2_score || 0).toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Out of 3
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="text-center text-sm text-muted-foreground pt-2">
                  Based on {reviewerScores.total_reviews}{" "}
                  {reviewerScores.total_reviews === 1 ? "review" : "reviews"}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Failed to load reviewer scores
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
