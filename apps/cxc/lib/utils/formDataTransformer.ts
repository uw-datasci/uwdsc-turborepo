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
): Record<string, any> {
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
    cxc_q1: formData.cxc_gain,
    cxc_q2: formData.silly_q,
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
  dbData: Record<string, any>
): Partial<AppFormValues> {
  return {
    email: dbData.email || "",
    phone: dbData.phone_number || "",
    discord: dbData.discord || "",
    status: dbData.status || "draft",
    submitted_at: dbData.submitted_at
      ? new Date(dbData.submitted_at)
      : undefined,
    tshirt_size: dbData.t_shirt || undefined,
    dietary_restrictions: dbData.dietary_restrictions || undefined,
    gender: dbData.gender || undefined,
    // Convert comma-separated string back to array
    ethnicity: dbData.ethnicity
      ? dbData.ethnicity.split(",").filter((e: string) => e.trim())
      : [],
    university_name: dbData.uni_name || "",
    program: dbData.uni_program || "",
    year_of_study: dbData.year_of_study || "",
    // Convert comma-separated string back to array
    prior_hackathon_experience: dbData.prior_hack_exp
      ? dbData.prior_hack_exp.split(",").filter((e: string) => e.trim())
      : [],
    hackathons_attended: dbData.num_hackathons || undefined,
    github: dbData.github_url || "",
    linkedin: dbData.linkedin_url || "",
    website_url: dbData.website_url || "",
    other_link: dbData.other_url || "",
    cxc_gain: dbData.cxc_q1 || "",
    silly_q: dbData.cxc_q2 || "",
    // Convert comma-separated string back to array
    team_members: dbData.team_members
      ? dbData.team_members.split(",").filter((m: string) => m.trim())
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
export function cleanFormData(data: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}
