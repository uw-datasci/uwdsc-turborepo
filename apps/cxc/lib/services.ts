import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/client";
import { AuthService } from "@uwdsc/server/core/services/authService";
import { ResumeService } from "@uwdsc/server/core/services/resumeService";
import type { CookieOptions } from "@supabase/ssr";

// ============================================================================
// Supabase Client Factory
// ============================================================================

/**
 * Create a Supabase client with Next.js server-side cookies
 */
async function createSupabaseClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient({
    getAll() {
      return cookieStore.getAll();
    },
    set(name: string, value: string, options?: CookieOptions) {
      cookieStore.set(name, value, options);
    },
  });
}

// ============================================================================
// Service Factories
// ============================================================================

/**
 * Create AuthService with server-side Supabase client
 */
export async function createAuthService() {
  const supabase = await createSupabaseClient();
  return new AuthService(supabase);
}

/**
 * Create ResumeService with server-side Supabase client
 */
export async function createResumeService() {
  const supabase = await createSupabaseClient();
  return new ResumeService(supabase);
}
