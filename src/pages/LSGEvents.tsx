import { useState } from "react";
import { LSGLayout } from "../components/Layout/LSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Calendar, MapPin, Users, TrendingUp, Download, Search, Filter } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  expectedAttendees: number;
  scanned: number;
  department: string;
  coordinator: string;
  status: "live" | "upcoming" | "completed";
}

export default function LSGEvents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const events: Event[] = [
    {
      id: "1",
      name: "Leadership Seminar",
      date: "January 15, 2024",
      time: "9:00 AM - 12:00 PM",
      venue: "Main Auditorium",
      expectedAttendees: 145,
      scanned: 127,
      department: "CBA",
      coordinator: "Maria Santos",
      status: "live",
    },
    {
      id: "2",
      name: "Career Fair",
      date: "January 15, 2024",
      time: "1:00 PM - 5:00 PM",
      venue: "Gymnasium",
      expectedAttendees: 120,
      scanned: 98,
      department: "CECE",
      coordinator: "Juan Dela Cruz",
      status: "live",
    },
    {
      id: "3",
      name: "Sports Festival Opening",
      date: "January 15, 2024",
      time: "6:00 PM - 8:00 PM",
      venue: "Sports Complex",
      expectedAttendees: 200,
      scanned: 0,
      department: "General",
      coordinator: "Pedro Reyes",
      status: "upcoming",
    },
    {
      id: "4",
      name: "Academic Symposium",
      date: "January 14, 2024",
      time: "9:00 AM - 3:00 PM",
      venue: "Conference Hall",
      expectedAttendees: 85,
      scanned: 78,
      department: "CNS",
      coordinator: "Dr. Lisa Wong",
      status: "completed",
    },
    {
      id: "5",
      name: "Student Workshop",
      date: "January 13, 2024",
      time: "2:00 PM - 4:00 PM",
      venue: "Lab A",
      expectedAttendees: 50,
      scanned: 48,
      department: "CTELAN",
      coordinator: "Ana Garcia",
      status: "completed",
    },
    {
      id: "6",
      name: "Networking Event",
      date: "January 12, 2024",
      time: "4:00 PM - 6:00 PM",
      venue: "Function Room",
      expectedAttendees: 95,
      scanned: 91,
      department: "CBA",
      coordinator: "Rosa Cruz",
      status: "completed",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.coordinator.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "all" || event.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-500 hover:bg-red-600">Live</Badge>;
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return null;
    }
  };

  const getAttendancePercentage = (scanned: number, expected: number) => {
    return Math.round((scanned / expected) * 100);
  };

  const stats = [
    {
      label: "Total Events",
      value: events.length.toString(),
      color: "text-blue-600",
    },
    {
      label: "Live Events",
      value: events.filter((e) => e.status === "live").length.toString(),
      color: "text-red-600",
    },
    {
      label: "Total Attendees",
      value: events.reduce((sum, e) => sum + e.scanned, 0).toString(),
      color: "text-green-600",
    },
    {
      label: "Avg Attendance",
      value: Math.round(
        events.reduce((sum, e) => sum + getAttendancePercentage(e.scanned, e.expectedAttendees), 0) /
          events.length
      ) + "%",
      color: "text-teal-600",
    },
  ];

  return (
    <LSGLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Event Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor and manage all department events
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
                  Search Events
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search by name, venue, or coordinator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-900 dark:text-white mb-2 block">
                  Department
                </label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="CBA">CBA</SelectItem>
                    <SelectItem value="CECE">CECE</SelectItem>
                    <SelectItem value="CTELAN">CTELAN</SelectItem>
                    <SelectItem value="CNS">CNS</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 dark:text-slate-400">
                  No events found matching your search criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card
                key={event.id}
                className={`border-l-4 ${
                  event.status === "live"
                    ? "border-l-red-500"
                    : event.status === "upcoming"
                      ? "border-l-yellow-500"
                      : "border-l-slate-300"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {event.name}
                          </h3>
                          {getStatusBadge(event.status)}
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span>{event.time}</span>
                          <span className="hidden md:inline">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.venue}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Report
                      </Button>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                          Coordinator
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                          {event.coordinator}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                          Department
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {event.department}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                          Expected
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                          {event.expectedAttendees} students
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                          Response Time
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                          245ms
                        </p>
                      </div>
                    </div>

                    {/* Attendance Progress */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Attendance
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">
                            {event.scanned} / {event.expectedAttendees}
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              getAttendancePercentage(event.scanned, event.expectedAttendees) >= 80
                                ? "text-green-600"
                                : getAttendancePercentage(event.scanned, event.expectedAttendees) >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {getAttendancePercentage(event.scanned, event.expectedAttendees)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-teal-500 transition-all"
                          style={{
                            width: `${getAttendancePercentage(event.scanned, event.expectedAttendees)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Summary */}
        {filteredEvents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Total Attendance
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredEvents.reduce((sum, e) => sum + e.scanned, 0)} students
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Average Attendance Rate
                  </p>
                  <p className="text-2xl font-bold text-teal-600">
                    {Math.round(
                      filteredEvents.reduce(
                        (sum, e) =>
                          sum +
                          getAttendancePercentage(e.scanned, e.expectedAttendees),
                        0
                      ) / filteredEvents.length
                    )}
                    %
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Expected vs Scanned
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {filteredEvents.reduce((sum, e) => sum + e.expectedAttendees, 0)} vs{" "}
                    {filteredEvents.reduce((sum, e) => sum + e.scanned, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </LSGLayout>
  );
}
