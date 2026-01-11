"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from "@uwdsc/ui";
import { CheckCircle2, XCircle, Loader2, Copy } from "lucide-react";

export default function NfcWritePage() {
  const [nfcUrl, setNfcUrl] = useState<string>("");
  const [writing, setWriting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Load from clipboard on mount
  useEffect(() => {
    async function loadFromClipboard() {
      try {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          if (text.startsWith("http") || text.startsWith("/")) {
            setNfcUrl(text);
          } else {
            const baseUrl = window.location.origin;
            setNfcUrl(`${baseUrl}/admin/checkin/${text}`);
          }
        }
      } catch {
        // Clipboard read failed (permission denied or not available)
      }
    }
  
    loadFromClipboard();
  }, []);  

  const handleWrite = async () => {
    if (!nfcUrl.trim()) {
      setResult({
        success: false,
        message: "Please enter a URL to write",
      });
      return;
    }

    setWriting(true);
    setResult(null);

    try {
      // Use Web NFC API to write
      if ("NDEFWriter" in window) {
        // Chrome 89+ API
        const writer = new (window as any).NDEFWriter();
        await writer.write({
          records: [
            {
              recordType: "url",
              data: nfcUrl,
            },
          ],
        });
      } else if ("nfc" in navigator && (navigator as any).nfc) {
        // Chrome 89+ alternative API
        const ndef = new (navigator as any).nfc.NDEFWriter();
        await ndef.write({
          records: [
            {
              recordType: "url",
              data: nfcUrl,
            },
          ],
        });
      } else {
        throw new Error("Web NFC API not available");
      }

      setResult({
        success: true,
        message: "Successfully wrote URL to NFC card!",
      });

      // Clear result after 5 seconds
      setTimeout(() => {
        setResult(null);
      }, 5000);
    } catch (error: any) {
      console.error("Error writing NFC:", error);
      setResult({
        success: false,
        message: error.message || "Failed to write to NFC card. Make sure the card is close to your device.",
      });
    } finally {
      setWriting(false);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        if (text.startsWith("http") || text.startsWith("/")) {
          setNfcUrl(text);
        } else {
          const baseUrl = window.location.origin;
          setNfcUrl(`${baseUrl}/admin/checkin/${text}`);
        }
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Could not read from clipboard. Please paste manually.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Write to NFC Card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warning Message */}
          <div className="p-4 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
            <p className="text-sm font-medium">
              ⚠️ Please use Android and Chrome!!! This feature requires Chrome on Android with HTTPS.
            </p>
          </div>

          {/* URL Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              URL to Write
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={nfcUrl}
                onChange={(e) => setNfcUrl(e.target.value)}
                placeholder="https://example.com or /admin/checkin/abc123"
                className="flex-1"
                disabled={writing}
              />
              <Button
                variant="outline"
                onClick={handlePasteFromClipboard}
                disabled={writing}
                size="icon"
                title="Paste from clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Enter a URL or paste from clipboard. If you paste an NFC ID, it will be converted to a check-in URL.
            </p>
          </div>

          {/* Write Button */}
          <Button
            onClick={handleWrite}
            disabled={!nfcUrl.trim() || writing}
            className="w-full"
            size="lg"
          >
            {writing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Writing to NFC Card...
              </>
            ) : (
              "Write to NFC Card"
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

          {/* Instructions */}
          <div className="p-4 rounded-md bg-muted">
            <h3 className="font-medium mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Enter or paste the URL you want to write to the NFC card</li>
              <li>Click &quot;Write to NFC Card&quot;</li>
              <li>Hold your NFC card close to your device when prompted</li>
              <li>Wait for the confirmation message</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
