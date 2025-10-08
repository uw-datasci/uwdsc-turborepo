"use client";

import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

interface PositionsProps {
  readonly form: UseFormReturn<AppFormValues>;
}

export function Positions({ form }: PositionsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Placeholder for role-specific questions */}
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            Role-specific questions will be displayed here based on the selected
            role.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Examples: Technical skills, leadership experience, portfolio
            projects
          </p>
        </div>
      </div>
    </div>
  );
}
