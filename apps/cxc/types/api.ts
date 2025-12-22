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

export interface SubmitApplicationResponse {
  application: {
    id: string;
    profile_id: string;
    resume_id?: string | null;
    status: string;
    submitted_at: string;
    updated_at: string;
    [key: string]: unknown;
  };
}
