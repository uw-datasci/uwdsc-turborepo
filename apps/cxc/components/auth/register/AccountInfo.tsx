"use client";

import { FormField } from "@uwdsc/ui";
import { RegistrationFormValues } from "@/lib/schemas/register";
import { UseFormReturn } from "react-hook-form";
import { renderTextField } from "../../FormHelpers";

interface StepProps {
  form: UseFormReturn<RegistrationFormValues>;
}

interface FormField {
  name: keyof RegistrationFormValues;
  label: string;
}

const FORM_FIELDS: FormField[] = [
  {
    name: "first_name",
    label: "Enter your first name",
  },
  {
    name: "last_name",
    label: "Enter your last name",
  },
  {
    name: "wat_iam",
    label: "WatIAM (ex. slchow)",
  },
  {
    name: "email",
    label: "Email (ex. slchow@uwaterloo.ca)",
  },
];

export function AccountInfo({ form }: Readonly<StepProps>) {
  return (
    <div className="flex flex-col gap-4">
      {FORM_FIELDS.map((field) => (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={renderTextField(field.label, { variant: "auth" })}
        />
      ))}
    </div>
  );
}
