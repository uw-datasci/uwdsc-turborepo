"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@uwdsc/ui";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [resendStatus, setResendStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerificationEmail = async () => {
    if (!email) {
      setResendStatus("Email not found.");
      return;
    }

    setIsLoading(true);
    setResendStatus("");

    try {
      const response = await fetch("/api/auth/resend-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResendStatus(data.error || "Failed to resend verification email.");
      } else {
        setResendStatus("Verification email resent successfully.");
      }
    } catch (error: any) {
      setResendStatus(error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-center text-white px-6">
      {/* Animated Mail Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
        <Mail
          className="w-24 h-24 text-purple-500 animate-bounce"
          strokeWidth={1.5}
        />
      </div>

      {/* Title */}
      <h1 className="gradient-text bg-gradient-to-b from-white to-[#ffffff20] text-7xl md:text-8xl font-medium pb-2">
        Verify Email
      </h1>

      {/* Description */}
      <p className="text-xl mt-8 text-gray-300 max-w-2xl">
        We've sent a verification link to your email address.
        <br />
        Please check your inbox and click the link to verify your account.
      </p>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col gap-4 items-center">
        <div className="flex flex-row gap-5">
          <Button
            onClick={() => router.push("/login")}
            size="lg"
            className="group bg-gradient-purple hover:opacity-90 transition-all text-lg font-bold rounded-lg px-8 py-6 flex items-center gap-2"
          >
            Go to Login
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <div className="flex flex-col items-center">
            <Button
              onClick={handleResendVerificationEmail}
              variant="outline"
              size="lg"
              disabled={isLoading}
              className="border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white transition-all text-lg font-medium rounded-lg px-8 py-6"
            >
              {isLoading ? "Sending..." : "Resend Email"}
            </Button>
          </div>
        </div>
        {/* Resend status message */}
        {resendStatus && (
          <p
            className={`mt-2 text-sm ${
              resendStatus.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {resendStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
