"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@uwdsc/ui";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { ApplicationFormValues } from "@/lib/schemas/application";
import Seo from "@/components/Seo";
import { useState, useEffect } from "react";
import { Term } from "@/types/application";

export default function ApplyPage() {
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);

  useEffect(() => {
    setCurrentTerm({
      id: "1",
      termName: "Winter 2025",
      appReleaseDate: new Date(),
      appDeadline: new Date(),
      questions: [],
    });
  }, []);

  const handleSubmit = (data: ApplicationFormValues) => {
    console.log("Form submitted successfully:", data);
    // TODO: Send data to API
    alert("Application submitted! Check console for data.");
  };

  if (!currentTerm) return null;

  return (
    <>
      <Seo title="DSC Application" />
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              DSC Application Form
            </CardTitle>
            <CardDescription>
              Fill out the form below to apply for the Data Science Club
              executive team. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationForm onSubmit={handleSubmit} showDebugInfo={true} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
