import type { SupabaseClient } from "@supabase/supabase-js";

export interface ResumeUploadOptions {
  file: File;
  userId: string;
  objectKey: string;
  contentType: string;
}

export interface ResumeUploadResult {
  key: string;
  error?: string;
}

export class ResumeRepository {
  private readonly client: SupabaseClient;
  private readonly bucketName = "resumes";

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  /**
   * Upload a resume file to Supabase storage
   */
  async uploadResume(
    options: ResumeUploadOptions
  ): Promise<{ data: { path: string } | null; error: Error | null }> {
    const { file, objectKey, contentType } = options;

    const { data, error } = await this.client.storage
      .from(this.bucketName)
      .upload(objectKey, file, {
        cacheControl: "3600",
        upsert: true,
        contentType,
      });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  }

  /**
   * Get public URL for a resume
   */
  async getResumeUrl(objectKey: string) {
    const { data } = this.client.storage
      .from(this.bucketName)
      .getPublicUrl(objectKey);

    return data.publicUrl;
  }

  /**
   * Delete a resume file
   */
  async deleteResume(objectKey: string): Promise<{ error: Error | null }> {
    const { error } = await this.client.storage
      .from(this.bucketName)
      .remove([objectKey]);

    return { error };
  }

  /**
   * List all resumes for a user
   */
  async listUserResumes(userId: string): Promise<{
    data: any[] | null;
    error: Error | null;
  }> {
    const { data, error } = await this.client.storage
      .from(this.bucketName)
      .list(userId);

    return { data, error };
  }
}
