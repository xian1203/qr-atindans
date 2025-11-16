import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SSGLayout } from "@/components/Layout/SSGLayout";
import {
  SSGEventTrendsChart,
  SSGDepartmentChart,
  SSGCategoryChart,
  SSGStatusBreakdown,
} from "@/components/Dashboard/SSGOverview";
import {
  Calendar,
  Users,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  Zap,
  AlertCircle,
  Eye,
  Edit,
} from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  dept: string;
  registered: number;
  status: "ongoing" | "upcoming" | "completed";
  category: "educational" | "sports" | "cultural" | "social";
}

const mockUpcomingEvents: Event[] = [
  {
    id: "1",
    name: "Leadership Seminar",
    date: "Dec 15, 2024",
    dept: "All Departments",
    registered: 245,
    status: "upcoming",
    category: "educational",
  },
  {
    id: "2",
    name: "Career Fair",
    date: "Dec 18, 2024",
    dept: "CBA & CECE",
    registered: 156,
    status: "upcoming",
    category: "educational",
  },
  {
    id: "3",
    name: "Sports Fest Opening",
    date: "Dec 20, 2024",
    dept: "All Departments",
    registered: 389,
    status: "upcoming",
    category: "sports",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "ongoing":
      return <Zap className="w-4 h-4 text-teal-500" />;
    case "upcoming":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "completed":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200";
    case "upcoming":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SSG = () => {
  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">SSG Dashboard</h1>
            <p className="text-muted-foreground">
              Event management, analytics & member coordination
            </p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        {/* Alert Banner */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 dark:text-amber-100">
              3 events need attention
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              Leadership Seminar starts in 2 days • Update attendance forms for Career Fair
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Events"
            value="48"
            icon={Calendar}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Active Events"
            value="8"
            icon={Zap}
            trend={{ value: 3, isPositive: true }}
            variant="warning"
          />
          <StatCard
            title="Total Participants"
            value="3,240"
            icon={Users}
            trend={{ value: 24, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Avg Attendance Rate"
            value="89%"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            variant="primary"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Event Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Event Trends</CardTitle>
              <CardDescription>Events and attendance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <SSGEventTrendsChart />
            </CardContent>
          </Card>

          {/* Department Participation */}
          <Card>
            <CardHeader>
              <CardTitle>Department Participation</CardTitle>
              <CardDescription>Participants by department</CardDescription>
            </CardHeader>
            <CardContent>
              <SSGDepartmentChart />
            </CardContent>
          </Card>

          {/* Event Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Event Categories</CardTitle>
              <CardDescription>Distribution of event types</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SSGCategoryChart />
            </CardContent>
          </Card>

          {/* Event Status */}
          <Card>
            <CardHeader>
              <CardTitle>Event Status Overview</CardTitle>
              <CardDescription>Current state of all events</CardDescription>
            </CardHeader>
            <CardContent>
              <SSGStatusBreakdown />
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events & Top Performers */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Events */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next scheduled events</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{event.name}</h4>
                          {getStatusIcon(event.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.dept}</p>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">{event.date}</span>
                      <span className="font-medium text-teal-600">
                        👥 {event.registered} registered
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Members Active</p>
                <p className="text-3xl font-bold">24</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-teal-500"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Pending Approvals</p>
                <p className="text-3xl font-bold">5</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Budget Utilization</p>
                <p className="text-3xl font-bold">78%</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Contributions & Recent Activities */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Most active SSG members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Maria Garcia", role: "VP", events: 12, avatar: "MG" },
                  { name: "Juan Reyes", role: "Treasurer", events: 10, avatar: "JR" },
                  { name: "Ana Santos", role: "Secretary", events: 9, avatar: "AS" },
                  { name: "Carlos Diaz", role: "Officer", events: 8, avatar: "CD" },
                  { name: "Rosa Lopez", role: "Officer", events: 7, avatar: "RL" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{member.events} events</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "event_created",
                    message: "New event created: Technology Summit",
                    time: "2 hours ago",
                    icon: "📅",
                  },
                  {
                    type: "attendance",
                    message: "Attendance recorded for Career Fair",
                    time: "4 hours ago",
                    icon: "✅",
                  },
                  {
                    type: "member_joined",
                    message: "New member joined: Pedro Castillo",
                    time: "1 day ago",
                    icon: "👤",
                  },
                  {
                    type: "budget",
                    message: "Budget request approved for Event supplies",
                    time: "2 days ago",
                    icon: "💰",
                  },
                  {
                    type: "announcement",
                    message: "Important: Semester planning meeting scheduled",
                    time: "3 days ago",
                    icon: "📢",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0">
                    <div className="text-xl flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SSGLayout>
  );
};

export default SSG;

