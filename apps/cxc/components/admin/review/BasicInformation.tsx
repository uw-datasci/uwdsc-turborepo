"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@uwdsc/ui";

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
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          {application.email && (
            <div>
              <span className="font-medium">Email:</span> {application.email}
            </div>
          )}
          {application.phone_number && (
            <div>
              <span className="font-medium">Phone:</span>{" "}
              {application.phone_number}
            </div>
          )}
          {application.discord && (
            <div>
              <span className="font-medium">Discord:</span>{" "}
              {application.discord}
            </div>
          )}
          {application.t_shirt && (
            <div>
              <span className="font-medium">T-Shirt Size:</span>{" "}
              {application.t_shirt}
            </div>
          )}
          {application.dietary_restrictions && (
            <div>
              <span className="font-medium">Dietary Restrictions:</span>{" "}
              {application.dietary_restrictions}
            </div>
          )}
          {application.gender && (
            <div>
              <span className="font-medium">Gender:</span> {application.gender}
            </div>
          )}
          {application.ethnicity && (
            <div>
              <span className="font-medium">Ethnicity:</span>{" "}
              {application.ethnicity}
            </div>
          )}
          {application.uni_name && (
            <div>
              <span className="font-medium">University:</span>{" "}
              {application.uni_name}
            </div>
          )}
          {application.uni_program && (
            <div>
              <span className="font-medium">Program:</span>{" "}
              {application.uni_program}
            </div>
          )}
          {application.year_of_study && (
            <div>
              <span className="font-medium">Year of Study:</span>{" "}
              {application.year_of_study}
            </div>
          )}
          {application.prior_hack_exp && (
            <div>
              <span className="font-medium">Prior Hackathon Experience:</span>{" "}
              {application.prior_hack_exp}
            </div>
          )}
          {application.num_hackathons && (
            <div>
              <span className="font-medium">Hackathons Attended:</span>{" "}
              {application.num_hackathons}
            </div>
          )}
          {application.team_members?.trim() && (
            <div className="pt-2">
              {application.team_name && (
                <div className="mb-3">
                  <span className="font-medium text-lg">
                    Team Name:{" "}
                    <span className="font-semibold">
                      {application.team_name}
                    </span>
                  </span>
                </div>
              )}
              <span className="font-medium block mb-2">Team Members:</span>
              <div className="flex flex-wrap gap-2">
                {application.team_members_with_names &&
                application.team_members_with_names.length > 0
                  ? application.team_members_with_names.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg rounded-md border border-primary/20"
                      >
                        <span className="text-foreground">
                          {member.display_name ? (
                            <>
                              <span>{member.display_name}</span>
                              <span className="text-muted-foreground">
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
                        className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg rounded-md border border-primary/20"
                      >
                        <span className="text-foreground">{email.trim()}</span>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
