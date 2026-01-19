"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@uwdsc/ui";
import { LoadingScreen } from "@/components/LoadingScreen";
import CxCButton from "@/components/CxCButton";
import {
  getJudgeAssignments,
  getScoreByProject,
  submitScore,
} from "@/lib/api";
import type { JudgeAssignment } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@uwdsc/ui";

// Hardcoded criteria names
const CRITERIA = [
  { id: 1, name: "Innovation & Creativity" },
  { id: 2, name: "Technical Complexity" },
  { id: 3, name: "Design & User Experience" },
  { id: 4, name: "Impact & Potential" },
];

export default function JudgeDashboardPage() {
  const [assignments, setAssignments] = useState<JudgeAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scoringProject, setScoringProject] = useState<string | null>(null);
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [scoreData, setScoreData] = useState({
    criterion_1_score: 0,
    criterion_2_score: 0,
    criterion_3_score: 0,
    criterion_4_score: 0,
    comments: "",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getJudgeAssignments();
      setAssignments(data.assignments);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load assignments. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenScoreDialog = async (projectId: string) => {
    setScoringProject(projectId);
    setScoreDialogOpen(true);

    try {
      const data = await getScoreByProject(projectId);
      if (data.score) {
        setScoreData({
          criterion_1_score: data.score.criterion_1_score,
          criterion_2_score: data.score.criterion_2_score,
          criterion_3_score: data.score.criterion_3_score,
          criterion_4_score: data.score.criterion_4_score,
          comments: data.score.comments || "",
        });
      } else {
        setScoreData({
          criterion_1_score: 0,
          criterion_2_score: 0,
          criterion_3_score: 0,
          criterion_4_score: 0,
          comments: "",
        });
      }
    } catch (err) {
      console.error("Error fetching score:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load score.",
      );
    }
  };

  const handleSubmitScore = async () => {
    if (!scoringProject) return;

    // Validate scores (0-10)
    const scores = [
      scoreData.criterion_1_score,
      scoreData.criterion_2_score,
      scoreData.criterion_3_score,
      scoreData.criterion_4_score,
    ];

    if (scores.some((s) => s < 0 || s > 10)) {
      setError("Scores must be between 0 and 10");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await submitScore({
        project_id: scoringProject,
        criterion_1_score: scoreData.criterion_1_score,
        criterion_2_score: scoreData.criterion_2_score,
        criterion_3_score: scoreData.criterion_3_score,
        criterion_4_score: scoreData.criterion_4_score,
        comments: scoreData.comments.trim() || null,
      });
      setScoreDialogOpen(false);
      alert("Score submitted successfully!");
      await fetchAssignments();
    } catch (err) {
      console.error("Error submitting score:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit score. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="LOADING ASSIGNMENTS..." />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Judge Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Review and score assigned projects
          </p>
        </div>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              Assigned Projects ({assignments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assignments.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No projects assigned yet
                </p>
              ) : (() => {
                // Build grid: timeslots (x-axis) x judge groups (y-axis)
                const timeslots = new Set<string>();
                const judgeGroups = new Set<string>();
                const gridData = new Map<string, Map<string, JudgeAssignment[]>>(); // group_id -> timeslot -> assignments

                assignments.forEach((assignment) => {
                  timeslots.add(assignment.start_time);
                  judgeGroups.add(assignment.group_id);
                  
                  if (!gridData.has(assignment.group_id)) {
                    gridData.set(assignment.group_id, new Map());
                  }
                  const groupMap = gridData.get(assignment.group_id)!;
                  
                  if (!groupMap.has(assignment.start_time)) {
                    groupMap.set(assignment.start_time, []);
                  }
                  
                  groupMap.get(assignment.start_time)!.push(assignment);
                });

                const sortedTimeslots = Array.from(timeslots).sort(
                  (a, b) => new Date(a).getTime() - new Date(b).getTime(),
                );
                const sortedGroups = Array.from(judgeGroups).sort();

                return (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="sticky left-0 z-10 bg-background min-w-[150px]">
                            Judge Group
                          </TableHead>
                          {sortedTimeslots.map((timeslot) => (
                            <TableHead key={timeslot} className="min-w-[200px]">
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {new Date(timeslot).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(timeslot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedGroups.map((groupId) => (
                          <TableRow key={groupId}>
                            <TableCell className="sticky left-0 z-10 bg-background font-medium">
                              <span className="text-xs text-muted-foreground">
                                {groupId.slice(0, 8)}...
                              </span>
                            </TableCell>
                            {sortedTimeslots.map((timeslot) => {
                              const assignmentsInCell = gridData.get(groupId)?.get(timeslot) || [];
                              return (
                                <TableCell key={timeslot} className="align-top">
                                  {assignmentsInCell.length === 0 ? (
                                    <span className="text-muted-foreground text-xs">-</span>
                                  ) : (
                                    <div className="space-y-2">
                                      {assignmentsInCell.map((assignment) => (
                                        <div
                                          key={assignment.id}
                                          className="bg-muted/50 p-2 rounded text-sm border"
                                        >
                                          <div className="font-medium">{assignment.project_title}</div>
                                          <div className="text-xs text-muted-foreground mt-1">
                                            {assignment.team_name || "Solo"}
                                          </div>
                                          <CxCButton
                                            size="sm"
                                            className="mt-2 w-full"
                                            onClick={() =>
                                              handleOpenScoreDialog(assignment.project_id)
                                            }
                                          >
                                            Score Project
                                          </CxCButton>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        <Dialog open={scoreDialogOpen} onOpenChange={setScoreDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Score Project</DialogTitle>
              <DialogDescription>
                Rate the project on the following criteria (0-10 scale)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="criterion_1">
                  {CRITERIA[0]!.name} (0-10)
                </Label>
                <Input
                  id="criterion_1"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={scoreData.criterion_1_score}
                  onChange={(e) =>
                    setScoreData({
                      ...scoreData,
                      criterion_1_score: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criterion_2">
                  {CRITERIA[1]!.name} (0-10)
                </Label>
                <Input
                  id="criterion_2"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={scoreData.criterion_2_score}
                  onChange={(e) =>
                    setScoreData({
                      ...scoreData,
                      criterion_2_score: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criterion_3">
                  {CRITERIA[2]!.name} (0-10)
                </Label>
                <Input
                  id="criterion_3"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={scoreData.criterion_3_score}
                  onChange={(e) =>
                    setScoreData({
                      ...scoreData,
                      criterion_3_score: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criterion_4">
                  {CRITERIA[3]!.name} (0-10)
                </Label>
                <Input
                  id="criterion_4"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={scoreData.criterion_4_score}
                  onChange={(e) =>
                    setScoreData({
                      ...scoreData,
                      criterion_4_score: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  value={scoreData.comments}
                  onChange={(e) =>
                    setScoreData({ ...scoreData, comments: e.target.value })
                  }
                  placeholder="Add any comments about the project..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setScoreDialogOpen(false)}
                >
                  Cancel
                </Button>
                <CxCButton onClick={handleSubmitScore} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Score"}
                </CxCButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
