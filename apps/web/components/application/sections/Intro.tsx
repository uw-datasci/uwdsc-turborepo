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
        <h2 className="text-2xl font-semibold">
          Welcome to the UWDSC Exec Applications!
        </h2>
        <CardDescription className="text-base leading-relaxed">
          We&apos;re excited that you&apos;re interested in joining our
          community! This application will take you through several sections:
        </CardDescription>
        <ul className="ml-6 space-y-2 list-disc text-muted-foreground">
          <li>
            Personal Details - Your personal information and academic background
          </li>
          <li>
            General - Tell us about yourself and why you want to join UWDSC
          </li>
          <li>Positions - Questions about your desired roles</li>
          <li>Resume Upload - Share your resume with us</li>
        </ul>
        <CardDescription className="text-base leading-relaxed">
          You can save your progress at each step.
        </CardDescription>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={handleStart} size="lg">
          Start Application
        </Button>
      </div>
    </div>
  );
}
