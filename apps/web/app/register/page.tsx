"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  registrationSchema,
  registrationDefaultValues,
  RegistrationFormValues,
} from "@/lib/schemas/register";
import { StepPersonalInfo } from "@/components/register/AccountInfo";
import { StepAcademicInfo } from "@/components/register/AdditionalInfo";
import { Form, Button } from "@uwdsc/ui";
import { AnimatePresence, motion } from "framer-motion";

// Define required fields for each step
const stepFields: Record<number, Array<keyof RegistrationFormValues>> = {
  0: ["first_name", "last_name", "email", "password"],
  1: ["faculty", "term", "heard_from", "message"],
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: registrationDefaultValues,
    mode: "onChange", // Validate on every change including dropdowns
    reValidateMode: "onChange",
  });

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const fields = stepFields[step];
    const formState = form.formState;

    // Check if all fields in current step are valid (no errors)
    const hasNoErrors = fields?.every((field) => !formState.errors[field]);

    // Check if all fields have been touched/filled
    const allTouched = fields?.every((field) => {
      const value = form.getValues(field);
      return value !== undefined && value !== null && value !== "";
    });

    return hasNoErrors && allTouched;
  };

  const steps = [
    <StepPersonalInfo key="step1" form={form} />,
    <StepAcademicInfo key="step2" form={form} />,
  ];

  const handleNext = async () => {
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validate the entire form only on submit
      const isValid = await form.trigger();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isValid) {
        const data = form.getValues();
        console.log("Submitted data:", data);
        // TODO: send to backend here
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen flex flex-col items-center justify-center p-20">
      <Form {...form}>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full h-full bg-black max-w-7xl">
          {/* Left Information Side */}
          <div className="flex flex-col gap-8">
            <div className="hidden md:block relative w-40 h-40">
              <Image
                src="/logos/dsc.svg"
                alt="uwdsc logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-5xl font-bold text-center md:text-start">
              Join Us!
            </h2>
            <p className="leading-loose">
              Become a part of a growing community of data science enthusiasts
              and participate in engaging discussions, hands-on projects, and
              networking opportunities.
            </p>
          </div>
          {/* Vertical Divider */}
          <div className="hidden md:block w-px self-stretch bg-gray-500/60 mx-8" />
          {/* Right Input Side */}
          <div className="w-full h-full">
            <div>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {steps[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-1 items-start justify-between mt-6">
              {step < steps.length - 1 ? (
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  type="button"
                  className="w-full rounded-md xl:rounded-lg bg-gradient-purple text-md font-bold"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={isLoading}
                  type="button"
                  className="w-full rounded-md xl:rounded-lg bg-gradient-purple text-md font-bold"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              )}
              {step > 0 ? (
                <Button
                  variant="link"
                  size="sm"
                  onClick={handlePrevious}
                  className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0"
                  type="button"
                >
                  Previous
                </Button>
              ) : (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {}} // TODO: Link to Login page when created
                  className="text-gray-400/60 hover:text-gray-200 transition-colors text-sm font-medium p-0"
                  type="button"
                >
                  Already a member? Sign in here.
                </Button>
              )}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
