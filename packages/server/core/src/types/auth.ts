import type { User, Session } from "@supabase/supabase-js";

export interface RegisterData {
  email: string;
  password: string;
  metadata?: Record<string, any>;
}

export interface ResendVerificationData {
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User | null;
  session: Session | null;
  error: string | null;
}

export interface ResendVerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface UserResponse {
  success: boolean;
  user: User | null;
  error: string | null;
}

export interface SignOutResponse {
  success: boolean;
  error: string | null;
}
