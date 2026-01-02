"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Form,
  Input,
  FormLabel,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormItem,
  FormControl,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@uwdsc/ui";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import {
  getUserEmails,
  createTeam,
  joinTeam,
  getMyTeam,
  leaveTeam,
  checkTeamName,
  type Team,
} from "@/lib/api";
import CxCButton from "../../CxCButton";

interface TeamsProps {
  readonly form: UseFormReturn<AppFormValues>;
  readonly useCard?: boolean; // If true, use Card with border (for dashboard), if false, use AppSection (for apply page)
}

export function Teams({ form, useCard = false }: TeamsProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordDialogMode, setPasswordDialogMode] = useState<
    "create" | "join"
  >("create");
  const [teamName, setTeamName] = useState("");
  const [passwordDialogPassword, setPasswordDialogPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");

  // Fetch user's team on mount
  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoadingTeam(true);
      try {
        console.log("[Teams] Fetching user's team on mount...");
        const result = await getMyTeam();
        console.log("[Teams] Team fetch result:", {
          success: result.success,
          hasTeam: !!result.team,
          teamName: result.team?.team_name,
        });

        if (result.success && result.team) {
          setTeam(result.team);
          // Get team members as array
          const members = [
            result.team.team_member_1,
            result.team.team_member_2,
            result.team.team_member_3,
            result.team.team_member_4,
          ].filter((m): m is string => m !== null);
          form.setValue("team_members", members);
          console.log(
            "[Teams] Set team state:",
            result.team.team_name,
            "Members:",
            members,
          );
        } else {
          // Explicitly set to null if no team found
          setTeam(null);
          form.setValue("team_members", []);
          console.log("[Teams] No team found, set to null");
        }
      } catch (error) {
        console.error("[Teams] Error fetching team:", error);
        // On error, assume no team
        setTeam(null);
        form.setValue("team_members", []);
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchTeam();
  }, [form]);

  // Fetch user emails for display
  const [userEmails, setUserEmails] = useState<
    Array<{ id: string; email: string; display_name: string | null }>
  >([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const result = await getUserEmails();
        setUserEmails(result.emails);
      } catch (error) {
        console.error("Failed to fetch user emails:", error);
      }
    };

    fetchEmails();
  }, []);

  // Get team members from team
  const teamMembers = useMemo(() => {
    if (!team) return [];
    return [
      team.team_member_1,
      team.team_member_2,
      team.team_member_3,
      team.team_member_4,
    ].filter((m): m is string => m !== null);
  }, [team]);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    // Check if team name already exists BEFORE showing password dialog
    try {
      const checkResult = await checkTeamName(teamName.trim());
      if (checkResult.exists) {
        setError("Cannot create team that already exists");
        return;
      }
    } catch (err) {
      console.error("[Teams] Error checking team name:", err);
      setError("Failed to check team name. Please try again.");
      return;
    }

    // Team name is available, show password dialog
    setError("");
    setModalError("");
    setPasswordDialogPassword("");
    setPasswordDialogMode("create");
    setShowPasswordDialog(true);
  };

  const handleJoinTeam = async () => {
    console.log("[Teams] handleJoinTeam called", {
      teamName: teamName.trim(),
    });

    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    // ALWAYS show password dialog when joining - clear password first
    setError("");
    setModalError("");
    setPasswordDialogPassword("");
    setPasswordDialogMode("join");
    setShowPasswordDialog(true);
  };

  const handlePasswordDialogSubmit = async () => {
    console.log("[Teams] handlePasswordDialogSubmit called", {
      mode: passwordDialogMode,
      hasPassword: !!passwordDialogPassword,
      passwordLength: passwordDialogPassword.length,
      teamName: teamName.trim(),
    });

    if (!passwordDialogPassword.trim()) {
      setError("Password is required");
      return;
    }

    setError("");

    if (passwordDialogMode === "create") {
      try {
        setIsCreating(true);
        const result = await createTeam({
          team_name: teamName.trim(),
          password: passwordDialogPassword,
        });

        if (result.success) {
          // Refresh team data
          const teamResult = await getMyTeam();
          if (teamResult.success && teamResult.team) {
            setTeam(teamResult.team);
            const members = [
              teamResult.team.team_member_1,
              teamResult.team.team_member_2,
              teamResult.team.team_member_3,
              teamResult.team.team_member_4,
            ].filter((m): m is string => m !== null);
            form.setValue("team_members", members);
          }
          setShowPasswordDialog(false);
          setPasswordDialogPassword("");
          setTeamName("");
        }
      } catch (err: unknown) {
        console.error("[Teams] Error creating team:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create team";
        setError(errorMessage);
      } finally {
        setIsCreating(false);
      }
    } else {
      // Join team
      try {
        setIsJoining(true);
        console.log("[Teams] Joining team directly after password dialog");
        const result = await joinTeam({
          team_name: teamName.trim(),
          password: passwordDialogPassword,
        });

        if (result.success) {
          // Refresh team data
          const teamResult = await getMyTeam();
          if (teamResult.success && teamResult.team) {
            setTeam(teamResult.team);
            const members = [
              teamResult.team.team_member_1,
              teamResult.team.team_member_2,
              teamResult.team.team_member_3,
              teamResult.team.team_member_4,
            ].filter((m): m is string => m !== null);
            form.setValue("team_members", members);
          }
          setShowPasswordDialog(false);
          setPasswordDialogPassword("");
          setTeamName("");
        }
      } catch (err: unknown) {
        console.error("[Teams] Join team error:", err);
        // Get error message - also check for 'error' property on the error object
        let errorMessage = "Failed to join team";
        if (err instanceof Error) {
          errorMessage = err.message;
          // Also check if there's an 'error' property (from createApiError)
          const apiError = err as Error & { error?: string };
          if (apiError.error) {
            errorMessage = apiError.error;
          }
        }

        const lowerMessage = errorMessage.toLowerCase();

        if (
          lowerMessage.includes("incorrect password") ||
          lowerMessage.includes("401")
        ) {
          setModalError("Incorrect password");
        } else if (
          lowerMessage.includes("not found") ||
          lowerMessage.includes("404")
        ) {
          setModalError(
            "Team not found. Please check the team name and try again.",
          );
        } else if (
          lowerMessage.includes("full") ||
          lowerMessage.includes("4 members")
        ) {
          setModalError("Team is full (maximum 4 members)");
        } else {
          setModalError(errorMessage);
        }
      } finally {
        setIsJoining(false);
      }
    }
  };

  const handleLeaveTeam = async () => {
    if (!team) return;

    console.log("[Teams] Leaving team:", team.team_name);
    setIsLeaving(true);
    setError("");

    try {
      const result = await leaveTeam();
      console.log("[Teams] Leave team result:", result);

      if (result.success) {
        // Clear team state
        setTeam(null);
        form.setValue("team_members", []);
      }
    } catch (err: unknown) {
      console.error("[Teams] Error leaving team:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to leave team";
      setError(errorMessage);
    } finally {
      setIsLeaving(false);
    }
  };

  // Helper to format user display name
  const formatUserName = (email: string) => {
    const user = userEmails.find((u) => u.email === email);
    return user?.display_name ? `${user.display_name} (${email})` : email;
  };

  if (isLoadingTeam) {
    if (useCard) {
      return (
        <Card className="bg-black border border-white/20 rounded-none">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Team Members (optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-white/60">Loading team information...</p>
          </CardContent>
        </Card>
      );
    }
    return (
      <AppSection label="Team Members (optional)">
        <p className="text-muted-foreground">Loading team information...</p>
      </AppSection>
    );
  }

  const content = (
    <div className="flex flex-col gap-4">
      {team ? (
        <>
          {/* Display team name and members when in a team */}
          {team.team_name && (
            <div className="flex flex-col gap-1">
              <p className="font-lg text-foreground">
                Team Name: <span className="">{team.team_name}</span>
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {!useCard && (
              <p className="text-lg font-medium text-foreground">
                Team Members (optional):
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg"
                >
                  <span className="text-foreground">
                    {formatUserName(email)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <CxCButton
            type="button"
            onClick={handleLeaveTeam}
            disabled={isLeaving}
            className="mt-4"
          >
            {isLeaving ? "Leaving..." : "Leave Team"}
          </CxCButton>
        </>
      ) : (
        <>
          {/* Create/Join team UI */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <FormLabel>Team Name</FormLabel>
              <Input
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  setError(""); // Clear error when typing
                }}
                placeholder="Enter team name"
                className="!h-auto !border-0 !px-4.5 !py-4 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-4">
              <CxCButton
                type="button"
                onClick={handleCreateTeam}
                disabled={isCreating || isJoining}
                className="flex-1 text-lg"
              >
                {isCreating ? "Creating..." : "Create Team"}
              </CxCButton>
              <Button
                type="button"
                onClick={handleJoinTeam}
                disabled={isCreating || isJoining}
                className="flex-1 !bg-black !text-white !border-white !border-[1px] font-normal rounded-none !h-auto hover:!bg-black text-lg"
              >
                {isJoining ? "Joining..." : "Join Team"}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {passwordDialogMode === "create"
                ? "Set Team Password"
                : "Enter Team Password"}
            </DialogTitle>
            <DialogDescription>
              {passwordDialogMode === "create"
                ? "Set a password for your team. Share this with members who want to join."
                : "Enter the password for the team you want to join."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <FormItem>
              <FormLabel className="font-normal mb-1">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={passwordDialogPassword}
                    onChange={(e) => {
                      setPasswordDialogPassword(e.target.value);
                      setModalError("");
                    }}
                    placeholder="Enter password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handlePasswordDialogSubmit();
                      }
                    }}
                    className="!h-auto !border-0 !px-4.5 !py-4 !pr-12 !text-base !border-b-[2px] !bg-cxc-input-bg !rounded-none !shadow-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </FormControl>
            </FormItem>
            {modalError && (
              <p className="text-sm text-destructive">{modalError}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                setShowPasswordDialog(false);
                setPasswordDialogPassword("");
                // Don't clear error - let it persist in the main form
              }}
              className="!bg-white !text-black !border-black !border-[1px] font-normal rounded-none !h-auto hover:!bg-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handlePasswordDialogSubmit}
              disabled={!passwordDialogPassword.trim()}
              className="!bg-black !text-white !border-white !border-[1px] font-normal rounded-none !h-auto hover:!bg-black"
            >
              {passwordDialogMode === "create" ? "Create" : "Join"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <Form {...form}>
      {useCard ? (
        <Card className="bg-black border border-white/20 rounded-none">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Team Members (optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {!team && (
              <p className="text-white/60 text-sm mb-4">
                Create a new team or join an existing team. Teams can have up to
                4 members.
              </p>
            )}
            {content}
          </CardContent>
        </Card>
      ) : (
        <AppSection
          description={
            !team
              ? "Create a new team or join an existing team. Teams can have up to 4 members."
              : undefined
          }
        >
          {content}
        </AppSection>
      )}
    </Form>
  );
}
