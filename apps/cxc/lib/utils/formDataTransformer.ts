/**
 * Form Data Transformation Utilities
 *
 * This file contains utilities to transform form values to/from database format.
 * Handles conversion of arrays to comma-separated strings for database storage.
 */

import {
  COUNTRY_OPTIONS,
  DIETARY_OPTIONS,
  ETHNICITIES,
  ETHNICITY_OTHER_LABEL,
  PROGRAM_OPTIONS,
  UNIVERSITY_OPTIONS,
} from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";
import {
  splitCommaSeparatedString,
  joinArrayToCommaSeparatedString,
} from "@uwdsc/server/core/utils/dataTransformers";

// ============================================================================
// Database Field Mapping
// ============================================================================

/**
 * Transforms form values to HackerApplication format for database storage
 * Converts string[] arrays to comma-separated strings
 *
 * @param formData - The form values from react-hook-form
 * @param profileId - The user's profile ID
 * @returns Transformed data ready for database storage
 */
export function transformFormDataForDatabase(
  formData: AppFormValues,
  profileId: string,
): Record<string, unknown> {
  // Handle conditional "Other" fields
  const dietaryRestrictions =
    formData.dietary_restrictions === "Other" &&
    formData.dietary_restrictions_other
      ? formData.dietary_restrictions_other
      : formData.dietary_restrictions;

  const universityName =
    formData.university_name === "Other" && formData.university_name_other
      ? formData.university_name_other
      : formData.university_name;

  const program =
    formData.program === "Other" && formData.program_other
      ? formData.program_other
      : formData.program;

  const countryOfResidence =
    formData.country_of_residence === "Other" &&
    formData.country_of_residence_other
      ? formData.country_of_residence_other
      : formData.country_of_residence;

  // Handle ethnicity - if "Other" is selected, use custom value instead of array
  let ethnicityValue = "";

  if (Array.isArray(formData.ethnicity) && formData.ethnicity.length > 0) {
    if (
      formData.ethnicity.includes(ETHNICITY_OTHER_LABEL) &&
      formData.ethnicity_other?.trim()
    ) {
      // Replace entire array with custom value
      ethnicityValue = formData.ethnicity_other.trim();
    } else {
      // Use standard ethnicity values
      ethnicityValue = formData.ethnicity.join(",");
    }
  }

  // Convert phone to string and truncate only if longer than 12 characters
  const phoneStr = formData.phone ? String(formData.phone) : "";
  const phone_number = phoneStr.length > 12 ? phoneStr.slice(0, 12) : phoneStr;

  // Convert discord to string and truncate only if longer than 32 characters
  const discordStr = formData.discord ? String(formData.discord) : "";
  const discord = discordStr.length > 32 ? discordStr.slice(0, 32) : discordStr;

  return {
    profile_id: profileId,
    status: formData.status || "draft",
    submitted_at: formData.submitted_at || null,
    // Truncate phone_number to 12 characters (database constraint: varchar(12))
    phone_number,
    // Truncate discord to 32 characters (database constraint: varchar(32))
    discord,
    t_shirt: formData.tshirt_size,
    dietary_restrictions: dietaryRestrictions,
    age: formData.age,
    country_of_residence: countryOfResidence,
    gender: formData.gender,
    // Store ethnicity as comma-separated string (or custom value if Other selected)
    ethnicity: ethnicityValue,
    uni_name: universityName,
    uni_program: program,
    year_of_study: formData.year_of_study,
    // Convert prior_hackathon_experience array to comma-separated string
    prior_hack_exp: joinArrayToCommaSeparatedString(
      formData.prior_hackathon_experience,
    ),
    num_hackathons: formData.hackathons_attended,
    github_url: formData.github || null,
    linkedin_url: formData.linkedin || null,
    website_url: formData.website_url || null,
    other_url: formData.other_link || null,
    cxc_q1: formData.cxc_q1,
    cxc_q2: formData.cxc_q2,
    // Convert team_members array to comma-separated string
    team_members: joinArrayToCommaSeparatedString(formData.team_members),
    // MLH checkbox fields
    mlh_agreed_code_of_conduct: formData.mlh_agreed_code_of_conduct || false,
    mlh_authorize_info_sharing: formData.mlh_authorize_info_sharing || false,
    mlh_email_opt_in: formData.mlh_email_opt_in || false,
  };
}

/**
 * Transforms database HackerApplication format back to form values
 * Converts comma-separated strings back to arrays
 *
 * @param dbData - The data from the database
 * @returns Form values ready to be populated back into the form
 */
export function transformDatabaseDataToForm(
  dbData: Record<string, unknown>,
): Partial<AppFormValues> {
  // Handle dietary restrictions standard/custom
  const dietaryRestrictions = dbData.dietary_restrictions as string;
  const isDietaryRestrictionCustom =
    dietaryRestrictions && !DIETARY_OPTIONS.includes(dietaryRestrictions);

  // Handle university name standard/custom
  const universityName = dbData.uni_name as string;
  const isUniversityCustom =
    universityName &&
    !UNIVERSITY_OPTIONS.map((opt) => opt.value).includes(universityName);

  // Handle program standard/custom
  const program = dbData.uni_program as string;
  const isProgramCustom =
    program && !PROGRAM_OPTIONS.map((opt) => opt.value).includes(program);

  // Handle country of residence standard/custom
  const countryOfResidence = dbData.country_of_residence as string;
  const isCountryCustom =
    countryOfResidence &&
    !COUNTRY_OPTIONS.map((opt) => opt.value).includes(countryOfResidence);

  // Handle ethnicity - detect if there's a custom value
  const ethnicityString = dbData.ethnicity as string;
  const ethnicityArray = splitCommaSeparatedString(ethnicityString);

  // Check if any ethnicity value is not in the standard options (means it's a custom "Other" value)
  const isEthnicityCustom = ethnicityArray.some(
    (e) => !ETHNICITIES.includes(e),
  );

  // If custom ethnicity exists, set form to ["Other"] and populate ethnicity_other
  const formEthnicityArray = isEthnicityCustom
    ? [ETHNICITY_OTHER_LABEL]
    : ethnicityArray;

  // When loading back, restore pipe delimiters to commas for editing
  const ethnicityOtherValue = isEthnicityCustom ? ethnicityString : "";

  return {
    phone: (dbData.phone_number as string) || "",
    discord: (dbData.discord as string) || "",

    tshirt_size: (dbData.t_shirt as AppFormValues["tshirt_size"]) || undefined,
    // If custom value, set to "Other" and populate the _other field
    dietary_restrictions: isDietaryRestrictionCustom
      ? "Other"
      : (dietaryRestrictions as AppFormValues["dietary_restrictions"]) ||
        undefined,
    dietary_restrictions_other: isDietaryRestrictionCustom
      ? dietaryRestrictions
      : "",
    age: (dbData.age as number) || undefined,
    country_of_residence: isCountryCustom ? "Other" : countryOfResidence || "",
    country_of_residence_other: isCountryCustom ? countryOfResidence : "",
    gender: (dbData.gender as AppFormValues["gender"]) || undefined,
    // Convert comma-separated string back to array with custom ethnicity handling
    ethnicity: formEthnicityArray.length > 0 ? formEthnicityArray : undefined,
    ethnicity_other: ethnicityOtherValue,

    // If custom value, set to "Other" and populate the _other field
    university_name: isUniversityCustom ? "Other" : universityName || "",
    university_name_other: isUniversityCustom ? universityName : "",
    program: isProgramCustom ? "Other" : program || "",
    program_other: isProgramCustom ? program : "",
    year_of_study: (dbData.year_of_study as string) || "",

    // Convert comma-separated string back to array
    prior_hackathon_experience: splitCommaSeparatedString(
      dbData.prior_hack_exp as string | null,
    ) as AppFormValues["prior_hackathon_experience"],
    hackathons_attended:
      (dbData.num_hackathons as AppFormValues["hackathons_attended"]) ||
      undefined,

    github: (dbData.github_url as string) || "",
    linkedin: (dbData.linkedin_url as string) || "",
    website_url: (dbData.website_url as string) || "",
    other_link: (dbData.other_url as string) || "",

    cxc_q1: (dbData.cxc_q1 as string) || "",
    cxc_q2: (dbData.cxc_q2 as string) || "",

    // Convert comma-separated string back to array
    team_members: splitCommaSeparatedString(
      dbData.team_members as string | null,
    ),
    // MLH checkbox fields
    mlh_agreed_code_of_conduct:
      (dbData.mlh_agreed_code_of_conduct as boolean) || false,
    mlh_authorize_info_sharing:
      (dbData.mlh_authorize_info_sharing as boolean) || false,
    mlh_email_opt_in: (dbData.mlh_email_opt_in as boolean) || false,
    status: (dbData.status as AppFormValues["status"]) || "draft",
    submitted_at: dbData.submitted_at
      ? new Date(dbData.submitted_at as string | number | Date)
      : undefined,
  };
}

/**
 * Filters out undefined and null values and empty strings
 * Useful for partial updates to avoid overwriting existing data
 *
 * @param data - The data object to clean
 * @returns Cleaned object with no undefined, null, or empty values
 */
export function cleanFormData(
  data: Record<string, unknown>,
): Record<string, unknown> {
  console.log("data", data);
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        key === "ethnicity" ||
        (value !== undefined && value !== null && value !== ""),
    ),
  );
}
