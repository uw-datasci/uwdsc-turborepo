"use client";

import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/api";
import { Button } from "@uwdsc/ui/index";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { profile, isLoading, isAuthenticated } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/applications/resumes", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadResult(`✅ Success: ${data.message} (Key: ${data.key})`);
      } else {
        setUploadResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setUploadResult(
        `❌ Error: ${error instanceof Error ? error.message : "Upload failed"}`
      );
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

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
    <div className="min-h-screen">
      <div className="flex gap-4 justify-center py-16 mt-32">
        <Link href="/register">
          <Button>Register</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Button variant="outline" onClick={async () => await signOut()}>
          Signout
        </Button>
      </div>

      <div className="text-center items-center justify-center">
        <h1 className="text-4xl font-bold">{getGreeting()} 👋</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {isAuthenticated
            ? "You're logged in!"
            : "Please log in to get started."}
        </p>

        {isAuthenticated && (
          <div className="mt-8 max-w-md mx-auto p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Resume Upload</h2>
            <div className="space-y-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                disabled={uploading}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90
                  disabled:opacity-50"
              />
              {selectedFile && (
                <div className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name} (
                  {(selectedFile.size / 1024).toFixed(2)} KB)
                </div>
              )}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full"
              >
                {uploading ? "Uploading..." : "Upload Resume"}
              </Button>
              {uploadResult && (
                <p className="text-sm whitespace-pre-wrap break-all">
                  {uploadResult}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
