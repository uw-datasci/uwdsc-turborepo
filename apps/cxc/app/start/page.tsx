"use client";

import {
  DesktopAppWormhole,
  MobileAppWormhole,
} from "@/components/application/AppWormhole";
import { useRouter } from "next/navigation";
import CxCButton from "@/components/CxCButton";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@uwdsc/ui/index";
import Navbar from "@/components/nav/Navbar";

export default function StartPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen h-full cxc-app-font w-full">
      <div className="fixed z-50 w-full">
        <Navbar showAuthButtons={false} />
      </div>
      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:flex-row justify-between min-h-screen h-full">
        <div className="block border-r border-white/50 md:w-2/5 relative">
          <div className="absolute inset-0">
            <DesktopAppWormhole />
          </div>

          <div className="absolute bottom-0 left-0 py-32 px-12 z-10">
            <h1 className="md:text-6xl lg:text-7xl xl:text-8xl mb-12">
              Welcome!
            </h1>
            <p className="text-sm lg:text-base">
              Canada&apos;s largest student run AI hackathon. We are a
              beginner-friendly AI hackathon that bring together students and
              companies to build projects that solve real-world problems.
            </p>
          </div>
        </div>
        <div className="px-4 py-12 overflow-hidden md:w-3/5 flex flex-col gap-12 justify-end px-12 py-32">
          <h1 className="text-6xl lg:text-7xl">
            Start
            <br />
            application
          </h1>
          <div className="flex flex-wrap gap-8 font-normal">
            <CxCButton
              onClick={() => router.push("/login")}
              className="group px-5 py-3 text-xl inline-flex items-center font-normal"
            >
              <span>Login</span>
              <motion.div
                className="group-hover:translate-x-2 duration-200"
                transition={{
                  ease: "easeInOut",
                }}
              >
                <ArrowRightIcon weight="bold" className="ml-10 !w-5 !h-5" />
              </motion.div>
            </CxCButton>
            <CxCButton
              onClick={() => router.push("/register?callbackUrl=/apply")}
              className="group px-5 py-3 text-xl inline-flex items-center font-normal"
            >
              <span>Register</span>
              <motion.div
                className="group-hover:translate-x-2 duration-200"
                transition={{
                  ease: "easeInOut",
                }}
              >
                <ArrowRightIcon weight="bold" className="ml-10 !w-5 !h-5" />
              </motion.div>
            </CxCButton>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <MobileAppWormhole opacity={0.8} />
        </div>
        <div className="relative min-h-screen z-10 p-8 overflow-hidden flex flex-col gap-12 justify-center items-center">
          <div className="text-center">
            <h1 className="text-7xl mb-6">Welcome!</h1>
            <p className="text-sm lg:text-base">
              Canada&apos;s largest student run AI hackathon. We are a
              beginner-friendly AI hackathon that bring together students and
              companies to build projects that solve real-world problems.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 font-normal">
            <CxCButton
              onClick={() => router.push("/login")}
              className="group px-4 py-3 text-base inline-flex items-center font-normal"
            >
              <span>Login</span>
              <motion.div
                className="group-hover:translate-x-2 duration-200"
                transition={{
                  ease: "easeInOut",
                }}
              >
                <ArrowRightIcon weight="bold" className="ml-5" />
              </motion.div>
            </CxCButton>
            <CxCButton
              onClick={() => router.push("/register?callbackUrl=/apply")}
              className="group px-4 py-3 text-base inline-flex items-center font-normal"
            >
              <span>Register</span>
              <motion.div
                className="group-hover:translate-x-2 duration-200"
                transition={{
                  ease: "easeInOut",
                }}
              >
                <ArrowRightIcon weight="bold" className="ml-5" />
              </motion.div>
            </CxCButton>
          </div>
        </div>
      </div>
    </div>
  );
}
