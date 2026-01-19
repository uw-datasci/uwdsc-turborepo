/**
 * API Client
 *
 * Central export point for all API functions.
 */

// Export all authentication functions
export {
  register,
  login,
  resendVerificationEmail,
  signOut,
  forgotPassword,
  resetPassword,
} from "./auth";

// Export all user functions
export { getUserProfile } from "./user";

// Export all user emails functions
export { getUserEmails } from "./emails";

// Export all file upload functions
export { uploadResume, getResume } from "./resume";

// Export all review functions
export { getRandomApplication, submitReview } from "./review";
export type { SubmitReviewRequest, SubmitReviewResponse } from "./review";

// Export all admin functions
export { getAllApplications, getApplicationDetails } from "./admin";

// Export all project functions
export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getMyProject,
  submitProject,
} from "./projects";
export type {
  Project,
  ProjectWithTeam,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "./projects";

// Export all judge functions
export { getAllJudges, assignJudges } from "./judges";
export type { Judge, AssignJudgesRequest } from "./judges";

// Export all judge dashboard functions
export {
  getJudgeAssignments,
  getScoreByProject,
  submitScore,
} from "./judge";
export type {
  JudgeAssignment,
  ProjectScore,
  SubmitScoreRequest,
} from "./judge";

// Export all team functions
export {
  createTeam,
  joinTeam,
  getMyTeam,
  leaveTeam,
  checkTeamName,
} from "./teams";
export type {
  Team,
  CreateTeamRequest,
  CreateTeamResponse,
  JoinTeamRequest,
  JoinTeamResponse,
  GetMyTeamResponse,
  LeaveTeamResponse,
  CheckTeamNameResponse,
} from "./teams";

// Export all types
export type * from "@/types/api";
