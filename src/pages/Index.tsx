import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, GraduationCap, Users, Scan, UserCog } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const departments = [
    { value: "cba", label: "College of Business and Accountancy" },
    { value: "cece", label:"College of Engineering and Computer Education" },
    { value: "cte", label: "College of Teacher Education, Liberal Arts, and Nursing" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      if ((role === "dean" || role === "lsg") && !department) {
        return; // Prevent login if dean or lsg but no department selected
      }
      navigate(`/${role}`);
    }
  };

  const roles = [
    { value: "super-admin", label: "Super Admin", icon: Shield },
    { value: "dean", label: "Dean", icon: GraduationCap },
    { value: "student", label: "Student", icon: Users },
    { value: "ssg", label: "SSG Officer", icon: UserCog },
    { value: "lsg", label: "LSG Officer", icon: Scan },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-block rounded-2xl shadow-glow overflow-hidden">
            <img src="/ndkc.png" alt="NDKC Logo" className="w-32 h-32" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-slate-900 dark:text-white">QR Attendance</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Modern attendance management system for educational institutions
            </p>
            <p className="text-sm text-muted-foreground mt-2 italic">
              Growing together with faith, excellence, and integrity
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select value={role} onValueChange={(value) => {
                  setRole(value);
                  setDepartment(""); // Reset department when role changes
                }}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        <div className="flex items-center gap-2">
                          <r.icon className="w-4 h-4" />
                          {r.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {role === "dean" || role === "lsg" ? (
                <div className="space-y-2">
                  <Label htmlFor="department">Select Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Choose your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@school.edu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-primary text-white border-0"
                size="lg"
                disabled={!role || ((role === "dean" || role === "lsg") && !department)}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
