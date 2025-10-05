"use client";

import { Button, CardDescription } from "@uwdsc/ui";

interface IntroProps {
  readonly onStartApplication: () => void;
}

export function Intro({ onStartApplication }: IntroProps) {
  const handleStart = () => {
    console.log("📝 API Call: Creating new application...");
    // Simulate API response
    const mockApplicationId = `app_${Date.now()}`;
    console.log(`✅ Application created with ID: ${mockApplicationId}`);
    onStartApplication();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Welcome to DSC Applications</h2>
        <CardDescription className="text-base leading-relaxed">
          Thank you for your interest in joining the UWaterloo Data Science Club
          executive team! This application consists of several sections:
        </CardDescription>
        <ul className="ml-6 space-y-2 list-disc text-muted-foreground">
          <li>Personal Details - Your basic information</li>
          <li>Basic Questions - Tell us about your background</li>
          <li>Role Specific Questions - Questions about your desired role</li>
          <li>Resume Upload - Share your resume with us</li>
        </ul>
        <CardDescription className="text-base leading-relaxed">
          You can save your progress at each step. The application takes
          approximately 15-20 minutes to complete.
        </CardDescription>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleStart} size="lg">
          Start Application
        </Button>
      </div>
    </div>
  );
}
