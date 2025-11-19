/**
 * API Client
 *
 * Central export point for all API functions.
 */

// Export all authentication functions
export { register, login, resendVerificationEmail, signOut } from "./auth";

// Export all user functions
export { getUserProfile } from "./user";

// Export all file upload functions
export { uploadResume } from "./resume";

// Export all types
export type * from "@/types/api";
