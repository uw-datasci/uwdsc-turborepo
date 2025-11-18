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
