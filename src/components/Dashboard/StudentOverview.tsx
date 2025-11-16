import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Attendance Trend Data
const attendanceTrendData = [
  { month: "Aug", attended: 8, missed: 2, rate: "80%" },
  { month: "Sep", attended: 10, missed: 1, rate: "91%" },
  { month: "Oct", attended: 11, missed: 1, rate: "92%" },
  { month: "Nov", attended: 9, missed: 2, rate: "82%" },
  { month: "Dec", attended: 12, missed: 0, rate: "100%" },
];

// Monthly Statistics
const monthlyStatsData = [
  { name: "Attended", value: 50 },
  { name: "Missed", value: 6 },
];

const COLORS_MONTHLY = ["#10b981", "#ef4444"];

export const StudentAttendanceChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={attendanceTrendData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs text-muted-foreground" />
          <YAxis className="text-xs text-muted-foreground" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#1f2937", 
              border: "1px solid #374151",
              borderRadius: "8px" 
            }}
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="attended" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Events Attended"
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="missed" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Events Missed"
            dot={{ fill: "#ef4444", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StudentAttendanceRate = () => {
  return (
    <div className="w-full h-64 flex justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={monthlyStatsData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {monthlyStatsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS_MONTHLY[index]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#1f2937", 
              border: "1px solid #374151",
              borderRadius: "8px" 
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StudentMonthlyBreakdown = () => {
  const breakdownData = [
    { category: "Mandatory Attended", value: 35, fill: "#3b82f6" },
    { category: "Optional Attended", value: 15, fill: "#10b981" },
    { category: "Mandatory Missed", value: 4, fill: "#ef4444" },
    { category: "Optional Missed", value: 2, fill: "#f59e0b" },
  ];

  return (
    <div className="space-y-4">
      {breakdownData.map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-sm font-medium">{item.category}</span>
          </div>
          <span className="font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
};
