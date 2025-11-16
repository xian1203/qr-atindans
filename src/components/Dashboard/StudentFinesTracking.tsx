import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AlertCircle, DollarSign, TrendingDown } from "lucide-react";
import { useState } from "react";

// Student Fines Data
const finesData = [
  { student: "John Smith", absences: 8, finesAmount: 2400, status: "pending" },
  { student: "Lisa Brown", absences: 6, finesAmount: 1800, status: "pending" },
  { student: "Mark Lee", absences: 5, finesAmount: 1500, status: "paid" },
  { student: "Sarah Wilson", absences: 4, finesAmount: 1200, status: "pending" },
  { student: "Michael Chen", absences: 9, finesAmount: 2700, status: "partial" },
];

const finesTrendData = [
  { week: "Week 1", fines: 2400, collected: 1200 },
  { week: "Week 2", fines: 3200, collected: 1800 },
  { week: "Week 3", fines: 2800, collected: 1600 },
  { week: "Week 4", fines: 3600, collected: 2400 },
  { week: "Week 5", fines: 3100, collected: 2100 },
  { week: "Week 6", fines: 3400, collected: 2200 },
];

const finesDistributionData = [
  { name: "Pending", value: 7100, color: "#f59e0b" },
  { name: "Partial", value: 2700, color: "#3b82f6" },
  { name: "Paid", value: 1500, color: "#10b981" },
];

export const StudentFinesChart = () => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <CardTitle>Student Fines Trend</CardTitle>
      <CardDescription>Weekly fines issued vs collected</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={finesTrendData}>
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
            dataKey="fines" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            name="Fines Issued"
          />
          <Line 
            type="monotone" 
            dataKey="collected" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            name="Fines Collected"
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const FinesDistributionChart = () => (
  <Card className="col-span-full lg:col-span-1">
    <CardHeader>
      <CardTitle>Fines Status Distribution</CardTitle>
      <CardDescription>Current fines payment status</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={finesDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ₱${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {finesDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₱${value}`} />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const TopFinesBreakdown = () => {
  const [selectedStudent, setSelectedStudent] = useState<typeof finesData[0] | null>(null);

  return (
    <>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Top Students with Fines</CardTitle>
          <CardDescription>Students with highest fines due to missed events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {finesData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold truncate">{record.student}</p>
                    <Badge 
                      className={
                        record.status === "paid" 
                          ? "bg-green-600 hover:bg-green-700" 
                          : record.status === "partial"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-amber-600 hover:bg-amber-700"
                      }
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {record.absences} missed events
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-red-600">₱{record.finesAmount.toLocaleString()}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-1"
                    onClick={() => setSelectedStudent(record)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Details Side Panel */}
      {selectedStudent && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSelectedStudent(null)}
          />
          
          {/* Side Panel */}
          <div className="fixed right-0 top-0 h-screen w-full md:w-1/2 bg-background border-l border-border z-50 shadow-lg flex flex-col">
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Header */}
              <div className="flex items-center justify-between sticky top-0 bg-background pb-4 border-b border-border -mx-6 px-6">
                <div>
                  <h2 className="text-2xl font-bold">Fine Details</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedStudent.student} (2022-1001)</p>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-full hover:bg-muted p-2 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedStudent && (
                <div className="space-y-4">
                  {/* Summary Cards - 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-border bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Total Fines</p>
                      <p className="text-xl font-bold text-red-600">₱{selectedStudent.finesAmount.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Amount Paid</p>
                      <p className="text-xl font-bold text-green-600">₱{selectedStudent.status === "paid" ? selectedStudent.finesAmount : selectedStudent.status === "partial" ? (selectedStudent.finesAmount * 0.5) : 0}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Balance Due</p>
                      <p className="text-xl font-bold text-amber-600">₱{selectedStudent.status === "paid" ? 0 : selectedStudent.status === "partial" ? (selectedStudent.finesAmount * 0.5) : selectedStudent.finesAmount}</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1 uppercase font-semibold">Status</p>
                      <Badge 
                        className={
                          selectedStudent.status === "paid" 
                            ? "bg-green-600 hover:bg-green-700" 
                            : selectedStudent.status === "partial"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-red-600 hover:bg-red-700"
                        }
                      >
                        {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  {/* Events Missed */}
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Events Missed ({selectedStudent.absences})</h3>
                    <div className="grid grid-cols-2 gap-1 max-h-[200px] overflow-y-auto pr-2">
                      {[
                        "Midterm Exams",
                        "Sports Day",
                        "Exam Review",
                        "Welcome Assembly",
                        "Leadership Seminar",
                        "Career Fair",
                        "Orientation",
                        "Induction"
                      ].slice(0, selectedStudent.absences).map((event, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded border border-border text-xs">
                          <span>{event}</span>
                          <span className="font-semibold text-muted-foreground">-₱300</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg border border-border text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Fine per Event</p>
                      <p className="font-semibold">₱300</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Last Updated</p>
                      <p className="font-semibold">Dec 10, 2024</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Action Buttons at Bottom */}
            <div className="border-t border-border p-6 bg-background shrink-0">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
                <Button className="flex-1 gradient-primary text-white border-0">
                  Send Reminder
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
