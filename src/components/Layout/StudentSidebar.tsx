import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  QrCode,
  Calendar,
  FileText,
  DollarSign,
  ChevronDown,
  BookOpen,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

interface StudentSidebarProps {
  onLogout?: () => void;
}

export const StudentSidebar = ({ onLogout }: StudentSidebarProps) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/student") {
      return location.pathname === "/student";
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    if (onLogout) onLogout();
    window.location.href = "/";
  };

  const mainMenuItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/student",
      badge: null,
      description: "Overview & quick stats",
    },
    {
      icon: QrCode,
      label: "My QR Code",
      path: "/student/qr-code",
      badge: null,
      description: "Attendance QR code",
    },
    {
      icon: Calendar,
      label: "Attendance",
      path: "/student/attendance",
      badge: "2",
      badgeVariant: "warning",
      description: "View attendance records",
    },
    {
      icon: FileText,
      label: "Excuse Letters",
      path: "/student/excuse-letters",
      badge: "1",
      badgeVariant: "secondary",
      description: "Manage absences",
    },
    {
      icon: DollarSign,
      label: "My Fines",
      path: "/student/fines",
      badge: "2",
      badgeVariant: "destructive",
      description: "Track payment status",
    },
  ];

  const secondaryMenuItems = [
    {
      icon: BookOpen,
      label: "Academic Calendar",
      path: "#",
      description: "Important dates",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "#",
      description: "Event reminders",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
            JC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Juan Dela Cruz</p>
            <p className="text-xs text-muted-foreground truncate">2024-CBA-00123</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Main
        </p>

        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
              title={item.description}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
              {item.badge && (
                <Badge
                  variant={item.badgeVariant as any}
                  className="ml-auto text-xs font-semibold"
                >
                  {item.badge}
                </Badge>
              )}
              {!active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-transparent group-hover:bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />

        {/* Quick Actions */}
        <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Access
        </p>

        {secondaryMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={cn(
                "group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
              title={item.description}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-transparent group-hover:bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          );
        })}

        {/* Alert Card */}
        <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <div className="flex gap-2">
            <div className="text-amber-600 dark:text-amber-400 text-lg flex-shrink-0">⚠️</div>
            <div>
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">
                Pending Fines
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                ₱600 due • 2 items
              </p>
              <Link
                to="/student/fines"
                className="inline-block mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline"
              >
                Pay Now →
              </Link>
            </div>
          </div>
        </div>

        {/* Achievement Card */}
        <div className="mt-4 p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-900/50 rounded-lg">
          <div className="flex gap-2">
            <div className="text-2xl flex-shrink-0">🏆</div>
            <div>
              <p className="text-xs font-semibold text-green-900 dark:text-green-100">
                Great Attendance!
              </p>
              <p className="text-xs text-green-800 dark:text-green-200 mt-1">
                92% attendance rate • Keep it up!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-slate-700 dark:text-slate-300"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};
