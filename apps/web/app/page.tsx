"use client";

import { useEffect, useState } from "react";

interface UserData {
  user: {
    id: string;
    email: string;
  };
  profile: {
    first_name: string;
    last_name: string;
  } | null;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const getGreeting = () => {
    if (userData?.profile?.first_name) {
      return `Hi ${userData.profile.first_name}!`;
    }
    if (userData) {
      return "Hi there!";
    }
    return "Welcome!";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{getGreeting()} 👋</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {userData ? "You're logged in!" : "Please log in to get started."}
        </p>
      </div>
    </div>
  );
}
