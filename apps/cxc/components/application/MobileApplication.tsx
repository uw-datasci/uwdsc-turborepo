import { STEP_NAMES } from "@/constants/application";
import { AppFormValues } from "@/lib/schemas/application";
import { isMobileStepValid } from "@/lib/utils/application";
import {
  slideVariants,
  slideTransition,
} from "@/lib/utils/applicationAnimations";
import { UseFormReturn } from "react-hook-form";
import { MobileAppWormhole } from "./AppWormhole";
import MobileAppNav from "./MobileAppNav";
import {
  ContactInfo,
  AboutYou,
  OptionalAboutYou,
  Education,
  PriorHackExp,
  LinksAndDocs,
  CxCGain,
  SillyQ,
  Review,
} from "./sections";
import { StepIndicator } from "./StepIndicator";
import { AnimatePresence, motion } from "framer-motion";
import { AppNavigationButtons } from "./AppNavigationButtons";
import { useApplicationProgressSync } from "@/hooks/useApplicationProgress";
import { useState } from "react";

interface MobileApplicationProps {
  readonly form: UseFormReturn<AppFormValues>;
  readonly isLoading: boolean;
  readonly onSaveAndContinue: (onSuccess: () => void) => Promise<void>;
  readonly currentPage: number;
  readonly onPageChange: (page: number) => void;
}

const FINAL_STEP_COUNT = STEP_NAMES.length;
const NUMBER_PAGES = 8;
const PAGE_NAMES = [
  "Contact info",
  "About you",
  "Education",
  "Hackathon experience",
  "Documents",
  "Question 1",
  "Question 2",
  "Complete application",
];

export default function MobileApplication({
  form,
  isLoading,
  onSaveAndContinue,
  currentPage,
  onPageChange,
}: MobileApplicationProps) {
  const [direction, setDirection] = useState<number>(1);

  const getCurrentStep = () => {
    if (currentPage < 2) return 0;
    if (currentPage < 5) return 1;
    if (currentPage < 7) return 2;
    return 3;
  };

  const currentStep = getCurrentStep();

  useApplicationProgressSync(currentStep);

  const goNext = () => {
    setDirection(1);
    onPageChange(currentPage + 1);
  };

  const goPrevious = () => {
    setDirection(-1);
    onPageChange(currentPage - 1);
  };

  const handleNext = async () => {
    await onSaveAndContinue(goNext);
  };

  const renderStep = () => {
    switch (currentPage) {
      case 0:
        return <ContactInfo form={form} />;
      case 1:
        return (
          <div className="flex flex-col gap-10">
            <AboutYou form={form} />
            <OptionalAboutYou form={form} />
          </div>
        );
      case 2:
        return <Education form={form} />;
      case 3:
        return <PriorHackExp form={form} />;
      case 4:
        return <LinksAndDocs form={form} />;
      case 5:
        return <CxCGain form={form} />;
      case 6:
        return <SillyQ form={form} />;
      case 7:
        return <Review form={form} />;
    }
  };

  return (
    <div className="md:hidden relative min-h-screen cxc-app-font flex flex-col">
      <div className="absolute inset-0 -z-10">
        <MobileAppWormhole opacity={0.4} />
      </div>
      <MobileAppNav />
      <div className="relative z-10 p-5 overflow-hidden flex flex-col gap-12 flex-1">
        <StepIndicator
          currentStep={getCurrentStep() + 1}
          totalSteps={FINAL_STEP_COUNT}
          stepName={STEP_NAMES[currentStep]}
          subStepName={PAGE_NAMES[currentPage]}
          label=""
        />
        <div className="overflow-visible flex-1 flex flex-col justify-between">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
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

          {currentPage !== NUMBER_PAGES && (
            <AppNavigationButtons
              isFirstStep={currentPage === 0}
              isLastStep={currentPage === NUMBER_PAGES - 1}
              isNextDisabled={
                !isMobileStepValid(form, currentPage) || isLoading
              }
              isLoading={isLoading}
              onPrevious={goPrevious}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}
