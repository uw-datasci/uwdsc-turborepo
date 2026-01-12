"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  cn,
  GithubLogoIcon,
  LinkedinLogoIcon,
  BrowserIcon,
  LinkIcon,
  FileTextIcon,
} from "@uwdsc/ui";

import { AppFormValues } from "@/lib/schemas/application";
import { getResume } from "@/lib/api/resume";
import { ETHNICITY_OTHER_LABEL } from "@/constants/application";

interface ApplicationSummaryProps {
  application: AppFormValues;
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
        "flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-white/5 last:border-0",
        className,
      )}
    >
      <span className="text-white/40 text-sm uppercase tracking-wider">
        {label}
      </span>
      <span className="text-white text-sm sm:text-right font-mono">
        {value}
      </span>
    </div>
  );
}

export function ApplicationSummary({
  application,
  className,
}: Readonly<ApplicationSummaryProps>) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  // Fetch resume URL and filename
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const result = await getResume();
        if (result.url && result.resume) {
          setResumeUrl(result.url);
          setResumeFileName(result.resume.name);
        }
      } catch {
        // No resume found - that's okay
      }
    };

    fetchResume();
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("space-y-6", className)}
    >
      {/* Personal Information */}
      <motion.div variants={item}>
        <Card className="bg-black border border-white/20 rounded-none !gap-0">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <InfoRow label="Phone" value={application.phone || "—"} />
            <InfoRow label="Discord" value={application.discord || "—"} />
            <InfoRow label="Age" value={application.age || "—"} />
            <InfoRow label="Gender" value={application.gender || "—"} />
            <InfoRow
              label="Ethnicity"
              value={
                application.ethnicity
                  ? Array.isArray(application.ethnicity) &&
                    application.ethnicity.includes(ETHNICITY_OTHER_LABEL)
                    ? application.ethnicity_other || "—"
                    : Array.isArray(application.ethnicity)
                      ? application.ethnicity.join(", ")
                      : "—"
                  : "—"
              }
            />
            <InfoRow
              label="Country"
              value={
                application.country_of_residence !== "Other"
                  ? application.country_of_residence
                  : application.country_of_residence_other || "—"
              }
            />
            <InfoRow
              label="T-Shirt Size"
              value={application.tshirt_size || "—"}
            />
            <InfoRow
              label="Dietary Restrictions"
              value={
                application.dietary_restrictions !== "Other"
                  ? application.dietary_restrictions
                  : application.dietary_restrictions_other || "—"
              }
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Education */}
      <motion.div variants={item}>
        <Card className="bg-black border border-white/20 rounded-none !gap-0">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <InfoRow
              label="University"
              value={
                application.university_name !== "Other"
                  ? application.university_name
                  : application.university_name_other || "—"
              }
            />
            <InfoRow
              label="Program"
              value={
                application.program !== "Other"
                  ? application.program
                  : application.program_other || "—"
              }
            />
            <InfoRow
              label="Year of Study"
              value={application.year_of_study || "—"}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Experience */}
      <motion.div variants={item}>
        <Card className="bg-black border border-white/20 rounded-none !gap-0">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <InfoRow
              label="Hackathons Attended"
              value={application.hackathons_attended || "0"}
            />
            <div className="py-2">
              <span className="text-white/40 text-sm uppercase tracking-wider">
                Prior Experience
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {application.prior_hackathon_experience?.length > 0 ? (
                  application.prior_hackathon_experience.map((exp) => (
                    <span
                      key={exp}
                      className="text-white/80 text-sm border border-white/20 px-2 py-1 font-mono"
                    >
                      {exp}
                    </span>
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
        <Card className="bg-black border border-white/20 rounded-none !gap-0">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Links
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
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
              {application.other_link && (
                <a
                  href={application.other_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm">Other</span>
                </a>
              )}
              {resumeUrl && resumeFileName && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                >
                  <FileTextIcon className="w-4 h-4" />
                  <span className="text-sm">Resume</span>
                </a>
              )}
              {!application.github &&
                !application.linkedin &&
                !application.website_url &&
                !application.other_link &&
                !resumeUrl && (
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
        <Card className="bg-black border border-white/20 rounded-none !gap-0">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-white text-sm uppercase tracking-wider">
              Short Answers
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div>
              <p className="text-white/40 text-sm mb-2 tracking-wider">
                Tell us about a technical project that you have worked on. What
                did you learn? What challenges did you face?
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {application.cxc_q1 || "No response provided"}
              </p>
            </div>
            <Separator className="bg-white/10" />
            <div>
              <p className="text-white/40 text-sm mb-2 tracking-wider">
                Write us a Haiku
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {application.cxc_q2 || "No response provided"}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
