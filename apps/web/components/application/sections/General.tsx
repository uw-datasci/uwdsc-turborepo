"use client";

import { Button } from "@uwdsc/ui";
import { UseFormReturn } from "react-hook-form";
import { AppFormValues } from "@/lib/schemas/application";

interface GeneralProps {
  readonly form: UseFormReturn<AppFormValues>;
  readonly onNext: () => void;
  readonly onBack: () => void;
}

export function General({ form, onNext, onBack }: GeneralProps) {
  const handleNext = () => {
    console.log("📝 API Call: Updating application with basic questions...");
    console.log({
      section: "basic_questions",
      // Add your basic questions data here
      note: "Basic questions would be saved here",
    });
    console.log("✅ Basic questions saved successfully");
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Basic Questions</h2>
        <p className="text-muted-foreground">
          Tell us more about your background and interests
        </p>
      </div>

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
