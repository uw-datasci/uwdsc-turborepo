"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from "@uwdsc/ui";
import { type ApplicationFormValues } from "@/lib/schemas/application";
import { useApplicationForm } from "@/hooks/useApplicationForm";

interface ApplicationFormProps {
  readonly onSubmit: (data: ApplicationFormValues) => void | Promise<void>;
  readonly showDebugInfo?: boolean;
  readonly defaultValues?: Partial<ApplicationFormValues>;
}

export function ApplicationForm({
  onSubmit,
  showDebugInfo = false,
  defaultValues,
}: ApplicationFormProps) {
  const { form, handleSubmit, isSubmitting } = useApplicationForm({
    onSubmit,
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Personal Email */}
          <FormField
            control={form.control}
            name="personal_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your primary contact email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* UWaterloo Email */}
          <FormField
            control={form.control}
            name="waterloo_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UWaterloo Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jdoe@uwaterloo.ca"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Must be a valid @uwaterloo.ca or @edu.uwaterloo.ca email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Program */}
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program *</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormDescription>
                  Your academic program at UWaterloo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Academic Term */}
          <FormField
            control={form.control}
            name="academic_term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Term *</FormLabel>
                <FormControl>
                  <Input placeholder="3A" {...field} />
                </FormControl>
                <FormDescription>
                  Your current academic term (e.g., 1A, 2B, 3A)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume URL */}
          <FormField
            control={form.control}
            name="resumeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume URL *</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Link to your resume (Google Drive, Dropbox, etc.)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Clear Form
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>

      {showDebugInfo && (
        <div className="mt-8 rounded-lg p-4">
          <h3 className="mb-2 font-semibold">Form State (Debug):</h3>
          <pre className="overflow-auto text-xs">
            {JSON.stringify(
              {
                values: form.watch(),
                errors: form.formState.errors,
                isValid: form.formState.isValid,
                isDirty: form.formState.isDirty,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </>
  );
}
