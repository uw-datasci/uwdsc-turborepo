/**
 * Form Data Transformation Utilities
 *
 * This file contains utilities to transform form values to/from database format.
 * Handles conversion of arrays to comma-separated strings for database storage.
 */

import {
  DIETARY_OPTIONS,
  PROGRAM_OPTIONS,
  UNIVERSITY_OPTIONS,
} from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";

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

  return {
    profile_id: profileId,
    status: formData.status || "draft",
    submitted_at: formData.submitted_at || null,
    phone_number: formData.phone,
    discord: formData.discord,
    t_shirt: formData.tshirt_size,
    dietary_restrictions: dietaryRestrictions,
    gender: formData.gender,
    // Convert ethnicity array to comma-separated string
    ethnicity: Array.isArray(formData.ethnicity)
      ? formData.ethnicity.join(",")
      : "",
    uni_name: universityName,
    uni_program: program,
    year_of_study: formData.year_of_study,
    // Convert prior_hackathon_experience array to comma-separated string
    prior_hack_exp: Array.isArray(formData.prior_hackathon_experience)
      ? formData.prior_hackathon_experience.join(",")
      : "",
    num_hackathons: formData.hackathons_attended,
    github_url: formData.github || null,
    linkedin_url: formData.linkedin || null,
    website_url: formData.website_url || null,
    other_url: formData.other_link || null,
    cxc_q1: formData.cxc_q1,
    cxc_q2: formData.cxc_q2,
    // Convert team_members array to comma-separated string
    team_members: Array.isArray(formData.team_members)
      ? formData.team_members.join(",")
      : "",
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
    gender: (dbData.gender as AppFormValues["gender"]) || undefined,
    // Convert comma-separated string back to array
    ethnicity: dbData.ethnicity
      ? (dbData.ethnicity as string).split(",").filter((e: string) => e.trim())
      : [],

    // If custom value, set to "Other" and populate the _other field
    university_name: isUniversityCustom ? "Other" : universityName || "",
    university_name_other: isUniversityCustom ? universityName : "",
    program: isProgramCustom ? "Other" : program || "",
    program_other: isProgramCustom ? program : "",
    year_of_study: (dbData.year_of_study as string) || "",

    // Convert comma-separated string back to array
    prior_hackathon_experience: dbData.prior_hack_exp
      ? ((dbData.prior_hack_exp as string)
          .split(",")
          .filter((e: string) =>
            e.trim(),
          ) as AppFormValues["prior_hackathon_experience"])
      : [],
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
    team_members: dbData.team_members
      ? (dbData.team_members as string)
          .split(",")
          .filter((m: string) => m.trim())
      : [],
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
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}
