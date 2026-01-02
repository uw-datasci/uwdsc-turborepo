"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback
} from "@uwdsc/ui";
import type { UserProfile } from "@/types/api";
import { AppFormValues } from "@/lib/schemas/application";

interface ProfileCardProps {
  user: UserProfile;
  application?: AppFormValues | null;
  className?: string;
}

export function ProfileCard({
  user,
  application,
  className,
}: Readonly<ProfileCardProps>) {
  const initials =
    user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user.email?.[0]?.toUpperCase() || "?";

  const fullName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={className}
    >
      <Card className="bg-black border border-white/20 rounded-none">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white uppercase tracking-wider text-sm">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="w-16 h-16 bg-white/10 border border-white/20 rounded-none">
              <AvatarFallback className="bg-white/10 text-white text-xl rounded-none">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {fullName && (
                <p className="text-white text-lg font-medium">{fullName}</p>
              )}
              <p className="text-white/60 text-sm font-mono">{user.email}</p>
              {(application?.university_name ||
                application?.university_name_other) && (
                <p className="text-white/40 text-sm mt-1">
                  {application.university_name !== "Other"
                    ? application.university_name
                    : application.university_name_other}{" "}
                  ·{" "}
                  {application.program !== "Other"
                    ? application.program
                    : application.program_other}
                </p>
              )}
            </div>
          </div>

          {/* Social Links (removed) */}
        </CardContent>
      </Card>
    </motion.div>
  );
}
