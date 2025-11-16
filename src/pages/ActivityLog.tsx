import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Home,
  Settings,
  BarChart3,
  Activity,
  Download,
  Filter,
  Search,
  Users,
  GraduationCap,
  Building2,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
} from "lucide-react";

interface ActivityLog {
  id: string;
  user: string;
  email: string;
  action: string;
  type: 'login' | 'create' | 'update' | 'delete' | 'export' | 'error';
  timestamp: string;
  ip: string;
  details: string;
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    user: 'Admin User',
    email: 'admin@university.edu',
    action: 'Created new user',
    type: 'create',
    timestamp: '2024-11-15 10:45:32',
    ip: '192.168.1.100',
    details: 'Created student account for John Doe',
  },
  {
    id: '2',
    user: 'Sarah Williams',
    email: 'sarah@university.edu',
    action: 'Logged in',
    type: 'login',
    timestamp: '2024-11-15 10:32:15',
    ip: '192.168.1.105',
    details: 'Successful login from web browser',
  },
  {
    id: '3',
    user: 'Admin User',
    email: 'admin@university.edu',
    action: 'Updated department settings',
    type: 'update',
    timestamp: '2024-11-15 10:15:08',
    ip: '192.168.1.100',
    details: 'Updated CECE department information',
  },
  {
    id: '4',
    user: 'Jane Smith',
    email: 'jane@university.edu',
    action: 'Exported user report',
    type: 'export',
    timestamp: '2024-11-15 09:58:42',
    ip: '192.168.1.110',
    details: 'Exported users list to CSV',
  },
  {
    id: '5',
    user: 'System',
    email: 'system@university.edu',
    action: 'Database backup completed',
    type: 'update',
    timestamp: '2024-11-15 02:00:00',
    ip: '127.0.0.1',
    details: 'Automated daily backup completed successfully',
  },
  {
    id: '6',
    user: 'Admin User',
    email: 'admin@university.edu',
    action: 'Deleted user account',
    type: 'delete',
    timestamp: '2024-11-14 16:30:21',
    ip: '192.168.1.100',
    details: 'Deleted inactive student account',
  },
  {
    id: '7',
    user: 'Unknown',
    email: 'unknown@email.com',
    action: 'Failed login attempt',
    type: 'error',
    timestamp: '2024-11-14 15:45:10',
    ip: '203.0.113.45',
    details: 'Invalid credentials - 3rd attempt',
  },
  {
    id: '8',
    user: 'Mike Johnson',
    email: 'mike@university.edu',
    action: 'Logged in',
    type: 'login',
    timestamp: '2024-11-14 14:20:35',
    ip: '192.168.1.115',
    details: 'Successful login from mobile app',
  },
];

const ActivityLog = () => {
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

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'create':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'update':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-destructive" />;
      case 'export':
        return <Download className="w-4 h-4 text-primary" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'login':
        return 'bg-success/10 text-success';
      case 'create':
        return 'bg-primary/10 text-primary';
      case 'update':
        return 'bg-warning/10 text-warning';
      case 'delete':
        return 'bg-destructive/10 text-destructive';
      case 'export':
        return 'bg-blue-500/10 text-blue-500';
      case 'error':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const activityStats = [
    {
      label: 'Total Activities',
      value: '1,284',
      color: 'text-primary',
      icon: Activity,
    },
    {
      label: 'Login Attempts',
      value: '342',
      color: 'text-success',
      icon: CheckCircle,
    },
    {
      label: 'Failed Logins',
      value: '8',
      color: 'text-destructive',
      icon: AlertCircle,
    },
    {
      label: 'Data Changes',
      value: '156',
      color: 'text-warning',
      icon: Clock,
    },
  ];

  return (
    <DashboardLayout
      userName="Admin User"
      userRole="Super Admin"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Activity Log</h1>
            <p className="text-muted-foreground">Monitor all system activities and user actions</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>

        {/* Activity Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {activityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Activity Log Search */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Monitor all system activities in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, action, or IP address..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-3">
              {mockActivityLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium truncate">{log.user}</p>
                        <p className="text-sm text-muted-foreground">{log.email}</p>
                        <p className="text-sm mt-1">{log.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <Badge className={getTypeColor(log.type)}>
                          {log.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {log.timestamp}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.ip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Security Alerts
            </CardTitle>
            <CardDescription>Recent security events and warnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Multiple Failed Login Attempts</p>
                <p className="text-xs text-muted-foreground mt-1">
                  IP 203.0.113.45 attempted login 3 times with invalid credentials
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-lg border border-warning/20 bg-warning/5">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Unusual Access Pattern</p>
                <p className="text-xs text-muted-foreground mt-1">
                  User accessed system at unusual time from new location
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-lg border border-success/20 bg-success/5">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Backup Completed Successfully</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Daily automated backup completed at 2:00 AM with 2.4 GB backed up
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActivityLog;
