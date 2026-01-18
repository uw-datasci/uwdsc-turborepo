"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@uwdsc/ui";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
  ExternalLink,
} from "lucide-react";

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

interface WindowWithNDEF extends Window {
  NDEFReader: new () => NDEFReader;
}

interface NavigatorWithNFC extends Navigator {
  nfc?: {
    NDEFReader: new () => NDEFReader;
  };
}

export default function NfcReadPage() {
  const [reading, setReading] = useState(false);
  const [nfcData, setNfcData] = useState<string | null>(null);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  // Check Web NFC support on mount
  useEffect(() => {
    const supported = "NDEFReader" in window || "nfc" in navigator;
    setIsSupported(supported);
  }, []);

  const handleRead = async () => {
    if (!isSupported) {
      setResult({
        success: false,
        message:
          "Web NFC is not supported on this device. Please use Chrome on Android.",
      });
      return;
    }

    setReading(true);
    setResult(null);
    setNfcData(null);

    try {
      let url: string | null = null;

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
                    url = record.data;
                  } else if (record.data instanceof Uint8Array) {
                    url = decoder.decode(record.data);
                  }
                } else if (record.recordType === "text") {
                  if (record.data instanceof Uint8Array) {
                    url = decoder.decode(record.data);
                  } else if (typeof record.data === "string") {
                    url = record.data;
                  }
                } else if (
                  record.recordType === "mime" &&
                  record.mediaType === "text/plain"
                ) {
                  if (record.data instanceof Uint8Array) {
                    url = decoder.decode(record.data);
                  } else if (typeof record.data === "string") {
                    url = record.data;
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
                    url = record.data;
                  } else if (record.data instanceof Uint8Array) {
                    url = decoder.decode(record.data);
                  }
                } else if (record.recordType === "text") {
                  if (record.data instanceof Uint8Array) {
                    url = decoder.decode(record.data);
                  } else if (typeof record.data === "string") {
                    url = record.data;
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

      if (url) {
        setNfcData(url);
        setResult({
          success: true,
          message: "Successfully read URL from NFC card!",
        });
      } else {
        setResult({
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
      setResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      setReading(false);
    }
  };

  const handleCopy = async () => {
    if (!nfcData) return;

    try {
      await navigator.clipboard.writeText(nfcData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleOpenUrl = () => {
    if (!nfcData) return;

    // If it's a relative URL, make it absolute
    if (nfcData.startsWith("/")) {
      window.location.href = nfcData;
    } else if (nfcData.startsWith("http")) {
      window.open(nfcData, "_blank");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Read from NFC Card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Web NFC Support Status */}
          {isSupported === false && (
            <div className="p-4 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
              <p className="text-sm">
                Web NFC is not supported on this device. This feature requires
                Chrome on Android with HTTPS.
              </p>
            </div>
          )}

          {isSupported === true && (
            <div className="p-4 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <p className="text-sm">
                Web NFC is supported. Hold your NFC card close to your device
                when reading.
              </p>
            </div>
          )}

          {/* Read Button */}
          <Button
            onClick={handleRead}
            disabled={reading || !isSupported}
            className="w-full"
            size="lg"
          >
            {reading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Reading NFC Card... (Hold card close)
              </>
            ) : (
              "Read NFC Card"
            )}
          </Button>

          {/* Result Message */}
          {result && (
            <div
              className={`p-4 rounded-md flex items-center gap-2 ${
                result.success
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-red-500/10 text-red-500 border border-red-500/20"
              }`}
            >
              {result.success ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span>{result.message}</span>
            </div>
          )}

          {/* Read URL Display */}
          {nfcData && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Read URL
                </label>
                <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                  {nfcData}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </>
                  )}
                </Button>
                <Button onClick={handleOpenUrl} className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open URL
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 rounded-md bg-muted">
            <h3 className="font-medium mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Click &quot;Read NFC Card&quot;</li>
              <li>Hold your NFC card close to your device</li>
              <li>Wait for the card to be detected and read</li>
              <li>The URL will be displayed if found</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
