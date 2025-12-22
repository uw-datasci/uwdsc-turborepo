import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import type { CookieOptions } from "@supabase/ssr";

type Body = {
  profile_id: string;
  resume_id?: string;
  // Contact info
  phone?: string;
  discord?: string;
  // Personal info
  tshirt_size?: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  dietary_restrictions?: string; // Now text field, can include "Other" value
  dietary_restrictions_other?: string;
  gender?: string;
  ethnicity?: string;
  // Education
  university_name?: string;
  university_name_other?: string;
  program?: string;
  program_other?: string;
  year_of_study?: string;
  // Hackathon experience
  prior_hackathon_experience?: ("None" | "Hacker" | "Judge" | "Mentor" | "Organizer")[];
  hackathons_attended?: "0" | "1" | "2" | "3" | "4+";
  // Social links
  github?: string;
  linkedin?: string;
  x?: string;
  other_link?: string;
  // Application questions
  cxc_gain?: string;
  silly_q?: string;
  // Team members
  team_members?: string[];
};

// Helper function to convert array to comma-separated string
function arrayToCommaString(value?: string[] | string): string | null {
  if (!value) return null;
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "string") {
    return value;
  }
  return null;
}

// Helper function to combine dietary restrictions with "other" field
function combineDietaryRestrictions(
  restriction?: string,
  other?: string,
): string | null {
  if (!restriction) return null;
  if (restriction === "Other" && other) {
    return `Other: ${other}`;
  }
  return restriction;
}

export async function POST(request: NextRequest) {
  try {
    // Create Supabase client
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient({
      getAll() {
        return cookieStore.getAll();
      },
      set(name: string, value: string, options?: CookieOptions) {
        cookieStore.set(name, value, options);
      },
    });

    const raw = await request.json();

    const body: Body = {
      profile_id:
        raw.profile_id ?? raw.profileId ?? raw.user_id ?? raw?.resume?.profile_id,
      resume_id:
        raw.resume_id ?? raw.resumeId ?? raw.key ?? raw?.resume?.key ?? raw?.resume?.id,
      // Contact info
      phone: raw.phone,
      discord: raw.discord,
      // Personal info
      tshirt_size: raw.tshirt_size,
      dietary_restrictions: raw.dietary_restrictions,
      dietary_restrictions_other: raw.dietary_restrictions_other,
      gender: raw.gender,
      ethnicity: raw.ethnicity,
      // Education
      university_name: raw.university_name,
      university_name_other: raw.university_name_other,
      program: raw.program,
      program_other: raw.program_other,
      year_of_study: raw.year_of_study,
      // Hackathon experience
      prior_hackathon_experience: raw.prior_hackathon_experience,
      hackathons_attended: raw.hackathons_attended,
      // Social links
      github: raw.github,
      linkedin: raw.linkedin,
      x: raw.x,
      other_link: raw.other_link,
      // Application questions
      cxc_gain: raw.cxc_gain,
      silly_q: raw.silly_q,
      // Team members
      team_members: raw.team_members,
    };

    if (!body.profile_id) {
      console.log("Bad submit body:", raw); // keep for debugging
      return Response.json({ error: "Missing required field: profile_id." }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Build insert object with new column names
    // Start with required fields that always exist in the schema
    const insertData: Record<string, unknown> = {
      profile_id: body.profile_id,
      status: "submitted",
      submitted_at: now,
      updated_at: now,
    };

    // Add optional fields only if they exist
    if (body.resume_id !== undefined) insertData.resume_id = body.resume_id;
    
    // Contact info - map to new column names
    // Note: email is not stored in applications table, it comes from auth.users via profile_id
    if (body.phone !== undefined) {
      // Truncate to 12 characters max for phone_number
      const phoneNumber = body.phone.substring(0, 12);
      insertData.phone_number = phoneNumber;
    }
    if (body.discord !== undefined) {
      // Ensure discord is between 2-32 characters
      const discord = body.discord.trim();
      if (discord.length >= 2 && discord.length <= 32) {
        insertData.discord = discord;
      }
    }
    
    // Personal info - map to new column names
    if (body.tshirt_size !== undefined) insertData.t_shirt = body.tshirt_size;
    if (body.dietary_restrictions !== undefined) {
      // Combine dietary restrictions with "other" if applicable
      const dietaryText = combineDietaryRestrictions(
        body.dietary_restrictions,
        body.dietary_restrictions_other,
      );
      if (dietaryText) insertData.dietary_restrictions = dietaryText;
    }
    if (body.gender !== undefined) insertData.gender = body.gender;
    if (body.ethnicity !== undefined) {
      // Ethnicity is comma-separated, ensure it's a string
      const ethnicityStr = Array.isArray(body.ethnicity)
        ? body.ethnicity.join(", ")
        : body.ethnicity;
      insertData.ethnicity = ethnicityStr;
    }
    
    // Education - map to new column names
    if (body.university_name !== undefined) {
      // Use "other" value if main field is "Other"
      const uniName =
        body.university_name === "Other" && body.university_name_other
          ? body.university_name_other
          : body.university_name;
      insertData.uni_name = uniName;
    }
    if (body.program !== undefined) {
      // Use "other" value if main field is "Other"
      const program =
        body.program === "Other" && body.program_other
          ? body.program_other
          : body.program;
      insertData.uni_program = program;
    }
    if (body.year_of_study !== undefined) insertData.year_of_study = body.year_of_study;
    
    // Hackathon experience - map to new column names
    if (body.prior_hackathon_experience !== undefined) {
      // Convert array to comma-separated string
      const priorExpStr = arrayToCommaString(body.prior_hackathon_experience);
      if (priorExpStr) insertData.prior_hack_exp = priorExpStr;
    }
    if (body.hackathons_attended !== undefined) {
      insertData.num_hackathons = body.hackathons_attended;
    }
    
    // Social links - map to new column names
    if (body.github !== undefined && body.github) {
      insertData.github_url = body.github;
    }
    if (body.linkedin !== undefined && body.linkedin) {
      insertData.linkedin_url = body.linkedin;
    }
    if (body.x !== undefined && body.x) {
      // Map X/Twitter to website_url
      insertData.website_url = body.x;
    }
    if (body.other_link !== undefined && body.other_link) {
      insertData.other_url = body.other_link;
    }
    
    // Application questions - map to new column names
    if (body.cxc_gain !== undefined) insertData.cxc_q1 = body.cxc_gain;
    if (body.silly_q !== undefined) insertData.cxc_q2 = body.silly_q;
    
    // Team members
    if (body.team_members !== undefined) {
      const teamMembersStr = arrayToCommaString(body.team_members);
      if (teamMembersStr) insertData.team_members = teamMembersStr;
    }

    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    console.log("user", user?.id, "userErr", userErr);

    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    const { data, error } = await supabase
      .from("applications")
      .insert(insertData)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      // Provide more helpful error message
      if (error.message?.includes("column") || error.message?.includes("does not exist")) {
        throw new Error(
          "Database schema mismatch. Please run the migration to add application fields. " +
          `Original error: ${error.message}`
        );
      }
      throw error;
    }

    return Response.json({ application: data }, { status: 201 });
  } catch (err: unknown) {
    console.error("Error submitting application:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
