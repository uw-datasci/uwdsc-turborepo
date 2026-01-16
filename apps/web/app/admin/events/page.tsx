"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@uwdsc/ui";
import { Plus, Loader2, QrCode, CheckCircle2 } from "lucide-react";

interface Event {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  start_time: string;
  end_time: string;
  registration_required: boolean;
  payment_required: boolean;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [nfcId, setNfcId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch("/api/admin/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
          // Load cached event or set first event as default
          if (data.events && data.events.length > 0) {
            const cachedEventId = localStorage.getItem("admin_selected_event_id");
            if (cachedEventId && data.events.some(e => String(e.id) === cachedEventId)) {
              setSelectedEventId(cachedEventId);
            } else {
              setSelectedEventId(String(data.events[0].id));
              localStorage.setItem("admin_selected_event_id", String(data.events[0].id));
            }
          }
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  // Load NFC ID for current user
  useEffect(() => {
    async function loadNfcId() {
      try {
        const response = await fetch("/api/admin/nfc");
        if (response.ok) {
          const data = await response.json();
          setNfcId(data.nfc_id);
        }
      } catch (error) {
        console.error("Error loading NFC ID:", error);
      }
    }

    loadNfcId();
  }, []);

  const handleCopyNfcId = async () => {
    if (!nfcId) return;

    const baseUrl = window.location.origin;
    const checkInUrl = `${baseUrl}/admin/checkin/${nfcId}`;

    try {
      await navigator.clipboard.writeText(checkInUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback: show alert
      alert(`Check-in URL: ${checkInUrl}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button onClick={() => router.push("/admin/events/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Event Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Event for Check-In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.length === 0 ? (
            <p className="text-muted-foreground">
              No events available. Create your first event to get started.
            </p>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Current Event
                </label>
                <select
                  value={selectedEventId || ""}
                  onChange={(e) => {
                    const eventId = e.target.value;
                    setSelectedEventId(eventId);
                    // Cache selected event in localStorage
                    localStorage.setItem("admin_selected_event_id", eventId);
                  }}
                  className="w-full p-3 border rounded-md bg-background"
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name} - {new Date(event.start_time).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEventId && (
                <div className="p-4 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected event is cached for NFC check-ins. Users will be
                    checked into this event when they scan their NFC tag.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* NFC ID Display */}
      {nfcId && (
        <Card>
          <CardHeader>
            <CardTitle>Your NFC Check-In URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">NFC ID</label>
              <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                {nfcId}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Check-In URL
              </label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                  {typeof window !== "undefined" &&
                    `${window.location.origin}/admin/checkin/${nfcId}`}
                </div>
                <Button
                  onClick={handleCopyNfcId}
                  variant="outline"
                  size="icon"
                  title={copied ? "Copied!" : "Copy URL"}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <QrCode className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Copy this URL and write it to NFC tags or QR codes. When scanned,
              it will redirect to the check-in page with the selected event
              cached.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      {events.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{event.name}</h3>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>
                          Start: {new Date(event.start_time).toLocaleString()}
                        </p>
                        <p>
                          End: {new Date(event.end_time).toLocaleString()}
                        </p>
                        {event.location && <p>Location: {event.location}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {event.registration_required && (
                        <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-500 rounded">
                          Registration Required
                        </span>
                      )}
                      {event.payment_required && (
                        <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded">
                          Payment Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
