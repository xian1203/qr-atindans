import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  Scan,
  Calendar,
  BarChart3,
  LogOut,
  Settings,
  TrendingUp,
} from "lucide-react";

interface LSGSidebarProps {
  onLogout?: () => void;
}

export const LSGSidebar = ({ onLogout }: LSGSidebarProps) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/lsg") {
      return location.pathname === "/lsg";
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
      path: "/lsg",
      badge: null,
      description: "Overview & monitoring",
    },
    {
      icon: Scan,
      label: "QR Scanner",
      path: "/lsg/scanner",
      badge: "Live",
      badgeVariant: "destructive",
      description: "Scan attendance",
    },
    {
      icon: Calendar,
      label: "Events",
      path: "/lsg/events",
      badge: "3",
      badgeVariant: "default",
      description: "Manage events",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/lsg/analytics",
      badge: null,
      description: "Reports & data",
    },
    {
      icon: TrendingUp,
      label: "Performance",
      path: "/lsg/performance",
      badge: "93%",
      badgeVariant: "secondary",
      description: "Metrics & goals",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
            LO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">LSG Officer</p>
            <p className="text-xs text-muted-foreground truncate">CBA Department</p>
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
                  ? "bg-green-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-slate-800"
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
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-transparent group-hover:bg-green-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
              )}
            </Link>
          );
        })}


      </div>

      {/* Footer */}
      <div className="border-t border-border p-3 space-y-2">
        <Link
          to="/lsg/settings"
          className={cn(
            "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            isActive("/lsg/settings")
              ? "bg-green-600 text-white shadow-md"
              : "text-slate-700 dark:text-slate-300 hover:bg-green-100 dark:hover:bg-slate-800"
          )}
        >
          <Settings className="w-4 h-4" />
          <span className="flex-1 text-sm font-medium">Settings</span>
          {!isActive("/lsg/settings") && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-transparent group-hover:bg-green-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all" />
          )}
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
