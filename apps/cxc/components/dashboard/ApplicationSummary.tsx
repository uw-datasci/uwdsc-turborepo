"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Separator,
  cn,
  GithubLogoIcon,
  LinkedinLogoIcon,
  BrowserIcon,
  LinkIcon,
} from "@uwdsc/ui";
import type { HackerApplication } from "@/types/application";

interface ApplicationSummaryProps {
  application: HackerApplication;
  className?: string;
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function InfoRow({ label, value, className }: Readonly<InfoRowProps>) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:justify-between gap-1",
        className
      )}
    >
      <span className="text-white/40 text-sm">{label}</span>
      <span className="text-white text-sm sm:text-right">{value}</span>
    </div>
  );
}

export function ApplicationSummary({
  application,
  className,
}: Readonly<ApplicationSummaryProps>) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("space-y-6", className)}
    >
      {/* Personal Information */}
      <motion.div variants={item}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow label="Phone" value={application.phone_number || "—"} />
            <InfoRow label="Discord" value={application.discord || "—"} />
            <InfoRow label="Age" value={application.age || "—"} />
            <InfoRow label="Gender" value={application.gender || "—"} />
            <InfoRow
              label="Country"
              value={application.country_of_residence || "—"}
            />
            <InfoRow label="T-Shirt Size" value={application.t_shirt || "—"} />
            <InfoRow
              label="Dietary Restrictions"
              value={application.dietary_restrictions || "None"}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Education */}
      <motion.div variants={item}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow label="University" value={application.uni_name || "—"} />
            <InfoRow label="Program" value={application.uni_program || "—"} />
            <InfoRow
              label="Year of Study"
              value={application.year_of_study || "—"}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Experience */}
      <motion.div variants={item}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow
              label="Hackathons Attended"
              value={application.num_hackathons || "0"}
            />
            <div className="flex flex-col gap-2">
              <span className="text-white/40 text-sm">Prior Experience</span>
              <div className="flex flex-wrap gap-2">
                {application.prior_hack_exp?.length > 0 ? (
                  application.prior_hack_exp.map((exp) => (
                    <Badge
                      key={exp}
                      className="bg-white/10 text-white/80 border-white/20"
                    >
                      {exp}
                    </Badge>
                  ))
                ) : (
                  <span className="text-white/60 text-sm">None specified</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Links */}
      <motion.div variants={item}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {application.github_url && (
                <a
                  href={application.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                >
                  <GithubLogoIcon className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {application.linkedin_url && (
                <a
                  href={application.linkedin_url}
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
              {application.other_url && (
                <a
                  href={application.other_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">Other</span>
                </a>
              )}
              {!application.github_url &&
                !application.linkedin_url &&
                !application.website_url &&
                !application.other_url && (
                  <span className="text-white/40 text-sm">
                    No links provided
                  </span>
                )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Short Answer Responses */}
      <motion.div variants={item}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Short Answer Responses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-white/40 text-sm mb-2">
                Why do you want to participate in CxC?
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {application.cxc_q1 || "No response provided"}
              </p>
            </div>
            <Separator className="bg-white/10" />
            <div>
              <p className="text-white/40 text-sm mb-2">
                What project idea are you excited to work on?
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {application.cxc_q2 || "No response provided"}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Members */}
      {application.team_members && application.team_members.length > 0 && (
        <motion.div variants={item}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-lg">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {application.team_members.map((member) => (
                  <Badge
                    key={member}
                    className="bg-white/10 text-white/80 border-white/20"
                  >
                    {member}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
