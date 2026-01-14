"use client";

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
          {application.email && (
            <div>
              <span className="font-medium text-white">Email:</span>{" "}
              {application.email}
            </div>
          )}
          {application.phone_number && (
            <div>
              <span className="font-medium text-white">Phone:</span>{" "}
              {application.phone_number}
            </div>
          )}
          {application.discord && (
            <div>
              <span className="font-medium text-white">Discord:</span>{" "}
              {application.discord}
            </div>
          )}
          {application.t_shirt && (
            <div>
              <span className="font-medium text-white">T-Shirt Size:</span>{" "}
              {application.t_shirt}
            </div>
          )}
          {application.dietary_restrictions && (
            <div>
              <span className="font-medium text-white">
                Dietary Restrictions:
              </span>{" "}
              {application.dietary_restrictions}
            </div>
          )}
          {application.gender && (
            <div>
              <span className="font-medium text-white">Gender:</span>{" "}
              {application.gender}
            </div>
          )}
          {application.ethnicity && (
            <div>
              <span className="font-medium text-white">Ethnicity:</span>{" "}
              {application.ethnicity}
            </div>
          )}
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
          {application.team_members?.trim() && (
            <div className="pt-2">
              {application.team_name && (
                <div className="mb-3">
                  <span className="font-medium text-lg text-white">
                    Team Name:{" "}
                    <span className="font-semibold">
                      {application.team_name}
                    </span>
                  </span>
                </div>
              )}
              <span className="font-medium text-white block mb-2">
                Team Members:
              </span>
              <div className="flex flex-wrap gap-2">
                {application.team_members_with_names &&
                application.team_members_with_names.length > 0
                  ? application.team_members_with_names.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20"
                      >
                        <span className="text-white/80">
                          {member.display_name ? (
                            <>
                              <span>{member.display_name}</span>
                              <span className="text-white/40">
                                {" "}
                                ({member.email})
                              </span>
                            </>
                          ) : (
                            <span>{member.email}</span>
                          )}
                        </span>
                      </div>
                    ))
                  : application.team_members.split(",").map((email, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/20"
                      >
                        <span className="text-white/80">{email.trim()}</span>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
