"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@uwdsc/ui";
import { Copy, CheckCircle2, QrCode } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function NfcPage() {
  const { user } = useAuth();
  const [nfcId, setNfcId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadNfcId() {
      // Only load NFC ID for non-default roles
      if (!user?.role || user.role === "default") {
        setLoading(false);
        return;
      }

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
  }, [user?.role]);

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
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 w-48 bg-white/10 animate-pulse" />
          <div className="h-96 bg-white/5 border border-white/10 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user?.role || user.role === "default" || !nfcId) {
    return (
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-b border-white/10 pb-6"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              NFC Check-In
            </h1>
            <p className="text-white/60 mt-1">
              NFC check-in is only available for staff and administrators.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Use the actual application URL (from window.location.origin)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const checkInUrl = `${baseUrl}/admin/checkin/${nfcId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(checkInUrl)}`;

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-white/10 pb-6"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            NFC Check-In
          </h1>
          <p className="text-white/60 mt-1">
            Use your QR code or NFC to check in at events.
          </p>
        </motion.div>

        {/* NFC Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-black border border-white/20 rounded-none">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Check-In Code
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* QR Code */}
                <div className="flex-shrink-0">
                  <div className="p-4 bg-white border border-white/20">
                    <Image
                      src={qrCodeUrl}
                      alt="QR Code for check-in"
                      width={192}
                      height={192}
                      unoptimized
                    />
                  </div>
                </div>

                {/* NFC Info */}
                <div className="flex-1 space-y-4">
                  <p className="text-white/60 text-sm">
                    Scan this QR code or use your NFC to check in at events.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
