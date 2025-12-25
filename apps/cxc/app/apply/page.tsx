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

import { useState, useEffect, useRef } from "react";
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
  getApplication,
  createApplication,
} from "@/lib/api/application";
import {
  transformFormDataForDatabase,
  transformDatabaseDataToForm,
  cleanFormData,
} from "@/lib/utils/formDataTransformer";
import DesktopApplication from "@/components/application/DesktopApplication";
import MobileApplication from "@/components/application/MobileApplication";
import { Submitted } from "@/components/application/sections";
import {
  MOBILE_STEP_TO_PAGE_MAP,
  NUMBER_MOBILE_PAGES,
  STEP_NAMES,
} from "@/constants/application";

// ============================================================================
// Constants
// ============================================================================

const FINAL_STEP_COUNT = STEP_NAMES.length;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Converts desktop step to mobile page number
 * Desktop steps aggregate multiple mobile pages
 */
const stepToPage = (step: number): number => {
  return MOBILE_STEP_TO_PAGE_MAP[step] || 0;
};

/**
 * Converts mobile page number to desktop step
 */
const pageToStep = (page: number): number => {
  if (page < 3) return 0; // pages 0, 1, 2 = Contact Info, About You, Optional
  if (page < 6) return 1; // pages 3, 4, 5 = Education, Hack Exp, Links
  if (page < 8) return 2; // pages 6, 7 = Question 1, Question 2
  return 3; // page 8 = Review
};

export default function ApplyPage() {
  // ========================================================================
  // State Management
  // ========================================================================

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDesktopStep, setCurrentDesktopStep] = useState<number>(0);
  const [currentMobilePage, setCurrentMobilePage] = useState<number>(0);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null
  );
  const { user } = useAuth();
  const hasInitialized = useRef<boolean>(false);

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
      if (!user?.id || hasInitialized.current) return;
      hasInitialized.current = true;

      setIsLoading(true);
      try {
        const existingApplication = await getApplication(user.id);
        if (existingApplication) {
          // Pre-fill form with existing application data
          const formData = transformDatabaseDataToForm(existingApplication);

          // Preserve user email and name from auth
          const fullName =
            user.first_name && user.last_name
              ? [user.first_name, user.last_name].join(" ")
              : "";

          form.reset({
            ...formData,
            email: user.email || "",
            name: fullName,
          });
        } else {
          // Create blank application entry for new user
          const resp = await createApplication(user.id);

          console.log(resp.success);
          console.log(resp.error);

          // Set user email and name for new applications
          const fullName =
            user.first_name && user.last_name
              ? [user.first_name, user.last_name].join(" ")
              : "";

          form.reset({
            ...applicationDefaultValues,
            email: user.email || "",
            name: fullName,
          });
        }
        // Set application status
        setApplicationStatus(
          (existingApplication?.status as string) || "draft"
        );
      } catch (error) {
        console.error("Error initializing application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApplication();
  }, [user, form]);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  /**
   * Handles form submission on "Continue" or "Submit" button click
   * Transforms form data and sends to backend API
   */
  const handleSaveAndContinue = async (
    onSuccess: () => void,
    isSubmit: boolean = false
  ) => {
    if (!user?.id) {
      console.error("Profile ID not found");
      return;
    }

    setIsLoading(true);
    try {
      const formData = form.getValues();

      // Update status to submitted if this is the final submit
      if (isSubmit) {
        formData.status = "submitted";
        formData.submitted_at = new Date();
      }

      const transformedData = transformFormDataForDatabase(formData, user.id);
      const cleanedData = cleanFormData(transformedData);
      const response = await updateApplication(cleanedData);

      if (response.success) {
        if (isSubmit) {
          setApplicationStatus("submitted");
        }
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

  if (!applicationStatus) {
    return null;
  }

  const isSubmitted =
    applicationStatus === "submitted" ||
    currentDesktopStep === FINAL_STEP_COUNT ||
    currentMobilePage === NUMBER_MOBILE_PAGES;

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
