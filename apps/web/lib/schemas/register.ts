import { z } from "zod";

// const facultyEnum = z.enum(["Arts", "Engineering", "Environment", "Health", "Mathematics", "Science", "Other/Non-Waterloo"]);
// const termEnum = z.enum(["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"]);

/**
 * Registration form validation schema
 */

export const registrationSchema = z.object({
  first_name: z.string().trim().nonempty("First name is required"),
  last_name: z.string().trim().nonempty("Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Your password needs to be at least 8 characters long"),
  faculty: z.string().nonempty("Faculty is required"),
  term: z.string().nonempty("Term is required"),
  heard_from: z
    .string()
    .trim()
    .nonempty("Please enter where you heard about us"),
  message: z.string().optional(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const registrationDefaultValues: Partial<RegistrationFormValues> = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  faculty: "",
  term: "",
  heard_from: "",
  message: "",
};
