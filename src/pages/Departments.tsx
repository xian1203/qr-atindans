import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { NavLink } from "@/components/NavLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Home,
  Settings,
  BarChart3,
  Activity,
  Download,
  Plus,
  Edit,
  Trash2,
  Users,
  GraduationCap,
  Building2,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Department {
  id: string;
  name: string;
  code: string;
  dean: string;
  email: string;
  phone: string;
  students: number;
  staff: number;
  building: string;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'College of Business Administration',
    code: 'CBA',
    dean: 'Dr. John Smith',
    email: 'cba@university.edu',
    phone: '+1 (555) 123-4567',
    students: 420,
    staff: 24,
    building: 'Building A',
  },
  {
    id: '2',
    name: 'College of Engineering & Computing',
    code: 'CECE',
    dean: 'Dr. Jane Doe',
    email: 'cece@university.edu',
    phone: '+1 (555) 234-5678',
    students: 385,
    staff: 28,
    building: 'Building B',
  },
  {
    id: '3',
    name: 'College of Tourism, Education & Lifelong Learning',
    code: 'CTELAN',
    dean: 'Dr. Michael Brown',
    email: 'ctelan@university.edu',
    phone: '+1 (555) 345-6789',
    students: 345,
    staff: 18,
    building: 'Building C',
  },
];

const Departments = () => {
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
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Departments</h1>
            <p className="text-muted-foreground">Manage university departments and their information</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="gradient-primary text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {mockDepartments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2">{dept.code}</Badge>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-muted-foreground">Dean:</span>
                    <span>{dept.dean}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {dept.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {dept.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {dept.building}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-success/5 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Students</p>
                    <p className="text-2xl font-bold text-success">{dept.students}</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Staff</p>
                    <p className="text-2xl font-bold text-primary">{dept.staff}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Department Table */}
        <Card>
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>Overview of all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Dean</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDepartments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-bold">{dept.code}</TableCell>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.dean}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-success/10 text-success">
                          {dept.students}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {dept.staff}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{dept.students + dept.staff}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Department
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Department
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Departments;
