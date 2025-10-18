import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@uwdsc/server/core/database/auth-client";
import { AuthService } from "@uwdsc/server/core/services/authService";

/**
 * Create AuthService with Next.js cookies
 */
export async function createAuthService() {
  const cookieStore = await cookies();

  const supabase = createSupabaseServerClient({
    getAll() {
      return cookieStore.getAll();
    },
    set(name: string, value: string, options?: any) {
      cookieStore.set(name, value, options);
    },
  });

  return new AuthService(supabase);
}
