"use client";

import { FormField } from "@uwdsc/ui";
import { RegistrationFormValues } from "@/lib/schemas/register";
import { UseFormReturn } from "react-hook-form";
import { renderRegistrationTextField } from "../RegistrationFormHelper";

interface StepProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function AccountInfo({ form }: Readonly<StepProps>) {
  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="first_name"
        render={renderRegistrationTextField("Enter your first name", {})}
      />
      <FormField
        control={form.control}
        name="last_name"
        render={renderRegistrationTextField("Enter your last name", {})}
      />
      <FormField
        control={form.control}
        name="wat_iam"
        render={renderRegistrationTextField("WatIAM (ex. slchow)", {})}
      />
      <FormField
        control={form.control}
        name="email"
        render={renderRegistrationTextField("Email (ex. slchow@uwaterloo.ca)", {
          type: "email",
        })}
      />
      <FormField
        control={form.control}
        name="password"
        render={renderRegistrationTextField(
          "Create DSC account password (ex. d)ubl3_d3sc3nt)",
          { type: "password" }
        )}
      />
    </div>
  );
}
