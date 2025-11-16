import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Home, FileText, Users, Calendar, DollarSign, Search, Eye } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

interface StudentFine {
  id: string;
  studentName: string;
  studentId: string;
  missedEvents: number;
  finePerEvent: number;
  totalFines: number;
  amountPaid: number;
  balance: number;
  status: "pending" | "partial" | "paid";
  lastUpdated: string;
  eventsMissed: string[];
}

const mockStudentFines: StudentFine[] = [
  {
    id: "1",
    studentName: "John Smith",
    studentId: "2022-1001",
    missedEvents: 8,
    finePerEvent: 300,
    totalFines: 2400,
    amountPaid: 0,
    balance: 2400,
    status: "pending",
    lastUpdated: "Dec 10, 2024",
    eventsMissed: ["Midterm Exams", "Leadership Seminar", "Sports Day", "Career Fair", "Exam Review", "Orientation", "Welcome Assembly", "Induction"],
  },
  {
    id: "2",
    studentName: "Lisa Brown",
    studentId: "2022-1002",
    missedEvents: 6,
    finePerEvent: 300,
    totalFines: 1800,
    amountPaid: 400,
    balance: 1400,
    status: "partial",
    lastUpdated: "Dec 9, 2024",
    eventsMissed: ["Business Competition", "Sports Day", "Seminar", "Workshop", "Assembly", "Fair"],
  },
  {
    id: "3",
    studentName: "Mark Lee",
    studentId: "2022-1003",
    missedEvents: 5,
    finePerEvent: 300,
    totalFines: 1500,
    amountPaid: 1500,
    balance: 0,
    status: "paid",
    lastUpdated: "Dec 5, 2024",
    eventsMissed: ["Career Fair", "Sports Day", "Seminar", "Workshop", "Assembly"],
  },
  {
    id: "4",
    studentName: "Sarah Wilson",
    studentId: "2022-1004",
    missedEvents: 4,
    finePerEvent: 300,
    totalFines: 1200,
    amountPaid: 600,
    balance: 600,
    status: "partial",
    lastUpdated: "Dec 8, 2024",
    eventsMissed: ["Midterm Exams", "Sports Day", "Seminar", "Workshop"],
  },
  {
    id: "5",
    studentName: "Michael Chen",
    studentId: "2022-1005",
    missedEvents: 9,
    finePerEvent: 300,
    totalFines: 2700,
    amountPaid: 0,
    balance: 2700,
    status: "pending",
    lastUpdated: "Dec 11, 2024",
    eventsMissed: ["Career Fair", "Sports Day", "Seminar", "Workshop", "Assembly", "Exam", "Review", "Training", "Conference"],
  },
  {
    id: "6",
    studentName: "Angela Lee",
    studentId: "2022-1006",
    missedEvents: 2,
    finePerEvent: 300,
    totalFines: 600,
    amountPaid: 600,
    balance: 0,
    status: "paid",
    lastUpdated: "Dec 7, 2024",
    eventsMissed: ["Sports Day", "Seminar"],
  },
];

const DeanFinesManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedFine, setSelectedFine] = useState<StudentFine | null>(null);

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
      <NavLink
        to="/dean/fines"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <DollarSign className="w-5 h-5" />
        <span>Fines Tracking</span>
      </NavLink>
    </nav>
  );

  const filteredFines = mockStudentFines.filter((fine) => {
    const matchesSearch =
      fine.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.studentId.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || fine.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalFines = mockStudentFines.reduce((sum, f) => sum + f.totalFines, 0);
  const totalCollected = mockStudentFines.reduce((sum, f) => sum + f.amountPaid, 0);
  const totalPending = totalFines - totalCollected;
  const pendingCount = mockStudentFines.filter((f) => f.status === "pending").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "partial":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBalanceColor = (balance: number) => {
    if (balance === 0) return "text-green-600";
    if (balance > 2000) return "text-red-600";
    return "text-amber-600";
  };

  return (
    <DashboardLayout
      userName="Dr. Maria Santos"
      userRole="Dean - CBA"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Fines Tracking</h1>
          <p className="text-muted-foreground">View student fines from missed events (Read-only)</p>
        </div>

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
                <div className="text-3xl font-bold text-green-600">₱{totalCollected.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">Collected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">₱{totalPending.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Students Pending</p>
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
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fines Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Fines List</CardTitle>
            <CardDescription>
              Showing {filteredFines.length} of {mockStudentFines.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Missed Events</TableHead>
                    <TableHead>Total Fines</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell className="font-medium">{fine.studentName}</TableCell>
                      <TableCell className="text-muted-foreground">{fine.studentId}</TableCell>
                      <TableCell>
                        <span className="font-semibold">{fine.missedEvents}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-red-600">₱{fine.totalFines.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">₱{fine.amountPaid.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getBalanceColor(fine.balance)}`}>
                          ₱{fine.balance.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(fine.status)}>
                          {fine.status.charAt(0).toUpperCase() + fine.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedFine(fine)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Details Modal/Card */}
        {selectedFine && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fine Details</CardTitle>
                  <CardDescription>{selectedFine.studentName} ({selectedFine.studentId})</CardDescription>
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
              {/* Summary Grid */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Total Fines</p>
                  <p className="text-2xl font-bold text-red-600">₱{selectedFine.totalFines.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
                  <p className="text-2xl font-bold text-green-600">₱{selectedFine.amountPaid.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Balance Due</p>
                  <p className="text-2xl font-bold text-amber-600">₱{selectedFine.balance.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge className={getStatusColor(selectedFine.status)} style={{marginTop: "8px"}}>
                    {selectedFine.status.charAt(0).toUpperCase() + selectedFine.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Missed Events */}
              <div>
                <h4 className="font-semibold mb-3">Events Missed ({selectedFine.missedEvents})</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {selectedFine.eventsMissed.map((event, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted/50 rounded-lg border border-border flex items-center justify-between"
                    >
                      <span className="text-sm">{event}</span>
                      <span className="text-xs text-muted-foreground font-semibold">-₱{selectedFine.finePerEvent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Fine per Event</p>
                  <p className="text-lg font-semibold">₱{selectedFine.finePerEvent}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-semibold">{selectedFine.lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DeanFinesManagement;
