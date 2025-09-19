import type { User, Session } from "@supabase/supabase-js";

export interface RegisterData {
  email: string;
  password: string;
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

export interface UserResponse {
  success: boolean;
  user: User | null;
  error: string | null;
}