"use client";

import { useEffect, useRef } from "react";
import { Form, FormField } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { renderTextAreaField } from "@/components/FormHelpers";
import AppSection from "../AppSection";
import { AppFormValues } from "@/lib/schemas/application";
import { APP_Q_FIELDS } from "@/constants/application";

interface CxcQ2Props {
  readonly form: UseFormReturn<AppFormValues>;
}

const STORAGE_KEY = "q2_save";

export function CxcQ2({ form }: CxcQ2Props) {
  // Watch the field value for changes
  const q2Value = form.watch(APP_Q_FIELDS.cxc_q2);
  const canPersistRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedValue = localStorage.getItem(STORAGE_KEY);
      const currentValue = form.getValues(APP_Q_FIELDS.cxc_q2);

      // Only restore if localStorage has a value and form field is empty (set dirty)
      if (savedValue && (currentValue == null || currentValue === "")) {
        form.setValue(APP_Q_FIELDS.cxc_q2, savedValue, { shouldDirty: false });
      }
      canPersistRef.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, [form]);

  // Save to localStorage whenever the value changes
  useEffect(() => {
    if (!canPersistRef.current) return;
    if (q2Value === undefined) return;

    if (q2Value && q2Value.length > 0) {
      localStorage.setItem(STORAGE_KEY, q2Value);
      return;
    }

    // Only remove from localStorage if the user actually interacted (field is dirty)
    const isDirty = !!(form.getFieldState(APP_Q_FIELDS.cxc_q2).isDirty);
    if (isDirty) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [q2Value, form]);

  return (
    <Form {...form}>
      <AppSection>
        <FormField
          key="cxc_q2"
          control={form.control}
          name={APP_Q_FIELDS.cxc_q2}
          render={renderTextAreaField(
            "Type your haiku here... (5-7-5 syllables)",
            {
              label: "Write us a Haiku",
              required: true,
              variant: "application",
              textareaProps: {
                maxLength: 200,
              },
            },
          )}
        />
      </AppSection>
    </Form>
  );
}
