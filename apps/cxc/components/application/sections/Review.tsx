import { AppFormValues } from "@/lib/schemas/application";
import AppSection from "../AppSection";
import { UseFormReturn } from "react-hook-form";
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
import React from "react";
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

const LINKS_LABELS = ["Github", "LinkedIn", "Website", "Other", "Resume"];

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
  <FileTextIcon key="resume" size={24} />,
];

const CxCAppIcons = [
  <LightbulbIcon key="bulb" size={24} />,
  <SmileyIcon key="smiley" size={24} />,
];

const MLHIcons = [null, null, null];

export function Review({ form }: ReviewProps) {
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
          fieldArr={Object.values(LINKS_FIELDS)}
          labelArr={LINKS_LABELS}
        />
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
