"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@uwdsc/ui";
import { ApplicationForm } from "@/components/application/ApplicationForm";
import { ApplicationFormValues } from "@/lib/schemas/application";
import Image from "next/image";
import Seo from "@/components/Seo";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ClockIcon, LinkIcon, MoveLeft, User } from "lucide-react";
import { Term } from "@/types/application";
import { STEP_NAMES } from "@/constants/application";

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0: intro, 1: personal, 2: general, 3: positions, 4: supplementary
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);

  useEffect(() => {
    setCurrentTerm({
      id: "1",
      termName: "Winter 2025",
      appReleaseDate: new Date(),
      appDeadline: new Date(),
      questions: [],
    });
  }, []);

  const handleSubmit = (data: ApplicationFormValues) => {
    console.log("Form submitted successfully:", data);
    // TODO: Send data to API
    alert("Application submitted! Check console for data.");
  };
  const renderCurrentStep = () => {
    if (!currentTerm) return null;

    switch (currentStep) {
      case 0:
        return null;
      case 1:
        return <ApplicationForm onSubmit={handleSubmit} showDebugInfo={true} />;
      default:
        return null;
    }
  };

  if (!currentTerm) return null;

  return (
    <>
      <Seo title="DSC Application" />

      <progress
        value={currentStep - 1}
        max={4}
        className="p- 0 [&::-webkit-progress-value]:duration-700[&::-webkit-progress-value]:ease-in-out
        relative z-20 m-0 block h-2 w-full bg-grey4 transition-all duration-700 ease-in-out
        [&::-moz-progress-bar]:bg-lightBlue [&::-moz-progress-bar]:transition-all [&::-moz-progress-bar]:duration-700
        [&::-moz-progress-bar]:ease-in-out [&::-webkit-progress-bar]:bg-grey4  [&::-webkit-progress-value]:bg-lightBlue
        [&::-webkit-progress-value]:transition-all"
      />

      <div className="relative min-h-screen overflow-hidden bg-darkBlue2 px-4 py-20 shadow-md backdrop-blur-md">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Left Whale */}
          <div
            className={`absolute ${
              currentStep === 5 || currentStep === 0 ? "" : "top-[20%]"
            }`}
          >
            <Image
              src="/execApps/B-light-bulb.svg"
              alt="whale with light bulb"
              width={450}
              height={450}
            />
          </div>

          {/* Right Whale on Cloud */}
          <div
            className={`absolute right-0 ${
              currentStep === 5 || currentStep === 0 ? "top-[10%]" : "top-[5%]"
            } z-20 translate-x-1/3 transform`}
          >
            <Image
              src="/execApps/B-float.svg"
              alt="whale floating on cloud"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                DSC Application Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to apply for the Data Science Club
                executive team. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationForm onSubmit={handleSubmit} showDebugInfo={true} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
