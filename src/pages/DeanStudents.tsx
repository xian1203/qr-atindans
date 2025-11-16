import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, Home, FileText, Calendar, Search, MoreVertical } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  studentId: string;
  year: string;
  program: string;
  email: string;
  attendance: number;
  absences: number;
  status: "active" | "inactive" | "suspended";
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    studentId: "2022-1001",
    year: "4th Year",
    program: "BS Accountancy",
    email: "juan.delacruz@college.edu",
    attendance: 92,
    absences: 2,
    status: "active",
  },
  {
    id: "2",
    name: "Maria Garcia",
    studentId: "2022-1002",
    year: "3rd Year",
    program: "BS Business Administration",
    email: "maria.garcia@college.edu",
    attendance: 88,
    absences: 4,
    status: "active",
  },
  {
    id: "3",
    name: "Pedro Reyes",
    studentId: "2022-1003",
    year: "2nd Year",
    program: "BS Accountancy",
    email: "pedro.reyes@college.edu",
    attendance: 95,
    absences: 1,
    status: "active",
  },
  {
    id: "4",
    name: "Anna Santos",
    studentId: "2022-1004",
    year: "1st Year",
    program: "BS Business Administration",
    email: "anna.santos@college.edu",
    attendance: 78,
    absences: 6,
    status: "active",
  },
  {
    id: "5",
    name: "Robert Cruz",
    studentId: "2022-1005",
    year: "3rd Year",
    program: "BS Accountancy",
    email: "robert.cruz@college.edu",
    attendance: 65,
    absences: 12,
    status: "suspended",
  },
  {
    id: "6",
    name: "Angela Lee",
    studentId: "2022-1006",
    year: "2nd Year",
    program: "BS Business Administration",
    email: "angela.lee@college.edu",
    attendance: 91,
    absences: 2,
    status: "active",
  },
  {
    id: "7",
    name: "Michael Brown",
    studentId: "2022-1007",
    year: "4th Year",
    program: "BS Accountancy",
    email: "michael.brown@college.edu",
    attendance: 89,
    absences: 3,
    status: "active",
  },
  {
    id: "8",
    name: "Sarah Wilson",
    studentId: "2022-1008",
    year: "1st Year",
    program: "BS Business Administration",
    email: "sarah.wilson@college.edu",
    attendance: 86,
    absences: 4,
    status: "active",
  },
];

const DeanStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState("all");

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

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery);
    const matchesYear = filterYear === "all" || student.year === filterYear;
    return matchesSearch && matchesYear;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          <h1 className="text-3xl font-bold">Students Management</h1>
          <p className="text-muted-foreground">Manage department students and their records</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{mockStudents.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Students</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {mockStudents.filter((s) => s.status === "active").length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {mockStudents.filter((s) => s.status === "suspended").length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Suspended</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {Math.round(
                    mockStudents.reduce((acc, s) => acc + s.attendance, 0) /
                      mockStudents.length
                  )}
                  %
                </div>
                <p className="text-sm text-muted-foreground mt-1">Avg Attendance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or student ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="all">All Years</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
            <CardDescription>
              Showing {filteredStudents.length} of {mockStudents.length} students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Absences</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-muted-foreground">{student.studentId}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">{student.attendance}%</span>
                      </TableCell>
                      <TableCell>
                        <span className={student.absences > 5 ? "text-red-600 font-semibold" : ""}>
                          {student.absences}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Attendance</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Suspend Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeanStudents;
