import { z } from "zod";

/**
 * Application form validation schema
 */
export const applicationSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  personal_email: z.string().email("Invalid email address"),
  waterloo_email: z
    .string()
    .email("Invalid email address")
    .regex(
      /@(uwaterloo\.ca|edu\.uwaterloo\.ca)$/,
      "Must be a valid UWaterloo email (@uwaterloo.ca or @edu.uwaterloo.ca)"
    ),
  program: z.string().min(1, "Program is required"),
  academic_term: z.string().min(1, "Academic term is required"),
  resumeUrl: z.string().url("Must be a valid URL"),
});

/**
 * TypeScript type inferred from the schema
 */
export type ApplicationFormValues = z.infer<typeof applicationSchema>;

/**
 * Default values for the form
 */
export const applicationDefaultValues: ApplicationFormValues = {
  full_name: "",
  personal_email: "",
  waterloo_email: "",
  program: "",
  academic_term: "",
  resumeUrl: "",
};
