import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, TrendingDown, Mail } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StudentAtRisk {
  id: string;
  name: string;
  studentId: string;
  absences: number;
  attendance: number;
  fines: string;
  lastAbsent: string;
  riskLevel: "high" | "medium" | "low";
  reason?: string;
}

const mockStudentsAtRisk: StudentAtRisk[] = [
  {
    id: "1",
    name: "John Smith",
    studentId: "2022-1001",
    absences: 12,
    attendance: 65,
    fines: "₱2,400",
    lastAbsent: "Dec 10, 2024",
    riskLevel: "high",
    reason: "Financial Difficulties",
  },
  {
    id: "2",
    name: "Lisa Brown",
    studentId: "2022-1002",
    absences: 8,
    attendance: 78,
    fines: "₱1,600",
    lastAbsent: "Dec 8, 2024",
    riskLevel: "high",
    reason: "Health Issues",
  },
  {
    id: "3",
    name: "Mark Lee",
    studentId: "2022-1003",
    absences: 5,
    attendance: 85,
    fines: "₱1,000",
    lastAbsent: "Dec 3, 2024",
    riskLevel: "medium",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    studentId: "2022-1004",
    absences: 4,
    attendance: 88,
    fines: "₱800",
    lastAbsent: "Nov 28, 2024",
    riskLevel: "low",
  },
  {
    id: "5",
    name: "Michael Chen",
    studentId: "2022-1005",
    absences: 9,
    attendance: 75,
    fines: "₱1,800",
    lastAbsent: "Dec 9, 2024",
    riskLevel: "high",
    reason: "Work Commitments",
  },
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-red-50 border-red-200";
    case "medium":
      return "bg-amber-50 border-amber-200";
    default:
      return "bg-blue-50 border-blue-200";
  }
};

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case "high":
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    case "medium":
      return <AlertCircle className="w-5 h-5 text-amber-600" />;
    default:
      return <TrendingDown className="w-5 h-5 text-blue-600" />;
  }
};

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "high":
      return <Badge className="bg-red-600 hover:bg-red-700">High Risk</Badge>;
    case "medium":
      return <Badge className="bg-amber-600 hover:bg-amber-700">Medium Risk</Badge>;
    default:
      return <Badge className="bg-blue-600 hover:bg-blue-700">Low Risk</Badge>;
  }
};

export const StudentsAtRiskMonitoring = () => {
  const highRiskCount = mockStudentsAtRisk.filter((s) => s.riskLevel === "high")
    .length;

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>At-Risk Students Monitoring</CardTitle>
            <CardDescription>Students requiring immediate attention</CardDescription>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{highRiskCount}</div>
            <div className="text-xs text-muted-foreground">High Risk</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockStudentsAtRisk.map((student) => (
            <div
              key={student.id}
              className={`p-4 rounded-lg border-2 transition-all ${getRiskColor(
                student.riskLevel
              )}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getRiskIcon(student.riskLevel)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{student.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        ({student.studentId})
                      </span>
                      {getRiskBadge(student.riskLevel)}
                    </div>

                    <div className="mb-3 space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Attendance Rate</span>
                          <span className="font-semibold">{student.attendance}%</span>
                        </div>
                        <Progress
                          value={student.attendance}
                          className="h-2"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 text-sm mb-2">
                      <span className="text-muted-foreground">
                        <span className="font-medium">{student.absences}</span> absences
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-destructive">
                          {student.fines}
                        </span>{" "}
                        in fines
                      </span>
                      <span className="text-muted-foreground">
                        Last: {student.lastAbsent}
                      </span>
                    </div>

                    {student.reason && (
                      <p className="text-sm bg-background/50 px-2 py-1 rounded text-muted-foreground italic">
                        📌 {student.reason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[110px]">
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
