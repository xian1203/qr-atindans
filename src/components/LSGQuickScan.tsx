import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  X,
  Zap,
  Camera,
  Volume2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ScanResult {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  timestamp: Date;
  status: "success" | "duplicate" | "invalid";
  errorMessage?: string;
}

interface Event {
  id: string;
  name: string;
  time: string;
  expectedAttendees: number;
}

export const LSGQuickScan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("leadership");
  const [qrInput, setQrInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);

  const events: Event[] = [
    { id: "leadership", name: "Leadership Seminar", time: "9 AM - 12 PM", expectedAttendees: 150 },
    { id: "career", name: "Career Fair", time: "1 PM - 5 PM", expectedAttendees: 300 },
    { id: "sports", name: "Sports Festival", time: "6 PM - 8 PM", expectedAttendees: 200 },
  ];

  const stats = {
    totalScans: scanResults.filter((s) => s.status === "success").length,
    duplicates: scanResults.filter((s) => s.status === "duplicate").length,
    invalid: scanResults.filter((s) => s.status === "invalid").length,
  };

  const playSound = (type: "success" | "error") => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "success") {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else {
      oscillator.frequency.value = 400;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrInput.trim()) return;

    setIsScanning(true);

    // Simulate scan processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      const isDuplicate = !isSuccess && Math.random() > 0.5;

      const result: ScanResult = {
        id: String(scanResults.length + 1),
        studentName: `Student ${Math.floor(Math.random() * 1000)}`,
        studentId: qrInput,
        department: ["CBA", "CECE", "CTELAN", "CNS"][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        status: isSuccess ? "success" : isDuplicate ? "duplicate" : "invalid",
        errorMessage:
          isDuplicate ? "Already scanned" : !isSuccess ? "QR code not recognized" : undefined,
      };

      setScanResults([result, ...scanResults]);
      setRecentScans([result, ...recentScans.slice(0, 4)]);

      playSound(isSuccess ? "success" : "error");

      setQrInput("");
      setIsScanning(false);
    }, 600);
  };

  const currentEvent = events.find((e) => e.id === selectedEvent);
  const successRate = scanResults.length > 0 
    ? Math.round((stats.totalScans / scanResults.length) * 100) 
    : 0;

  if (!isOpen) {
    return (
      <button 
        className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all pointer-events-auto cursor-pointer"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <QrCode className="w-5 h-5" />
        Quick Scan
      </button>
    );
  }

  return (
    <>
      <button 
        className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:opacity-90 transition-all pointer-events-auto cursor-pointer"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <QrCode className="w-5 h-5" />
        Quick Scan
      </button>

      {/* Modal Background */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal Content */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <Card className="bg-white dark:bg-slate-950 border border-border rounded-lg shadow-xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-6 h-6 text-teal-600" />
                    Quick Event Scanner
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Scan QR codes to register student attendance
                  </CardDescription>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Event Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Select Event</label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {currentEvent && (
                  <p className="text-xs text-muted-foreground">
                    {currentEvent.time} • Expected: {currentEvent.expectedAttendees} attendees
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-green-700">{stats.totalScans}</div>
                      <div className="text-xs text-green-600">Success</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-yellow-700">{stats.duplicates}</div>
                      <div className="text-xs text-yellow-600">Duplicates</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <X className="w-5 h-5 text-red-600 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-red-700">{stats.invalid}</div>
                      <div className="text-xs text-red-600">Invalid</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Success Rate */}
              {scanResults.length > 0 && (
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-teal-900 dark:text-teal-100">
                      Success Rate
                    </span>
                    <span className="text-xl font-bold text-teal-700 dark:text-teal-300">
                      {successRate}%
                    </span>
                  </div>
                  <div className="w-full bg-teal-200 dark:bg-teal-800 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full transition-all duration-300"
                      style={{ width: `${successRate}%` }}
                    />
                  </div>
                </div>
              )}

              {/* QR Input */}
              <form onSubmit={handleScan} className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    QR Code Input
                  </label>
                  <Input
                    type="text"
                    placeholder="Paste QR code data here..."
                    value={qrInput}
                    onChange={(e) => setQrInput(e.target.value)}
                    className="font-mono text-sm"
                    autoFocus
                    disabled={isScanning}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={!qrInput.trim() || isScanning}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white gap-2"
                  >
                    {isScanning ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4" />
                        Scan Now
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    title={soundEnabled ? "Sound enabled" : "Sound disabled"}
                    className="aspect-square"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              {/* Recent Scans */}
              {recentScans.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Recent Scans</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {recentScans.map((scan) => (
                      <div
                        key={scan.id}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg border transition-all",
                          scan.status === "success"
                            ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                            : scan.status === "duplicate"
                              ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
                              : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                        )}
                      >
                        <div className="flex-shrink-0 pt-0.5">
                          {scan.status === "success" && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                          {scan.status === "duplicate" && (
                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                          )}
                          {scan.status === "invalid" && (
                            <X className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm truncate">
                              {scan.studentName}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {scan.department}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {scan.studentId} •{" "}
                            {scan.timestamp.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            })}
                          </div>
                          {scan.errorMessage && (
                            <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                              {scan.errorMessage}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {recentScans.length === 0 && (
                <div className="text-center py-8">
                  <QrCode className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground text-sm">No scans yet. Start scanning!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
