"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@uwdsc/ui";
import { QrCode, X, Camera } from "lucide-react";
import CxCButton from "@/components/CxCButton";

interface QrScannerProps {
  onScan: (result: string) => void;
  onClose?: () => void;
}

export function QrScanner({ onScan, onClose }: Readonly<QrScannerProps>) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const stopScanning = async () => {
    // Stop html5-qrcode if it's running
    try {
      const { Html5Qrcode } = await import("html5-qrcode");
      const html5QrCode = new Html5Qrcode("qr-reader");
      // Check if scanning by trying to stop (will throw if not scanning)
      try {
        await html5QrCode.stop();
      } catch {
        // Not scanning, that's fine
      }
    } catch {
      // Ignore errors if library not loaded
    }
    setIsScanning(false);
  };

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Use html5-qrcode library if available
      try {
        // Dynamic import of html5-qrcode
        const { Html5Qrcode } = await import("html5-qrcode");
        const html5QrCode = new Html5Qrcode("qr-reader");

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            html5QrCode.stop().catch(console.error);
            stopScanning();
            onScan(decodedText);
          },
          () => {
            // Ignore scanning errors - they're expected during scanning
          },
        );
      } catch (importError) {
        // Fallback: show error message
        console.error("Failed to load QR scanner:", importError);
        setError(
          "QR scanner library not available. Please install html5-qrcode: pnpm add html5-qrcode",
        );
        setIsScanning(false);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Failed to access camera. Please allow camera permissions.");
      setIsScanning(false);
    }
  };

  const handleClose = () => {
    stopScanning();
    if (onClose) {
      onClose();
    }
  };

  return (
    <Card className="bg-black border-white/10 rounded-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">Scan QR Code</CardTitle>
          {onClose && (
            <CxCButton
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="!bg-transparent !text-white hover:!bg-white/10"
            >
              <X className="h-4 w-4" />
            </CxCButton>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-4 rounded-none bg-red-500/10 text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {!isScanning ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/20 rounded-none">
            <QrCode className="h-16 w-16 text-white/60 mb-4" />
            <p className="text-white/60 mb-4 text-center">
              Click the button below to start scanning QR codes
            </p>
            <CxCButton onClick={startScanning}>
              <Camera className="mr-2 h-4 w-4" />
              Start Scanner
            </CxCButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div id="qr-reader" className="w-full min-h-[300px]" />
            <CxCButton
              onClick={stopScanning}
              variant="outline"
              className="w-full !bg-red-400/10 !border-red-400/40 !text-red-400 hover:!bg-red-500/15 hover:!border-red-500/60"
            >
              Stop Scanning
            </CxCButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
