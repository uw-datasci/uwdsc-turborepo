import { BaseRepository } from "./baseRepository";

export class AuthRepository extends BaseRepository {
  async createUser(email: string, password: string, metadata?: Record<string, any>) {
    return await this.client.auth.signUp({
      email,
      password,
      options: { data: metadata || {} }
    });
  }
  async authenticateUser(email: string, password: string) {
    return await this.client.auth.signInWithPassword({
      email,
      password
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