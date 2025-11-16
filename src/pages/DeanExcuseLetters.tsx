import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, FileText, Users, Calendar, Search, CheckCircle, XCircle, Clock } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

interface ExcuseLetter {
  id: string;
  studentName: string;
  studentId: string;
  reason: string;
  dateAbsent: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  attachment: string;
  daysAbsent: number;
}

const mockLetters: ExcuseLetter[] = [
  {
    id: "1",
    studentName: "Juan Dela Cruz",
    studentId: "2022-1001",
    reason: "Medical Emergency - Hospital Confinement",
    dateAbsent: "Dec 10-12, 2024",
    submittedDate: "Dec 13, 2024",
    status: "pending",
    attachment: "medical_certificate.pdf",
    daysAbsent: 3,
  },
  {
    id: "2",
    studentName: "Maria Garcia",
    studentId: "2022-1002",
    reason: "Family Emergency - Death of Immediate Family Member",
    dateAbsent: "Dec 8-9, 2024",
    submittedDate: "Dec 9, 2024",
    status: "pending",
    attachment: "death_certificate.pdf",
    daysAbsent: 2,
  },
  {
    id: "3",
    studentName: "Pedro Reyes",
    studentId: "2022-1003",
    reason: "Court Hearing - Legal Obligation",
    dateAbsent: "Dec 5, 2024",
    submittedDate: "Dec 6, 2024",
    status: "approved",
    attachment: "court_order.pdf",
    daysAbsent: 1,
  },
  {
    id: "4",
    studentName: "Anna Santos",
    studentId: "2022-1004",
    reason: "Medical Appointment - Doctor's Consultation",
    dateAbsent: "Dec 2, 2024",
    submittedDate: "Dec 3, 2024",
    status: "approved",
    attachment: "doctors_note.pdf",
    daysAbsent: 1,
  },
  {
    id: "5",
    studentName: "Robert Cruz",
    studentId: "2022-1005",
    reason: "Insufficient Documentation Provided",
    dateAbsent: "Nov 28, 2024",
    submittedDate: "Nov 29, 2024",
    status: "rejected",
    attachment: "incomplete_doc.pdf",
    daysAbsent: 1,
  },
];

const DeanExcuseLetters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const sidebar = (
    <nav className="p-4 space-y-2">
      <NavLink
        to="/dean"
        end
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Home className="w-5 h-5" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/dean/students"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Users className="w-5 h-5" />
        <span>Students</span>
      </NavLink>
      <NavLink
        to="/dean/excuse-letters"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <FileText className="w-5 h-5" />
        <span>Excuse Letters</span>
      </NavLink>
      <NavLink
        to="/dean/events"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Calendar className="w-5 h-5" />
        <span>Events</span>
      </NavLink>
    </nav>
  );

  const filteredLetters = mockLetters.filter((letter) => {
    const matchesSearch =
      letter.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.studentId.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || letter.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = mockLetters.filter((l) => l.status === "pending").length;
  const approvedCount = mockLetters.filter((l) => l.status === "approved").length;
  const rejectedCount = mockLetters.filter((l) => l.status === "rejected").length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600 hover:bg-green-700">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-600 hover:bg-red-700">Rejected</Badge>;
      default:
        return <Badge className="bg-amber-600 hover:bg-amber-700">Pending</Badge>;
    }
  };

  return (
    <DashboardLayout
      userName="Dr. Maria Santos"
      userRole="Dean - CBA"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Excuse Letters Management</h1>
          <p className="text-muted-foreground">Review and manage student excuse letters</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{pendingCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{approvedCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{rejectedCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Rejected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{mockLetters.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Letters</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Letters List */}
        <Card>
          <CardHeader>
            <CardTitle>Excuse Letters</CardTitle>
            <CardDescription>
              Showing {filteredLetters.length} of {mockLetters.length} letters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLetters.map((letter) => (
                <div
                  key={letter.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    letter.status === "approved"
                      ? "bg-green-50 border-green-200"
                      : letter.status === "rejected"
                      ? "bg-red-50 border-red-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{getStatusIcon(letter.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{letter.studentName}</h4>
                          <span className="text-xs text-muted-foreground">
                            ({letter.studentId})
                          </span>
                          {getStatusBadge(letter.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Reason:</span> {letter.reason}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>📅 Absent: {letter.dateAbsent}</span>
                          <span>📤 Submitted: {letter.submittedDate}</span>
                          <span>⏱️ {letter.daysAbsent} days</span>
                        </div>
                      </div>
                    </div>
                    {letter.status === "pending" && (
                      <div className="flex flex-col gap-2 min-w-[110px]">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {letter.status !== "pending" && (
                      <Button size="sm" variant="outline">
                        View Attachment
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeanExcuseLetters;
