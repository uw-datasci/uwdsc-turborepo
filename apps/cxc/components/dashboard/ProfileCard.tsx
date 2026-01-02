"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  GithubLogoIcon,
  LinkedinLogoIcon,
  BrowserIcon,
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
            <div className="text-right">
              <span className="text-white/40 text-xs uppercase tracking-wider">
                Role
              </span>
              <p className="text-white font-mono uppercase">{user.role}</p>
            </div>
          </div>

          {/* Social Links */}
          {application && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/40 text-sm mb-3 uppercase tracking-wider">
                Links
              </p>
              <div className="flex flex-wrap gap-3">
                {application.github && (
                  <a
                    href={application.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <GithubLogoIcon className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                )}
                {application.linkedin && (
                  <a
                    href={application.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <LinkedinLogoIcon className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                )}
                {application.website_url && (
                  <a
                    href={application.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <BrowserIcon className="w-4 h-4" />
                    <span className="text-sm">Website</span>
                  </a>
                )}
                {!application.github &&
                  !application.linkedin &&
                  !application.website_url && (
                    <span className="text-white/40 text-sm">
                      No links added
                    </span>
                  )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
