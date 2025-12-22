"use client";

import { useEffect, useRef } from "react";
import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderTextAreaField } from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { APP_Q_FIELDS } from "@/constants/application";

interface CxcQ1Props {
  readonly form: UseFormReturn<AppFormValues>;
}

const STORAGE_KEY = "q1_save";

export function CxcQ1({ form }: CxcQ1Props) {
  // Watch the field value for changes
  const q1Value = form.watch(APP_Q_FIELDS.cxc_q1);

  // Gate persistence until after we've attempted restore once
  const canPersistRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedValue = localStorage.getItem(STORAGE_KEY);
      const currentValue = form.getValues(APP_Q_FIELDS.cxc_q1);

      // Only restore if localStorage has a value and form field is empty (set dirty)
      if (savedValue && (currentValue == null || currentValue === "")) {
        form.setValue(APP_Q_FIELDS.cxc_q1, savedValue, { shouldDirty: false });
      }

      canPersistRef.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, [form]);

  useEffect(() => {
    if (!canPersistRef.current) return;
    if (q1Value === undefined) return;
    if (q1Value && q1Value.length > 0) {
      localStorage.setItem(STORAGE_KEY, q1Value);
      return;
    }

    // Only remove from localStorage if the user actually interacted (field is dirty)
    const isDirty = !!(form.getFieldState(APP_Q_FIELDS.cxc_q1).isDirty);
    if (isDirty) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [q1Value, form]);

  return (
    <Form {...form}>
      <AppSection>
        <FormField
          key="cxc_q1"
          control={form.control}
          name={APP_Q_FIELDS.cxc_q1}
          render={renderTextAreaField("I hope to...", {
            label:
              "Tell us about a technical project that you have worked on. What did you learn? What challenges did you face?",
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
