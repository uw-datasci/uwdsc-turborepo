import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@uwdsc/server/core/database/auth-client";

// Protected routes that require authentication
const protectedRoutes = ["/me", "/admin"];

// Routes that should redirect if profile is complete
const authRoutes = ["/login", "/register", "/verify-email"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client
  const supabase = createSupabaseMiddlewareClient(request, response);

  // Get user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);
  const isCompleteProfileRoute = pathname === "/complete-profile";

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated
  if (user) {
    // Check if profile is complete using Supabase client (edge-compatible)
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("first_name, last_name, faculty, term, heard_from_where")
      .eq("id", user.id)
      .maybeSingle(); // Use maybeSingle() instead of single() - returns null if no rows

    // Profile is complete if all required fields are filled
    const isProfileComplete = !!(
      profile &&
      !error &&
      profile.first_name &&
      profile.last_name &&
      profile.faculty &&
      profile.term &&
      profile.heard_from_where
    );

    // Redirect to complete-profile if profile is incomplete and not already there
    if (!isProfileComplete && !isCompleteProfileRoute) {
      return NextResponse.redirect(new URL("/complete-profile", request.url));
    }

    // Redirect away from auth routes if already authenticated with complete profile
    if (isAuthRoute && isProfileComplete) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (isCompleteProfileRoute) {
    // Redirect away from complete-profile if not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

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
