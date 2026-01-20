import { NUMBER_MOBILE_PAGES, STEP_NAMES } from "@/constants/application";
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
  CxcQ1,
  CxcQ2,
  Review,
} from "./sections";
import { StepIndicator } from "./StepIndicator";
import { AnimatePresence, motion } from "framer-motion";
import { AppNavigationButtons } from "./AppNavigationButtons";
import { useApplicationProgressSync } from "@/hooks/useApplicationProgress";
import { useEffect, useState } from "react";
import MLHCheckboxes from "./sections/MLHCheckboxes";
import { Teams } from "./sections/Teams";

interface MobileApplicationProps {
  readonly form: UseFormReturn<AppFormValues>;
  readonly isLoading: boolean;
  readonly onSaveAndContinue: (
    onSuccess: () => void,
    isSubmit: boolean,
  ) => Promise<void>;
  readonly currentPage: number;
  readonly onPageChange: (page: number) => void;
}

const FINAL_STEP_COUNT = STEP_NAMES.length;
const PAGE_NAMES = [
  "Contact info",
  "About you",
  "Optional",
  "Education",
  "Hackathon experience",
  "Documents",
  "Question 1",
  "Question 2",
  "Teams",
  "MLH",
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
    if (currentPage < 3) return 0; // Contact Info, About You, Optional About You
    if (currentPage < 6) return 1; // Education, Prior Hack Exp, Links & Docs
    if (currentPage < 8) return 2; // CXC Q1, Q2
    if (currentPage < 9) return 3; // Teams
    if (currentPage < 10) return 4; // MLH
    return 5; // Review
  };

  const currentStep = getCurrentStep();

  useApplicationProgressSync(currentStep);

  // Scroll to top smoothly when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const goNext = () => {
    setDirection(1);
    onPageChange(currentPage + 1);
  };

  const goPrevious = () => {
    setDirection(-1);
    onPageChange(currentPage - 1);
  };

  const handleNext = async () => {
    const isLastPage = currentPage === NUMBER_MOBILE_PAGES - 1;
    await onSaveAndContinue(goNext, isLastPage);
  };

  const renderStep = () => {
    switch (currentPage) {
      case 0:
        return <ContactInfo form={form} />;
      case 1:
        return <AboutYou form={form} />;
      case 2:
        return <OptionalAboutYou form={form} />;
      case 3:
        return <Education form={form} />;
      case 4:
        return <PriorHackExp form={form} />;
      case 5:
        return <LinksAndDocs form={form} />;
      case 6:
        return <CxcQ1 form={form} />;
      case 7:
        return <CxcQ2 form={form} />;
      case 8:
        return <Teams form={form} />;
      case 9:
        return <MLHCheckboxes form={form} />;
      case 10:
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
        <div className="flex flex-col gap-2">
          <StepIndicator
            currentStep={getCurrentStep() + 1}
            totalSteps={FINAL_STEP_COUNT}
            stepName={STEP_NAMES[currentStep]}
            subStepName={PAGE_NAMES[currentPage]}
            label=""
          />
        </div>
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

          {currentPage !== NUMBER_MOBILE_PAGES && (
            <AppNavigationButtons
              isFirstStep={currentPage === 0}
              isLastStep={currentPage === NUMBER_MOBILE_PAGES - 1}
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
