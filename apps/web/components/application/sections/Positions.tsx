"use client";

import { Button } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

interface PositionsProps {
  readonly form: UseFormReturn<AppFormValues>;
  readonly onNext: () => void;
  readonly onBack: () => void;
}

export function Positions({ form, onNext, onBack }: PositionsProps) {
  const handleNext = () => {
    console.log(
      "📝 API Call: Updating application with role-specific questions..."
    );
    console.log({
      section: "role_specific_questions",
      // Add your role-specific questions data here
      note: "Role-specific questions would be saved here",
    });
    console.log("✅ Role-specific questions saved successfully");
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Role Specific Questions</h2>
        <p className="text-muted-foreground">
          Answer questions specific to your desired role
        </p>
      </div>

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

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
