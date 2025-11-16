import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { StudentLayout } from "@/components/Layout/StudentLayout";
import { useState } from "react";

interface StudentFine {
  id: string;
  eventName: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
  dueDate: string;
}

const mockStudentFines: StudentFine[] = [
  {
    id: "1",
    eventName: "Sports Day - Dec 5, 2024",
    date: "Dec 5, 2024",
    amount: 300,
    status: "pending",
    dueDate: "Dec 20, 2024",
  },
  {
    id: "2",
    eventName: "Exam Review Session - Nov 18, 2024",
    date: "Nov 18, 2024",
    amount: 300,
    status: "pending",
    dueDate: "Dec 3, 2024",
  },
  {
    id: "3",
    eventName: "Leadership Seminar - Oct 15, 2024",
    date: "Oct 15, 2024",
    amount: 300,
    status: "paid",
    dueDate: "Oct 30, 2024",
  },
];

const StudentFines = () => {
  const [selectedFine, setSelectedFine] = useState<StudentFine | null>(null);

  const totalFines = mockStudentFines.reduce((sum, f) => sum + f.amount, 0);
  const pendingFines = mockStudentFines.filter((f) => f.status === "pending");
  const pendingAmount = pendingFines.reduce((sum, f) => sum + f.amount, 0);
  const paidFines = mockStudentFines.filter((f) => f.status === "paid");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <StudentLayout userName="Juan Dela Cruz">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Fines</h1>
          <p className="text-muted-foreground">Track and manage your attendance-related fines</p>
        </div>

        {/* Alert Banner */}
        {pendingAmount > 0 && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                You have pending fines
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                Total pending amount: <strong>₱{pendingAmount.toLocaleString()}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">₱{totalFines.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Fines</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">₱{pendingAmount.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending Amount</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  ₱{mockStudentFines
                    .filter((f) => f.status === "paid")
                    .reduce((sum, f) => sum + f.amount, 0)
                    .toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Amount Paid</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{pendingFines.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending Fines</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fines List */}
        <Card>
          <CardHeader>
            <CardTitle>Fines Breakdown</CardTitle>
            <CardDescription>All fines issued for missed events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockStudentFines.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-lg font-semibold">No fines issued</p>
                <p className="text-muted-foreground">Keep up your attendance!</p>
              </div>
            ) : (
              mockStudentFines.map((fine) => (
                <div
                  key={fine.id}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{fine.eventName}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Fine Amount: <span className="font-bold text-red-600">₱{fine.amount}</span>
                      </p>
                    </div>
                    <Badge className={getStatusColor(fine.status)}>
                      {fine.status === "paid" ? "✓ Paid" : "Pending"}
                    </Badge>
                  </div>

                  <div className="grid gap-2 md:grid-cols-3 mb-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Event Date</p>
                      <p className="text-sm font-medium">{fine.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{fine.dueDate}</p>
                        {fine.status === "pending" && isOverdue(fine.dueDate) && (
                          <Badge variant="destructive" className="text-xs">Overdue</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFine(fine)}
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
        {selectedFine && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedFine.eventName}</CardTitle>
                  <CardDescription>Fine Details</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedFine(null)}
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
                  <p className="font-semibold">{selectedFine.date}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Due Date</p>
                  <p className="font-semibold">{selectedFine.dueDate}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Fine Amount</p>
                  <p className="font-semibold text-red-600 text-lg">₱{selectedFine.amount}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <Badge className={getStatusColor(selectedFine.status)}>
                    {selectedFine.status === "paid" ? "✓ Paid" : "Pending"}
                  </Badge>
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>ℹ️ Note:</strong> This fine was issued because you missed the mandatory event. 
                  You can contact your department if you have a valid reason for the absence.
                </p>
              </div>

              {/* Payment Info */}
              {selectedFine.status === "pending" && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="font-semibold">Payment Information</h4>
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Payment Method</p>
                    <p className="text-sm">Contact your department for payment instructions</p>
                  </div>
                  <Button className="w-full" size="lg">
                    Pay Now
                  </Button>
                </div>
              )}

              {selectedFine.status === "paid" && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      Fine Paid
                    </p>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      Payment confirmed
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">How Fines Work</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900 dark:text-blue-100 space-y-2">
            <p>• <strong>Mandatory events:</strong> ₱300 fine per missed event</p>
            <p>• <strong>Optional events:</strong> No fine for missing</p>
            <p>• <strong>Valid excuse:</strong> Submit an excuse letter to waive the fine</p>
            <p>• <strong>Payment deadline:</strong> Fine must be paid within 15 days</p>
            <p>• <strong>Overdue fine:</strong> May affect your grades or registration</p>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentFines;
