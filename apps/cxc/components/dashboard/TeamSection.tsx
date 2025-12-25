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

interface TeamSectionProps {
  teamMembers?: string[];
  className?: string;
}

export function TeamSection({
  teamMembers = [],
  className,
}: Readonly<TeamSectionProps>) {
  const hasTeam = teamMembers?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />
            Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasTeam ? (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">
                You&apos;re teaming up with {teamMembers.length} other{" "}
                {teamMembers.length === 1 ? "person" : "people"}!
              </p>
              <div className="flex flex-wrap gap-3">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg"
                  >
                    <Avatar className="w-6 h-6 bg-white/10">
                      <AvatarFallback className="bg-white/20 text-white text-xs">
                        {(member.split("@")[0] || member)
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white/80 text-sm">{member}</span>
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
              <div className="p-4 bg-white/5 rounded-lg border border-dashed border-white/20">
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
