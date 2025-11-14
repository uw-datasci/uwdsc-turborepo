"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderTextField } from "@/components/FormHelpers";
import { PERSONAL_INFO_FIELDS } from "@/constants/application";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";

interface ContactInfoProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function ContactInfo({ form }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      <Form {...form}>
        <AppSection
          label="Contact info"
          description="We'll verify you for our server with your Discord username."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.email}
              render={renderTextField("Email", {
                required: true,
                inputProps: { type: "email" },
                variant: "application",
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.phone}
              render={renderTextField("Phone Number", {
                required: true,
                inputProps: { type: "tel" },
                variant: "application",
              })}
            />

            <FormField
              control={form.control}
              name={PERSONAL_INFO_FIELDS.discord}
              render={renderTextField("Discord", {
                required: true,
                variant: "application",
              })}
            />
          </div>
        </AppSection>
      </Form>
    </div>
  );
}
