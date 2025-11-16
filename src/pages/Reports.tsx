import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Settings,
  BarChart3,
  Activity,
  Download,
  Plus,
  TrendingUp,
  Users,
  GraduationCap,
  Building2,
  Calendar,
  FileText,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { date: 'Mon', attendance: 92, expected: 95 },
  { date: 'Tue', attendance: 88, expected: 95 },
  { date: 'Wed', attendance: 95, expected: 95 },
  { date: 'Thu', attendance: 89, expected: 95 },
  { date: 'Fri', attendance: 91, expected: 95 },
];

const departmentData = [
  { name: 'CBA', attendance: 88, absent: 12 },
  { name: 'CECE', attendance: 92, absent: 8 },
  { name: 'CTELAN', attendance: 85, absent: 15 },
];

interface Report {
  id: string;
  name: string;
  type: 'Attendance' | 'User' | 'Department' | 'System';
  generatedDate: string;
  generatedBy: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Weekly Attendance Report',
    type: 'Attendance',
    generatedDate: '2024-11-15',
    generatedBy: 'System',
    size: '2.4 MB',
    status: 'completed',
  },
  {
    id: '2',
    name: 'User Activity Summary',
    type: 'User',
    generatedDate: '2024-11-14',
    generatedBy: 'Admin User',
    size: '1.8 MB',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Department Statistics',
    type: 'Department',
    generatedDate: '2024-11-13',
    generatedBy: 'System',
    size: '3.2 MB',
    status: 'completed',
  },
  {
    id: '4',
    name: 'System Performance Report',
    type: 'System',
    generatedDate: '2024-11-15',
    generatedBy: 'System',
    size: '1.5 MB',
    status: 'processing',
  },
];

const Reports = () => {
  const sidebar = (
    <nav className="p-4 space-y-2">
      <NavLink
        to="/super-admin"
        end
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Home className="w-5 h-5" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/super-admin/users"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Users className="w-5 h-5" />
        <span>Manage Users</span>
      </NavLink>
      <NavLink
        to="/super-admin/departments"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Building2 className="w-5 h-5" />
        <span>Departments</span>
      </NavLink>
      <NavLink
        to="/super-admin/settings"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </NavLink>
      <div className="pt-4 mt-4 border-t border-border">
        <p className="text-xs uppercase font-semibold text-muted-foreground px-4 mb-3">Analytics</p>
        <NavLink
          to="/super-admin/reports"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          activeClassName="bg-primary text-primary-foreground hover:bg-primary"
        >
          <BarChart3 className="w-5 h-5" />
          <span>Reports</span>
        </NavLink>
        <NavLink
          to="/super-admin/activity"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          activeClassName="bg-primary text-primary-foreground hover:bg-primary"
        >
          <Activity className="w-5 h-5" />
          <span>Activity Log</span>
        </NavLink>
      </div>
    </nav>
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Attendance':
        return 'bg-success/10 text-success';
      case 'User':
        return 'bg-primary/10 text-primary';
      case 'Department':
        return 'bg-blue-500/10 text-blue-500';
      case 'System':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <DashboardLayout
      userName="Admin User"
      userRole="Super Admin"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Generate and view system reports</p>
          </div>
          <Button className="gradient-primary text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Average</p>
                      <p className="text-3xl font-bold mt-2">91%</p>
                      <p className="text-xs text-muted-foreground mt-1">Attendance Rate</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Reports</p>
                      <p className="text-3xl font-bold mt-2">48</p>
                      <p className="text-xs text-muted-foreground mt-1">This Month</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">System Uptime</p>
                      <p className="text-3xl font-bold mt-2 text-success">99.8%</p>
                      <p className="text-xs text-muted-foreground mt-1">Last 30 Days</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-success opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Attendance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Trend</CardTitle>
                <CardDescription>Attendance rate vs expected attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="expected" stroke="#e5e7eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Attendance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Department Attendance Comparison</CardTitle>
                <CardDescription>Attendance vs Absences by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="attendance" fill="#10b981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
                <CardDescription>Detailed attendance statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Total Students</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                        <TableHead>Late</TableHead>
                        <TableHead>Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentData.map((dept) => (
                        <TableRow key={dept.name}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.attendance + dept.absent}</TableCell>
                          <TableCell>
                            <Badge className="bg-success/10 text-success">{dept.attendance}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-destructive/10 text-destructive">{dept.absent}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-warning/10 text-warning">2</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {Math.round((dept.attendance / (dept.attendance + dept.absent)) * 100)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>Recently generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>By</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(report.type)}>
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {report.generatedDate}
                          </TableCell>
                          <TableCell>{report.generatedBy}</TableCell>
                          <TableCell>{report.size}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
