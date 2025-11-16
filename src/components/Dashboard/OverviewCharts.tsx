import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const userTrendData = [
  { month: 'Jan', users: 400, students: 350, staff: 50 },
  { month: 'Feb', users: 500, students: 420, staff: 80 },
  { month: 'Mar', users: 650, students: 580, staff: 70 },
  { month: 'Apr', users: 800, students: 700, staff: 100 },
  { month: 'May', users: 950, students: 830, staff: 120 },
  { month: 'Jun', users: 1150, students: 1000, staff: 150 },
];

const departmentData = [
  { name: 'CBA', value: 420, color: '#3b82f6' },
  { name: 'CECE', value: 385, color: '#8b5cf6' },
  { name: 'CTELAN', value: 345, color: '#10b981' },
];

const attendanceData = [
  { day: 'Mon', attendance: 92, target: 95 },
  { day: 'Tue', attendance: 88, target: 95 },
  { day: 'Wed', attendance: 95, target: 95 },
  { day: 'Thu', attendance: 89, target: 95 },
  { day: 'Fri', attendance: 91, target: 95 },
];

export const UserTrendChart = () => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <CardTitle>User Growth Trend</CardTitle>
      <CardDescription>Monthly user registration and growth</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userTrendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="staff" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const DepartmentPieChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Department Distribution</CardTitle>
      <CardDescription>User distribution by department</CardDescription>
    </CardHeader>
    <CardContent className="flex justify-center">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={departmentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {departmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const AttendanceChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Weekly Attendance</CardTitle>
      <CardDescription>Attendance rate vs target</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Bar dataKey="attendance" fill="#10b981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
