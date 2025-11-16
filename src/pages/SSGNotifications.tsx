import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  MessageSquare,
  Users,
  Calendar,
  TrendingUp,
  Trash2,
  Archive,
  Filter,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  icon: React.ReactNode;
  timestamp: string;
  read: boolean;
  category: string;
}

const SSGNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Event Approved",
      message: "Your Leadership Seminar event has been approved and is now live.",
      type: "success",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      timestamp: "5 minutes ago",
      read: false,
      category: "Events",
    },
    {
      id: "2",
      title: "New Registration",
      message: "500+ students have registered for the Career Fair event.",
      type: "info",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      timestamp: "2 hours ago",
      read: false,
      category: "Registrations",
    },
    {
      id: "3",
      title: "Budget Alert",
      message: "You have used 78% of your monthly budget. ₱185,000 remaining.",
      type: "warning",
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      timestamp: "3 hours ago",
      read: true,
      category: "Budget",
    },
    {
      id: "4",
      title: "Attendance Report",
      message: "Monthly attendance report for November is ready. Average attendance: 89%",
      type: "info",
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      timestamp: "1 day ago",
      read: true,
      category: "Reports",
    },
    {
      id: "5",
      title: "Event Reminder",
      message: "Sports Fest Opening is happening tomorrow at 8:00 AM. Confirm final arrangements.",
      type: "info",
      icon: <Calendar className="w-5 h-5 text-teal-500" />,
      timestamp: "1 day ago",
      read: true,
      category: "Events",
    },
    {
      id: "6",
      title: "Member Joined",
      message: "12 new members have joined the SSG organization this week.",
      type: "success",
      icon: <Users className="w-5 h-5 text-green-500" />,
      timestamp: "2 days ago",
      read: true,
      category: "Members",
    },
    {
      id: "7",
      title: "Comment on Event",
      message: "John Doe commented on the Leadership Seminar: 'Great event, looking forward to it!'",
      type: "info",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      timestamp: "2 days ago",
      read: true,
      category: "Engagement",
    },
    {
      id: "8",
      title: "Low Attendance Warning",
      message: "Networking Breakfast had lower attendance than expected (72%). Consider follow-up.",
      type: "warning",
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      timestamp: "3 days ago",
      read: true,
      category: "Alerts",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [selectedNotifs, setSelectedNotifs] = useState<Set<string>>(new Set());

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.category === filter);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const categories = ["all", "unread", ...new Set(notifications.map((n) => n.category))];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "warning":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200";
      case "error":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
      case "info":
      default:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
    }
  };

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-teal-600 text-white">{unreadCount}</Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={filter === cat ? "default" : "outline"}
              onClick={() => setFilter(cat)}
              className="capitalize"
            >
              {cat === "all" && (
                <>
                  <Bell className="w-4 h-4 mr-2" />
                  All
                </>
              )}
              {cat === "unread" && (
                <>
                  <Info className="w-4 h-4 mr-2" />
                  Unread
                </>
              )}
              {cat !== "all" && cat !== "unread" && cat}
            </Button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.read
                    ? "border-l-4 border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20"
                    : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{notification.icon}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{notification.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 flex-shrink-0"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!notification.read && (
                              <DropdownMenuItem
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Mark as read
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Archive className="w-4 h-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteNotification(notification.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-sm text-muted-foreground">{notification.message}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-xs ${getTypeColor(notification.type)}`}>
                          {notification.type.charAt(0).toUpperCase() +
                            notification.type.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>

                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No notifications in this category</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You're all caught up!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Notifications</p>
                <p className="text-3xl font-bold">{notifications.length}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Read</p>
                <p className="text-3xl font-bold text-green-600">
                  {notifications.filter((n) => n.read).length}
                </p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    ((notifications.filter((n) => n.read).length / notifications.length) *
                      100) || 0
                  )}
                  % of total
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-3xl font-bold text-teal-600">{unreadCount}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(((unreadCount / notifications.length) * 100) || 0)}% of total
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SSGLayout>
  );
};

export default SSGNotifications;

