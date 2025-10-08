"use client";

import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

interface GeneralProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function General({ form }: GeneralProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Placeholder for basic questions */}
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            Basic questions will be displayed here based on the current term's
            configuration.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Examples: Why do you want to join DSC? What are your data science
            interests?
          </p>
        </div>
      </div>
    </div>
  );
}
