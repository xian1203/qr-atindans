import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Search, Clock, MapPin, Eye } from "lucide-react";
import { StudentLayout } from "@/components/Layout/StudentLayout";
import { useState } from "react";

interface AttendanceRecord {
  id: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  status: "attended" | "missed" | "excused";
  scanTime?: string;
  eventType: "mandatory" | "optional";
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    eventName: "Leadership Seminar",
    date: "Dec 10, 2024",
    time: "2:00 PM",
    venue: "Main Auditorium",
    status: "attended",
    scanTime: "2:05 PM",
    eventType: "mandatory",
  },
  {
    id: "2",
    eventName: "Career Fair",
    date: "Dec 8, 2024",
    time: "9:00 AM",
    venue: "Gymnasium",
    status: "attended",
    scanTime: "9:15 AM",
    eventType: "optional",
  },
  {
    id: "3",
    eventName: "Sports Day",
    date: "Dec 5, 2024",
    time: "8:00 AM",
    venue: "Sports Complex",
    status: "missed",
    eventType: "mandatory",
  },
  {
    id: "4",
    eventName: "Business Competition",
    date: "Dec 1, 2024",
    time: "1:00 PM",
    venue: "Conference Hall",
    status: "attended",
    scanTime: "1:10 PM",
    eventType: "optional",
  },
  {
    id: "5",
    eventName: "Midterm Exam Hall",
    date: "Nov 28, 2024",
    time: "10:00 AM",
    venue: "Testing Center",
    status: "attended",
    scanTime: "9:50 AM",
    eventType: "mandatory",
  },
  {
    id: "6",
    eventName: "Orientation Session",
    date: "Nov 25, 2024",
    time: "11:00 AM",
    venue: "Main Hall",
    status: "excused",
    eventType: "mandatory",
  },
  {
    id: "7",
    eventName: "Seminar Workshop",
    date: "Nov 20, 2024",
    time: "3:00 PM",
    venue: "Conference Room",
    status: "attended",
    scanTime: "3:05 PM",
    eventType: "optional",
  },
  {
    id: "8",
    eventName: "Exam Review Session",
    date: "Nov 18, 2024",
    time: "2:00 PM",
    venue: "Classroom 101",
    status: "missed",
    eventType: "optional",
  },
];

const StudentAttendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const filteredRecords = mockAttendanceRecords.filter((record) => {
    const matchesSearch = record.eventName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    attended: mockAttendanceRecords.filter((r) => r.status === "attended").length,
    missed: mockAttendanceRecords.filter((r) => r.status === "missed").length,
    excused: mockAttendanceRecords.filter((r) => r.status === "excused").length,
    total: mockAttendanceRecords.length,
  };

  const attendanceRate = Math.round(
    ((stats.attended + stats.excused) / stats.total) * 100
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attended":
        return "bg-green-100 text-green-800";
      case "missed":
        return "bg-red-100 text-red-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "attended":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "missed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "excused":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <StudentLayout userName="Juan Dela Cruz">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance History</h1>
          <p className="text-muted-foreground">View your complete attendance records</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.attended}</div>
                <p className="text-sm text-muted-foreground mt-1">Events Attended</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{stats.missed}</div>
                <p className="text-sm text-muted-foreground mt-1">Events Missed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.excused}</div>
                <p className="text-sm text-muted-foreground mt-1">Excused Absences</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{attendanceRate}%</div>
                <p className="text-sm text-muted-foreground mt-1">Attendance Rate</p>
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
                  placeholder="Search by event name..."
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
                  <option value="attended">Attended</option>
                  <option value="missed">Missed</option>
                  <option value="excused">Excused</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              Showing {filteredRecords.length} of {mockAttendanceRecords.length} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.eventName}</TableCell>
                      <TableCell className="text-muted-foreground">{record.date}</TableCell>
                      <TableCell>{record.time}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{record.venue}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.eventType === "mandatory" ? "destructive" : "secondary"
                          }
                        >
                          {record.eventType === "mandatory" ? "Mandatory" : "Optional"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                        >
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

        {/* Details Modal */}
        {selectedRecord && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedRecord.status)}
                  <div>
                    <CardTitle>{selectedRecord.eventName}</CardTitle>
                    <CardDescription>{selectedRecord.date}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedRecord(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Details Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Date & Time</p>
                  <p className="font-semibold">{selectedRecord.date} at {selectedRecord.time}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Venue</p>
                  <div className="flex items-center gap-2 font-semibold">
                    <MapPin className="w-4 h-4" />
                    {selectedRecord.venue}
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Event Type</p>
                  <Badge
                    variant={
                      selectedRecord.eventType === "mandatory" ? "destructive" : "secondary"
                    }
                  >
                    {selectedRecord.eventType === "mandatory" ? "Mandatory" : "Optional"}
                  </Badge>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Attendance Status</p>
                  <Badge className={getStatusColor(selectedRecord.status)}>
                    {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Additional Info */}
              {selectedRecord.status === "attended" && selectedRecord.scanTime && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>✓ Scan Confirmed:</strong> You scanned your QR code at {selectedRecord.scanTime}
                  </p>
                </div>
              )}

              {selectedRecord.status === "missed" && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>✗ Absence Recorded:</strong> You did not attend this event. A fine may apply.
                  </p>
                </div>
              )}

              {selectedRecord.status === "excused" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>✓ Excused:</strong> Your absence has been excused with proper documentation.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentAttendance;
