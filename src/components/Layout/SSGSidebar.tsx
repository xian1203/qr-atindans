import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  Calendar,
  BarChart3,
  Users,
  LogOut,
  Settings,
  Bell,
  Megaphone,
  Award,
} from "lucide-react";

interface SSGSidebarProps {
  onLogout?: () => void;
}

export const SSGSidebar = ({ onLogout }: SSGSidebarProps) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/ssg") {
      return location.pathname === "/ssg";
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
      path: "/ssg",
      badge: null,
      description: "Overview & analytics",
    },
    {
      icon: Calendar,
      label: "Events",
      path: "/ssg/events",
      badge: "8",
      badgeVariant: "default",
      description: "Manage events",
    },
    {
      icon: BarChart3,
      label: "Reports",
      path: "/ssg/reports",
      badge: null,
      description: "Analytics & reports",
    },
    {
      icon: Users,
      label: "Members",
      path: "/ssg/members",
      badge: "24",
      badgeVariant: "secondary",
      description: "SSG members",
    },
    {
      icon: Megaphone,
      label: "Announcements",
      path: "/ssg/announcements",
      badge: "3",
      badgeVariant: "warning",
      description: "Notifications",
    },
  ];

  const secondaryMenuItems = [
    {
      icon: Award,
      label: "Achievements",
      path: "/ssg/achievements",
      description: "Awards & recognition",
    },
    {
      icon: Bell,
      label: "Notifications",
      path: "/ssg/notifications",
      description: "Important updates",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
            SP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">SSG Portal</p>
            <p className="text-xs text-muted-foreground truncate">Officer</p>
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
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-slate-800"
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
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-transparent group-hover:bg-teal-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-teal-300 dark:via-slate-700 to-transparent" />

        {/* Quick Actions */}
        <p className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Access
        </p>

        {secondaryMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                active
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-slate-800"
              )}
              title={item.description}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left text-sm font-medium truncate">{item.label}</span>
              {!active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-transparent group-hover:bg-teal-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-2">
        <Link to="/ssg/settings">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-slate-700 dark:text-slate-300"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
        </Link>
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
