"use client";

import { Button } from "@uwdsc/ui";
import { CheckCircle2 } from "lucide-react";

interface SubmittedProps {
  readonly applicationId?: string;
  readonly onView?: () => void;
}

export function Submitted({ applicationId, onView }: SubmittedProps) {
  return (
    <div className="space-y-8 py-8 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-24 w-24 text-green-500" />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Application Submitted!</h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Thank you for applying to the UWaterloo Data Science Club. We've
          received your application and will review it shortly.
        </p>
      </div>

      {applicationId && (
        <div className="rounded-lg bg-muted p-4 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground mb-1">Application ID</p>
          <p className="font-mono font-semibold">{applicationId}</p>
        </div>
      )}

      <div className="space-y-4 max-w-md mx-auto">
        <div className="rounded-lg border p-4 text-left">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
            <li>Our team will review your application</li>
            <li>You'll receive an email confirmation shortly</li>
            <li>We'll reach out within 1-2 weeks with next steps</li>
            <li>Check your email regularly for updates</li>
          </ul>
        </div>

        <div className="rounded-lg bg-muted p-4 text-left">
          <h3 className="font-semibold mb-2">Need to make changes?</h3>
          <p className="text-sm text-muted-foreground">
            If you need to update your application, please contact us at{" "}
            <a
              href="mailto:contact@uwdsc.ca"
              className="text-primary hover:underline"
            >
              contact@uwdsc.ca
            </a>{" "}
            with your application ID.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Return to Home
        </Button>
        {onView && <Button onClick={onView}>View My Applications</Button>}
      </div>
    </div>
  );
}
