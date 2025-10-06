"use client";

import { useApplicationProgress } from "@/contexts/AppProgressContext";
import {
  applicationDefaultValues,
  applicationSchema,
  type AppFormValues,
} from "@/lib/schemas/application";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { DueDateTag } from "@/components/application/DueDateTag";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@uwdsc/ui/index";
import { MoveLeft, MoveRight } from "lucide-react";
import { AvailablePositions } from "@/components/application/AvailablePositions";

export default function ApplyPage() {
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
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
    // Step 0 (Intro) shows no progress, other steps show their step number
    setProgressValue(currentStep === 0 ? -1 : currentStep);
  }, [currentStep, setProgressValue]);

  const handleStartApplication = () => {
    // TODO: API call to create application
    setCurrentStep(currentStep + 1);
  };

  const handleNext = async () => {
    try {
      // TODO: Update application
      goToStep(currentStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevious = () => {
    goToStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Intro onStartApplication={handleStartApplication} />;
      case 1:
        return <Personal form={form} />;
      case 2:
        return <General form={form} />;
      case 3:
        return <Positions form={form} />;
      case 4:
        return <Resume form={form} />;
      case 5:
        return <Submitted applicationId={applicationId} />;
    }
  };

  if (!currentTerm) return null;

  return (
    <>
      <Seo title="DSC Application" />
      <div className="container mx-auto px-4 py-12">
        <DueDateTag currentTerm={currentTerm} />
        <AvailablePositions />

        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              DSC Application - {currentTerm.termName}
            </CardTitle>

            <CardDescription>
              Join the UWaterloo Data Science Club executive team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {renderStep()}

              {currentStep !== 0 && currentStep !== 5 && (
                <div className="flex justify-between pt-4">
                  <Button size="lg" variant="outline" onClick={handlePrevious}>
                    <MoveLeft className="size-4" />
                    Previous
                  </Button>

                  <Button size="lg" onClick={handleNext}>
                    Next
                    <MoveRight className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
