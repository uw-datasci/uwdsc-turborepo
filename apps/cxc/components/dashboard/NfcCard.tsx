"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@uwdsc/ui";
import { Copy, CheckCircle2 } from "lucide-react";

export function NfcCard() {
  const [nfcId, setNfcId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadNfcId() {
      try {
        // Get NFC ID from profile endpoint
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          if (data.nfc_id) {
            setNfcId(data.nfc_id);
          } else {
            // If no NFC ID, try to generate it via admin endpoint (if user is admin or superadmin)
            try {
              const adminResponse = await fetch("/api/admin/nfc");
              if (adminResponse.ok) {
                const adminData = await adminResponse.json();
                setNfcId(adminData.nfc_id);
              }
            } catch {
              // Not an admin, that's fine
            }
          }
        }
      } catch (error) {
        console.error("Error loading NFC ID:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNfcId();
  }, []);

  const handleCopy = async () => {
    if (!nfcId) return;

    // Use the actual application URL (from window.location.origin)
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const checkInUrl = `${baseUrl}/admin/checkin/${nfcId}`;

    try {
      await navigator.clipboard.writeText(checkInUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  if (loading) {
    return (
      <Card className="bg-black border border-white/20 rounded-none">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-white uppercase tracking-wider text-sm">
            NFC Check-In
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-32 bg-white/5 animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!nfcId) return null;

  // Use the actual application URL (from window.location.origin)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const checkInUrl = `${baseUrl}/admin/checkin/${nfcId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(checkInUrl)}`;

  return (
    <Card className="bg-black border border-white/20 rounded-none">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-white uppercase tracking-wider text-sm">
          NFC Check-In
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* NFC info moved to sidebar */}
      </CardContent>
    </Card>
  );
}
