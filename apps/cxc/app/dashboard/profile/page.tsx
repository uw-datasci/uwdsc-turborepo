"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { getApplication } from "@/lib/api/application";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  Separator,
  GithubLogoIcon,
  LinkedinLogoIcon,
  BrowserIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  DiscordLogoIcon,
  GlobeIcon,
  GraduationCapIcon,
} from "@uwdsc/ui";
import { transformDatabaseDataToForm } from "@/lib/utils/formDataTransformer";
import { AppFormValues } from "@/lib/schemas/application";

export default function ProfilePage() {
  const { user } = useAuth();
  const [application, setApplication] = useState<AppFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      if (!user?.id) return;

      try {
        const data = await getApplication(user.id);
        if (!data) return;

        setApplication(
          transformDatabaseDataToForm(data) as AppFormValues | null,
        );
      } catch (error) {
        console.error("Error loading application:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadApplication();
  }, [user?.id]);

  if (isLoading || !user) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 w-48 bg-white/10 animate-pulse" />
          <div className="h-64 bg-white/5 border border-white/10 animate-pulse" />
          <div className="h-48 bg-white/5 border border-white/10 animate-pulse" />
        </div>
      </div>
    );
  }

  const initials =
    user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`
      : user.email?.[0]?.toUpperCase() || "?";

  const fullName =
    user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : null;

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-white/10 pb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider">
            Your Profile
          </h1>
          <p className="text-white/60 mt-1">
            View and manage your hacker profile.
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-black border border-white/20 rounded-none overflow-hidden !gap-0 !pt-0">
            {/* Profile Header */}
            <div className="bg-white/5 border-b border-white/10 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="w-20 h-20 bg-white/10 border border-white/20 rounded-none">
                  <AvatarFallback className="bg-white/10 text-white text-2xl rounded-none">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {fullName && (
                    <h2 className="text-2xl font-bold text-white">
                      {fullName}
                    </h2>
                  )}
                  <p className="text-white/60 font-mono">{user.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-white/80 text-sm border border-white/20 px-2 py-1 font-mono uppercase">
                      {user.role}
                    </span>
                    {user.nfc_id && (
                      <span className="text-emerald-400 text-sm border border-emerald-400 px-2 py-1 font-mono">
                        NFC: {user.nfc_id}
                      </span>
                    )}
                    {application?.status && (
                      <span className="text-blue-400 text-sm border border-blue-400 px-2 py-1 font-mono uppercase">
                        {application.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border border-white/10">
                    <EnvelopeSimpleIcon className="w-5 h-5 text-white/40" />
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-white text-sm font-mono">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {application?.phone && (
                    <div className="flex items-center gap-3 p-3 border border-white/10">
                      <PhoneIcon className="w-5 h-5 text-white/40" />
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">
                          Phone
                        </p>
                        <p className="text-white text-sm font-mono">
                          {application.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {application?.discord && (
                    <div className="flex items-center gap-3 p-3 border border-white/10">
                      <DiscordLogoIcon className="w-5 h-5 text-white/40" />
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">
                          Discord
                        </p>
                        <p className="text-white text-sm font-mono">
                          {application.discord}
                        </p>
                      </div>
                    </div>
                  )}
                  {application?.country_of_residence && (
                    <div className="flex items-center gap-3 p-3 border border-white/10">
                      <GlobeIcon className="w-5 h-5 text-white/40" />
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-wider">
                          Country
                        </p>
                        <p className="text-white text-sm font-mono">
                          {application.country_of_residence !== "Other"
                            ? application.country_of_residence
                            : application.country_of_residence_other}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Education */}
              {application && (
                <div>
                  <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                    Education
                  </h3>
                  <div className="flex items-start gap-3 p-4 border border-white/10">
                    <GraduationCapIcon className="w-6 h-6 text-white/40 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-white font-medium">
                        {application.university_name !== "Other"
                          ? application.university_name
                          : application.university_name_other ||
                            "University not specified"}
                      </p>
                      <p className="text-white/60 text-sm font-mono">
                        {application.program !== "Other"
                          ? application.program
                          : application.program_other || "—"}
                      </p>
                      <p className="text-white/40 text-sm font-mono">
                        {application.year_of_study || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-white/10" />

              {/* Social Links */}
              <div>
                <h3 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">
                  Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {application?.github && (
                    <a
                      href={application.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <GithubLogoIcon className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {application?.linkedin && (
                    <a
                      href={application.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <LinkedinLogoIcon className="w-5 h-5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {application?.website_url && (
                    <a
                      href={application.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <BrowserIcon className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  )}
                  {!application?.github &&
                    !application?.linkedin &&
                    !application?.website_url && (
                      <p className="text-white/40 text-sm">
                        No links added to your application.
                      </p>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-black border border-white/20 rounded-none !gap-0">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white uppercase tracking-wider text-sm">
                Hackathon Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-white/10">
                  <p className="text-3xl font-bold text-white font-mono">
                    {application?.hackathons_attended || "—"}
                  </p>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                    Prior Hackathons
                  </p>
                </div>
                <div className="text-center p-4 border border-white/10">
                  <p className="text-3xl font-bold text-white font-mono">
                    {application?.team_members?.length || 0}
                  </p>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                    Team Members
                  </p>
                </div>
                <div className="text-center p-4 border border-white/10">
                  <p className="text-3xl font-bold text-white font-mono">0</p>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                    Events Attended
                  </p>
                </div>
                <div className="text-center p-4 border border-white/10">
                  <p className="text-3xl font-bold text-white font-mono">—</p>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                    Check-ins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
