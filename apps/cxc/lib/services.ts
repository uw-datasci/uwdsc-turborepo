import { cookies } from "next/headers";
import {
  createSupabaseServerClient,
  createSupabaseServiceRoleClient,
} from "@uwdsc/server/core/database/client";
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

/**
 * Create ResumeService with service role client (bypasses RLS)
 * WARNING: Only use this for admin operations that need to access any user's resume
 * Throws error if service role key is not configured (admin operations require it)
 */
export function createAdminResumeService() {
  const supabase = createSupabaseServiceRoleClient();
  return new ResumeService(supabase);
}
