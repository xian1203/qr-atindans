import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Attendance Trend Data
const attendanceData = [
  { week: "Week 1", attendance: 92, target: 85 },
  { week: "Week 2", attendance: 88, target: 85 },
  { week: "Week 3", attendance: 91, target: 85 },
  { week: "Week 4", attendance: 87, target: 85 },
  { week: "Week 5", attendance: 94, target: 85 },
  { week: "Week 6", attendance: 89, target: 85 },
];

// Department Performance Data
const departmentData = [
  { dept: "1st Year", students: 120, attendance: 90 },
  { dept: "2nd Year", students: 110, attendance: 88 },
  { dept: "3rd Year", students: 95, attendance: 92 },
  { dept: "4th Year", students: 95, attendance: 85 },
];

// Student Status Distribution
const studentStatusData = [
  { name: "Present", value: 380, color: "#10b981" },
  { name: "Absent", value: 35, color: "#ef4444" },
  { name: "Late", value: 25, color: "#f59e0b" },
];

export const DeanAttendanceChart = () => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <CardTitle>Weekly Attendance Trend</CardTitle>
      <CardDescription>Department attendance rate vs target</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="week" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--card)", 
              border: "1px solid var(--border)" 
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="attendance" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const DeanDepartmentChart = () => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <CardTitle>Class Year Performance</CardTitle>
      <CardDescription>Attendance rate by class year</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="dept" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--card)", 
              border: "1px solid var(--border)" 
            }}
          />
          <Legend />
          <Bar dataKey="attendance" fill="#8b5cf6" name="Attendance %" />
          <Bar dataKey="students" fill="#06b6d4" name="Students" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const StudentStatusChart = () => (
  <Card className="col-span-full lg:col-span-1">
    <CardHeader>
      <CardTitle>Student Status Today</CardTitle>
      <CardDescription>Current attendance status</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={studentStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {studentStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
