import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
import { AlertCircle, Video, VideoOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  isScanning: boolean;
  disabled?: boolean;
}

export const QRCodeScanner = ({
  onScan,
  isScanning,
  disabled = false,
}: QRCodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>("");
  const [hasCamera, setHasCamera] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Start video stream
  useEffect(() => {
    if (!isScanning || disabled) {
      stopCamera();
      return;
    }

    const startCamera = async () => {
      try {
        setError("");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraReady(true);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unable to access camera";
        setError(errorMessage);
        setHasCamera(false);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isScanning, disabled]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraReady(false);
    }
  };

  // QR scanning loop
  useEffect(() => {
    if (!isScanning || !isCameraReady || disabled) return;

    const scanInterval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          onScan(code.data);
        }
      }
    }, 100); // Scan every 100ms

    return () => clearInterval(scanInterval);
  }, [isScanning, isCameraReady, onScan, disabled]);

  return (
    <div className="space-y-4">
      {error && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-300">
            {hasCamera
              ? `Camera Error: ${error}`
              : "Camera access is required for QR scanning. Please allow camera permissions in your browser settings."}
          </AlertDescription>
        </Alert>
      )}

      <div className="relative aspect-square bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-700">
        {!hasCamera ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 bg-slate-900">
            <VideoOff className="w-16 h-16 text-slate-600" />
            <p className="text-slate-400 text-center px-4">
              Camera not available. Check permissions or try with a different device.
            </p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            {isScanning && isCameraReady && (
              <>
                {/* Scanning frame indicator */}
                <div className="absolute inset-0 border-4 border-green-500 m-auto w-64 h-64 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500" />
                </div>

                {/* Scanning animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/2 top-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />
                </div>

                {/* Active indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400 font-semibold">Scanning</span>
                </div>
              </>
            )}
            {!isScanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <Video className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-300 text-sm">Scanner Ready</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Click "Start Scanning" to begin
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden canvas for QR detection */}
      <canvas
        ref={canvasRef}
        className="hidden"
        width={1280}
        height={720}
      />

      <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
        {isScanning
          ? "Position the QR code in the center of the frame for best results"
          : "Start scanning to activate the camera"}
      </p>
    </div>
  );
};
