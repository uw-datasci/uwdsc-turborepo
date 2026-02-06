"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@uwdsc/ui";
import { QrCode, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function NfcPage() {
  const { user } = useAuth();
  const [nfcId, setNfcId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadNfcId() {
      // Only load NFC ID for non-default, non-declined roles
      if (!user?.role || user.role === "default" || user.role === "declined") {
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

  if (
    !user?.role ||
    user.role === "default" ||
    user.role === "declined" ||
    !nfcId
  ) {
    const getMessage = () => {
      if (!user?.role) {
        return {
          title: "Role Not Assigned",
          description:
            "Your account doesn't have a role assigned yet. Please contact an administrator to get access to NFC check-in.",
        };
      }
      if (user.role === "declined") {
        return {
          title: "Access Not Available",
          description:
            "Your application has been declined. NFC check-in is only available for approved staff and administrators.",
        };
      }
      if (user.role === "default") {
        return {
          title: "Access Restricted",
          description:
            "NFC check-in is only available for staff and administrators. Your current role doesn't have access to this feature.",
        };
      }
      return {
        title: "NFC ID Not Available",
        description:
          "Your NFC ID hasn't been generated yet. Please contact an administrator for assistance.",
      };
    };

    const message = getMessage();

    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center border-b border-white/10 pb-4 mb-6"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              NFC Check-In
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="bg-black border border-white/20 rounded-none">
              <CardContent className="py-8 px-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <AlertCircle className="w-8 h-8 text-white/60" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white">
                      {message.title}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {message.description}
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

  // Use the actual application URL (from window.location.origin)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const checkInUrl = `${baseUrl}/admin/checkin/${nfcId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(checkInUrl)}`;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center border-b border-white/10 pb-4"
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
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white uppercase tracking-wider text-sm flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                Check-In
              </CardTitle>
              <p className="text-white/60 text-sm mt-2">
                Scan this QR code or use your NFC to check in at events.
              </p>
            </CardHeader>
            <CardContent className="py-4 flex justify-center">
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
