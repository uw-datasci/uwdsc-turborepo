"use client";

import { Form, FormField, UploadSimpleIcon } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import {
  renderTextField,
  renderFileUploadField,
} from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";

interface LinksAndDocsProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function LinksAndDocs({ form }: LinksAndDocsProps) {
  return (
    <div className="space-y-6">
      <Form {...form}>
        <AppSection
          label="Links & documents (optional)"
          description="Please upload a PDF or Word document file."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="github"
              render={renderTextField("https://github.com/...", {
                label: "GitHub Profile",
                variant: "application",
              })}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={renderTextField("https://linkedin.com/in/...", {
                label: "LinkedIn Profile",
                variant: "application",
              })}
            />
            <FormField
              control={form.control}
              name="x"
              render={renderTextField("https://x.com/...", {
                label: "X Profile",
                variant: "application",
              })}
            />
            <FormField
              control={form.control}
              name="other_link"
              render={renderTextField("https://...", {
                label: "Other Link (Portfolio, Personal Website, etc.)",
                variant: "application",
              })}
            />
          </div>
          <FormField
            control={form.control}
            name="resume"
            render={renderFileUploadField(".pdf,.doc,.docx", {
              label: "Upload your resume (PDF or Word document)",
              required: false,
            })}
          />
        </AppSection>
      </Form>
    </div>
  );
}
