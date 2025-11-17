import { z } from "zod";

/**
 * Registration form validation schema
 */

export const registrationSchema = z
  .object({
    first_name: z.string().trim().nonempty("Please enter your first name"),
    last_name: z.string().trim().nonempty("Please enter your last name"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Your password needs to be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const registrationDefaultValues: Partial<RegistrationFormValues> = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
