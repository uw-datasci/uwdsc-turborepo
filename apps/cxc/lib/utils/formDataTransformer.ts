/**
 * Form Data Transformation Utilities
 *
 * This file contains utilities to transform form values to/from database format.
 * Handles conversion of arrays to comma-separated strings for database storage.
 */

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
  profileId: string
): Record<string, unknown> {
  return {
    profile_id: profileId,
    status: formData.status || "draft",
    submitted_at: formData.submitted_at || null,
    phone_number: formData.phone,
    discord: formData.discord,
    t_shirt: formData.tshirt_size,
    dietary_restrictions: formData.dietary_restrictions,
    gender: formData.gender,
    // Convert ethnicity array to comma-separated string
    ethnicity: Array.isArray(formData.ethnicity)
      ? formData.ethnicity.join(",")
      : "",
    uni_name: formData.university_name,
    uni_program: formData.program,
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
  dbData: Record<string, unknown>
): Partial<AppFormValues> {
  return {
    email: (dbData.email as string) || "",
    phone: (dbData.phone_number as string) || "",
    discord: (dbData.discord as string) || "",
    status: (dbData.status as AppFormValues["status"]) || "draft",
    submitted_at: dbData.submitted_at
      ? new Date(dbData.submitted_at as string | number | Date)
      : undefined,
    tshirt_size: dbData.t_shirt as AppFormValues["tshirt_size"],
    dietary_restrictions: dbData.dietary_restrictions as AppFormValues["dietary_restrictions"],
    gender: dbData.gender as AppFormValues["gender"],
    // Convert comma-separated string back to array
    ethnicity: dbData.ethnicity
      ? (dbData.ethnicity as string).split(",").filter((e: string) => e.trim())
      : [],
    university_name: (dbData.uni_name as string) || "",
    program: (dbData.uni_program as string) || "",
    year_of_study: (dbData.year_of_study as string) || "",
    // Convert comma-separated string back to array
    prior_hackathon_experience: dbData.prior_hack_exp
      ? (dbData.prior_hack_exp as string).split(",").filter((e: string) => e.trim()) as AppFormValues["prior_hackathon_experience"]
      : [],
    hackathons_attended: dbData.num_hackathons as AppFormValues["hackathons_attended"],
    github: (dbData.github_url as string) || "",
    linkedin: (dbData.linkedin_url as string) || "",
    website_url: (dbData.website_url as string) || "",
    other_link: (dbData.other_url as string) || "",
    cxc_q1: (dbData.cxc_q1 as string) || "",
    cxc_q2: (dbData.cxc_q2 as string) || "",
    // Convert comma-separated string back to array
    team_members: dbData.team_members
      ? (dbData.team_members as string).split(",").filter((m: string) => m.trim())
      : [],
  };
}

/**
 * Filters out undefined and null values and empty strings
 * Useful for partial updates to avoid overwriting existing data
 *
 * @param data - The data object to clean
 * @returns Cleaned object with no undefined, null, or empty values
 */
export function cleanFormData(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}
