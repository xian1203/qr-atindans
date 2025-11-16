import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { StatCard } from "@/components/Dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  Building2, 
  UserPlus, 
  Home, 
  Settings,
  BarChart3,
  Activity,
  Download,
  Filter,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { UserTrendChart, DepartmentPieChart, AttendanceChart } from "@/components/Dashboard/OverviewCharts";

const SuperAdmin = () => {
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

  return (
    <DashboardLayout
      userName="Admin User"
      userRole="Super Admin"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="gradient-primary text-white border-0">
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value="1,284"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Active Students"
            value="1,150"
            icon={GraduationCap}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Staff Members"
            value="134"
            icon={Users}
            trend={{ value: 2, isPositive: true }}
            variant="default"
          />
          <StatCard
            title="Departments"
            value="3"
            icon={Building2}
            trend={{ value: 0, isPositive: true }}
            variant="default"
          />
        </div>

        {/* Charts Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analytics</h2>
          <div className="grid gap-6">
            <UserTrendChart />
            <div className="grid gap-6 lg:grid-cols-2">
              <DepartmentPieChart />
              <AttendanceChart />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdmin;
