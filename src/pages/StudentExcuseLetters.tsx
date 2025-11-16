import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Clock, AlertCircle, CheckCircle2, XCircle, FileText } from "lucide-react";
import { StudentLayout } from "@/components/Layout/StudentLayout";
import { useState } from "react";

interface ExcuseLetter {
  id: string;
  eventName: string;
  eventDate: string;
  reason: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  supportingDocs?: string;
}

const mockExcuseLetters: ExcuseLetter[] = [
  {
    id: "1",
    eventName: "Sports Day",
    eventDate: "Dec 5, 2024",
    reason: "Medical appointment - Doctor's confirmation",
    submittedDate: "Dec 5, 2024",
    status: "approved",
    supportingDocs: "Medical Certificate",
  },
  {
    id: "2",
    eventName: "Exam Review Session",
    eventDate: "Nov 18, 2024",
    reason: "Family emergency - Unexpected hospitalization",
    submittedDate: "Nov 19, 2024",
    status: "pending",
  },
  {
    id: "3",
    eventName: "Leadership Seminar",
    eventDate: "Oct 15, 2024",
    reason: "University-approved competition participation",
    submittedDate: "Oct 14, 2024",
    status: "approved",
    supportingDocs: "Competition Letter",
  },
  {
    id: "4",
    eventName: "Career Fair",
    eventDate: "Oct 10, 2024",
    reason: "Conflicting mandatory class schedule",
    submittedDate: "Oct 9, 2024",
    status: "rejected",
  },
];

const StudentExcuseLetters = () => {
  const [selectedLetter, setSelectedLetter] = useState<ExcuseLetter | null>(null);

  const stats = {
    approved: mockExcuseLetters.filter((l) => l.status === "approved").length,
    pending: mockExcuseLetters.filter((l) => l.status === "pending").length,
    rejected: mockExcuseLetters.filter((l) => l.status === "rejected").length,
    total: mockExcuseLetters.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <StudentLayout userName="Juan Dela Cruz">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Excuse Letters</h1>
            <p className="text-muted-foreground">Submit and track your absence requests</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Submit New Letter
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
                <p className="text-sm text-muted-foreground mt-1">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
                <p className="text-sm text-muted-foreground mt-1">Rejected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
                <p className="text-sm text-muted-foreground mt-1">Total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Excuse Letters List */}
        <Card>
          <CardHeader>
            <CardTitle>My Excuse Letters</CardTitle>
            <CardDescription>View and manage your submitted excuse letters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockExcuseLetters.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-lg font-semibold">No excuse letters submitted</p>
                <p className="text-muted-foreground mb-4">Submit an excuse letter for your absences</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Letter
                </Button>
              </div>
            ) : (
              mockExcuseLetters.map((letter) => (
                <div
                  key={letter.id}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center gap-2">
                        {getStatusIcon(letter.status)}
                        {letter.eventName}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        <strong>Reason:</strong> {letter.reason}
                      </p>
                    </div>
                    <Badge className={getStatusColor(letter.status)}>
                      {letter.status.charAt(0).toUpperCase() + letter.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid gap-2 md:grid-cols-3 mb-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Event Date</p>
                      <p className="text-sm font-medium">{letter.eventDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                      <p className="text-sm font-medium">{letter.submittedDate}</p>
                    </div>
                    <div className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLetter(letter)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Details Modal */}
        {selectedLetter && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedLetter.status)}
                  <div>
                    <CardTitle>{selectedLetter.eventName}</CardTitle>
                    <CardDescription>{selectedLetter.eventDate}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedLetter(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Details Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Event Date</p>
                  <p className="font-semibold">{selectedLetter.eventDate}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Submitted Date</p>
                  <p className="font-semibold">{selectedLetter.submittedDate}</p>
                </div>
              </div>

              {/* Reason */}
              <div>
                <h4 className="font-semibold mb-2">Reason for Absence</h4>
                <p className="p-4 bg-muted/50 rounded-lg border border-border">
                  {selectedLetter.reason}
                </p>
              </div>

              {/* Supporting Documents */}
              {selectedLetter.supportingDocs && (
                <div>
                  <h4 className="font-semibold mb-2">Supporting Documents</h4>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      ✓ {selectedLetter.supportingDocs}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Info */}
              {selectedLetter.status === "approved" && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                    ✓ Excuse Letter Approved
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-200 mt-1">
                    Your absence has been excused. No fine will be applied.
                  </p>
                </div>
              )}

              {selectedLetter.status === "pending" && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                  <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">
                    ⏳ Under Review
                  </p>
                  <p className="text-xs text-yellow-800 dark:text-yellow-200 mt-1">
                    Your letter is being reviewed. You'll be notified once a decision is made.
                  </p>
                </div>
              )}

              {selectedLetter.status === "rejected" && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                    ✗ Excuse Letter Rejected
                  </p>
                  <p className="text-xs text-red-800 dark:text-red-200 mt-1">
                    Your absence was not approved. A fine may still apply. Contact your dean if you believe this is an error.
                  </p>
                </div>
              )}

              {/* Actions */}
              {selectedLetter.status === "rejected" && (
                <Button variant="outline" className="w-full">
                  Appeal Decision
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">Submitting an Excuse Letter</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900 dark:text-blue-100 space-y-2">
            <p>1. <strong>Provide details:</strong> Specify the event you missed and the reason</p>
            <p>2. <strong>Attach documents:</strong> Include supporting evidence (medical cert, etc.)</p>
            <p>3. <strong>Submit promptly:</strong> Submit within 5 days of the event</p>
            <p>4. <strong>Wait for approval:</strong> Dean will review within 2-3 business days</p>
            <p>5. <strong>Check status:</strong> You'll receive a notification of the decision</p>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentExcuseLetters;
