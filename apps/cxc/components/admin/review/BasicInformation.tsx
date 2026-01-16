"use client";

import React from "react";
import { motion } from "framer-motion";

interface Application {
  id: string;
  profile_id: string;
  phone_number?: string;
  discord?: string;
  email?: string;
  t_shirt?: string;
  dietary_restrictions?: string;
  gender?: string;
  ethnicity?: string;
  uni_name?: string;
  uni_program?: string;
  year_of_study?: string;
  prior_hack_exp?: string;
  num_hackathons?: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  other_url?: string;
  cxc_q1?: string;
  cxc_q2?: string;
  team_members?: string;
  team_name?: string | null;
  team_members_with_names?: Array<{
    email: string;
    display_name: string | null;
  }>;
  resume_url?: string;
}

interface BasicInformationProps {
  readonly application: Application;
}

export function BasicInformation({
  application,
}: Readonly<BasicInformationProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black border border-white/20"
    >
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">Basic Information</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2 text-sm text-white/80">
          {application.uni_name && (
            <div>
              <span className="font-medium text-white">University:</span>{" "}
              {application.uni_name}
            </div>
          )}
          {application.uni_program && (
            <div>
              <span className="font-medium text-white">Program:</span>{" "}
              {application.uni_program}
            </div>
          )}
          {application.year_of_study && (
            <div>
              <span className="font-medium text-white">Year of Study:</span>{" "}
              {application.year_of_study}
            </div>
          )}
          {application.prior_hack_exp && (
            <div>
              <span className="font-medium text-white">
                Prior Hackathon Experience:
              </span>{" "}
              {application.prior_hack_exp}
            </div>
          )}
          {application.num_hackathons && (
            <div>
              <span className="font-medium text-white">
                Hackathons Attended:
              </span>{" "}
              {application.num_hackathons}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
