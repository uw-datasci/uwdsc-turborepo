import { z } from "zod";

/**
 * Application form validation schema
 */
export const applicationSchema = z.object({
  // TODO: Add more fields as necessary
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Valid email is required"),
  prior_hackathon_experience: z.array(z.enum(["None", "Hacker", "Judge", "Mentor", "Organizer"])).min(1, "Please select at least one option"),
  resume: z.instanceof(File).optional(),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  other_link: z.string().url().optional().or(z.literal(""))
});

/**
 * TypeScript type inferred from the schema
 */
export type AppFormValues = z.infer<typeof applicationSchema>;

/**
 * Default values for the form
 */
export const applicationDefaultValues: Partial<AppFormValues> = {
  // TODO: Add more fields to match schema
  first_name: "",
  last_name: "",
  dob: "",
  email: "",
  prior_hackathon_experience: [],
  resume: undefined,
  github: "",
  linkedin: "",
  other_link: "",
};
