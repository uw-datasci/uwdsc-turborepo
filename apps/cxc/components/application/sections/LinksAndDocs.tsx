"use client";

import { useEffect, useState } from "react";
import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import {
  renderTextField,
  renderFileUploadField,
} from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { LINKS_FIELDS } from "@/constants/application";
import { getResume, uploadResume } from "@/lib/api";
import { useFormFieldPersistence } from "@/hooks/useFormFieldPersistence";

interface LinksAndDocsProps {
  readonly form: UseFormReturn<AppFormValues>;
}

const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
const RESUME_FILENAME_STORAGE_KEY = "resume_filename";

export function LinksAndDocs({ form }: LinksAndDocsProps) {
  // Persist form fields to localStorage (except resume)
  useFormFieldPersistence(form, "github");
  useFormFieldPersistence(form, "linkedin");
  useFormFieldPersistence(form, "website_url");
  useFormFieldPersistence(form, "other_link");
  const [resumeFileName, setResumeFileName] = useState<string>(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(RESUME_FILENAME_STORAGE_KEY);
      return saved || "";
    }
    return "";
  });
  const [isUploading, setIsUploading] = useState(false);

  // Fetch existing resume on mount to verify/update localStorage
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const result = await getResume();

        // Try to get filename from multiple possible sources
        let fileName = "";

        // First try: get from resume.name (FileObject property)
        if (
          result.resume &&
          typeof result.resume === "object" &&
          "name" in result.resume &&
          result.resume.name
        ) {
          fileName = String(result.resume.name);
        }

        // Fallback: extract filename from key (format: userId/filename)
        if (!fileName && result.key) {
          const keyParts = result.key.split("/");
          if (keyParts.length > 1) {
            const extractedName = keyParts[keyParts.length - 1];
            if (extractedName) {
              fileName = extractedName;
            }
          }
        }

        if (fileName) {
          setResumeFileName(fileName);
          // Update localStorage with the verified filename
          localStorage.setItem(RESUME_FILENAME_STORAGE_KEY, fileName);
        } else {
          // No resume found - clear localStorage and state
          setResumeFileName("");
          localStorage.removeItem(RESUME_FILENAME_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        // On error, keep localStorage value if it exists (might be a temporary network issue)
        // Only clear if we're sure there's no resume
        const saved = localStorage.getItem(RESUME_FILENAME_STORAGE_KEY);
        if (!saved) {
          setResumeFileName("");
        }
      }
    };

    fetchResume();
  }, []);

  // Handle file selection - upload immediately
  const handleFileSelect = async (file: File | null) => {
    // Clear previous errors
    form.clearErrors(LINKS_FIELDS.resume);

    if (!file) {
      // File cleared
      setResumeFileName("");
      localStorage.removeItem(RESUME_FILENAME_STORAGE_KEY);
      form.setValue(LINKS_FIELDS.resume, undefined);
      return;
    }

    // Client-side validation: Check file size
    if (file.size > MAX_RESUME_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const errorMessage = `File size (${fileSizeMB} MB) exceeds the maximum allowed size of 10 MB. Please choose a smaller file.`;
      form.setError(LINKS_FIELDS.resume, {
        type: "manual",
        message: errorMessage,
      });
      // Reset file input
      setResumeFileName("");
      localStorage.removeItem(RESUME_FILENAME_STORAGE_KEY);
      form.setValue(LINKS_FIELDS.resume, undefined);
      return;
    }

    // Client-side validation: Check file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword", // .doc
    ];
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      const errorMessage =
        "Invalid file type. Please upload a PDF, DOC, or DOCX file.";
      form.setError(LINKS_FIELDS.resume, {
        type: "manual",
        message: errorMessage,
      });
      setResumeFileName("");
      localStorage.removeItem(RESUME_FILENAME_STORAGE_KEY);
      form.setValue(LINKS_FIELDS.resume, undefined);
      return;
    }

    setIsUploading(true);
    try {
      // Upload resume immediately
      await uploadResume(file);

      // Clear any previous errors
      form.clearErrors(LINKS_FIELDS.resume);

      // Update UI with the uploaded file name
      setResumeFileName(file.name);

      // Save filename to localStorage immediately
      localStorage.setItem(RESUME_FILENAME_STORAGE_KEY, file.name);

      // Set file in form (this is for form validation, the actual file is already uploaded)
      form.setValue(LINKS_FIELDS.resume, file, { shouldDirty: true });

      // Small delay to ensure the upload is fully processed, then verify
      setTimeout(async () => {
        try {
          const verifyResult = await getResume();

          // Extract filename using same logic as fetch
          let fileName = "";
          if (
            verifyResult.resume &&
            typeof verifyResult.resume === "object" &&
            "name" in verifyResult.resume &&
            verifyResult.resume.name
          ) {
            fileName = String(verifyResult.resume.name);
          }
          if (!fileName && verifyResult.key) {
            const keyParts = verifyResult.key.split("/");
            if (keyParts.length > 1) {
              const extractedName = keyParts[keyParts.length - 1];
              if (extractedName) {
                fileName = extractedName;
              }
            }
          }

          if (fileName) {
            // Resume is confirmed to be saved - update with the actual saved name
            setResumeFileName(fileName);
            localStorage.setItem(RESUME_FILENAME_STORAGE_KEY, fileName);
          }
        } catch (verifyError) {
          console.error("Error verifying resume upload:", verifyError);
          // Don't fail the upload if verification fails, but log it
        }
      }, 500);
    } catch (error) {
      console.error("Failed to upload resume:", error);

      // Extract error message
      let errorMessage = "Failed to upload resume. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = String(error.message);
      }

      form.setError(LINKS_FIELDS.resume, {
        type: "manual",
        message: errorMessage,
      });

      // Reset on error
      setResumeFileName("");
      localStorage.removeItem(RESUME_FILENAME_STORAGE_KEY);
      form.setValue(LINKS_FIELDS.resume, undefined);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <AppSection label="Links & documents (optional)">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start mb-4">
          <FormField
            control={form.control}
            name={LINKS_FIELDS.github}
            render={renderTextField("https://github.com/...", {
              label: "GitHub Profile",
              variant: "application",
            })}
          />
          <FormField
            control={form.control}
            name={LINKS_FIELDS.linkedin}
            render={renderTextField("https://linkedin.com/in/...", {
              label: "LinkedIn Profile",
              variant: "application",
            })}
          />
          <FormField
            control={form.control}
            name="website_url"
            render={renderTextField("https://example.com", {
              label: "Personal Website",
              variant: "application",
            })}
          />
          <FormField
            control={form.control}
            name={LINKS_FIELDS.other_link}
            render={renderTextField("https://...", {
              label: "Other Link (e.g. Personal Website)",
              variant: "application",
            })}
          />
        </div>
        <FormField
          control={form.control}
          name={LINKS_FIELDS.resume}
          render={renderFileUploadField(".pdf,.doc,.docx", {
            label: "Upload your resume (PDF or Word document, max 10 MB)",
            required: false,
            existingFileName: resumeFileName,
            onFileChange: (fileName: string) => {
              setResumeFileName(fileName);
            },
            onFileSelect: handleFileSelect,
          })}
        />
        {isUploading && (
          <p className="text-sm text-muted-foreground mt-2">
            Uploading resume...
          </p>
        )}
      </AppSection>
    </Form>
  );
}
