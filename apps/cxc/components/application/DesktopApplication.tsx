"use client";

import { STEP_NAMES } from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";
import { isDesktopStepValid } from "@/lib/utils/application";
import {
  slideVariants,
  slideTransition,
} from "@/lib/utils/applicationAnimations";
import { AnimatePresence, motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { DesktopAppWormhole } from "./AppWormhole";
import { StepIndicator } from "./StepIndicator";
import { AppNavigationButtons } from "./AppNavigationButtons";
import { useApplicationProgressSync } from "@/hooks/useApplicationProgress";
import { useEffect, useRef, useState } from "react";
import DSCLogo from "../DSCLogo";
import {
  ContactInfo,
  AboutYou,
  OptionalAboutYou,
  Education,
  PriorHackExp,
  LinksAndDocs,
  CxcQ1,
  CxcQ2,
  Review,
} from "./sections";
import { ScrollArea } from "@uwdsc/ui/index";
import MLHCheckboxes from "./sections/MLHCheckboxes";
import { Teams } from "./sections/Teams";

interface DesktopApplicationProps {
  readonly form: UseFormReturn<AppFormValues>;
  readonly isLoading: boolean;
  readonly onSaveAndContinue: (
    onSuccess: () => void,
    isSubmit: boolean,
  ) => Promise<void>;
  readonly currentStep: number;
  readonly onStepChange: (step: number) => void;
}

const FINAL_STEP_COUNT = STEP_NAMES.length;

export default function DesktopApplication({
  form,
  isLoading,
  onSaveAndContinue,
  currentStep,
  onStepChange,
}: DesktopApplicationProps) {
  const [direction, setDirection] = useState<number>(1);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useApplicationProgressSync(currentStep);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (viewport) {
        viewport.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [currentStep]);

  const goNext = () => {
    setDirection(1);
    onStepChange(currentStep + 1);
  };

  const goPrevious = () => {
    setDirection(-1);
    onStepChange(currentStep - 1);
  };

  const handleNext = async () => {
    const isLastStep = currentStep === FINAL_STEP_COUNT - 1;
    await onSaveAndContinue(goNext, isLastStep);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col gap-12">
            <ContactInfo form={form} />
            <AboutYou form={form} />
            <OptionalAboutYou form={form} />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-12">
            <Education form={form} />
            <PriorHackExp form={form} />
            <LinksAndDocs form={form} />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-12">
            <CxcQ1 form={form} />
            <CxcQ2 form={form} />
          </div>
        );
      case 3:
        return <Teams form={form} />;
      case 4:
        return <MLHCheckboxes form={form} />;
      case 5:
        return <Review form={form} />;
    }
  };

  return (
    <div className="hidden md:flex flex-row min-h-screen h-screen">
      {/* Left Side - Wormhole - Fixed Height */}
      <div className="border-r border-white/50 md:w-2/5 relative h-screen">
        <div className="absolute inset-0">
          <DesktopAppWormhole opacity={0.5} />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between py-24 pl-12 pr-12 lg:pr-32 z-10">
          <div>
            <StepIndicator
              currentStep={currentStep + 1}
              totalSteps={FINAL_STEP_COUNT}
              label="CXC 2026"
            />
            <div className="mt-8 text-sm font-mono border border-orange-300 text-orange-300 px-3 py-1 w-fit shadow-[0_0_10px_rgba(251,146,60,0.3)]">
              Applications due Jan 15, 11:59pm
            </div>
          </div>
          <DSCLogo size={24} className="hidden md:block" href="/" />
        </div>
      </div>

      {/* Right Side - Scrollable Form */}
      <div className="md:w-3/5 h-screen">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="px-12 py-24 flex flex-col gap-12">
            <h1 className="text-5xl font-normal">{STEP_NAMES[currentStep]}</h1>
            <div className="space-y-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              {currentStep !== FINAL_STEP_COUNT && (
                <AppNavigationButtons
                  isFirstStep={currentStep === 0}
                  isLastStep={currentStep === FINAL_STEP_COUNT - 1}
                  isNextDisabled={
                    !isDesktopStepValid(form, currentStep) || isLoading
                  }
                  isLoading={isLoading}
                  onPrevious={goPrevious}
                  onNext={handleNext}
                />
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
