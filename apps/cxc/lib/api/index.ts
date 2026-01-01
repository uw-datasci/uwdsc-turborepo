/**
 * API Client
 *
 * Central export point for all API functions.
 */

// Export all authentication functions
export { register, login, resendVerificationEmail, signOut } from "./auth";

// Export all user functions
export { getUserProfile } from "./user";

// Export all user emails functions
export { getUserEmails } from "./emails";

// Export all file upload functions
export { uploadResume, getResume } from "./resume";

// Export all review functions
export { getRandomApplication, submitReview } from "./review";
export type { SubmitReviewRequest, SubmitReviewResponse } from "./review";

// Export all types
export type * from "@/types/api";
