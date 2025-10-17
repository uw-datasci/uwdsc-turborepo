import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import { LoginData, RegisterData, ResendVerificationData } from "../types/auth";

export class AuthRepository extends BaseRepository {
  async createUser(data: RegisterData) {
    const payload: Parameters<typeof this.client.auth.signUp>[0] = {
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: 'http://localhost:3000/me',
      },
    };

    if (data.metadata) {
      payload.options = { data: data.metadata };
    }
    return await this.client.auth.signUp(payload);
    });
  }
  
  async authenticateUser(data: LoginData) {
    return await this.client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  }

  async resendVerificationEmail(data: ResendVerificationData) {
    const { data: resendData, error } = await this.client.auth.resend({
      type: "signup",
      email: data.email,
    });
    if (error) {
      throw new Error(`Failed to resend verification email: ${error.message}`);
    }
    return resendData;
  }

  async getCurrentUser() {
    const {
      data: { session },
      error,
    } = await this.client.auth.getSession();
    if (error) {
      throw new Error(`Failed to get current user: ${error.message}`);
    }
    return session?.user || null;
  }

  async signOutUser() {
    return await this.client.auth.signOut();
  }
}
