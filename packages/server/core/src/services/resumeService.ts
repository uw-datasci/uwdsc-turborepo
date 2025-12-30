import type { SupabaseClient } from "@supabase/supabase-js";
import type { FileObject } from "@supabase/storage-js";
import { FileService, FileValidationConfig } from "./fileService";
import type { FileUploadData } from "./fileService";

export type ResumeUploadData = FileUploadData;

/**
 * Get file extension from MIME type
 */
function getExtensionFromMime(mime: string): string | null {
  if (mime === "application/pdf") return "pdf";
  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  if (mime === "application/msword") return "doc";
  return null;
}

const RESUME_VALIDATION_CONFIG: FileValidationConfig = {
  maxBytes: 10 * 1024 * 1024, // 10 MB
  allowedMimeTypes: new Set([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword", // .doc
  ]),
  mimeToExtension: getExtensionFromMime,
  customValidation: (file: File) => {
    // Additional resume-specific validation
    const ext = getExtensionFromMime(file.type);
    if (!ext) {
      return {
        valid: false,
        error: "Invalid file type. Allowed: PDF, DOC, or DOCX.",
      };
    }
    return null;
  },
};

export class ResumeService extends FileService {
  constructor(
    supabaseClient: SupabaseClient,
    validationConfig: FileValidationConfig = RESUME_VALIDATION_CONFIG,
  ) {
    super(supabaseClient, "resumes", validationConfig);
  }

  /**
   * Generate consistent object key for resume (always replaces existing)
   * Uses format: userId/resume.{ext}
   */
  protected generateObjectKey(userId: string, fileName: string): string {
    // Get extension from file name or MIME type
    const ext = this.getFileExtension(fileName);
    return `${userId}/resume.${ext}`;
  }

  /**
   * Get file extension from filename or MIME type
   */
  private getFileExtension(fileName: string): string {
    // Try to get extension from filename
    const lastDot = fileName.lastIndexOf(".");
    if (lastDot !== -1) {
      const ext = fileName.substring(lastDot + 1).toLowerCase();
      if (["pdf", "doc", "docx"].includes(ext)) {
        return ext;
      }
    }
    // Fallback to pdf if we can't determine
    return "pdf";
  }

  /**
   * Upload a resume file (replaces existing resume for user)
   */
  async uploadResume(uploadData: ResumeUploadData) {
    const { userId } = uploadData;

    // First, delete any existing resume files for this user
    const existingResumes = await this.listUserResumes(userId);
    if (existingResumes.success && existingResumes.resumes.length > 0) {
      // Delete all existing resume files
      for (const resume of existingResumes.resumes) {
        if (resume.name) {
          await this.deleteResume(`${userId}/${resume.name}`);
        }
      }
    }

    // Upload new resume with consistent key
    return this.uploadFile(uploadData);
  }

  /**
   * Get the user's current resume
   */
  async getUserResume(
    userId: string,
  ): Promise<
    | { success: true; resume: FileObject | null; url: string | null; key: string | null }
    | { success: false; error: string }
  > {
    try {
      const result = await this.listUserResumes(userId);

      if (!result.success) {
        // If listing fails, return null (no resume found) instead of error
        // This handles cases where the user folder doesn't exist yet
        return {
          success: true,
          resume: null,
          url: null,
          key: null,
        };
      }

      // Find resume file (should be only one due to replacement logic)
      const resume = result.resumes.find((f) =>
        f.name?.startsWith("resume."),
      );

      if (!resume || !resume.name) {
        return {
          success: true,
          resume: null,
          url: null,
          key: null,
        };
      }

      // Get URL for the resume
      const objectKey = `${userId}/${resume.name}`;
      const urlResult = await this.getResumeUrl(objectKey);

      return {
        success: true,
        resume,
        url: urlResult.success ? urlResult.url : null,
        key: objectKey,
      };
    } catch (error) {
      // Return null instead of error if resume doesn't exist
      return {
        success: true,
        resume: null,
        url: null,
        key: null,
      };
    }
  }

  /**
   * Get resume URL
   */
  async getResumeUrl(objectKey: string) {
    return this.getFileUrl(objectKey);
  }

  /**
   * Delete a resume
   */
  async deleteResume(objectKey: string) {
    return this.deleteFile(objectKey);
  }

  /**
   * List user resumes
   */
  async listUserResumes(
    userId: string,
  ): Promise<
    { success: true; resumes: FileObject[] } | { success: false; error: string }
  > {
    const result = await this.listUserFiles(userId);

    // Transform the generic response to resume-specific format
    if (result.success) {
      return {
        success: true,
        resumes: result.files,
      };
    }

    return result;
  }
}
