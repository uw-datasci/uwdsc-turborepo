"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import DSCLogo from "@/components/DSCLogo";
import { StepIndicator } from "@/components/application/StepIndicator";
import {
  DesktopAppWormhole,
  MobileAppWormhole,
} from "@/components/application/AppWormhole";
import MobileAppNav from "@/components/application/MobileAppNav";
import { STEP_NAMES } from "@/constants/application";
import { RegisterForm } from "@/components/login/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen h-full cxc-app-font">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:flex-row justify-between min-h-screen h-full">
        {/* Left Side - Wormhole */}
        <div className="block border-r border-white/50 md:w-2/5 relative">
          <div className="absolute inset-0">
            <DesktopAppWormhole opacity={0.5} />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between py-24 px-12 z-10">
            <div>
              <StepIndicator currentStep={0} totalSteps={6} label="CXC 2026" />
            </div>
            <DSCLogo
              size={24}
              className="hidden md:block"
              onClick={() => router.push("/")}
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="px-12 py-24 overflow-hidden md:w-3/5 flex flex-col gap-12 justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <MobileAppWormhole opacity={0.3} />
        </div>
        <MobileAppNav />
        <div className="relative z-10 p-5 overflow-hidden flex flex-col gap-12">
          <StepIndicator
            currentStep={0}
            totalSteps={STEP_NAMES.length}
            stepName="Account"
            subStepName="Create your account"
            label=""
          />
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
