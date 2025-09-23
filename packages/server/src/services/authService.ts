import { AuthRepository } from "../repository/authRepository";
import { RegisterData, LoginData, AuthResponse, UserResponse, SignOutResponse } from "../types/auth";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const email = data.email.toLowerCase().trim();

      const { data: authData, error } = await this.authRepository.createUser({
        email,
        password: data.password
      });

      if (error) {
        return {
          success: false,
          user: null,
          session: null,
          error: error.message
        };
      }

      return {
        success: true,
        user: authData.user,
        session: authData.session,
        error: null
      };
    } catch {
      return {
        success: false,
        user: null,
        session: null,
        error: "Registration failed"
      };
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const email = data.email.toLowerCase().trim();

      const { data: authData, error } = await this.authRepository.authenticateUser({
        email,
        password: data.password
      });

      if (error) {
        return {
          success: false,
          user: null,
          session: null,
          error: error.message
        };
      }

      return {
        success: true,
        user: authData.user,
        session: authData.session,
        error: null
      };
    } catch {
      return {
        success: false,
        user: null,
        session: null,
        error: "Login failed"
      };
    }
  }

  async getCurrentUser(): Promise<UserResponse> {
    try {
        const user = await this.authRepository.getCurrentUser();
        return {
          success: true,
          user,
          error: null
        };
    } catch {
      return {
        success: false,
        user: null,
        error: "Failed to get user"
      };
    }
  }

  async signOut(): Promise<SignOutResponse> {
    try {
      const { error } = await this.authRepository.signOutUser();
      return { success: !error, error: error?.message || null };
    } catch {
      return { success: false, error: "Sign out failed" };
    }
  }
}
