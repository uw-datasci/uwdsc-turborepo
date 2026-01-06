"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@uwdsc/ui";
import type { FullApplicationDetails } from "@/types/api";

interface ApplicationModalProps {
  application: FullApplicationDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationModal({
  application,
  open,
  onOpenChange,
}: Readonly<ApplicationModalProps>) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            Full application information for{" "}
            {application.name || application.email}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {application.name && (
                  <div>
                    <span className="font-medium">Name:</span>{" "}
                    {application.name}
                  </div>
                )}
                {application.email && (
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {application.email}
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
                {application.age && (
                  <div>
                    <span className="font-medium">Age:</span> {application.age}
                  </div>
                )}
                {application.gender && (
                  <div>
                    <span className="font-medium">Gender:</span>{" "}
                    {application.gender}
                  </div>
                )}
                {application.ethnicity && (
                  <div>
                    <span className="font-medium">Ethnicity:</span>{" "}
                    {application.ethnicity}
                  </div>
                )}
                {application.country_of_residence && (
                  <div>
                    <span className="font-medium">Country of Residence:</span>{" "}
                    {application.country_of_residence}
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
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {application.num_hackathons && (
                  <div>
                    <span className="font-medium">Number of Hackathons:</span>{" "}
                    {application.num_hackathons}
                  </div>
                )}
                {application.prior_hack_exp && (
                  <div>
                    <span className="font-medium">Prior Experience:</span>
                    <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                      {application.prior_hack_exp}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Links */}
            {(application.github_url ||
              application.linkedin_url ||
              application.website_url ||
              application.other_url ||
              application.resume_url) && (
              <Card>
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {application.github_url && (
                    <div>
                      <span className="font-medium">GitHub:</span>{" "}
                      <a
                        href={application.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {application.github_url}
                      </a>
                    </div>
                  )}
                  {application.linkedin_url && (
                    <div>
                      <span className="font-medium">LinkedIn:</span>{" "}
                      <a
                        href={application.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {application.linkedin_url}
                      </a>
                    </div>
                  )}
                  {application.website_url && (
                    <div>
                      <span className="font-medium">Website/X:</span>{" "}
                      <a
                        href={application.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {application.website_url}
                      </a>
                    </div>
                  )}
                  {application.other_url && (
                    <div>
                      <span className="font-medium">Other Link:</span>{" "}
                      <a
                        href={application.other_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {application.other_url}
                      </a>
                    </div>
                  )}
                  {application.resume_url && (
                    <div>
                      <span className="font-medium">Resume:</span>{" "}
                      <a
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline font-medium"
                      >
                        View Resume ↗
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Team */}
            {application.team_members?.trim() && (
              <Card>
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {application.team_name && (
                    <div>
                      <span className="font-medium">Team Name:</span>{" "}
                      <span className="font-semibold">
                        {application.team_name}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium block mb-2">
                      Team Members:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {application.team_members_with_names &&
                      application.team_members_with_names.length > 0
                        ? application.team_members_with_names.map(
                            (member, index) => (
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
                            )
                          )
                        : application.team_members
                            .split(",")
                            .map((email, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg rounded-md border border-primary/20"
                              >
                                <span className="text-foreground">
                                  {email.trim()}
                                </span>
                              </div>
                            ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Questions */}
            {application.cxc_q1 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Tell us about a technical project that you have worked on.
                    What did you learn? What challenges did you face?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {application.cxc_q1}
                  </p>
                </CardContent>
              </Card>
            )}

            {application.cxc_q2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Write us a Haiku</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {application.cxc_q2}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* MLH Agreements */}
            {(application.mlh_agreed_code_of_conduct !== null ||
              application.mlh_authorize_info_sharing !== null ||
              application.mlh_email_opt_in !== null) && (
              <Card>
                <CardHeader>
                  <CardTitle>MLH Agreements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {application.mlh_agreed_code_of_conduct !== null && (
                    <div>
                      <span className="font-medium">Code of Conduct:</span>{" "}
                      {application.mlh_agreed_code_of_conduct
                        ? "Agreed"
                        : "Not Agreed"}
                    </div>
                  )}
                  {application.mlh_authorize_info_sharing !== null && (
                    <div>
                      <span className="font-medium">
                        Authorize Info Sharing:
                      </span>{" "}
                      {application.mlh_authorize_info_sharing ? "Yes" : "No"}
                    </div>
                  )}
                  {application.mlh_email_opt_in !== null && (
                    <div>
                      <span className="font-medium">Email Opt-In:</span>{" "}
                      {application.mlh_email_opt_in ? "Yes" : "No"}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Review Count */}
            <Card>
              <CardHeader>
                <CardTitle>Review Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <span className="font-medium">Number of Reviews:</span>{" "}
                  {application.review_count}
                </div>
                {application.submitted_at && (
                  <div className="mt-2">
                    <span className="font-medium">Submitted At:</span>{" "}
                    {new Date(application.submitted_at).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
