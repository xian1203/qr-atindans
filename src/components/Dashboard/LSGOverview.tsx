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

// Scanning Activity Over Time
const scanningData = [
  { time: "8:00", scans: 0 },
  { time: "9:00", scans: 45 },
  { time: "10:00", scans: 78 },
  { time: "11:00", scans: 92 },
  { time: "12:00", scans: 110 },
  { time: "1:00", scans: 127 },
  { time: "2:00", scans: 145 },
];

export const LSGScanningActivityChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={scanningData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="scans"
        stroke="#16a34a"
        strokeWidth={2}
        name="Scans"
      />
    </LineChart>
  </ResponsiveContainer>
);

// Event Attendance Comparison
const attendanceData = [
  { event: "Leadership", scanned: 127, expected: 145, color: "#16a34a" },
  { event: "Career Fair", scanned: 98, expected: 120, color: "#0d9488" },
  { event: "Sports Fest", scanned: 0, expected: 200, color: "#14b8a6" },
];

export const LSGAttendanceChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={attendanceData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="event" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="scanned" fill="#16a34a" name="Scanned" />
      <Bar dataKey="expected" fill="#d1fae5" name="Expected" />
    </BarChart>
  </ResponsiveContainer>
);

// Department Participation
const departmentData = [
  { dept: "CBA", participation: 145, color: "#16a34a" },
  { dept: "CECE", participation: 120, color: "#0d9488" },
  { dept: "CTELAN", participation: 98, color: "#14b8a6" },
  { dept: "CNS", participation: 87, color: "#06b6d4" },
];

export const LSGDepartmentChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={departmentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dept" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="participation" fill="#16a34a" />
    </BarChart>
  </ResponsiveContainer>
);

// Scan Success Rate Distribution
const successData = [
  { name: "Successful", value: 450, color: "#16a34a" },
  { name: "Duplicates", value: 12, color: "#facc15" },
  { name: "Invalid", value: 3, color: "#ef4444" },
];

export const LSGSuccessRateChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={successData}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {successData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

// Time Distribution Breakdown
const timeData = [
  { period: "Early (8-10)", count: 45, color: "#16a34a" },
  { period: "Morning (10-12)", count: 170, color: "#0d9488" },
  { period: "Afternoon (12-2)", count: 220, color: "#14b8a6" },
  { period: "Late (2+)", count: 15, color: "#06b6d4" },
];

export const LSGTimeBreakdown = () => (
  <div className="space-y-4">
    {timeData.map((item) => (
      <div key={item.period} className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm font-medium">{item.period}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${(item.count / 220) * 100}%`,
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
