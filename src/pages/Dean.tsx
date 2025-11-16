import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { StatCard } from "@/components/Dashboard/StatCard";
import { DeanAttendanceChart, DeanDepartmentChart, StudentStatusChart } from "@/components/Dashboard/DeanOverview";
import { StudentFinesChart, FinesDistributionChart } from "@/components/Dashboard/StudentFinesTracking";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, TrendingUp, AlertTriangle, Home, Calendar, BarChart3, Download, DollarSign } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Dean = () => {
  const sidebar = (
    <nav className="p-4 space-y-2">
      <NavLink
        to="/dean"
        end
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Home className="w-5 h-5" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/dean/students"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Users className="w-5 h-5" />
        <span>Students</span>
      </NavLink>
      <NavLink
        to="/dean/excuse-letters"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <FileText className="w-5 h-5" />
        <span>Excuse Letters</span>
      </NavLink>
      <NavLink
        to="/dean/events"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Calendar className="w-5 h-5" />
        <span>Events</span>
      </NavLink>
      <NavLink
        to="/dean/fines"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <DollarSign className="w-5 h-5" />
        <span>Fines Management</span>
      </NavLink>
    </nav>
  );

  return (
    <DashboardLayout
      userName="Dr. Maria Santos"
      userRole="Dean - CBA"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dean Dashboard</h1>
            <p className="text-muted-foreground">College of Business and Accountancy</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Generate Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Students"
            value="420"
            icon={Users}
            variant="primary"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Avg Attendance"
            value="88%"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Pending Letters"
            value="12"
            icon={FileText}
            variant="warning"
          />
          <StatCard
            title="At-Risk Students"
            value="5"
            icon={AlertTriangle}
            variant="destructive"
          />
          <StatCard
            title="Total Fines"
            value="₱10.2K"
            icon={DollarSign}
            variant="warning"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <DeanAttendanceChart />
          <DeanDepartmentChart />
          <StudentStatusChart />
        </div>

        {/* Fines Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          <StudentFinesChart />
          <FinesDistributionChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dean;
