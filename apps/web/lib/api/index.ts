/**
 * API Client
 *
 * Central export point for all API functions.
 */

// Export all authentication functions
export {
  register,
  login,
  getAuthMe,
  resendVerificationEmail,
  signOut,
} from "./auth";

// Export all user functions
export {
  getUserProfile,
  updateUserProfile,
  getAllProfiles,
  getMembershipStats,
} from "./profile";

// Export all types
export type * from "@/types/api";
