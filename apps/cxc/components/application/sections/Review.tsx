import { AppFormValues } from "@/lib/schemas/application";
import AppSection from "../AppSection";
import { UseFormReturn } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { getResume, getUserEmails } from "@/lib/api";
import {
  BookIcon,
  CalendarIcon,
  DiscordLogoIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  GenderIntersexIcon,
  GithubLogoIcon,
  GlobeIcon,
  GraduationCapIcon,
  HamburgerIcon,
  IdentificationCardIcon,
  LightbulbIcon,
  LinkedinLogoIcon,
  LinkIcon,
  PhoneIcon,
  SmileyIcon,
  TrophyIcon,
  TShirtIcon,
  UsersIcon,
  BrowserIcon,
  CakeIcon,
  MapPinIcon,
  CheckSquareIcon,
  SquareIcon,
} from "@uwdsc/ui/index";
import {
  APP_Q_FIELDS,
  CONTACT_INFO_FIELDS,
  ETHNICITY_OTHER_LABEL,
  LINKS_FIELDS,
  MLH_FIELDS,
  OPTIONAL_ABOUT_YOU_FIELDS,
  PRIOR_HACK_EXP_FIELDS,
  UNIVERSITY_INFO_FIELDS,
} from "@/constants/application";

interface ReviewProps {
  readonly form: UseFormReturn<AppFormValues>;
}

interface InfoRowProps {
  form: UseFormReturn<AppFormValues>;
  label: string;
  icon: React.ReactNode;
  iconLabel: string;
}

interface SectionReviewCardProps {
  form: UseFormReturn<AppFormValues>;
  iconArr: React.ReactNode[];
  fieldArr: string[];
  labelArr: string[];
}
const NO_INPUT = "???";

const CONTACT_INFO_LABELS = ["Name", "Email", "Phone", "Discord"];
const OPTIONAL_ABOUT_YOU_LABELS = [
  "T-shirt size",
  "Dietary Restrictions",
  "Age",
  "Country of Residence",
  "Gender",
  "Ethnicity",
];

const UNIVERSITY_INFO_LABELS = ["University", "Program", "Year"];

const PRIOR_HACK_EXP_LABELS = ["Experience", "Hackathons Attended"];

const LINKS_LABELS = ["Github", "LinkedIn", "Website", "Other"];

const APP_Q_LABEL = ["Question 1", "Question 2"];

const MLH_LABELS = [
  "MLH Code of Conduct",
  "MLH Info Sharing",
  "MLH Email Opt-in",
];

const InfoRow = ({ form, label, icon, iconLabel }: InfoRowProps) => {
  const value = form.getValues(label as keyof AppFormValues);
  // Check if this is a link field
  const isLinkField =
    (Object.values(LINKS_FIELDS) as readonly string[]).includes(label) &&
    label !== LINKS_FIELDS.resume;

  // Check if this is an APP_Q_FIELD
  const isAppQuestion = (
    Object.values(APP_Q_FIELDS) as readonly string[]
  ).includes(label);

  const isBooleanField = (
    Object.values(MLH_FIELDS) as readonly string[]
  ).includes(label);

  // Handle different value types
  const displayValue = React.useMemo(() => {
    if (isBooleanField) {
      return value ? "Yes" : "No";
    }
    if (value instanceof File) {
      return value.name;
    }
    if (Array.isArray(value)) {
      // Special handling for ethnicity array - replace "Other" with custom value
      if (label === OPTIONAL_ABOUT_YOU_FIELDS.ethnicity) {
        const ethnicityOther = form.getValues("ethnicity_other");

        // If array contains "Other", replace entire array with ethnicityOther value
        if (
          (value as string[]).includes(ETHNICITY_OTHER_LABEL) &&
          ethnicityOther
        ) {
          return ethnicityOther;
        }
      }
      return value.length > 0 ? (value as string[]).join(", ") : NO_INPUT;
    }

    // For fields that have an "other" variant
    const otherFieldName = `${label}_other` as keyof AppFormValues;
    const mainValue = String(value || NO_INPUT);

    // If the main field is "Other", use the other field's value
    if (
      mainValue.toLowerCase() === "other" &&
      otherFieldName in form.getValues()
    ) {
      const otherValue = form.getValues(otherFieldName);
      return String(otherValue || NO_INPUT);
    }

    return mainValue || NO_INPUT;
  }, [value, label, form, isBooleanField]);

  // Don't render if this is an "_other" field (it's handled by the parent field)
  if (label.endsWith("_other")) {
    return null;
  }

  // Special layout for application questions
  if (isAppQuestion) {
    return (
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex flex-row gap-3 items-center">
          <div className="flex-shrink-0">{icon}</div>
          <span className="font-medium">{iconLabel}:</span>
        </div>
        <p className="break-words whitespace-pre-wrap pl-9">{displayValue}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 items-center min-w-0">
      {!isBooleanField ? (
        <div className="flex-shrink-0">{icon}</div>
      ) : value ? (
        <div className="flex-shrink-0">
          <CheckSquareIcon key={label} size={24} />
        </div>
      ) : (
        <div className="flex-shrink-0">
          <SquareIcon key={label} size={24} />
        </div>
      )}
      {iconLabel}:
      <div className="min-w-0 flex-1">
        {isLinkField && displayValue !== NO_INPUT ? (
          <a
            className="underline decoration-1 break-words"
            href={displayValue}
            target="_blank"
            rel="noopener noreferrer"
          >
            {displayValue}
          </a>
        ) : (
          <p className="break-words">{displayValue}</p>
        )}
      </div>
    </div>
  );
};

const SectionReviewCard = ({
  form,
  iconArr,
  fieldArr,
  labelArr,
}: SectionReviewCardProps) => {
  // Filter out "_other" fields from the display
  const filteredLabels = fieldArr.filter((label) => !label.endsWith("_other"));

  return (
    <div className="bg-cxc-input-bg p-4 flex flex-col gap-2">
      {filteredLabels.map((label, i) => {
        // Find the original index to get the correct icon
        const originalIndex = fieldArr.indexOf(label);
        return (
          <InfoRow
            key={label}
            form={form}
            label={label}
            icon={iconArr[originalIndex]}
            iconLabel={labelArr[i] ?? ""}
          />
        );
      })}
    </div>
  );
};

const ContactIcons = [
  <IdentificationCardIcon key="id" size={24} />,
  <EnvelopeSimpleIcon key="email" size={24} />,
  <PhoneIcon key="phone" size={24} />,
  <DiscordLogoIcon key="discord" size={24} />,
];

const OptionalAboutYouIcons = [
  <TShirtIcon key="tshirt" size={24} />,
  <HamburgerIcon key="food" size={24} />,
  null, // placeholder for dietary_restrictions_other (won't be shown)
  <CakeIcon key="age" size={24} />,
  <MapPinIcon key="country" size={24} />,
  null, // placeholder for country_of_residence_other
  <GenderIntersexIcon key="gender" size={24} />,
  <GlobeIcon key="globe" size={24} />,
  null, // placeholder for ethnicity_other
];

const UniIcons = [
  <GraduationCapIcon key="grad" size={24} />,
  null, // placeholder for university_name_other
  <BookIcon key="book" size={24} />,
  null, // placeholder for program_other
  <CalendarIcon key="cal" size={24} />,
];

const PriorHackExpIcons = [
  <TrophyIcon key="trophy" size={24} />,
  <UsersIcon key="users" size={24} />,
];

const LinksIcons = [
  <GithubLogoIcon key="github" size={24} />,
  <LinkedinLogoIcon key="linkedin" size={24} />,
  <BrowserIcon key="x" size={24} />,
  <LinkIcon key="link" size={24} />,
];

const CxCAppIcons = [
  <LightbulbIcon key="bulb" size={24} />,
  <SmileyIcon key="smiley" size={24} />,
];

const MLHIcons = [null, null, null];

export function Review({ form }: ReviewProps) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [teamMembersWithNames, setTeamMembersWithNames] = useState<
    Array<{ email: string; display_name: string | null }>
  >([]);

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

  // Fetch team member names
  useEffect(() => {
    const fetchTeamMemberNames = async () => {
      const teamMembers = form.getValues("team_members");
      if (
        !teamMembers ||
        !Array.isArray(teamMembers) ||
        teamMembers.length === 0
      ) {
        return;
      }

      try {
        const result = await getUserEmails();
        const teamMemberEmails = teamMembers as string[];

        // Match team member emails with user data
        const matchedMembers = teamMemberEmails
          .map((email) => {
            const user = result.emails.find((u) => u.email === email);
            return user
              ? { email: user.email, display_name: user.display_name }
              : { email, display_name: null };
          })
          .filter((member) => member !== null);

        setTeamMembersWithNames(matchedMembers);
      } catch (error) {
        console.error("Failed to fetch team member names:", error);
        // Fallback to just emails
        const fallback = (teamMembers as string[]).map((email) => ({
          email,
          display_name: null,
        }));
        setTeamMembersWithNames(fallback);
      }
    };

    fetchTeamMemberNames();
  }, [form]);

  const teamMembers = form.watch("team_members") || [];

  return (
    <div>
      <AppSection
        label="Here's a summary for you to review:"
        description="Everything looks good? Press the button below!"
      >
        <SectionReviewCard
          form={form}
          iconArr={ContactIcons}
          fieldArr={Object.values(CONTACT_INFO_FIELDS)}
          labelArr={CONTACT_INFO_LABELS}
        />
        <SectionReviewCard
          form={form}
          iconArr={OptionalAboutYouIcons}
          fieldArr={Object.values(OPTIONAL_ABOUT_YOU_FIELDS)}
          labelArr={OPTIONAL_ABOUT_YOU_LABELS}
        />
        <SectionReviewCard
          form={form}
          iconArr={UniIcons}
          fieldArr={Object.values(UNIVERSITY_INFO_FIELDS)}
          labelArr={UNIVERSITY_INFO_LABELS}
        />
        <SectionReviewCard
          form={form}
          iconArr={PriorHackExpIcons}
          fieldArr={Object.values(PRIOR_HACK_EXP_FIELDS)}
          labelArr={PRIOR_HACK_EXP_LABELS}
        />
        <SectionReviewCard
          form={form}
          iconArr={LinksIcons}
          fieldArr={Object.values(LINKS_FIELDS).filter(
            (field) => field !== "resume"
          )}
          labelArr={LINKS_LABELS}
        />

        {/* Resume Section */}
        <div className="bg-cxc-input-bg p-4 flex flex-col gap-2">
          <div className="flex flex-row gap-3 items-center min-w-0">
            <div className="flex-shrink-0">
              <FileTextIcon size={24} />
            </div>
            Resume:&nbsp;
            {resumeUrl && resumeFileName ? (
              <div className="min-w-0 flex-1">
                <a
                  className="underline decoration-1 break-words"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resumeFileName} ↗
                </a>
              </div>
            ) : (
              "???"
            )}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-cxc-input-bg p-4 flex flex-col gap-2">
          <div className={`flex flex-row gap-3 min-w-0`}>
            <div className="flex-shrink-0 pt-0.5">
              <UsersIcon size={24} />
            </div>
            <div className="min-w-0 flex-1">
              {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
                <>
                  <div className="font-medium mb-2">Team Members:</div>
                  <div className="flex flex-wrap gap-2 bg-cxc-input-bg">
                    {teamMembersWithNames.length > 0
                      ? // Display with names if available
                        teamMembersWithNames.map((member, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-cxc-input-bg"
                          >
                            <span className="">
                              {member.display_name ? (
                                <>
                                  <span className="font-medium">
                                    {member.display_name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {" "}
                                    ({member.email})
                                  </span>
                                </>
                              ) : (
                                member.email
                              )}
                            </span>
                          </div>
                        ))
                      : // Fallback to just emails if names not available
                        (teamMembers as string[]).map((email, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20"
                          >
                            <span className="text-sm">{email}</span>
                          </div>
                        ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Team Members:</span>
                  <span className="text-muted-foreground">No Team Members</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <SectionReviewCard
          form={form}
          iconArr={CxCAppIcons}
          fieldArr={Object.values(APP_Q_FIELDS)}
          labelArr={APP_Q_LABEL}
        />
        <SectionReviewCard
          form={form}
          iconArr={MLHIcons}
          fieldArr={Object.values(MLH_FIELDS)}
          labelArr={MLH_LABELS}
        />
      </AppSection>
    </div>
  );
}
