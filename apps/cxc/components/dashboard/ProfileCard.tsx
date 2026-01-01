"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  Badge,
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
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="w-16 h-16 bg-white/10 border-2 border-white/20">
              <AvatarFallback className="bg-white/10 text-white text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              {fullName && (
                <h3 className="text-white text-lg font-medium">{fullName}</h3>
              )}
              <p className="text-white/60 text-sm">{user.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/10 text-white/80 border-white/20 capitalize">
                  {user.role}
                </Badge>
                {user.nfc_id && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    NFC Registered
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          {application && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-white/40 text-sm mb-3">Social Links</p>
              <div className="flex flex-wrap gap-3">
                {application.github && (
                  <a
                    href={application.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
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
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
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
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                  >
                    <BrowserIcon className="w-4 h-4" />
                    <span className="text-sm">Website</span>
                  </a>
                )}
                {!application.github &&
                  !application.linkedin &&
                  !application.website_url && (
                    <span className="text-white/40 text-sm">
                      No social links added
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
