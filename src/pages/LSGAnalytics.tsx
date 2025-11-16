import { useState } from "react";
import { LSGLayout } from "../components/Layout/LSGLayout";
import {
  LSGScanningActivityChart,
  LSGDepartmentChart,
  LSGSuccessRateChart,
  LSGTimeBreakdown,
} from "../components/Dashboard/LSGOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";

const weeklyData = [
  { day: "Mon", scans: 250, students: 220 },
  { day: "Tue", scans: 310, students: 280 },
  { day: "Wed", scans: 290, students: 265 },
  { day: "Thu", scans: 380, students: 340 },
  { day: "Fri", scans: 420, students: 380 },
  { day: "Sat", scans: 180, students: 150 },
  { day: "Sun", scans: 120, students: 100 },
];

const departmentComparisonData = [
  { department: "CBA", attendance: 380, target: 400 },
  { department: "CECE", attendance: 320, target: 350 },
  { department: "CTELAN", attendance: 290, target: 300 },
  { department: "CNS", attendance: 340, target: 360 },
];

const monthlyData = [
  { month: "Week 1", scans: 1850 },
  { month: "Week 2", scans: 2100 },
  { month: "Week 3", scans: 1950 },
  { month: "Week 4", scans: 2350 },
];

export default function LSGAnalytics() {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("attendance");

  return (
    <LSGLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Detailed scanning and attendance analytics
            </p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Time Range Selector */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-900 dark:text-white">
                Time Range:
              </label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Scans (Week)
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">2,050</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12% vs last week</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Avg Daily Scans
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">293</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+8% from average</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Unique Students
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">1,830</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingDown className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-600">-3% from target</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Success Rate
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">97.4%</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+2.1% improvement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
              <CardDescription>Scans and unique students by day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="#16a34a"
                    strokeWidth={2}
                    name="Total Scans"
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#0d9488"
                    strokeWidth={2}
                    name="Unique Students"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Attendance vs target by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#16a34a" name="Actual" />
                  <Bar dataKey="target" fill="#d1fae5" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scan Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Scanning Activity</CardTitle>
              <CardDescription>Real-time scan counts throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <LSGScanningActivityChart />
            </CardContent>
          </Card>

          {/* Success Rate Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Success Distribution</CardTitle>
              <CardDescription>Breakdown of scan results</CardDescription>
            </CardHeader>
            <CardContent>
              <LSGSuccessRateChart />
            </CardContent>
          </Card>
        </div>

        {/* Department & Time Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Participation</CardTitle>
              <CardDescription>Attendance distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <LSGDepartmentChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Period Distribution</CardTitle>
              <CardDescription>Scans by time of day</CardDescription>
            </CardHeader>
            <CardContent>
              <LSGTimeBreakdown />
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Weekly scan totals for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scans" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Analytics summary and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Improvement Trend
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Attendance rates have improved by 12% compared to last week. Friday shows
                  the highest engagement with 420 scans.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Peak Hours Analysis
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Morning sessions (10 AM - 12 PM) record the highest attendance with 170
                  scans. Consider scheduling important events during this time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Department Alert
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  CTELAN department is 3% below attendance target. Consider outreach
                  initiatives to boost participation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LSGLayout>
  );
}
