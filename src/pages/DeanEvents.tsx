import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsCalendarView, EventsTimelineView } from "@/components/Dashboard/EventsCalendarView";
import { Home, FileText, Users, Calendar, Search, MapPin, Clock, Users2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  type: "academic" | "sports" | "cultural" | "seminar";
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed";
  description: string;
  organizer: string;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Midterm Examinations",
    type: "academic",
    date: "Dec 15 - Dec 22, 2024",
    time: "8:00 AM - 5:00 PM",
    location: "Multiple Venues",
    attendees: 420,
    status: "upcoming",
    description: "Comprehensive midterm examination for all programs",
    organizer: "Academic Affairs Office",
  },
  {
    id: "2",
    title: "Business Plan Competition 2024",
    type: "academic",
    date: "Dec 18, 2024",
    time: "9:00 AM - 12:00 PM",
    location: "Auditorium A",
    attendees: 150,
    status: "upcoming",
    description: "Annual competition for business plans by students",
    organizer: "Entrepreneurship Club",
  },
  {
    id: "3",
    title: "Leadership Development Workshop",
    type: "seminar",
    date: "Dec 12, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Room B",
    attendees: 75,
    status: "ongoing",
    description: "Professional development for student leaders and organization officers",
    organizer: "Student Affairs",
  },
  {
    id: "4",
    title: "Department Sports Day 2024",
    type: "sports",
    date: "Dec 10, 2024",
    time: "7:00 AM - 6:00 PM",
    location: "Sports Complex",
    attendees: 320,
    status: "completed",
    description: "Annual inter-class sports competition",
    organizer: "Sports Committee",
  },
  {
    id: "5",
    title: "Career Fair & Recruitment Drive",
    type: "academic",
    date: "Dec 5, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Campus Grounds",
    attendees: 500,
    status: "completed",
    description: "Networking event with 50+ companies and job opportunities",
    organizer: "Alumni & Placement Office",
  },
];

const DeanEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const sidebar = (
    <nav className="p-4 space-y-2">
      <NavLink
        to="/dean"
        end
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Home className="w-5 h-5" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink
        to="/dean/students"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Users className="w-5 h-5" />
        <span>Students</span>
      </NavLink>
      <NavLink
        to="/dean/excuse-letters"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <FileText className="w-5 h-5" />
        <span>Excuse Letters</span>
      </NavLink>
      <NavLink
        to="/dean/events"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
        activeClassName="bg-primary text-primary-foreground hover:bg-primary"
      >
        <Calendar className="w-5 h-5" />
        <span>Events</span>
      </NavLink>
    </nav>
  );

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    const matchesStatus = filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const upcomingCount = mockEvents.filter((e) => e.status === "upcoming").length;
  const ongoingCount = mockEvents.filter((e) => e.status === "ongoing").length;
  const completedCount = mockEvents.filter((e) => e.status === "completed").length;

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "sports":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "cultural":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "seminar":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-50 border-amber-200";
      case "ongoing":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-amber-600 hover:bg-amber-700">Upcoming</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Ongoing</Badge>;
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700">Completed</Badge>;
    }
  };

  return (
    <DashboardLayout
      userName="Dr. Maria Santos"
      userRole="Dean - CBA"
      sidebar={sidebar}
    >
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Department Events Calendar</h1>
          <p className="text-muted-foreground">Manage and oversee all department events and activities</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">{upcomingCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{ongoingCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Ongoing</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{completedCount}</div>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {mockEvents.reduce((sum, e) => sum + e.attendees, 0)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Total Attendees</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="academic">Academic</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                  <option value="seminar">Seminar</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            <EventsCalendarView />
          </TabsContent>

          {/* Timeline View */}
          <TabsContent value="timeline" className="space-y-6">
            <EventsTimelineView />
          </TabsContent>

          {/* List View */}
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Events List</CardTitle>
                <CardDescription>
                  Showing {filteredEvents.length} of {mockEvents.length} events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(
                        event.status
                      )}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{event.title}</h4>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                            {getStatusBadge(event.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users2 className="w-4 h-4 flex-shrink-0" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Organized by: {event.organizer}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[110px]">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {event.status === "upcoming" && (
                            <Button size="sm" variant="outline">
                              Edit Event
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DeanEvents;
