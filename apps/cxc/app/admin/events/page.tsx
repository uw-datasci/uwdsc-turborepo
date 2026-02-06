"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@uwdsc/ui";
import {
  Plus,
  Loader2,
  QrCode,
  Edit,
  Radio,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { QrScanner } from "@/components/admin/QrScanner";
import CxCButton from "@/components/CxCButton";

// Web NFC API types
interface NDEFRecord {
  recordType: string;
  data: string | Uint8Array;
  mediaType?: string;
}

interface NDEFMessage {
  records: NDEFRecord[];
}

interface NDEFReadingEvent {
  message: NDEFMessage;
}

interface NDEFErrorEvent {
  message?: string;
}

interface NDEFReader {
  scan(): Promise<void>;
  abort?(): void;
  addEventListener(
    type: "reading",
    callback: (event: NDEFReadingEvent) => void,
  ): void;
  addEventListener(
    type: "readingerror",
    callback: (event: NDEFErrorEvent) => void,
  ): void;
}

interface NDEFWriter {
  write(options: { records: NDEFRecord[] }): Promise<void>;
}

interface WindowWithNDEF extends Window {
  NDEFReader: new () => NDEFReader;
}

interface NavigatorWithNFC extends Navigator {
  nfc?: {
    NDEFReader: new () => NDEFReader;
    NDEFWriter: new () => NDEFWriter;
  };
}

interface Event {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  start_time: string;
  end_time: string;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [readingNfc, setReadingNfc] = useState(false);
  const [nfcResult, setNfcResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch(
          "/api/admin/events?current_only=true",
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
          // Load cached event or set first event as default
          if (data.events && data.events.length > 0) {
            const cachedEventId = localStorage.getItem(
              "admin_selected_event_id",
            );
            if (
              cachedEventId &&
              data.events.some((e) => String(e.id) === cachedEventId)
            ) {
              setSelectedEventId(cachedEventId);
            } else {
              setSelectedEventId(String(data.events[0].id));
              localStorage.setItem(
                "admin_selected_event_id",
                String(data.events[0].id),
              );
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

  const handleQrScan = (result: string) => {
    // Extract NFC ID from URL if it's a check-in URL
    // Format: /admin/checkin/{nfc_id}
    const match = result.match(/\/admin\/checkin\/([^/\s]+)/);
    if (match && match[1]) {
      const nfcId = match[1];
      router.push(`/admin/checkin/${nfcId}`);
    } else {
      // If it's just an NFC ID, use it directly
      router.push(`/admin/checkin/${result}`);
    }
    setShowScanner(false);
  };

  const handleNfcRead = async () => {
    setReadingNfc(true);
    setNfcResult(null);

    try {
      const urlResult: { url: string | null } = { url: null };

      // Use Web NFC API to read
      if ("NDEFReader" in window) {
        // Chrome 89+ API
        const reader = new (window as unknown as WindowWithNDEF).NDEFReader();

        // Wait for NFC scan with timeout
        await new Promise<void>((resolve, reject) => {
          let resolved = false;
          const timeout = setTimeout(() => {
            if (!resolved) {
              resolved = true;
              try {
                if (reader.abort) reader.abort();
              } catch {
                // Ignore abort errors
              }
              reject(
                new Error(
                  "No NFC card detected. Please hold the card close to your device.",
                ),
              );
            }
          }, 30000); // 30 second timeout

          const handleReading = (event: NDEFReadingEvent) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);

            try {
              const message = event.message;
              if (message.records && message.records.length > 0) {
                const record = message.records[0];
                if (!record) return;
                const decoder = new TextDecoder();

                if (record.recordType === "url") {
                  // URL records have the URL directly in the data
                  if (typeof record.data === "string") {
                    urlResult.url = record.data;
                  } else if (record.data instanceof Uint8Array) {
                    urlResult.url = decoder.decode(record.data);
                  }
                } else if (record.recordType === "text") {
                  if (record.data instanceof Uint8Array) {
                    urlResult.url = decoder.decode(record.data);
                  } else if (typeof record.data === "string") {
                    urlResult.url = record.data;
                  }
                } else if (
                  record.recordType === "mime" &&
                  record.mediaType === "text/plain"
                ) {
                  if (record.data instanceof Uint8Array) {
                    urlResult.url = decoder.decode(record.data);
                  } else if (typeof record.data === "string") {
                    urlResult.url = record.data;
                  }
                }
              }
            } catch (parseError) {
              console.error("Error parsing NFC record:", parseError);
            }

            try {
              if (reader.abort) reader.abort();
            } catch {
              // Ignore abort errors
            }
            resolve();
          };

          const handleError = (error: NDEFErrorEvent) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);
            reject(new Error(error.message || "Error reading NFC card"));
          };

          reader.addEventListener("reading", handleReading);
          reader.addEventListener("readingerror", handleError);

          // Start scanning
          reader.scan().catch((error: Error) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);
            reject(error);
          });
        });
      } else if ("nfc" in navigator && (navigator as NavigatorWithNFC).nfc) {
        // Chrome 89+ alternative API
        const ndef = new (navigator as NavigatorWithNFC).nfc!.NDEFReader();

        // Wait for NFC scan with timeout
        await new Promise<void>((resolve, reject) => {
          let resolved = false;
          const timeout = setTimeout(() => {
            if (!resolved) {
              resolved = true;
              try {
                if (ndef.abort) ndef.abort();
              } catch {
                // Ignore abort errors
              }
              reject(
                new Error(
                  "No NFC card detected. Please hold the card close to your device.",
                ),
              );
            }
          }, 30000);

          const handleReading = (event: NDEFReadingEvent) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);

            try {
              const message = event.message;
              if (message.records && message.records.length > 0) {
                const record = message.records[0];
                if (!record) return;
                const decoder = new TextDecoder();

                if (record.recordType === "url") {
                  if (typeof record.data === "string") {
                    urlResult.url = record.data;
                  } else if (record.data instanceof Uint8Array) {
                    urlResult.url = decoder.decode(record.data);
                  }
                } else if (record.recordType === "text") {
                  if (record.data instanceof Uint8Array) {
                    urlResult.url = decoder.decode(record.data);
                  } else if (typeof record.data === "string") {
                    urlResult.url = record.data;
                  }
                }
              }
            } catch (parseError) {
              console.error("Error parsing NFC record:", parseError);
            }

            try {
              if (ndef.abort) ndef.abort();
            } catch {
              // Ignore abort errors
            }
            resolve();
          };

          const handleError = (error: NDEFErrorEvent) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);
            reject(new Error(error.message || "Error reading NFC card"));
          };

          ndef.addEventListener("reading", handleReading);
          ndef.addEventListener("readingerror", handleError);

          // Start scanning
          ndef.scan().catch((error: Error) => {
            if (resolved) return;
            resolved = true;
            clearTimeout(timeout);
            reject(error);
          });
        });
      } else {
        throw new Error("Web NFC API not available");
      }

      const url = urlResult.url;
      if (url) {
        setNfcResult({
          success: true,
          message: "Successfully read URL from NFC card!",
        });

        // Extract NFC ID from URL and navigate to check-in page
        const match = url.match(/\/admin\/checkin\/([^/\s]+)/);
        if (match && match[1]) {
          const nfcId = match[1];
          router.push(`/admin/checkin/${nfcId}`);
        } else {
          // If it's just an NFC ID in the URL, try to extract it
          const nfcIdMatch = url.match(/([a-zA-Z0-9_-]{16,})/);
          if (nfcIdMatch && nfcIdMatch[1]) {
            router.push(`/admin/checkin/${nfcIdMatch[1]}`);
          } else {
            setNfcResult({
              success: false,
              message: "Could not extract NFC ID from URL. Please try again.",
            });
          }
        }
      } else {
        setNfcResult({
          success: false,
          message: "NFC card read but no URL found.",
        });
      }
    } catch (error) {
      console.error("Error reading NFC:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to read NFC card. Make sure the card is close to your device.";
      setNfcResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      setReadingNfc(false);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <div className="flex gap-2">
            <CxCButton
              variant="outline"
              onClick={() => router.push("/admin/events/edit")}
              className="!bg-transparent !border-white/20 !text-white hover:!bg-white/10"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Event
            </CxCButton>
            <CxCButton onClick={() => router.push("/admin/events/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </CxCButton>
          </div>
        </div>

        {/* Event Selection */}
        <Card className="bg-black border-white/20 rounded-none">
          <CardHeader>
            <CardTitle className="text-white">
              Select Event for Check-In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.length === 0 ? (
              <p className="text-white/60">
                No events available. Create your first event to get started.
              </p>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block text-purple-400">
                    Current Event
                  </label>
                  <Select
                    value={selectedEventId || ""}
                    onValueChange={(eventId) => {
                      setSelectedEventId(eventId);
                      // Cache selected event in localStorage
                      localStorage.setItem("admin_selected_event_id", eventId);
                    }}
                  >
                    <SelectTrigger className="w-full border-purple-500/30 rounded-none bg-black text-purple-100 hover:bg-purple-500/10 !h-auto p-3">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-purple-500/30 rounded-none text-purple-100">
                      {events.length === 0 ? (
                        <div className="p-4 text-center text-white/60 text-sm">
                          No events available
                        </div>
                      ) : (
                        events.map((event) => (
                          <SelectItem
                            key={event.id}
                            value={String(event.id)}
                            className="focus:bg-purple-500/20 focus:text-purple-100 rounded-none p-3"
                          >
                            {event.name} -{" "}
                            {new Date(event.start_time).toLocaleDateString()}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedEventId && (
                  <div className="p-4 bg-white/5 border border-white/10 rounded-none">
                    <p className="text-sm text-white/60">
                      Selected event is cached for NFC check-ins. Go to NFC
                      tools to check hackers in.
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* QR Code Scanner */}
        <Card className="bg-black border-white/20 rounded-none">
          <CardHeader>
            <CardTitle className="text-white">
              QR Code Scanner (backup)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showScanner ? (
              <QrScanner
                onScan={handleQrScan}
                onClose={() => setShowScanner(false)}
              />
            ) : (
              <CxCButton
                onClick={() => setShowScanner(true)}
                className="w-full"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Open QR Scanner
              </CxCButton>
            )}
          </CardContent>
        </Card>

        {/* NFC Reader */}
        <Card className="bg-black border-white/20 rounded-none">
          <CardHeader>
            <CardTitle className="text-white">NFC Reader (backup)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-none bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
              <p className="text-sm font-medium">
                ⚠️ Please use Android and Chrome!!! This feature requires Chrome
                on Android with HTTPS.
              </p>
            </div>

            <CxCButton
              onClick={handleNfcRead}
              disabled={readingNfc}
              className="w-full"
            >
              {readingNfc ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Reading NFC Card... (Hold card close)
                </>
              ) : (
                <>
                  <Radio className="mr-2 h-4 w-4" />
                  Read NFC Card
                </>
              )}
            </CxCButton>

            {/* Result Message */}
            {nfcResult && (
              <div
                className={`p-4 rounded-none flex items-center gap-2 ${
                  nfcResult.success
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}
              >
                {nfcResult.success ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>{nfcResult.message}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
