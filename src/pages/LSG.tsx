import { useState } from "react";
import { LSGLayout } from "../components/Layout/LSGLayout";
import {
  LSGScanningActivityChart,
  LSGAttendanceChart,
  LSGDepartmentChart,
  LSGSuccessRateChart,
  LSGTimeBreakdown,
} from "../components/Dashboard/LSGOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  QrCode,
  Users,
  Calendar,
  Activity,
  Clock,
  Download,
} from "lucide-react";

interface RecentScan {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  event: string;
  time: string;
  status: "success" | "duplicate" | "invalid";
}

interface EventStatus {
  id: string;
  name: string;
  time: string;
  scanned: number;
  expected: number;
  status: "live" | "upcoming" | "completed";
}

export default function LSG() {
  const [selectedEvent, setSelectedEvent] = useState("leadership");
  const [activeTab, setActiveTab] = useState("overview");

  const eventStats = [
    {
      label: "Today's Scans",
      value: "450",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      label: "Success Rate",
      value: "97.4%",
      icon: CheckCircle2,
      color: "text-teal-600",
      bgColor: "bg-teal-100 dark:bg-teal-900",
    },
    {
      label: "Events Active",
      value: "3",
      icon: Calendar,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      label: "Avg Response",
      value: "245ms",
      icon: Activity,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100 dark:bg-cyan-900",
    },
  ];

  const recentScans: RecentScan[] = [
    {
      id: "1",
      studentName: "Maria Santos",
      studentId: "2021-001",
      department: "CBA",
      event: "Leadership Seminar",
      time: "2:15 PM",
      status: "success",
    },
    {
      id: "2",
      studentName: "Juan Dela Cruz",
      studentId: "2022-045",
      department: "CECE",
      event: "Leadership Seminar",
      time: "2:13 PM",
      status: "success",
    },
    {
      id: "3",
      studentName: "Ana Garcia",
      studentId: "2021-078",
      department: "CTELAN",
      event: "Career Fair",
      time: "2:10 PM",
      status: "success",
    },
    {
      id: "4",
      studentName: "Pedro Reyes",
      studentId: "2021-089",
      department: "CNS",
      event: "Leadership Seminar",
      time: "2:08 PM",
      status: "duplicate",
    },
    {
      id: "5",
      studentName: "Rosa Cruz",
      studentId: "2022-120",
      department: "CBA",
      event: "Career Fair",
      time: "2:05 PM",
      status: "success",
    },
  ];

  const todayEvents: EventStatus[] = [
    {
      id: "1",
      name: "Leadership Seminar",
      time: "9:00 AM - 12:00 PM",
      scanned: 127,
      expected: 145,
      status: "live",
    },
    {
      id: "2",
      name: "Career Fair",
      time: "1:00 PM - 5:00 PM",
      scanned: 98,
      expected: 120,
      status: "live",
    },
    {
      id: "3",
      name: "Sports Festival",
      time: "6:00 PM - 8:00 PM",
      scanned: 0,
      expected: 200,
      status: "upcoming",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-500 hover:bg-red-600">Live</Badge>;
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
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

  return (
    <LSGLayout>
      <div className="space-y-8">
        {/* Header with Live Status */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              LSG Scanner Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Real-time attendance monitoring and analytics
            </p>
          </div>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Zap className="w-4 h-4" />
            Start Scanning
          </Button>
        </div>

        {/* Live Alert */}
        <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700 dark:text-green-300">
            <strong>2 events are currently active:</strong> Leadership Seminar
            (87% scanned) and Career Fair (82% scanned)
          </AlertDescription>
        </Alert>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Analytics Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Scanning Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Scanning Activity</CardTitle>
                <CardDescription>Real-time scan counts throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <LSGScanningActivityChart />
              </CardContent>
            </Card>

            {/* Success Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scan Success Rate</CardTitle>
                  <CardDescription>Distribution of scan results</CardDescription>
                </CardHeader>
                <CardContent>
                  <LSGSuccessRateChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>Scans by time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <LSGTimeBreakdown />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {/* Events List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Events
                </CardTitle>
                <CardDescription>Attendance status for all events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {event.name}
                        </h3>
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Expected: {event.expected} students
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {event.scanned}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {Math.round((event.scanned / event.expected) * 100)}%
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Attendance Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Comparison</CardTitle>
                <CardDescription>Scanned vs Expected attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <LSGAttendanceChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Department Participation */}
            <Card>
              <CardHeader>
                <CardTitle>Department Participation</CardTitle>
                <CardDescription>Attendance by department</CardDescription>
              </CardHeader>
              <CardContent>
                <LSGDepartmentChart />
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Scanner Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">93%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    ↑ 2% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    Participation Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-teal-600">87%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    {450} of {520} students
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    Avg Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-emerald-600">245ms</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    ↓ 15ms from avg
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Scans */}
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <div>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>Last 5 scanned attendees</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {scan.studentName}
                    </p>
                    <div className="flex gap-3 mt-1 text-xs text-slate-600 dark:text-slate-400">
                      <span>ID: {scan.studentId}</span>
                      <span>•</span>
                      <span>{scan.department}</span>
                      <span>•</span>
                      <span>{scan.event}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {scan.time}
                    </span>
                    <Badge
                      className={getScanStatusColor(scan.status)}
                      variant={scan.status === "success" ? "default" : "secondary"}
                    >
                      {scan.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LSGLayout>
  );
}
