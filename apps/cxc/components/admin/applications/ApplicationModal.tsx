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
  Badge,
  IdentificationCardIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  DiscordLogoIcon,
  CakeIcon,
  GenderIntersexIcon,
  GlobeIcon,
  MapPinIcon,
  TShirtIcon,
  HamburgerIcon,
  GraduationCapIcon,
  BookIcon,
  CalendarIcon,
  TrophyIcon,
  UsersIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  BrowserIcon,
  LinkIcon,
  FileTextIcon,
  LightbulbIcon,
  SmileyIcon,
  CheckSquareIcon,
} from "@uwdsc/ui";
import type { FullApplicationDetails } from "@/types/api";
import { ApplicationSkeleton } from "./ApplicationSkeleton";

interface ApplicationModalProps {
  application: FullApplicationDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
}

export function ApplicationModal({
  application,
  open,
  onOpenChange,
  loading = false,
}: Readonly<ApplicationModalProps>) {
  // Get description text
  const getDescription = () => {
    if (loading) return "Loading application information...";
    if (application) {
      return `Full application information for ${application.name || application.email}`;
    }
    return "No application selected";
  };

  // Render content based on state
  const renderContent = () => {
    if (loading) return <ApplicationSkeleton />;

    if (application) {
      return (
        <div className="space-y-4 sm:space-y-6">
          {/* Two Column Layout: Basic Info | Education/Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:grid-rows-[1fr]">
            {/* Left Column: Basic Information */}
            <Card className="flex flex-col h-full">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 flex-1 text-sm sm:text-base">
                {application.name && (
                  <div className="flex items-center gap-2">
                    <IdentificationCardIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>{" "}
                    {application.name}
                  </div>
                )}
                {application.email && (
                  <div className="flex items-center gap-2">
                    <EnvelopeSimpleIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>{" "}
                    {application.email}
                  </div>
                )}
                {application.phone_number && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>{" "}
                    {application.phone_number}
                  </div>
                )}
                {application.discord && (
                  <div className="flex items-center gap-2">
                    <DiscordLogoIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Discord:</span>{" "}
                    {application.discord}
                  </div>
                )}
                {application.age && (
                  <div className="flex items-center gap-2">
                    <CakeIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Age:</span> {application.age}
                  </div>
                )}
                {application.gender && (
                  <div className="flex items-center gap-2">
                    <GenderIntersexIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Gender:</span>{" "}
                    {application.gender}
                  </div>
                )}
                {application.ethnicity && application.ethnicity.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <GlobeIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">Ethnicity:</span>
                    {application.ethnicity.map((ethnicity, index) => (
                      <Badge key={index} variant="secondary">
                        {ethnicity}
                      </Badge>
                    ))}
                  </div>
                )}
                {application.country_of_residence && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      Country of Residence:
                    </span>{" "}
                    {application.country_of_residence}
                  </div>
                )}
                {application.t_shirt && (
                  <div className="flex items-center gap-2">
                    <TShirtIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">T-Shirt Size:</span>{" "}
                    {application.t_shirt}
                  </div>
                )}
                {application.dietary_restrictions && (
                  <div className="flex items-center gap-2">
                    <HamburgerIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      Dietary Restrictions:
                    </span>{" "}
                    {application.dietary_restrictions}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Column: Education, Experience */}
            <div className="flex flex-col gap-4 sm:gap-6 h-full">
              {/* Education */}
              <Card className="flex-1">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  {application.uni_name && (
                    <div className="flex items-center gap-2">
                      <GraduationCapIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">University:</span>{" "}
                      {application.uni_name}
                    </div>
                  )}
                  {application.uni_program && (
                    <div className="flex items-center gap-2">
                      <BookIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Program:</span>{" "}
                      {application.uni_program}
                    </div>
                  )}
                  {application.year_of_study && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Year of Study:</span>{" "}
                      {application.year_of_study}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="flex-1">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">
                    Hackathon Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  {application.num_hackathons && (
                    <div className="flex items-center gap-2">
                      <TrophyIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        Number of Hackathons:
                      </span>{" "}
                      {application.num_hackathons}
                    </div>
                  )}
                  {application.prior_hack_exp &&
                    application.prior_hack_exp.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <UsersIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium">Prior Roles:</span>
                        {application.prior_hack_exp.map((role, index) => (
                          <Badge key={index} variant="secondary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Links - Full Width */}
          {(application.github_url ||
            application.linkedin_url ||
            application.website_url ||
            application.other_url ||
            application.resume_url) && (
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm sm:text-base">
                {application.github_url && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <GithubLogoIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">GitHub:</span>
                    </div>
                    <a
                      href={application.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {application.github_url}
                    </a>
                  </div>
                )}
                {application.linkedin_url && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <LinkedinLogoIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">LinkedIn:</span>
                    </div>
                    <a
                      href={application.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {application.linkedin_url}
                    </a>
                  </div>
                )}
                {application.website_url && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <BrowserIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">Website/X:</span>
                    </div>
                    <a
                      href={application.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {application.website_url}
                    </a>
                  </div>
                )}
                {application.other_url && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">Other Link:</span>
                    </div>
                    <a
                      href={application.other_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline break-all"
                    >
                      {application.other_url}
                    </a>
                  </div>
                )}
                {application.resume_url && (
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-4 h-4 text-muted-foreground" />
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

          {/* Team - Full Width */}
          {application.team_members?.trim() && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                {application.team_name && (
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Team Name:</span>{" "}
                    <span className="font-semibold">
                      {application.team_name}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <UsersIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium">Team Members:</span>
                  {application.team_members_with_names &&
                  application.team_members_with_names.length > 0
                    ? application.team_members_with_names.map(
                        (member, index) => (
                          <Badge key={index} variant="secondary">
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
                          </Badge>
                        )
                      )
                    : application.team_members
                        .split(",")
                        .map((email, index) => (
                          <Badge key={index} variant="secondary">
                            {email.trim()}
                          </Badge>
                        ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Questions - Full Width */}
          {application.cxc_q1 && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-base">
                  <LightbulbIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                  <span>
                    Tell us about a technical project that you have worked on.
                    What did you learn? What challenges did you face?
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap">
                  {application.cxc_q1}
                </p>
              </CardContent>
            </Card>
          )}

          {application.cxc_q2 && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <SmileyIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                  Write us a Haiku
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap">
                  {application.cxc_q2}
                </p>
              </CardContent>
            </Card>
          )}

          {/* MLH Agreements and Review Info - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* MLH Agreements */}
            {(application.mlh_agreed_code_of_conduct !== null ||
              application.mlh_authorize_info_sharing !== null ||
              application.mlh_email_opt_in !== null) && (
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-base sm:text-lg">
                    MLH Agreements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm sm:text-base">
                  {application.mlh_agreed_code_of_conduct !== null && (
                    <div className="flex items-center gap-2">
                      <CheckSquareIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Code of Conduct:</span>{" "}
                      {application.mlh_agreed_code_of_conduct
                        ? "Agreed"
                        : "Not Agreed"}
                    </div>
                  )}
                  {application.mlh_authorize_info_sharing !== null && (
                    <div className="flex items-center gap-2">
                      <CheckSquareIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        Authorize Info Sharing:
                      </span>{" "}
                      {application.mlh_authorize_info_sharing ? "Yes" : "No"}
                    </div>
                  )}
                  {application.mlh_email_opt_in !== null && (
                    <div className="flex items-center gap-2">
                      <CheckSquareIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Email Opt-In:</span>{" "}
                      {application.mlh_email_opt_in ? "Yes" : "No"}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Review Count */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">
                  Review Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Number of Reviews:</span>{" "}
                  {application.review_count}
                </div>
                {application.submitted_at && (
                  <div className="flex items-center gap-2 mt-2">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Submitted At:</span>{" "}
                    {new Date(application.submitted_at).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No application data available</p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-6xl h-[85vh] sm:h-[90vh] p-0">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
          <DialogTitle className="text-lg sm:text-xl">
            Application Details
          </DialogTitle>
          <DialogDescription className="text-sm">
            {getDescription()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(85vh-80px)] sm:h-[calc(90vh-100px)] px-4 sm:px-6 py-4 sm:py-6">
          {renderContent()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
