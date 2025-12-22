import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import type { CookieOptions } from "@supabase/ssr";
import {
  transformFormDataForDatabase,
  cleanFormData,
} from "@/lib/utils/formDataTransformer";
import type { AppFormValues } from "@/lib/schemas/application";

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

    // Extract profile_id and resume_id
    const profile_id =
      raw.profile_id ?? raw.profileId ?? raw.user_id ?? raw?.resume?.profile_id;
    const resume_id =
      raw.resume_id ?? raw.resumeId ?? raw.key ?? raw?.resume?.key ?? raw?.resume?.id;

    if (!profile_id) {
      console.log("Bad submit body:", raw); // keep for debugging
      return Response.json({ error: "Missing required field: profile_id." }, { status: 400 });
    }

    // Use transformFormDataForDatabase to transform form data to database format
    // This handles all the mapping to new column names and transformations
    const transformedData = transformFormDataForDatabase(
      raw as AppFormValues,
      profile_id,
    );
    
    // Clean the data (remove undefined, null, empty strings)
    const cleanedData = cleanFormData(transformedData);

    // Build insert object with required fields
    const now = new Date().toISOString();
    const insertData: Record<string, unknown> = {
      ...cleanedData,
      profile_id: profile_id,
      status: "submitted",
      submitted_at: now,
      updated_at: now,
    };

    // Add resume_id if provided
    if (resume_id !== undefined) {
      insertData.resume_id = resume_id;
    }

    // Ensure phone_number is truncated to 12 characters
    if (insertData.phone_number && typeof insertData.phone_number === "string") {
      insertData.phone_number = insertData.phone_number.substring(0, 12);
    }

    // Ensure discord is between 2-32 characters
    if (insertData.discord && typeof insertData.discord === "string") {
      const discord = insertData.discord.trim();
      if (discord.length >= 2 && discord.length <= 32) {
        insertData.discord = discord;
      } else {
        // Remove invalid discord if it doesn't meet requirements
        delete insertData.discord;
      }
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
