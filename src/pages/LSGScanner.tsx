import { useState } from "react";
import { LSGLayout } from "../components/Layout/LSGLayout";
import { QRCodeScanner } from "../components/QRCodeScanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import {
  QrCode,
  Zap,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  X,
  Clock,
  User,
  DollarSign,
} from "lucide-react";

interface ScanRecord {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  time: string;
  status: "success" | "duplicate" | "invalid";
  errorMessage?: string;
}

export default function LSGScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("leadership");
  const [qrInput, setQrInput] = useState("");
  const [scanCount, setScanCount] = useState(127);
  const [duplicateCount, setDuplicateCount] = useState(2);
  const [invalidCount, setInvalidCount] = useState(0);
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([
    {
      id: "1",
      studentName: "Maria Santos",
      studentId: "2021-001",
      department: "CBA",
      time: "2:15 PM",
      status: "success",
    },
    {
      id: "2",
      studentName: "Juan Dela Cruz",
      studentId: "2022-045",
      department: "CECE",
      time: "2:13 PM",
      status: "success",
    },
    {
      id: "3",
      studentName: "Ana Garcia",
      studentId: "2021-078",
      department: "CTELAN",
      time: "2:10 PM",
      status: "success",
    },
    {
      id: "4",
      studentName: "Pedro Reyes",
      studentId: "2021-089",
      department: "CNS",
      time: "2:08 PM",
      status: "duplicate",
      errorMessage: "Already scanned",
    },
    {
      id: "5",
      studentName: "Invalid QR",
      studentId: "N/A",
      department: "N/A",
      time: "2:05 PM",
      status: "invalid",
      errorMessage: "QR code not recognized",
    },
  ]);

  const events = [
    { value: "leadership", label: "Leadership Seminar (9 AM - 12 PM)" },
    { value: "career", label: "Career Fair (1 PM - 5 PM)" },
    { value: "sports", label: "Sports Festival (6 PM - 8 PM)" },
  ];

  const handleScanQR = (qrData: string) => {
    if (!qrData.trim()) return;

    // Simulate QR processing
    const newScan: ScanRecord = {
      id: String(scanHistory.length + 1),
      studentName: "Test Student",
      studentId: qrData,
      department: "CBA",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      status: Math.random() > 0.9 ? "duplicate" : "success",
    };

    if (newScan.status === "duplicate") {
      newScan.errorMessage = "Already scanned";
      setDuplicateCount(duplicateCount + 1);
    } else {
      setScanCount(scanCount + 1);
    }

    setScanHistory([newScan, ...scanHistory]);
  };

  const handleClearHistory = () => {
    setScanHistory([]);
    setScanCount(0);
    setDuplicateCount(0);
    setInvalidCount(0);
  };

  const getScanStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "duplicate":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "invalid":
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getScanStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100 dark:bg-green-900";
      case "duplicate":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
      case "invalid":
        return "text-red-600 bg-red-100 dark:bg-red-900";
      default:
        return "";
    }
  };

  const totalScans = scanCount + duplicateCount + invalidCount;

  return (
    <LSGLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              QR Code Scanner
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Real-time attendance scanning interface
            </p>
          </div>
          <Button
            size="lg"
            className={`gap-2 ${
              isScanning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={() => setIsScanning(!isScanning)}
          >
            <Zap className="w-4 h-4" />
            {isScanning ? "Stop Scanning" : "Start Scanning"}
          </Button>
        </div>

        {/* Live Status Alert */}
        {isScanning && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
            <Zap className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-300">
              <strong>Scanner is LIVE</strong> - Ready to scan QR codes for the selected event
            </AlertDescription>
          </Alert>
        )}

        {/* Scanning Controls */}
        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Scanner Interface
            </CardTitle>
            <CardDescription>Select an event and start scanning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Event Selection */}
            <div>
              <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
                Select Event
              </label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.value} value={event.value}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* QR Input Area - Optional fallback */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-900 dark:text-white">
                Manual Input (Optional)
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Or paste student ID manually"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleScanQR(qrInput);
                      setQrInput("");
                    }
                  }}
                  className="flex-1"
                  disabled={!isScanning}
                />
                <Button
                  onClick={() => {
                    if (qrInput.trim()) {
                      handleScanQR(qrInput);
                      setQrInput("");
                    }
                  }}
                  disabled={!isScanning || !qrInput.trim()}
                  className="gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isScanning
                  ? "Use the camera to scan or manually enter Student ID"
                  : "Start scanning to process QR codes"}
              </p>
            </div>

            {/* Camera Preview - Real Scanner */}
            <QRCodeScanner
              onScan={handleScanQR}
              isScanning={isScanning}
              disabled={!isScanning}
            />
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Scans
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                  {totalScans}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Successful
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">{scanCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Duplicates
                </p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{duplicateCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Invalid
                </p>
                <p className="text-3xl font-bold text-red-600 mt-2">{invalidCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scan History */}
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <div>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Recent scanning records</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearHistory}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {scanHistory.length === 0 ? (
              <div className="text-center py-8">
                <QrCode className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No scans yet. Start scanning to see results here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {scanHistory.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {getScanStatusIcon(scan.status)}
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {scan.studentName}
                        </p>
                        <div className="flex gap-3 mt-1 text-xs text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {scan.studentId}
                          </span>
                          <span>•</span>
                          <span>{scan.department}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {scan.time}
                          </span>
                        </div>
                        {scan.errorMessage && (
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 italic">
                            {scan.errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge
                      className={getScanStatusColor(scan.status)}
                      variant={scan.status === "success" ? "default" : "secondary"}
                    >
                      {scan.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </LSGLayout>
  );
}
