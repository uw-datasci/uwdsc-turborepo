"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
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
import { CheckCircle2, XCircle, Loader2, Copy, Check } from "lucide-react";
import CxCButton from "@/components/CxCButton";

interface CheckInResponse {
  success: boolean;
  message: string;
  profile?: {
    id: string;
    role: string;
  };
  error?: string;
}

export default function AdminCheckInPage() {
  const params = useParams();
  const router = useRouter();
  const nfcId = params.nfc_id as string;

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<
    Array<{ id: string; name: string; start_time: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [uncheckingIn, setUncheckingIn] = useState(false);
  const [isAlreadyCheckedIn, setIsAlreadyCheckedIn] = useState(false);
  const [checkInResult, setCheckInResult] = useState<CheckInResponse | null>(
    null,
  );
  const [profile, setProfile] = useState<{
    email: string | null;
    nfc_id: string | null;
  } | null>(null);
  const [copiedFields, setCopiedFields] = useState<Record<string, boolean>>({});
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Load events and profile on mount
  useEffect(() => {
    async function loadData() {
      try {
        // Load events
        const eventsRes = await fetch("/api/admin/events");
        if (eventsRes.ok) {
          const data = await eventsRes.json();
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
            }
          }
        }

        // Load profile by NFC ID - poll until we get email
        const loadProfile = async () => {
          let attempts = 0;
          const maxAttempts = 10;

          while (attempts < maxAttempts) {
            try {
              const profileRes = await fetch(`/api/admin/nfc?nfc_id=${nfcId}`);
              if (profileRes.ok) {
                const data = await profileRes.json();
                const profileData = data.profile;

                if (profileData?.email) {
                  setProfile({
                    email: profileData.email,
                    nfc_id: profileData.nfc_id || nfcId,
                  });
                  return;
                } else if (profileData) {
                  // Profile exists but no email yet, keep polling
                  setProfile({
                    email: null,
                    nfc_id: profileData.nfc_id || nfcId,
                  });
                }
              } else if (profileRes.status === 404) {
                setCheckInResult({
                  success: false,
                  message: "Profile not found for this NFC ID",
                  error: "Profile not found",
                });
                return;
              }
            } catch (fetchError) {
              console.error("Error fetching profile:", fetchError);
            }

            // Wait before retrying (polling)
            if (attempts < maxAttempts - 1) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
            attempts++;
          }

          // If we still don't have email after polling, show what we have
          if (attempts >= maxAttempts) {
            console.warn("Failed to load email after polling");
          }
        };

        await loadProfile();
      } catch (error) {
        console.error("Error loading data:", error);
        setCheckInResult({
          success: false,
          message: "Failed to load data",
          error: String(error),
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [nfcId]);

  // Check if user is already checked in when event changes
  useEffect(() => {
    async function checkUserStatus() {
      if (!selectedEventId || !profile) {
        setIsAlreadyCheckedIn(false);
        return;
      }

      setCheckingStatus(true);
      try {
        const response = await fetch(
          `/api/admin/checkin?nfc_id=${nfcId}&event_id=${selectedEventId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setIsAlreadyCheckedIn(data.isCheckedIn);
        } else {
          setIsAlreadyCheckedIn(false);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setIsAlreadyCheckedIn(false);
      } finally {
        setCheckingStatus(false);
      }
    }

    checkUserStatus();
  }, [selectedEventId, profile, nfcId]);

  const handleCheckIn = async () => {
    if (!selectedEventId) {
      setCheckInResult({
        success: false,
        message: "Please select an event",
        error: "No event selected",
      });
      return;
    }

    setCheckingIn(true);
    setCheckInResult(null);

    try {
      const response = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nfc_id: nfcId,
          event_id: selectedEventId,
        }),
      });

      const data: CheckInResponse = await response.json();

      if (response.ok && data.success) {
        // Copy check-in URL to clipboard
        // This allows admin to write it to the NFC tag
        const baseUrl =
          typeof window !== "undefined" ? window.location.origin : "";
        const checkInUrl = `${baseUrl}/admin/checkin/${nfcId}`;

        try {
          await navigator.clipboard.writeText(checkInUrl);
          // Update message to indicate check-in URL was copied
          setCheckInResult({
            ...data,
            message: `${data.message} Check-in URL copied to clipboard!`,
          });
        } catch (clipboardError) {
          console.error(
            "Failed to copy check-in URL to clipboard:",
            clipboardError,
          );
          setCheckInResult(data);
        }

        // Mark user as already checked in
        setIsAlreadyCheckedIn(true);

        // Clear result after 5 seconds
        setTimeout(() => {
          setCheckInResult(null);
        }, 5000);
      } else {
        setCheckInResult(data);
      }
    } catch (error) {
      setCheckInResult({
        success: false,
        message: "Failed to check in user",
        error: String(error),
      });
    } finally {
      setCheckingIn(false);
    }
  };

  const handleUncheckIn = async () => {
    if (!selectedEventId) {
      setCheckInResult({
        success: false,
        message: "Please select an event",
        error: "No event selected",
      });
      return;
    }

    setUncheckingIn(true);
    setCheckInResult(null);

    try {
      const response = await fetch("/api/admin/checkin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nfc_id: nfcId,
          event_id: selectedEventId,
        }),
      });

      const data: CheckInResponse = await response.json();

      if (response.ok && data.success) {
        setCheckInResult(data);
        setIsAlreadyCheckedIn(false);

        // Clear result after 5 seconds
        setTimeout(() => {
          setCheckInResult(null);
        }, 5000);
      } else {
        setCheckInResult(data);
      }
    } catch (error) {
      setCheckInResult({
        success: false,
        message: "Failed to uncheck user",
        error: String(error),
      });
    } finally {
      setUncheckingIn(false);
    }
  };

  const getCheckInUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/admin/checkin/${nfcId}`;
  };

  const handleCopyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFields((prev) => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopiedFields((prev) => ({ ...prev, [field]: false }));
      }, 1000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl">
        <Card className="bg-black border-white/35 rounded-none">
          <CardHeader>
            <CardTitle className="text-white">NFC Check-In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* NFC ID Display */}
            <div>
              <label className="text-sm font-medium mb-2 block text-white">
                NFC ID
              </label>
              <div className="p-3 bg-white/5 border border-white/10 rounded-none font-mono text-sm break-all text-white/80 flex items-center justify-between gap-2">
                <span>{getCheckInUrl()}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopyToClipboard(getCheckInUrl(), "nfc")}
                  className="h-8 w-8 hover:bg-white/10 flex-shrink-0"
                  title="Copy to clipboard"
                >
                  {copiedFields.nfc ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            {profile && (
              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  User
                </label>
                <div className="p-3 bg-white/5 border border-white/10 rounded-none text-white/80 flex items-center justify-between gap-2">
                  {profile.email ? (
                    <>
                      <span>Email: {profile.email}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleCopyToClipboard(profile.email!, "email")
                        }
                        className="h-8 w-8 hover:bg-white/10 flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {copiedFields.email ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </>
                  ) : (
                    <span>Loading email...</span>
                  )}
                </div>
              </div>
            )}

            {/* Event Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block text-purple-400">
                Select Event
              </label>
              <Select
                value={selectedEventId || ""}
                onValueChange={(eventId) => {
                  setSelectedEventId(eventId);
                  // Cache selected event in localStorage
                  localStorage.setItem("admin_selected_event_id", eventId);
                }}
                disabled={checkingIn}
              >
                <SelectTrigger className="w-full border-purple-500/30 rounded-none bg-black text-purple-100 hover:bg-purple-500/10 !h-auto p-3">
                  <SelectValue
                    placeholder={
                      events.length === 0
                        ? "No events available"
                        : "Select an event"
                    }
                  />
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
                        className="focus:bg-purple-500/20 focus:text-purple-100 rounded-none !h-auto p-3"
                      >
                        {event.name} -{" "}
                        {new Date(event.start_time).toLocaleDateString()}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Check In Button */}
            <div className="flex gap-2">
              <CxCButton
                onClick={handleCheckIn}
                disabled={
                  !selectedEventId ||
                  checkingIn ||
                  uncheckingIn ||
                  checkingStatus ||
                  !profile ||
                  isAlreadyCheckedIn
                }
                className={`flex-1 p-3 ${isAlreadyCheckedIn ? "opacity-60" : ""}`}
              >
                {checkingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking In...
                  </>
                ) : checkingStatus ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : isAlreadyCheckedIn ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Already Checked In
                  </>
                ) : (
                  "Check In"
                )}
              </CxCButton>

              {isAlreadyCheckedIn && (
                <CxCButton
                  onClick={handleUncheckIn}
                  disabled={
                    !selectedEventId ||
                    checkingIn ||
                    uncheckingIn ||
                    checkingStatus ||
                    !profile
                  }
                  variant="outline"
                  className="p-3 !bg-red-500/10 !border-red-500/40 !text-red-300 hover:!bg-red-500/20 hover:!border-red-500/60"
                >
                  {uncheckingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Unchecking...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Uncheck
                    </>
                  )}
                </CxCButton>
              )}
            </div>

            {/* Result Message */}
            {checkInResult && (
              <div
                className={`p-4 rounded-none flex items-center gap-2 ${
                  checkInResult.success
                    ? "bg-green-500/10 text-green-500 border border-green-500/20"
                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                }`}
              >
                {checkInResult.success ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>{checkInResult.message}</span>
              </div>
            )}

            {/* Back Button */}
            <CxCButton
              variant="outline"
              onClick={() => router.push("/admin/events")}
              className="w-full !bg-purple-500/10 !border-purple-500/40 !text-purple-300 hover:!bg-purple-500/20 hover:!border-purple-500/60 p-3"
            >
              Back to Events
            </CxCButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
