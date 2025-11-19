import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";

/**
 * Middleware to protect the /apply route
 * Redirects unauthenticated users to /register
 */
export function withApply(request: NextRequest, user: User) {

  // If user is not authenticated, redirect to register
  if (!user) return NextResponse.redirect(new URL("/register?callbackUrl=/apply", request.url));

  // User is authenticated, allow access
  return NextResponse.next();
}
