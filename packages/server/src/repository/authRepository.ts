import { BaseRepository } from "./baseRepository";
import { LoginData, RegisterData } from "../types/auth";

export class AuthRepository extends BaseRepository {
  async createUser(data: RegisterData) {
    return await this.client.auth.signUp({
      email: data.email,
      password: data.password
    });
  }
  async authenticateUser(data: LoginData) {
    return await this.client.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
  }

  async getCurrentUser() {
    const { data: { session }, error } = await this.client.auth.getSession();
    if (error) {
      throw new Error(`Failed to get current user: ${error.message}`);
    }
    return session?.user || null;
  }

  async signOutUser() {
    return await this.client.auth.signOut();
  }
}