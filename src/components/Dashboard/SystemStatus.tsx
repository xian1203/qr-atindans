import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface SystemStatusItem {
  name: string;
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  uptime: string;
  lastChecked: string;
}

interface SystemStatusProps {
  items?: SystemStatusItem[];
}

export const SystemStatus = ({ items = defaultStatus }: SystemStatusProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'maintenance':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Current system health and services</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">Uptime: {item.uptime}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className={`${getStatusBadgeStyle(item.status)} border mb-1`}>
                {item.status}
              </Badge>
              <p className="text-xs text-muted-foreground">{item.lastChecked}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const defaultStatus: SystemStatusItem[] = [
  {
    name: 'Main Database',
    status: 'operational',
    uptime: '99.9%',
    lastChecked: '2 min ago',
  },
  {
    name: 'Authentication Service',
    status: 'operational',
    uptime: '99.95%',
    lastChecked: '1 min ago',
  },
  {
    name: 'API Server',
    status: 'operational',
    uptime: '99.8%',
    lastChecked: '30 sec ago',
  },
  {
    name: 'Email Service',
    status: 'warning',
    uptime: '98.5%',
    lastChecked: '5 min ago',
  },
];

export const QuickStats = () => {
  const stats = [
    { label: 'System Uptime', value: '99.89%', icon: TrendingUp, color: 'text-success' },
    { label: 'Active Sessions', value: '234', icon: null, color: 'text-primary' },
    { label: 'Failed Logins (24h)', value: '8', icon: null, color: 'text-warning' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              {stat.icon && <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
