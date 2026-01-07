// API Request and Response Types

// ============================================================================
// Auth Types
// ============================================================================

export interface RegisterRequest {
  email: string;
  password: string;
  metadata?: object;
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  session?: {
    access_token: string;
    refresh_token: string;
  };
  user?: {
    id: string;
    email: string;
    email_confirmed_at: string | null;
  };
  error?: string;
}

export interface ResendVerificationEmailRequest {
  email: string;
}

export interface ResendVerificationEmailResponse {
  message: string;
}

// ============================================================================
// User Types
// ============================================================================

export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  nfc_id: string | null;
}

// ============================================================================
// Admin Types
// ============================================================================

export interface ApplicationSummary {
  id: string;
  profile_id: string;
  name: string | null;
  email: string;
  uni_name: string | null;
  gender: string | null;
  review_count: number;
  status: string;
  submitted_at: string | null;
  created_at: string;
}

export interface FullApplicationDetails {
  id: string;
  profile_id: string;
  name: string | null;
  email: string;
  phone_number: string | null;
  discord: string | null;
  t_shirt: string | null;
  dietary_restrictions: string | null;
  gender: string | null;
  ethnicity: string[];
  uni_name: string | null;
  uni_program: string | null;
  year_of_study: string | null;
  prior_hack_exp: string[];
  num_hackathons: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  other_url: string | null;
  cxc_q1: string | null;
  cxc_q2: string | null;
  team_members: string | null;
  team_name: string | null;
  team_members_with_names?: Array<{
    email: string;
    display_name: string | null;
  }>;
  resume_url: string | null;
  age: number | null;
  country_of_residence: string | null;
  mlh_agreed_code_of_conduct: boolean | null;
  mlh_authorize_info_sharing: boolean | null;
  mlh_email_opt_in: boolean | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  review_count: number;
}

export interface GetAllApplicationsResponse {
  applications: ApplicationSummary[];
}

export interface GetApplicationDetailsResponse {
  application: FullApplicationDetails;
}
