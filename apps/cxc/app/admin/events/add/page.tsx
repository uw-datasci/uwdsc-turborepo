"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
} from "@uwdsc/ui";
import { Loader2, ArrowLeft } from "lucide-react";
import CxCButton from "@/components/CxCButton";

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    start_time: "",
    buffered_start_time: "",
    end_time: "",
    buffered_end_time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[EVENT CREATE] Starting form submission");
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Calculate buffered times if not provided
      const startTime = new Date(formData.start_time);
      const endTime = new Date(formData.end_time);
      const bufferedStartTime = formData.buffered_start_time
        ? new Date(formData.buffered_start_time)
        : new Date(startTime.getTime() - 30 * 60 * 1000); // 30 minutes before
      const bufferedEndTime = formData.buffered_end_time
        ? new Date(formData.buffered_end_time)
        : new Date(endTime.getTime() + 30 * 60 * 1000); // 30 minutes after

      const requestBody = {
        name: formData.name,
        description: formData.description || null,
        location: formData.location || null,
        start_time: startTime.toISOString(),
        buffered_start_time: bufferedStartTime.toISOString(),
        end_time: endTime.toISOString(),
        buffered_end_time: bufferedEndTime.toISOString(),
      };

      console.log("[EVENT CREATE] Request body:", requestBody);

      console.log("[EVENT CREATE] Sending fetch request...");
      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("[EVENT CREATE] Response status:", response.status);
      console.log("[EVENT CREATE] Response ok:", response.ok);

      let data;
      try {
        const text = await response.text();
        console.log("[EVENT CREATE] Response text:", text);
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error("[EVENT CREATE] Failed to parse response:", parseError);
        throw new Error("Invalid response from server");
      }

      console.log("[EVENT CREATE] Parsed data:", data);

      if (response.ok) {
        console.log("[EVENT CREATE] Success! Event created");
        setSuccess(true);
        // Redirect to events page after 1 second
        setTimeout(() => {
          router.push("/admin/events");
        }, 1000);
      } else {
        console.error("[EVENT CREATE] Error response:", data);
        setError(data.message || data.error || "Failed to create event");
      }
    } catch (err) {
      console.error("[EVENT CREATE] Exception caught:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create event. Please try again.",
      );
    } finally {
      console.log("[EVENT CREATE] Setting loading to false");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <CxCButton
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/events")}
            className="!bg-transparent !border-none !text-white hover:!bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </CxCButton>
          <h1 className="text-3xl font-bold text-white">Add New Event</h1>
        </div>

        <Card className="bg-black border-white/20 rounded-none">
          <CardHeader>
            <CardTitle className="text-white">Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Name */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Event Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  placeholder="Enter event name"
                  className="bg-black border-white/10 text-white rounded-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter event description"
                  rows={4}
                  className="bg-black border-white/10 text-white rounded-none resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Location
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter event location"
                  className="bg-black border-white/10 text-white rounded-none"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Start Time *
                </label>
                <Input
                  type="datetime-local"
                  value={formData.start_time}
                  onChange={(e) =>
                    setFormData({ ...formData, start_time: e.target.value })
                  }
                  required
                  className="bg-black border-white/10 text-white rounded-none"
                />
              </div>

              {/* Buffered Start Time */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Buffered Start Time (optional, defaults to 30 min before)
                </label>
                <Input
                  type="datetime-local"
                  value={formData.buffered_start_time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buffered_start_time: e.target.value,
                    })
                  }
                  className="bg-black border-white/10 text-white rounded-none"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  End Time *
                </label>
                <Input
                  type="datetime-local"
                  value={formData.end_time}
                  onChange={(e) =>
                    setFormData({ ...formData, end_time: e.target.value })
                  }
                  required
                  className="bg-black border-white/10 text-white rounded-none"
                />
              </div>

              {/* Buffered End Time */}
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Buffered End Time (optional, defaults to 30 min after)
                </label>
                <Input
                  type="datetime-local"
                  value={formData.buffered_end_time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      buffered_end_time: e.target.value,
                    })
                  }
                  className="bg-black border-white/10 text-white rounded-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-none bg-red-500/10 text-red-500 border border-red-500/20">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 rounded-none bg-green-500/10 text-green-500 border border-green-500/20">
                  Event created successfully! Redirecting...
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4">
                <CxCButton
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/events")}
                  className="flex-1 !bg-transparent !border-white/20 !text-white hover:!bg-white/10"
                >
                  Cancel
                </CxCButton>
                <CxCButton type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Event"
                  )}
                </CxCButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
