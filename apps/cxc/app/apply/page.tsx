"use client";

import DesktopApplication from "@/components/application/DesktopApplication";
import MobileApplication from "@/components/application/MobileApplication";
import { Submitted } from "@/components/application/sections";
import { STEP_NAMES } from "@/constants/application";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppFormValues,
  applicationSchema,
  applicationDefaultValues,
} from "@/lib/schemas/application";
import { useState } from "react";

const FINAL_STEP_COUNT = STEP_NAMES.length;
const NUMBER_PAGES = 8;

// Helper function to convert desktop step to mobile page
const stepToPage = (step: number): number => {
  // Desktop step 0 → Mobile page 0
  // Desktop step 1 → Mobile page 2
  // Desktop step 2 → Mobile page 5
  // Desktop step 3 → Mobile page 7
  const stepToPageMap = [0, 2, 5, 7];
  return stepToPageMap[step] || 0;
};

// Helper function to convert mobile page to desktop step
const pageToStep = (page: number): number => {
  if (page < 2) return 0;
  if (page < 5) return 1;
  if (page < 7) return 2;
  return 3;
};

export default function ApplyPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDesktopStep, setCurrentDesktopStep] = useState<number>(0);
  const [currentMobilePage, setCurrentMobilePage] = useState<number>(0);

  const form = useForm<AppFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaultValues,
    mode: "onTouched",
  });

  const handleSaveAndContinue = async (onSuccess: () => void) => {
    setIsLoading(true);
    try {
      // TODO: Replace with Create & Update Application API calls
      // Example: await updateApplication(form.getValues());
      await new Promise((resolve) => setTimeout(resolve, 1000)); // TO REMOVE
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDesktopStepChange = (newStep: number) => {
    setCurrentDesktopStep(newStep);
    // Sync mobile to the first page of this step
    setCurrentMobilePage(stepToPage(newStep));
  };

  const handleMobilePageChange = (newPage: number) => {
    setCurrentMobilePage(newPage);
    // Sync desktop to the step this page belongs to
    setCurrentDesktopStep(pageToStep(newPage));
  };

  // Check if application is submitted
  const isSubmitted =
    currentDesktopStep === FINAL_STEP_COUNT ||
    currentMobilePage === NUMBER_PAGES;

  if (isSubmitted) {
    return <Submitted />;
  }

  return (
    <>
      <DesktopApplication
        form={form}
        isLoading={isLoading}
        onSaveAndContinue={handleSaveAndContinue}
        currentStep={currentDesktopStep}
        onStepChange={handleDesktopStepChange}
      />
      <MobileApplication
        form={form}
        isLoading={isLoading}
        onSaveAndContinue={handleSaveAndContinue}
        currentPage={currentMobilePage}
        onPageChange={handleMobilePageChange}
      />
    </>
  );
}
