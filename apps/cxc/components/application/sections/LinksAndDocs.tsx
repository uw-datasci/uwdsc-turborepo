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
import { getResume, uploadResume } from "@/lib/api/resume";
import { useFormFieldPersistence } from "@/hooks/useFormFieldPersistence";

interface LinksAndDocsProps {
  readonly form: UseFormReturn<AppFormValues>;
}

const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

export function LinksAndDocs({ form }: LinksAndDocsProps) {
  // Persist form fields to localStorage (except resume)
  useFormFieldPersistence(form, "github");
  useFormFieldPersistence(form, "linkedin");
  useFormFieldPersistence(form, "website_url");
  useFormFieldPersistence(form, "other_link");
  const [resumeFileName, setResumeFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  // Fetch existing resume on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const result = await getResume();
        if (result.resume && result.resume.name) {
          setResumeFileName(result.resume.name);
        }
      } catch {
        // No resume found - that's okay
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
      form.setValue(LINKS_FIELDS.resume, undefined);
      return;
    }

    setIsUploading(true);
    try {
      // Upload resume immediately
      await uploadResume(file);

      // Clear any previous errors
      form.clearErrors(LINKS_FIELDS.resume);

      // Update UI
      setResumeFileName(file.name);

      // Set file in form
      form.setValue(LINKS_FIELDS.resume, file, { shouldDirty: true });
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
