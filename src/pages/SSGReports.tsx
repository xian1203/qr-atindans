import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SSGEventTrendsChart,
  SSGDepartmentChart,
  SSGCategoryChart,
  SSGStatusBreakdown,
} from "@/components/Dashboard/SSGOverview";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const SSGReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("semester");

  const reportStats = [
    {
      title: "Total Attendance",
      value: "3,240",
      icon: Users,
      trend: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Event Success Rate",
      value: "94%",
      icon: TrendingUp,
      trend: "+5%",
      color: "text-green-600",
    },
    {
      title: "Department Participation",
      value: "12",
      icon: BarChart3,
      trend: "All active",
      color: "text-teal-600",
    },
    {
      title: "Budget Utilization",
      value: "78%",
      icon: AlertCircle,
      trend: "₱185,000",
      color: "text-purple-600",
    },
  ];

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground">Comprehensive event and performance analytics</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Period Selector */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="text-sm font-medium">Select Period:</div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="customPeriod">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reportStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </h3>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Event Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Event Growth Trend</CardTitle>
              <CardDescription>Events and attendance progression</CardDescription>
            </CardHeader>
            <CardContent>
              <SSGEventTrendsChart />
            </CardContent>
          </Card>

          {/* Department Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Department Analysis</CardTitle>
              <CardDescription>Participation by department</CardDescription>
            </CardHeader>
            <CardContent>
              <SSGDepartmentChart />
            </CardContent>
          </Card>

          {/* Event Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Event Categories Distribution</CardTitle>
              <CardDescription>Breakdown of event types</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SSGCategoryChart />
            </CardContent>
          </Card>

          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Event Status Overview</CardTitle>
              <CardDescription>All events by current status</CardDescription>
            </CardHeader>
            <CardContent>
              <SSGStatusBreakdown />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tables */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Events */}
          <Card>
            <CardHeader>
              <CardTitle>Top Events by Attendance</CardTitle>
              <CardDescription>Most attended events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Sports Fest Opening", attendance: 389, rate: "97%" },
                  { rank: 2, name: "Leadership Seminar", attendance: 245, rate: "89%" },
                  { rank: 3, name: "Career Fair", attendance: 156, rate: "85%" },
                  { rank: 4, name: "Tech Symposium", attendance: 120, rate: "78%" },
                  { rank: 5, name: "Networking Breakfast", attendance: 85, rate: "92%" },
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-semibold text-sm">
                        {item.rank}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.attendance} attendees</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.rate}</p>
                      <p className="text-xs text-muted-foreground">attendance</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Average attendance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { dept: "CBA", avgAttendance: 89, trend: "↑ 5%" },
                  { dept: "CECE", avgAttendance: 85, trend: "↑ 3%" },
                  { dept: "CTELAN", avgAttendance: 82, trend: "↓ 2%" },
                  { dept: "CNS", avgAttendance: 88, trend: "↑ 7%" },
                  { dept: "COE", avgAttendance: 86, trend: "→ 0%" },
                ].map((item) => (
                  <div key={item.dept}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium">{item.dept}</p>
                        <p className="text-xs text-muted-foreground">Average attendance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{item.avgAttendance}%</p>
                        <p className="text-xs text-muted-foreground">{item.trend}</p>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-teal-600"
                        style={{ width: `${item.avgAttendance}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Key metrics for the current semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Month</th>
                    <th className="text-center py-3 px-4 font-medium">Events</th>
                    <th className="text-center py-3 px-4 font-medium">Attendees</th>
                    <th className="text-center py-3 px-4 font-medium">Avg Rate</th>
                    <th className="text-center py-3 px-4 font-medium">Budget Used</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      month: "September",
                      events: 5,
                      attendees: 380,
                      rate: "82%",
                      budget: "₱45,000",
                    },
                    {
                      month: "October",
                      events: 8,
                      attendees: 520,
                      rate: "86%",
                      budget: "₱62,000",
                    },
                    {
                      month: "November",
                      events: 12,
                      attendees: 680,
                      rate: "89%",
                      budget: "₱78,000",
                    },
                    {
                      month: "December",
                      events: 15,
                      attendees: 820,
                      rate: "92%",
                      budget: "₱95,000",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{row.month}</td>
                      <td className="text-center py-3 px-4">{row.events}</td>
                      <td className="text-center py-3 px-4">{row.attendees}</td>
                      <td className="text-center py-3 px-4">
                        <span className="font-semibold text-green-600">{row.rate}</span>
                      </td>
                      <td className="text-center py-3 px-4">{row.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </SSGLayout>
  );
};

export default SSGReports;

