"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
} from "@uwdsc/ui";
import { LoadingScreen } from "@/components/LoadingScreen";
import CxCButton from "@/components/CxCButton";
import { getMyProject, submitProject } from "@/lib/api";
import type { Project } from "@/lib/api";

export default function SubmitProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    devpost_url: "",
    github_url: "",
    demo_url: "",
    video_url: "",
  });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyProject();
      if (data.project) {
        setProject(data.project);
        setFormData({
          title: data.project.title,
          description: data.project.description || "",
          devpost_url: data.project.devpost_url || "",
          github_url: data.project.github_url || "",
          demo_url: data.project.demo_url || "",
          video_url: data.project.video_url || "",
        });
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load project. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Project title is required");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await submitProject({
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        devpost_url: formData.devpost_url.trim() || null,
        github_url: formData.github_url.trim() || null,
        demo_url: formData.demo_url.trim() || null,
        video_url: formData.video_url.trim() || null,
      });
      alert("Project submitted successfully!");
      await fetchProject();
    } catch (err) {
      console.error("Error submitting project:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit project. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="LOADING..." />;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Submit Project</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Submit your hackathon project for judging
          </p>
        </div>

        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {project ? "Update Project" : "Create Project"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter your project title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe your project..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="devpost_url">Devpost URL</Label>
                <Input
                  id="devpost_url"
                  type="url"
                  value={formData.devpost_url}
                  onChange={(e) =>
                    setFormData({ ...formData, devpost_url: e.target.value })
                  }
                  placeholder="https://devpost.com/software/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  type="url"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData({ ...formData, github_url: e.target.value })
                  }
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) =>
                    setFormData({ ...formData, demo_url: e.target.value })
                  }
                  placeholder="https://your-demo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">Video URL</Label>
                <Input
                  id="video_url"
                  type="url"
                  value={formData.video_url}
                  onChange={(e) =>
                    setFormData({ ...formData, video_url: e.target.value })
                  }
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <CxCButton type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : project ? "Update" : "Submit"}
                </CxCButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
