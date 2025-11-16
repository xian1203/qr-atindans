import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, XCircle, DollarSign, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StudentAttendanceChart, StudentAttendanceRate } from "@/components/Dashboard/StudentOverview";
import { StudentLayout } from "@/components/Layout/StudentLayout";

const Student = () => {
  return (
    <StudentLayout userName="Juan Dela Cruz">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your attendance and manage your academic records</p>
        </div>

        {/* Alert Banner */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              You have 2 pending fines
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Total: ₱600 | <Button variant="link" className="p-0 h-auto text-amber-800 dark:text-amber-200 underline">View Details</Button>
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Attendance Rate"
            value="92%"
            icon={CheckCircle2}
            trend={{ value: 5, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Events Attended"
            value="50"
            icon={Calendar}
            variant="primary"
          />
          <StatCard
            title="Pending Fines"
            value="₱600"
            icon={DollarSign}
            variant="warning"
          />
          <StatCard
            title="Absences"
            value="2"
            icon={XCircle}
            variant="destructive"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Attendance Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Your monthly attendance pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendanceChart />
            </CardContent>
          </Card>

          {/* Attendance Rate Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Statistics</CardTitle>
              <CardDescription>This semester</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentAttendanceRate />
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span>Attended</span>
                  <Badge className="bg-green-100 text-green-800">50</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span>Missed</span>
                  <Badge className="bg-red-100 text-red-800">6</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events you need to attend</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { 
                  name: "Leadership Seminar", 
                  date: "Dec 15, 2024", 
                  time: "2:00 PM", 
                  venue: "Main Auditorium",
                  mandatory: true,
                  daysLeft: 5
                },
                { 
                  name: "Career Fair", 
                  date: "Dec 18, 2024", 
                  time: "9:00 AM", 
                  venue: "Gymnasium",
                  mandatory: false,
                  daysLeft: 8
                },
                { 
                  name: "Sports Fest Opening", 
                  date: "Dec 20, 2024", 
                  time: "8:00 AM", 
                  venue: "Sports Complex",
                  mandatory: true,
                  daysLeft: 10
                },
              ].map((event, i) => (
                <div key={i} className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{event.venue}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={event.mandatory ? "destructive" : "secondary"} className="text-xs">
                        {event.mandatory ? "Mandatory" : "Optional"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{event.daysLeft}d away</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardContent>
          </Card>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Submit Excuse Letter</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">View Detailed Report</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Full Attendance History</span>
          </Button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Student;
