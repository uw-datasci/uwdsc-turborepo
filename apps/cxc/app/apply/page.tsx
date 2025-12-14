"use client";

/**
 * CXC Hacker Application Page
 *
 * This page handles the complete application flow including:
 * - Form initialization with pre-filled data
 * - Blank application creation for new users
 * - Step-by-step form submission
 * - Responsive layout for desktop and mobile views
 */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import {
  AppFormValues,
  applicationSchema,
  applicationDefaultValues,
} from "@/lib/schemas/application";
import {
  updateApplication,
  fetchApplication,
  createApplication,
} from "@/lib/api/application";
import {
  transformFormDataForDatabase,
  transformDatabaseDataToForm,
} from "@/lib/utils/formDataTransformer";
import DesktopApplication from "@/components/application/DesktopApplication";
import MobileApplication from "@/components/application/MobileApplication";
import { Submitted } from "@/components/application/sections";
import { STEP_NAMES } from "@/constants/application";

// ============================================================================
// Constants
// ============================================================================

const FINAL_STEP_COUNT = STEP_NAMES.length;
const NUMBER_PAGES = 8;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Converts desktop step to mobile page number
 * Desktop steps aggregate multiple mobile pages
 */
const stepToPage = (step: number): number => {
  const stepToPageMap = [0, 2, 5, 7];
  return stepToPageMap[step] || 0;
};

/**
 * Converts mobile page number to desktop step
 */
const pageToStep = (page: number): number => {
  if (page < 2) return 0;
  if (page < 5) return 1;
  if (page < 7) return 2;
  return 3;
};

export default function ApplyPage() {
  // ========================================================================
  // State Management
  // ========================================================================

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDesktopStep, setCurrentDesktopStep] = useState<number>(0);
  const [currentMobilePage, setCurrentMobilePage] = useState<number>(0);
  const { user } = useAuth();

  // ========================================================================
  // Form Setup
  // ========================================================================

  const form = useForm<AppFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaultValues,
    mode: "onTouched",
  });

  // ========================================================================
  // Effects
  // ========================================================================

  /**
   * Initialize application on component mount
   * - Fetch existing application if user has one
   * - Create blank application if user is new
   * - Pre-fill form with fetched data
   */
  useEffect(() => {
    const initializeApplication = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const existingApplication = await fetchApplication(user.id);

        if (existingApplication) {
          // Pre-fill form with existing application data
          const formData = transformDatabaseDataToForm(existingApplication);
          form.reset(formData);
        } else {
          // Create blank application entry for new user
          const resp = await createApplication(user.id);

          console.log(resp.success);
          console.log(resp.error);
        }
      } catch (error) {
        console.error("Error initializing application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApplication();
  }, [user?.id, form]);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  /**
   * Handles form submission on "Continue" or "Submit" button click
   * Transforms form data and sends to backend API
   */
  const handleSaveAndContinue = async (onSuccess: () => void) => {
    if (!user?.id) {
      console.error("Profile ID not found");
      return;
    }

    setIsLoading(true);
    try {
      const formData = form.getValues();
      const transformedData = transformFormDataForDatabase(formData, user.id);
      const response = await updateApplication(transformedData);

      if (response.success) {
        onSuccess();
      } else {
        console.error("Failed to update application:", response.error);
      }
    } catch (error) {
      console.error("Error during application update:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Syncs desktop step changes to mobile view
   */
  const handleDesktopStepChange = (newStep: number) => {
    setCurrentDesktopStep(newStep);
    setCurrentMobilePage(stepToPage(newStep));
  };

  /**
   * Syncs mobile page changes to desktop view
   */
  const handleMobilePageChange = (newPage: number) => {
    setCurrentMobilePage(newPage);
    setCurrentDesktopStep(pageToStep(newPage));
  };

  // ========================================================================
  // Render
  // ========================================================================

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
