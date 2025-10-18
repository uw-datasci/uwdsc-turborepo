import { ApiError } from "../utils/errors";
import { ResumeRepository } from "../repository/resumeRepository";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface ResumeUploadData {
  file: File;
  userId: string;
}

export interface ResumeValidationConfig {
  maxBytes: number;
  allowedMimeTypes: Set<string>;
}

const DEFAULT_VALIDATION_CONFIG: ResumeValidationConfig = {
  maxBytes: 10 * 1024 * 1024, // 10 MB
  allowedMimeTypes: new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword", // .doc
  ]),
};

export class ResumeService {
  private readonly repository: ResumeRepository;
  private readonly validationConfig: ResumeValidationConfig;

  constructor(
    supabaseClient: SupabaseClient,
    validationConfig: ResumeValidationConfig = DEFAULT_VALIDATION_CONFIG
  ) {
    this.repository = new ResumeRepository(supabaseClient);
    this.validationConfig = validationConfig;
  }

  /**
   * Get file extension from MIME type
   */
  private getExtensionFromMime(mime: string): string | null {
    if (mime === "application/pdf") return "pdf";
    if (
      mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return "docx";
    if (mime === "application/msword") return "doc";
    return null;
  }

  /**
   * Validate resume file
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.validationConfig.maxBytes) {
      return {
        valid: false,
        error: `File too large. Max ${this.validationConfig.maxBytes / (1024 * 1024)} MB.`,
      };
    }

    // Check MIME type
    const mime = file.type || "";
    if (!this.validationConfig.allowedMimeTypes.has(mime)) {
      return {
        valid: false,
        error: "Invalid file type. Allowed: PDF or DOCX.",
      };
    }

    return { valid: true };
  }

  /**
   * Upload a resume file
   */
  async uploadResume(uploadData: ResumeUploadData) {
    try {
      const { file, userId } = uploadData;

      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
        };
      }

      // Get file extension
      const ext = this.getExtensionFromMime(file.type);
      if (!ext) {
        return {
          success: false,
          error: "Unsupported content type",
        };
      }

      // Generate object key
      const objectKey = `${userId}/${file.name}`;

      // Upload to storage
      const { data, error } = await this.repository.uploadResume({
        file,
        userId,
        objectKey,
        contentType: file.type,
      });

      if (error) {
        return {
          success: false,
          error: `Upload failed: ${error.message}`,
        };
      }

      return {
        success: true,
        key: objectKey,
        message: "Upload successful",
      };
    } catch (error) {
      throw new ApiError(
        `Resume upload failed: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * Get resume URL
   */
  async getResumeUrl(objectKey: string) {
    try {
      const url = await this.repository.getResumeUrl(objectKey);
      return {
        success: true,
        url,
      };
    } catch (error) {
      throw new ApiError(
        `Failed to get resume URL: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * Delete a resume
   */
  async deleteResume(objectKey: string) {
    try {
      const { error } = await this.repository.deleteResume(objectKey);

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        message: "Resume deleted successfully",
      };
    } catch (error) {
      throw new ApiError(
        `Failed to delete resume: ${(error as Error).message}`,
        500
      );
    }
  }

  /**
   * List user resumes
   */
  async listUserResumes(
    userId: string
  ): Promise<
    { success: true; resumes: any[] } | { success: false; error: string }
  > {
    try {
      const { data, error } = await this.repository.listUserResumes(userId);

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        resumes: data || [],
      };
    } catch (error) {
      throw new ApiError(
        `Failed to list resumes: ${(error as Error).message}`,
        500
      );
    }
  }
}
