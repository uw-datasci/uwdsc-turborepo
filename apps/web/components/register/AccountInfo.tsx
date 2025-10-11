// StepPersonalInfo.tsx
"use client";
import { FormField } from "@uwdsc/ui";
import { RegistrationFormValues } from "@/lib/schemas/register";
import { UseFormReturn } from "react-hook-form";
import { renderRegistrationTextField } from "../RegistrationFormHelper";

interface StepProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function StepPersonalInfo({ form }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="first_name"
        render={renderRegistrationTextField(
          "First Name",
          "Enter your first name",
          {},
          true
        )}
      />
      <FormField
        control={form.control}
        name="last_name"
        render={renderRegistrationTextField(
          "Last Name",
          "Enter your last name",
          {},
          true
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={renderRegistrationTextField(
          "Email Address",
          "you@example.com",
          { type: "email" },
          true
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={renderRegistrationTextField(
          "Password",
          "Enter a secure password",
          { type: "password" },
          true
        )}
      />
    </div>
  );
}
