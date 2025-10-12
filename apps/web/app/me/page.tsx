"use client";

import { Button } from "@uwdsc/ui/components/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Me() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const result = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        router.push("/login");
        router.refresh(); // Force refresh to clear any cached data
      } else {
        const data = await result.json();
        console.error("Sign out failed:", data.error);
        alert("Failed to sign out. Please try again.");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <p className="text-white text-2xl mb-2">Logged In</p>
      {user && (
        <div className="text-gray-400 text-center">
          <p>{user.email}</p>
          <p className="text-sm">Member since: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      )}
      <Button
        variant="link"
        size="sm"
        onClick={handleSignOut}
        disabled={isLoading}
        className="text-gray-400/60 hover:text-gray-200 transition-colors text-xl font-medium p-0"
        type="button"
      >
        {isLoading ? "Signing out..." : "Sign out"}
      </Button>
    </div>
  );
}
