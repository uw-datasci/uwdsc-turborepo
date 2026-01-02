"use client";

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

interface TeamSectionProps {
  teamMembers?: string[] | string;
  teamName?: string | null;
  className?: string;
}

export function TeamSection({
  teamMembers = [],
  teamName,
  className,
}: Readonly<TeamSectionProps>) {
  const { user } = useAuth();
  const currentUserEmail = user?.email?.toLowerCase();

  const normalizedMembers: string[] = Array.isArray(teamMembers)
    ? teamMembers
    : typeof teamMembers === "string" && teamMembers.trim() !== ""
      ? teamMembers
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean)
      : [];

  // Filter out the current user from the team members list
  const otherMembers = currentUserEmail
    ? normalizedMembers.filter(
        (member) => member.toLowerCase() !== currentUserEmail,
      )
    : normalizedMembers;

  const hasTeam = otherMembers.length > 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
    >
      <Card className="bg-black border border-white/20 rounded-none">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white flex items-center gap-2 uppercase tracking-wider text-sm">
            <UsersIcon className="w-5 h-5" />
            Team
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {hasTeam ? (
            <div className="space-y-4">
              {teamName && (
                <div className="mb-3">
                  <p className="text-white font-medium">
                    Team: <span className="font-mono">{teamName}</span>
                  </p>
                </div>
              )}
              <p className="text-white/60 text-sm">
                {otherMembers.length} team member
                {otherMembers.length > 1 ? "s" : ""}
              </p>
              <div className="flex flex-wrap gap-3">
                {otherMembers.map((member, index) => (
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
                      {member}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                You haven&apos;t added any team members yet. You can add
                teammates through your application.
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
