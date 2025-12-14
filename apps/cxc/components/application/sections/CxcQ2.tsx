"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderTextAreaField } from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { APP_Q_FIELDS } from "@/constants/application";

interface CxcQ2Props {
  readonly form: UseFormReturn<AppFormValues>;
}

export function CxcQ2({ form }: CxcQ2Props) {
  return (
    <Form {...form}>
      <AppSection>
        <FormField
          key="cxc_q2"
          control={form.control}
          name={APP_Q_FIELDS.cxc_q2}
          render={renderTextAreaField("Hmmmm", {
            label: "Silly Q Here (max 200 char)",
            required: true,
            variant: "application",
            textareaProps: {
              maxLength: 200,
            },
          })}
        />
      </AppSection>
    </Form>
  );
}
