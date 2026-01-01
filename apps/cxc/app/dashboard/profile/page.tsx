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
  Badge,
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
          <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-64 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-48 bg-white/5 rounded-lg animate-pulse" />
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
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
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
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="w-20 h-20 bg-white/10 border-2 border-white/20">
                  <AvatarFallback className="bg-white/10 text-white text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {fullName && (
                    <h2 className="text-2xl font-bold text-white">
                      {fullName}
                    </h2>
                  )}
                  <p className="text-white/60">{user.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-white/10 text-white/80 border-white/20 capitalize">
                      {user.role}
                    </Badge>
                    {user.nfc_id && (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        NFC: {user.nfc_id}
                      </Badge>
                    )}
                    {application?.status && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 capitalize">
                        {application.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-white font-medium mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <EnvelopeSimpleIcon className="w-5 h-5 text-white/40" />
                    <div>
                      <p className="text-white/40 text-xs">Email</p>
                      <p className="text-white text-sm">{user.email}</p>
                    </div>
                  </div>
                  {application?.phone && (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <PhoneIcon className="w-5 h-5 text-white/40" />
                      <div>
                        <p className="text-white/40 text-xs">Phone</p>
                        <p className="text-white text-sm">
                          {application.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {application?.discord && (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <DiscordLogoIcon className="w-5 h-5 text-white/40" />
                      <div>
                        <p className="text-white/40 text-xs">Discord</p>
                        <p className="text-white text-sm">
                          {application.discord}
                        </p>
                      </div>
                    </div>
                  )}
                  {application?.country_of_residence && (
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <GlobeIcon className="w-5 h-5 text-white/40" />
                      <div>
                        <p className="text-white/40 text-xs">Country</p>
                        <p className="text-white text-sm">
                          {application.country_of_residence}
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
                  <h3 className="text-white font-medium mb-4">Education</h3>
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                    <GraduationCapIcon className="w-6 h-6 text-white/40 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-white font-medium">
                        {application.university_name ||
                          application.university_name_other ||
                          "University not specified"}
                      </p>
                      <p className="text-white/60 text-sm">
                        {application.program ||
                          application.program_other ||
                          "Program not specified"}
                      </p>
                      <p className="text-white/40 text-sm">
                        {application.year_of_study || "Year not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="bg-white/10" />

              {/* Social Links */}
              <div>
                <h3 className="text-white font-medium mb-4">Social Links</h3>
                <div className="flex flex-wrap gap-3">
                  {application?.github && (
                    <a
                      href={application.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
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
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
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
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <BrowserIcon className="w-5 h-5" />
                      <span>Website</span>
                    </a>
                  )}
                  {!application?.github &&
                    !application?.linkedin &&
                    !application?.website_url && (
                      <p className="text-white/40 text-sm">
                        No social links added to your application.
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
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Hackathon Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-3xl font-bold text-white">
                    {application?.hackathons_attended || "—"}
                  </p>
                  <p className="text-white/40 text-sm mt-1">Prior Hackathons</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-3xl font-bold text-white">
                    {application?.team_members?.length || 0}
                  </p>
                  <p className="text-white/40 text-sm mt-1">Team Members</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-3xl font-bold text-white">0</p>
                  <p className="text-white/40 text-sm mt-1">Events Attended</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-3xl font-bold text-white">—</p>
                  <p className="text-white/40 text-sm mt-1">Check-ins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
