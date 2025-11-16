import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Copy, RefreshCw } from "lucide-react";
import { StudentLayout } from "@/components/Layout/StudentLayout";
import { useState } from "react";

const StudentQrCode = () => {
  const [copied, setCopied] = useState(false);

  const studentId = "2024-CBA-00123";

  const handleCopy = () => {
    navigator.clipboard.writeText(studentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StudentLayout userName="Juan Dela Cruz">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My QR Code</h1>
          <p className="text-muted-foreground">Your unique attendance QR code for events</p>
        </div>

        {/* Main QR Code Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Student QR Code</CardTitle>
            <CardDescription>Show this at events to mark your attendance</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            {/* QR Code Display */}
            <div className="w-full max-w-sm p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center">
              <div className="w-64 h-64 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border-4 border-primary/20">
                <QrCode className="w-40 h-40 text-primary/40" />
              </div>
            </div>

            {/* Student ID */}
            <div className="w-full">
              <p className="text-sm text-muted-foreground text-center mb-2">Student ID</p>
              <div className="flex items-center justify-center gap-2">
                <code className="px-4 py-2 bg-muted rounded-md font-mono text-sm font-semibold">
                  {studentId}
                </code>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleCopy}
                  title="Copy Student ID"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
                  ✓ Copied to clipboard
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2 sm:flex-row">
              <Button className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download QR Code
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <RefreshCw className="w-4 h-4" />
                Regenerate Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* How to Use */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Use Your QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold">Keep it with you</p>
                  <p className="text-muted-foreground">Save or screenshot your QR code</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold">Show at events</p>
                  <p className="text-muted-foreground">Display your code at event check-in</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold">Get scanned</p>
                  <p className="text-muted-foreground">Event organizer scans your code</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <div>
                  <p className="font-semibold">Attendance confirmed</p>
                  <p className="text-muted-foreground">Your attendance is automatically recorded</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  ℹ️ Unique QR Code
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200">
                  Your QR code is unique to you. Do not share it with others.
                </p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
                <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  ⚠️ Lost Code?
                </p>
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  You can regenerate your code anytime, but you'll need the new code for future events.
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                <p className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  ✓ Always Available
                </p>
                <p className="text-xs text-green-800 dark:text-green-200">
                  Your QR code is valid for the entire academic year.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QR Code Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Student Name</p>
                <p className="font-semibold">Juan Dela Cruz</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Student ID</p>
                <p className="font-semibold font-mono">{studentId}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Department</p>
                <p className="font-semibold">College of Business & Accountancy</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Academic Year</p>
                <p className="font-semibold">2024-2025</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Generated Date</p>
                <p className="font-semibold">Aug 1, 2024</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-900">
          <CardHeader>
            <CardTitle className="text-purple-900 dark:text-purple-100">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-purple-900 dark:text-purple-100 space-y-2">
            <p>
              If you're having issues with your QR code or attendance, please contact:
            </p>
            <ul className="space-y-1 ml-4">
              <li>📧 <strong>Email:</strong> attendance@university.edu</li>
              <li>📞 <strong>Phone:</strong> +63 2 1234 5678</li>
              <li>🏢 <strong>Office:</strong> Student Services Building, Room 101</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentQrCode;
