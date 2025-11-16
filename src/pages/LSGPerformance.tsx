import { LSGLayout } from "../components/Layout/LSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
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
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react";

const performanceData = [
  { week: "Week 1", efficiency: 85, accuracy: 96 },
  { week: "Week 2", efficiency: 88, accuracy: 97 },
  { week: "Week 3", efficiency: 92, accuracy: 98 },
  { week: "Week 4", efficiency: 95, accuracy: 99 },
];

const responseTimeData = [
  { event: "Leadership", avg: 240, target: 300, achieved: true },
  { event: "Career Fair", avg: 255, target: 300, achieved: true },
  { event: "Sports Fest", avg: 220, target: 300, achieved: true },
  { event: "Workshop", avg: 265, target: 300, achieved: true },
];

const goalMetrics = [
  {
    name: "Scanner Efficiency",
    current: 95,
    target: 90,
    status: "achieved",
    icon: Zap,
  },
  {
    name: "Accuracy Rate",
    current: 99,
    target: 98,
    status: "achieved",
    icon: CheckCircle2,
  },
  {
    name: "Response Time",
    current: 245,
    target: 300,
    status: "achieved",
    icon: Clock,
    unit: "ms",
  },
  {
    name: "Participation Rate",
    current: 87,
    target: 85,
    status: "achieved",
    icon: TrendingUp,
    unit: "%",
  },
];

export default function LSGPerformance() {
  return (
    <LSGLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Performance Metrics
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Scanner performance and goal tracking
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goalMetrics.map((metric) => {
              const Icon = metric.icon;
              const isAchieved = metric.current >= metric.target;
              return (
                <Card key={metric.name}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {metric.name}
                          </p>
                          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                            {metric.current}
                            {metric.unit && <span className="text-lg">{metric.unit}</span>}
                          </p>
                        </div>
                        <div
                          className={`p-2 rounded-lg ${
                            isAchieved
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-orange-100 dark:bg-orange-900"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isAchieved ? "text-green-600" : "text-orange-600"
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            Target: {metric.target}
                            {metric.unit}
                          </span>
                          <Badge
                            className={`${
                              isAchieved
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-orange-600 hover:bg-orange-700"
                            }`}
                          >
                            {isAchieved ? "Achieved" : "In Progress"}
                          </Badge>
                        </div>
                        <Progress
                          value={Math.min((metric.current / metric.target) * 100, 100)}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Efficiency and accuracy improvements over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#16a34a"
                  strokeWidth={2}
                  name="Efficiency %"
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#0d9488"
                  strokeWidth={2}
                  name="Accuracy %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Performance</CardTitle>
            <CardDescription>Average response time by event vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responseTimeData.map((item) => (
                <div
                  key={item.event}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {item.event}
                    </h4>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Current: <span className="font-medium">{item.avg}ms</span>
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Target: <span className="font-medium">{item.target}ms</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Exceeded
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Event Performance Comparison</CardTitle>
            <CardDescription>Performance metrics across different events</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    event: "Leadership",
                    attendance: 87,
                    efficiency: 95,
                    satisfaction: 92,
                  },
                  {
                    event: "Career Fair",
                    attendance: 82,
                    efficiency: 93,
                    satisfaction: 88,
                  },
                  {
                    event: "Sports Fest",
                    attendance: 0,
                    efficiency: 0,
                    satisfaction: 0,
                  },
                  {
                    event: "Workshop",
                    attendance: 96,
                    efficiency: 98,
                    satisfaction: 95,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" fill="#16a34a" name="Attendance %" />
                <Bar dataKey="efficiency" fill="#0d9488" name="Efficiency %" />
                <Bar dataKey="satisfaction" fill="#14b8a6" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Goals Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Goals & Benchmarks
            </CardTitle>
            <CardDescription>Quarterly performance targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Q1 2024 Goals
                  </h4>
                  <Badge className="bg-green-600 hover:bg-green-700">On Track</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Achieve 90% scanner efficiency
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        95% ✓
                      </span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Maintain 98% accuracy rate
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        99% ✓
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Reduce response time to 250ms
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        245ms ✓
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Increase participation to 85%
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        87% ✓
                      </span>
                    </div>
                    <Progress value={102} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                  Q2 2024 Targets
                </h4>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>
                    • Achieve 97% scanner efficiency (from current 95%)
                  </p>
                  <p>
                    • Maintain 99% accuracy rate with zero critical failures
                  </p>
                  <p>
                    • Improve response time to 230ms (from current 245ms)
                  </p>
                  <p>
                    • Increase participation rate to 90% (from current 87%)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gold/10">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Perfect Accuracy
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Maintained 99% accuracy for 4 consecutive weeks
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Efficiency Champion
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Scanner efficiency increased by 10% month-over-month
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Speed Record
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Achieved fastest response time of 220ms
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-teal-100 dark:bg-teal-900">
                    <CheckCircle2 className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Consistency Medal
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Maintained performance above targets for 12 weeks
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LSGLayout>
  );
}
