/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

/**
 * Middleware to protect routes that require authentication
 * For /review route, also checks for admin role
 * Redirects unauthenticated users to /login
 * Redirects non-admin users trying to access /review to home
 */
export async function withProtected(request: NextRequest, user: any) {
  // If route is protected and user is not authenticated, redirect to login
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  // Check admin role for /review and /admin routes
  if (request.nextUrl.pathname === "/review" || request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const profileService = new ProfileService();
      const profile = await profileService.getProfileByUserId(user.id);

      // Special handling for /admin/assign - requires superadmin
      if (request.nextUrl.pathname === "/admin/assign") {
        if (profile?.role !== "superadmin") {
          // Redirect non-superadmin users to home
          return NextResponse.redirect(new URL("/", request.url));
        }
      } else {
        // Other admin routes require admin or superadmin
        if (profile?.role !== "admin" && profile?.role !== "superadmin") {
          // Redirect non-admin users to home
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      // On error, redirect to home for safety
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // User is authenticated and has required permissions
  return NextResponse.next();
}
