import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@uwdsc/server/core/database/client";

// Import individual middleware handlers
import { withApply } from "./lib/middleware/withApply";
import { withProtected } from "./lib/middleware/withProtected";
import { withAuth } from "./lib/middleware/withAuth";

const APPLY_ROUTE = "/apply";
const PROTECTED_ROUTES = new Set(["/admin", "/review"]);
const AUTH_ROUTES = new Set(["/login", "/register", "/start"]);

/**
 * Main middleware dispatcher
 * Delegates authentication and routing logic to specific middleware handlers
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request: { headers: request.headers } });

  // Create Supabase client
  const supabase = createSupabaseMiddlewareClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // --- Dispatch to specific middleware handlers ---

  switch (true) {
    // 1. Handle Authenticated users trying to access auth pages
    case AUTH_ROUTES.has(pathname):
      return withAuth(request, user);
    // 2. Handle Unauthenticated users
    case pathname === APPLY_ROUTE:
      return withApply(request, user);
    // 3. Handle Authenticated users trying to access protected routes
    case PROTECTED_ROUTES.has(pathname):
      return await withProtected(request, user);
  }

  // No specific middleware matched, continue with the request
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logos (logo files)
     * - images (image files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logos|images).*)",
  ],
};
