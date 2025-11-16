import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Event Trends Chart
const eventTrendsData = [
  { month: "Sep", events: 5, attendance: 380 },
  { month: "Oct", events: 8, attendance: 520 },
  { month: "Nov", events: 12, attendance: 680 },
  { month: "Dec", events: 15, attendance: 820 },
];

export const SSGEventTrendsChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={eventTrendsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="events"
        stroke="#14b8a6"
        strokeWidth={2}
        name="Events"
      />
      <Line
        type="monotone"
        dataKey="attendance"
        stroke="#0d9488"
        strokeWidth={2}
        name="Attendance"
      />
    </LineChart>
  </ResponsiveContainer>
);

// Department Participation Chart
const departmentData = [
  { dept: "CBA", participation: 245, color: "#14b8a6" },
  { dept: "CECE", participation: 198, color: "#0d9488" },
  { dept: "CTELAN", participation: 176, color: "#06b6d4" },
  { dept: "CNS", participation: 142, color: "#059669" },
];

export const SSGDepartmentChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={departmentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dept" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="participation" fill="#14b8a6" />
    </BarChart>
  </ResponsiveContainer>
);

// Event Category Distribution
const categoryData = [
  { name: "Educational", value: 35, color: "#14b8a6" },
  { name: "Sports", value: 28, color: "#0d9488" },
  { name: "Cultural", value: 22, color: "#06b6d4" },
  { name: "Social", value: 15, color: "#059669" },
];

export const SSGCategoryChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={categoryData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}%`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

// Event Status Breakdown
const statusData = [
  { status: "Completed", count: 28, color: "#10b981" },
  { status: "Ongoing", count: 8, color: "#14b8a6" },
  { status: "Upcoming", count: 12, color: "#3b82f6" },
  { status: "Cancelled", count: 2, color: "#6b7280" },
];

export const SSGStatusBreakdown = () => (
  <div className="space-y-4">
    {statusData.map((item) => (
      <div key={item.status} className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm font-medium">{item.status}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${(item.count / 50) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
          <span className="text-sm font-semibold text-right min-w-12">{item.count}</span>
        </div>
      </div>
    ))}
  </div>
);
