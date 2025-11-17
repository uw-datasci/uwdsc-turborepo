import {
  STEP_NAMES,
  APPLICATION_RELEASE_DATE,
  APPLICATION_DEADLINE,
} from "@/constants/application";
import { useApplicationProgress } from "@/contexts/AppProgressContext";
import {
  AppFormValues,
  applicationSchema,
  applicationDefaultValues,
} from "@/lib/schemas/application";
import { isMobileStepValid } from "@/lib/utils/application";
import { AppInfo } from "@/types/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@uwdsc/ui/index";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
  Submitted,
} from "./sections";
import { StepIndicator } from "./StepIndicator";
import { AnimatePresence, motion } from "framer-motion";

// Animation variants for sliding transitions
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
  }),
};

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

export default function MobileApplication() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 for forward, -1 for backward
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setProgressValue } = useApplicationProgress();

  useEffect(() => {
    // TODO: Fetch questions from database

    setAppInfo({
      appReleaseDate: APPLICATION_RELEASE_DATE,
      appDeadline: APPLICATION_DEADLINE,
      questions: [],
    });
  }, []);

  const form = useForm<AppFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaultValues,
    mode: "onTouched",
  });

  // TODO: might need another context just to store the mobile progress val??
  //       since desktop and mobile pages dont align
  // Update progress bar based on current step
  useEffect(() => {
    // Step 0 (Intro) shows no progress, other steps show their step number
    window.scrollTo({ top: 0, behavior: "auto" });
    setProgressValue(currentStep === 0 ? -1 : currentStep);
  }, [currentStep, setProgressValue]);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Example: await updateApplication(form.getValues());
      await new Promise((resolve) => setTimeout(resolve, 1000)); // TO REMOVE
      goToStep(currentPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    goToStep(currentPage - 1);
  };

  const goToStep = (step: number) => {
    setDirection(step > currentPage ? 1 : -1);
    setCurrentPage(step);
    setCurrentStep(getCurrentStep());
  };

  const getCurrentStep = () => {
    if (currentPage < 2) return 0;
    if (currentPage < 5) return 1;
    if (currentPage < 7) return 2;
    return 3;
  };

  const renderButton = () => {
    const isLastStep = currentPage === NUMBER_PAGES - 1;
    const isButtonDisabled = !isMobileStepValid(form, currentPage) || isLoading;

    return (
      <Button
        size="lg"
        onClick={handleNext}
        disabled={isButtonDisabled}
        className="rounded-none bg-white text-black !h-auto px-4.5 py-4 font-normal text-xl hover:bg-white/80 hover:scale-105"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {isLastStep ? "Submitting..." : "Saving..."}
          </>
        ) : (
          <>
            {isLastStep ? "Submit" : "Continue"}
            <span className="ml-8 font-sans">→</span>
          </>
        )}
      </Button>
    );
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

  //   if (!appInfo) return <Unavailable />;

  if (currentPage === NUMBER_PAGES) return <Submitted />;
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
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {currentPage !== NUMBER_PAGES && (
            <div className="flex justify-between pt-4">
              <Button
                size="lg"
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="rounded-none bg-black !h-auto !px-4.5 !py-4 text-white hover:scale-105 hover:bg-black/50"
              >
                <ArrowLeftIcon size={24} className="!w-6 !h-6" />
              </Button>

              {renderButton()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
