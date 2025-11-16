import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Mail } from "lucide-react";

interface ExcuseLetter {
  id: string;
  student: string;
  reason: string;
  event: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  attachmentUrl: string;
  daysAbsent: number;
}

const mockLetters: ExcuseLetter[] = [
  {
    id: "1",
    student: "Juan Dela Cruz",
    reason: "Medical Emergency",
    event: "Leadership Seminar",
    date: "Dec 10, 2024",
    status: "pending",
    attachmentUrl: "#",
    daysAbsent: 3,
  },
  {
    id: "2",
    student: "Maria Garcia",
    reason: "Family Emergency",
    event: "Sports Fest",
    date: "Dec 8, 2024",
    status: "pending",
    attachmentUrl: "#",
    daysAbsent: 2,
  },
  {
    id: "3",
    student: "Pedro Reyes",
    reason: "Medical Appointment",
    event: "Career Fair",
    date: "Dec 5, 2024",
    status: "approved",
    attachmentUrl: "#",
    daysAbsent: 1,
  },
  {
    id: "4",
    student: "Anna Santos",
    reason: "Court Hearing",
    event: "Midterm Exams",
    date: "Dec 2, 2024",
    status: "approved",
    attachmentUrl: "#",
    daysAbsent: 2,
  },
  {
    id: "5",
    student: "Robert Cruz",
    reason: "Insufficient Documentation",
    event: "Final Project",
    date: "Nov 28, 2024",
    status: "rejected",
    attachmentUrl: "#",
    daysAbsent: 1,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "rejected":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-amber-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-50 border-green-200";
    case "rejected":
      return "bg-red-50 border-red-200";
    default:
      return "bg-amber-50 border-amber-200";
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
    case "rejected":
      return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
    default:
      return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
  }
};

export const ExcuseLettersManagement = () => {
  const pendingCount = mockLetters.filter((l) => l.status === "pending").length;
  const approvedCount = mockLetters.filter((l) => l.status === "approved").length;

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Excuse Letters Management</CardTitle>
            <CardDescription>Review and manage student excuse letters</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center px-4">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-xs text-muted-foreground">Approved</div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLetters.map((letter) => (
            <div
              key={letter.id}
              className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(
                letter.status
              )}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getStatusIcon(letter.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{letter.student}</h4>
                      {getStatusBadge(letter.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Event:</span> {letter.event}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-medium">Reason:</span> {letter.reason}
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>📅 {letter.date}</span>
                      <span>⏱️ {letter.daysAbsent} days absent</span>
                    </div>
                  </div>
                </div>
                {letter.status === "pending" && (
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
                {letter.status !== "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
