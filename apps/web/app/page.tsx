"use client";

import ClubStats from "@/components/home_sections/ClubStats";
import Hero from "@/components/home_sections/Hero";
import WhatWeDo from "@/components/home_sections/WhatWeDo";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { profile, isLoading, isAuthenticated, mutate } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  console.log(profile, isAuthenticated);

  const getGreeting = () => {
    if (profile?.first_name) {
      return `Hi ${profile.first_name}!`;
    }
    if (isAuthenticated) {
      return "Hi there!";
    }
    return "Welcome!";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero profile={profile} mutate={mutate} />
      <WhatWeDo />
      <ClubStats />
      {/* <div className="text-center">
        <h1 className="text-4xl font-bold">{getGreeting()} 👋</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isAuthenticated
            ? "You're logged in!"
            : "Please log in to get started."}
        </p>
      </div> */}
    </div>
  );
}
