"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  UsersIcon,
} from "@uwdsc/ui";
import { useAuth } from "@/contexts/AuthContext";
import { getUserEmails, type Team } from "@/lib/api";

interface TeamSectionProps {
  team?: Team | null;
  className?: string;
}

export function TeamSection({ team, className }: Readonly<TeamSectionProps>) {
  const { user } = useAuth();
  const currentUserEmail = user?.email?.toLowerCase();

  // Get team members from team object
  const teamMembers = useMemo(() => {
    if (!team) return [];
    return [
      team.team_member_1,
      team.team_member_2,
      team.team_member_3,
      team.team_member_4,
    ].filter((m): m is string => m !== null);
  }, [team]);

  // Fetch user emails for display names
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

  // Format user display name
  const formatUserName = (email: string) => {
    const user = userEmails.find((u) => u.email === email);
    return user?.display_name ? `${user.display_name} (${email})` : email;
  };

  // Filter out current user from display
  const displayMembers = currentUserEmail
    ? teamMembers.filter((member) => member.toLowerCase() !== currentUserEmail)
    : teamMembers;

  // hasTeam is true if they have a team (even if alone), or if they have team members
  const hasTeam = !!team || displayMembers.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
    >
      <Card className="bg-black border border-white/20 rounded-none !gap-0">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center gap-2 uppercase tracking-wider text-sm">
            <UsersIcon className="w-5 h-5" />
            Team
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {team?.team_name && (
            <div className="mb-4">
              <p className="text-white font-medium">
                Team: <span className="font-mono">{team.team_name}</span>
              </p>
            </div>
          )}

          {hasTeam ? (
            <div className="space-y-4">
              {displayMembers.length > 0 ? (
                <>
                  <p className="text-white/60 text-sm">
                    {displayMembers.length} team member
                    {displayMembers.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {displayMembers.map((member, index) => (
                      <motion.div
                        key={member}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 px-3 py-2 border border-white/20"
                      >
                        <Avatar className="w-6 h-6 rounded-none">
                          <AvatarFallback className="bg-white/10 text-white text-xs rounded-none">
                            {(member.split("@")[0] || member)
                              .substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white/80 text-sm font-mono">
                          {formatUserName(member)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4 border border-dashed border-white/20">
                  <div className="flex items-center gap-3 text-white/60">
                    <UsersIcon className="w-6 h-6" />
                    <div>
                      <p className="text-sm font-medium">Solo Team</p>
                      <p className="text-xs text-white/40">
                        You&apos;re the only member. Others can join with your
                        team password!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                You haven&apos;t joined a team yet. You can create or join a
                team through your application.
              </p>
              <div className="p-4 border border-dashed border-white/20">
                <div className="flex items-center gap-3 text-white/40">
                  <UsersIcon className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-medium">Solo Hacker</p>
                    <p className="text-xs">
                      You can still form teams at the event!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
