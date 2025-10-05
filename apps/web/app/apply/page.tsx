"use client";

import { useApplicationProgress } from "@/contexts/AppProgressContext";
import {
  applicationDefaultValues,
  applicationSchema,
  type AppFormValues,
} from "@/lib/schemas/application";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@uwdsc/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  General,
  Intro,
  Personal,
  Positions,
  Resume,
  Submitted,
} from "@/components/application/sections";
import Seo from "@/components/Seo";
import { Term } from "@/types/application";

const STEPS = {
  INTRO: 0,
  PERSONAL: 1,
  BASIC: 2,
  ROLE_SPECIFIC: 3,
  RESUME: 4,
  SUBMITTED: 5,
} as const;

export default function ApplyPage() {
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(STEPS.INTRO);
  const [applicationId, setApplicationId] = useState<string>("");
  const { setProgressValue } = useApplicationProgress();

  useEffect(() => {
    setCurrentTerm({
      id: "1",
      termName: "Winter 2025",
      appReleaseDate: new Date(),
      appDeadline: new Date(),
      questions: [],
    });
  }, []);

  const form = useForm<AppFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaultValues,
    mode: "onBlur",
  });

  // Update progress bar based on current step
  useEffect(() => {
    const progressMap: Record<number, number> = {
      [STEPS.INTRO]: -1, // No progress shown on intro
      [STEPS.PERSONAL]: 1,
      [STEPS.BASIC]: 2,
      [STEPS.ROLE_SPECIFIC]: 3,
      [STEPS.RESUME]: 4,
      [STEPS.SUBMITTED]: 5,
    };
    setProgressValue(progressMap[currentStep] ?? -1);
  }, [currentStep, setProgressValue]);

  const handleStartApplication = () => {
    setCurrentStep(STEPS.PERSONAL);
  };

  const handleComplete = () => {
    const data = form.getValues();
    console.log("🎉 Application completed! Final data:", data);

    // Simulate generating an application ID
    const mockApplicationId = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    setApplicationId(mockApplicationId);

    // Move to submitted section
    setCurrentStep(STEPS.SUBMITTED);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.INTRO:
        return <Intro onStartApplication={handleStartApplication} />;
      case STEPS.PERSONAL:
        return (
          <Personal
            form={form}
            onNext={() => goToStep(STEPS.BASIC)}
            onBack={() => goToStep(STEPS.INTRO)}
          />
        );
      case STEPS.BASIC:
        return (
          <General
            form={form}
            onNext={() => goToStep(STEPS.ROLE_SPECIFIC)}
            onBack={() => goToStep(STEPS.PERSONAL)}
          />
        );
      case STEPS.ROLE_SPECIFIC:
        return (
          <Positions
            form={form}
            onNext={() => goToStep(STEPS.RESUME)}
            onBack={() => goToStep(STEPS.BASIC)}
          />
        );
      case STEPS.RESUME:
        return (
          <Resume
            form={form}
            onSubmit={handleComplete}
            onBack={() => goToStep(STEPS.ROLE_SPECIFIC)}
          />
        );
      case STEPS.SUBMITTED:
        return <Submitted applicationId={applicationId} />;
    }
  };

  if (!currentTerm) return null;

  return (
    <>
      <Seo title="DSC Application" />
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              DSC Application - {currentTerm.termName}
            </CardTitle>

            <CardDescription>
              Join the UWaterloo Data Science Club executive team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">{renderStep()}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
