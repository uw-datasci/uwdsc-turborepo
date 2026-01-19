"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Tabs, TabsList, TabsTrigger, TabsContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@uwdsc/ui";
import { Plus, Trash2, Edit, Users } from "lucide-react";
import { LoadingScreen } from "@/components/LoadingScreen";
import CxCButton from "@/components/CxCButton";
import {
  getAllProjects,
  deleteProject,
  getAllJudges,
  assignJudges,
} from "@/lib/api";
import type { ProjectWithAssignments, Judge } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@uwdsc/ui";
import { Input } from "@uwdsc/ui";
import { Label } from "@uwdsc/ui";
import { Textarea } from "@uwdsc/ui";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithAssignments[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "judges">("projects");

  // Assign judges form state
  const [judgesPerGroup, setJudgesPerGroup] = useState(3);
  const [timesJudged, setTimesJudged] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [timeslotDurationMinutes, setTimeslotDurationMinutes] = useState(30);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch projects and judges separately to avoid one hanging the other
      console.log("[AdminProjects] Fetching projects...");
      const projectsData = await getAllProjects();
      console.log("[AdminProjects] Projects fetched:", projectsData.projects.length);
      setProjects(projectsData.projects);
      
      console.log("[AdminProjects] Fetching judges...");
      try {
        const judgesData = await getAllJudges();
        console.log("[AdminProjects] Judges fetched:", judgesData.judges.length);
        setJudges(judgesData.judges);
      } catch (judgeError) {
        console.error("[AdminProjects] Error fetching judges:", judgeError);
        // Don't fail the whole page if judges fail
        setJudges([]);
        setError(
          judgeError instanceof Error
            ? `Failed to load judges: ${judgeError.message}`
            : "Failed to load judges",
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load data. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await deleteProject(projectId);
      await fetchData();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete project.",
      );
    }
  };

  const handleAssignJudges = async () => {
    if (!startDate) {
      setError("Please select start date and time");
      return;
    }

    try {
      setAssigning(true);
      setError(null);
      await assignJudges({
        judgesPerGroup,
        timesJudged,
        startDate,
        timeslotDurationMinutes,
      });
      setAssignDialogOpen(false);
      alert("Judges assigned successfully!");
    } catch (err) {
      console.error("Error assigning judges:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to assign judges.",
      );
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="LOADING PROJECTS..." />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Manage projects and assign judges
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
              <DialogTrigger asChild>
                <CxCButton className="gap-2">
                  <Users className="w-4 h-4" />
                  Assign Judges
                </CxCButton>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Assign Judges to Projects</DialogTitle>
                  <DialogDescription>
                    Configure judge assignments. Judges will be randomly
                    assigned to projects in groups.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="judgesPerGroup">Judges per Group</Label>
                    <Input
                      id="judgesPerGroup"
                      type="number"
                      min="1"
                      value={judgesPerGroup}
                      onChange={(e) =>
                        setJudgesPerGroup(parseInt(e.target.value) || 1)
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of judges to assign together per project
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timesJudged">Times Each Project is Judged</Label>
                    <Input
                      id="timesJudged"
                      type="number"
                      min="1"
                      value={timesJudged}
                      onChange={(e) =>
                        setTimesJudged(parseInt(e.target.value) || 1)
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of times each project should be judged
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      When judging sessions begin
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeslotDuration">
                      Timeslot Duration (minutes)
                    </Label>
                    <Input
                      id="timeslotDuration"
                      type="number"
                      min="1"
                      value={timeslotDurationMinutes}
                      onChange={(e) =>
                        setTimeslotDurationMinutes(
                          parseInt(e.target.value) || 30,
                        )
                      }
                    />
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Summary:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Total judges: {judges.length}</li>
                      <li>
                        • Judge groups:{" "}
                        {judges.length > 0
                          ? Math.floor(judges.length / judgesPerGroup)
                          : 0}
                      </li>
                      <li>• Times each project judged: {timesJudged}</li>
                      <li>• Total projects: {projects.length}</li>
                    </ul>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setAssignDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <CxCButton onClick={handleAssignJudges} disabled={assigning}>
                      {assigning ? "Assigning..." : "Assign Judges"}
                    </CxCButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "projects" | "judges")}>
              <TabsList>
                <TabsTrigger value="projects">
                  Projects ({projects.length})
                </TabsTrigger>
                <TabsTrigger value="judges">
                  Judges ({judges.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "projects" | "judges")}>
              <TabsContent value="projects" className="mt-4">
                <div className="space-y-6">
                  {projects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No projects found
                    </p>
                  ) : (() => {
                    // Build grid: timeslots (x-axis) x judge groups (y-axis)
                    const timeslots = new Set<string>();
                    const judgeGroups = new Set<string>();
                    const gridData = new Map<string, Map<string, ProjectWithAssignments[]>>(); // group_id -> timeslot -> projects

                    // Collect all timeslots and groups, and build grid data
                    projects.forEach((project) => {
                      if (project.assignments && project.assignments.length > 0) {
                        project.assignments.forEach((assignment) => {
                          timeslots.add(assignment.start_time);
                          judgeGroups.add(assignment.group_id);
                          
                          if (!gridData.has(assignment.group_id)) {
                            gridData.set(assignment.group_id, new Map());
                          }
                          const groupMap = gridData.get(assignment.group_id)!;
                          
                          if (!groupMap.has(assignment.start_time)) {
                            groupMap.set(assignment.start_time, []);
                          }
                          
                          // Only add project if not already in this cell
                          if (!groupMap.get(assignment.start_time)!.some(p => p.id === project.id)) {
                            groupMap.get(assignment.start_time)!.push(project);
                          }
                        });
                      }
                    });

                    const sortedTimeslots = Array.from(timeslots).sort(
                      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
                    );
                    const sortedGroups = Array.from(judgeGroups).sort();

                    if (sortedTimeslots.length === 0 || sortedGroups.length === 0) {
                      return (
                        <p className="text-muted-foreground text-center py-8">
                          No judge assignments yet. Assign judges to see the schedule.
                        </p>
                      );
                    }

                    // Get judge emails for each group
                    const groupJudges = new Map<string, string[]>();
                    projects.forEach((project) => {
                      if (project.assignments) {
                        project.assignments.forEach((assignment) => {
                          if (!groupJudges.has(assignment.group_id)) {
                            groupJudges.set(assignment.group_id, []);
                          }
                          const judgeEmail = assignment.judge_email || `Judge ${assignment.judge_id.slice(0, 8)}`;
                          if (!groupJudges.get(assignment.group_id)!.includes(judgeEmail)) {
                            groupJudges.get(assignment.group_id)!.push(judgeEmail);
                          }
                        });
                      }
                    });

                    return (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="sticky left-0 z-10 bg-background min-w-[200px]">
                                Judge Group
                              </TableHead>
                              {sortedTimeslots.map((timeslot) => (
                                <TableHead key={timeslot} className="min-w-[180px]">
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
                                  <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground mb-1">
                                      {groupId.slice(0, 8)}...
                                    </span>
                                    <div className="flex flex-wrap gap-1">
                                      {groupJudges.get(groupId)?.map((judge, idx) => (
                                        <span key={idx} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                          {judge}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </TableCell>
                                {sortedTimeslots.map((timeslot) => {
                                  const projectsInCell = gridData.get(groupId)?.get(timeslot) || [];
                                  return (
                                    <TableCell key={timeslot} className="align-top">
                                      {projectsInCell.length === 0 ? (
                                        <span className="text-muted-foreground text-xs">-</span>
                                      ) : (
                                        <div className="space-y-2">
                                          {projectsInCell.map((project) => (
                                            <div
                                              key={project.id}
                                              className="bg-muted/50 p-2 rounded text-sm border"
                                            >
                                              <div className="font-medium">{project.title}</div>
                                              <div className="text-xs text-muted-foreground mt-1">
                                                {project.team_name || "Solo"}
                                              </div>
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
              </TabsContent>
              <TabsContent value="judges" className="mt-4">
                <div className="space-y-4">
                  {judges.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No judges found
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {judges.map((judge) => (
                        <Card key={judge.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">
                                  {judge.email || "Unknown Email"}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Judge ID: {judge.id}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
