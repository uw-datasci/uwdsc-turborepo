"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Input, Textarea, Checkbox } from "@uwdsc/ui";
import { ArrowLeft, Loader2, Save, X } from "lucide-react";
import CxCButton from "@/components/CxCButton";

interface Event {
  id: string | number;
  name: string;
  description: string | null;
  location: string | null;
  start_time: string;
  buffered_start_time: string;
  end_time: string;
  buffered_end_time: string;
  registration_required: boolean;
  payment_required: boolean;
  image_id: number | null;
}

export default function EditEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [saving, setSaving] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state for editing
  const [editForm, setEditForm] = useState<Partial<Event>>({});

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch("/api/admin/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error("Error loading events:", error);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    // Convert dates to datetime-local format
    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setEditForm({
      name: event.name,
      description: event.description || "",
      location: event.location || "",
      start_time: formatDateForInput(event.start_time),
      buffered_start_time: formatDateForInput(event.buffered_start_time),
      end_time: formatDateForInput(event.end_time),
      buffered_end_time: formatDateForInput(event.buffered_end_time),
      registration_required: event.registration_required,
      payment_required: event.payment_required,
      image_id: event.image_id,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async (eventId: string | number) => {
    setSaving(eventId);
    setError(null);
    setSuccess(null);

    try {
      // Calculate buffered times if not provided
      const startTime = editForm.start_time
        ? new Date(editForm.start_time)
        : null;
      const endTime = editForm.end_time ? new Date(editForm.end_time) : null;
      const bufferedStartTime = editForm.buffered_start_time
        ? new Date(editForm.buffered_start_time)
        : startTime
          ? new Date(startTime.getTime() - 30 * 60 * 1000)
          : null;
      const bufferedEndTime = editForm.buffered_end_time
        ? new Date(editForm.buffered_end_time)
        : endTime
          ? new Date(endTime.getTime() + 30 * 60 * 1000)
          : null;

      const updateData: Record<string, unknown> = {};
      if (editForm.name !== undefined) updateData.name = editForm.name;
      if (editForm.description !== undefined)
        updateData.description = editForm.description || null;
      if (editForm.location !== undefined)
        updateData.location = editForm.location || null;
      if (startTime) updateData.start_time = startTime.toISOString();
      if (bufferedStartTime)
        updateData.buffered_start_time = bufferedStartTime.toISOString();
      if (endTime) updateData.end_time = endTime.toISOString();
      if (bufferedEndTime)
        updateData.buffered_end_time = bufferedEndTime.toISOString();
      if (editForm.registration_required !== undefined)
        updateData.registration_required = editForm.registration_required;
      if (editForm.payment_required !== undefined)
        updateData.payment_required = editForm.payment_required;
      if (editForm.image_id !== undefined)
        updateData.image_id = editForm.image_id
          ? Number(editForm.image_id)
          : null;

      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the event in the local state
        setEvents((prev) =>
          prev.map((e) =>
            String(e.id) === String(eventId)
              ? { ...e, ...data.event, id: e.id }
              : e,
          ),
        );
        setSuccess("Event updated successfully!");
        setEditingId(null);
        setEditForm({});
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || data.error || "Failed to update event");
      }
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Failed to update event. Please try again.");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24 md:pt-28">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <CxCButton
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/events")}
            className="!bg-transparent !border-none !text-white hover:!bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </CxCButton>
          <h1 className="text-3xl font-bold text-white">Edit Events</h1>
        </div>

        {error && (
          <Card className="bg-black border-red-500/30 rounded-none">
            <CardContent>
              <p className="text-red-500 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {success && (
          <Card className="bg-black border-green-500/30 rounded-none">
            <CardContent>
              <p className="text-green-500 text-sm">{success}</p>
            </CardContent>
          </Card>
        )}

        {events.length === 0 ? (
          <Card className="bg-black border-white/20 rounded-none">
            <CardContent>
              <p className="text-white/60">
                No events available. Create your first event to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="bg-black border-white/20 rounded-none"
              >
                <CardContent>
                  {editingId === event.id ? (
                    <div className="space-y-4">
                      {/* Event Name */}
                      <div>
                        <label className="text-sm font-medium mb-2 block text-white">
                          Event Name *
                        </label>
                        <Input
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
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
                          value={editForm.description || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
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
                          value={editForm.location || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              location: e.target.value,
                            })
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
                          value={editForm.start_time || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              start_time: e.target.value,
                            })
                          }
                          required
                          className="bg-black border-white/10 text-white rounded-none"
                        />
                      </div>

                      {/* Buffered Start Time */}
                      <div>
                        <label className="text-sm font-medium mb-2 block text-white">
                          Buffered Start Time
                        </label>
                        <Input
                          type="datetime-local"
                          value={editForm.buffered_start_time || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
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
                          value={editForm.end_time || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              end_time: e.target.value,
                            })
                          }
                          required
                          className="bg-black border-white/10 text-white rounded-none"
                        />
                      </div>

                      {/* Buffered End Time */}
                      <div>
                        <label className="text-sm font-medium mb-2 block text-white">
                          Buffered End Time
                        </label>
                        <Input
                          type="datetime-local"
                          value={editForm.buffered_end_time || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              buffered_end_time: e.target.value,
                            })
                          }
                          className="bg-black border-white/10 text-white rounded-none"
                        />
                      </div>

                      {/* Registration Required */}
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`reg_${event.id}`}
                          checked={editForm.registration_required || false}
                          onCheckedChange={(checked) =>
                            setEditForm({
                              ...editForm,
                              registration_required: checked === true,
                            })
                          }
                          className="border-white/20"
                        />
                        <label
                          htmlFor={`reg_${event.id}`}
                          className="text-sm text-white"
                        >
                          Registration Required
                        </label>
                      </div>

                      {/* Payment Required */}
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`pay_${event.id}`}
                          checked={editForm.payment_required || false}
                          onCheckedChange={(checked) =>
                            setEditForm({
                              ...editForm,
                              payment_required: checked === true,
                            })
                          }
                          className="border-white/20"
                        />
                        <label
                          htmlFor={`pay_${event.id}`}
                          className="text-sm text-white"
                        >
                          Payment Required
                        </label>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <CxCButton
                          variant="outline"
                          onClick={handleCancel}
                          disabled={saving === event.id}
                          className="flex-1 !bg-transparent !border-white/20 !text-white hover:!bg-white/10"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </CxCButton>
                        <CxCButton
                          onClick={() => handleSave(event.id)}
                          disabled={saving === event.id}
                          className="flex-1"
                        >
                          {saving === event.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </>
                          )}
                        </CxCButton>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-white">
                            {event.name}
                          </h3>
                          {event.description && (
                            <p className="text-sm text-white/60 mt-1">
                              {event.description}
                            </p>
                          )}
                          <div className="mt-2 text-sm text-white/60 space-y-1">
                            <p>
                              Start:{" "}
                              {new Date(event.start_time).toLocaleString()}
                            </p>
                            <p>
                              End: {new Date(event.end_time).toLocaleString()}
                            </p>
                            {event.location && (
                              <p>Location: {event.location}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {event.registration_required && (
                            <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-500 rounded-none border border-blue-500/20">
                              Registration Required
                            </span>
                          )}
                          {event.payment_required && (
                            <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-none border border-green-500/20">
                              Payment Required
                            </span>
                          )}
                        </div>
                      </div>
                      <CxCButton
                        onClick={() => handleEdit(event)}
                        className="w-full"
                      >
                        Edit Event
                      </CxCButton>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
