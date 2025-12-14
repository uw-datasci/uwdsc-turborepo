"use client";

import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderTextAreaField } from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { APP_Q_FIELDS } from "@/constants/application";

interface CxcQ1Props {
  readonly form: UseFormReturn<AppFormValues>;
}

export function CxcQ1({ form }: CxcQ1Props) {
  return (
    <Form {...form}>
      <AppSection>
        <FormField
          key="cxc_q1"
          control={form.control}
          name={APP_Q_FIELDS.cxc_q1}
          render={renderTextAreaField("I hope to...", {
            label:
              "What do you hope to gain from your time at CxC? (max 500 char)",
            required: true,
            variant: "application",
            textareaProps: {
              maxLength: 500,
            },
          })}
        />
      </AppSection>
    </Form>
  );
}
