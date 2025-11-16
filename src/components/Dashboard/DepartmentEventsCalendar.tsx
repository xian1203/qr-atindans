import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

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
    description: "College of Business and Accountancy Midterm Exams",
  },
  {
    id: "2",
    title: "Business Plan Competition",
    type: "academic",
    date: "Dec 18, 2024",
    time: "9:00 AM - 12:00 PM",
    location: "Auditorium A",
    attendees: 150,
    status: "upcoming",
    description: "Third year students presenting business plans",
  },
  {
    id: "3",
    title: "Leadership Workshop",
    type: "seminar",
    date: "Dec 12, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Room B",
    attendees: 75,
    status: "ongoing",
    description: "Professional development workshop for student leaders",
  },
  {
    id: "4",
    title: "Department Sports Day",
    type: "sports",
    date: "Dec 10, 2024",
    time: "7:00 AM - 6:00 PM",
    location: "Sports Complex",
    attendees: 320,
    status: "completed",
    description: "Annual CBA department sports competition",
  },
  {
    id: "5",
    title: "Career Fair",
    type: "academic",
    date: "Dec 5, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Campus Grounds",
    attendees: 500,
    status: "completed",
    description: "Networking event with 50+ companies",
  },
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "academic":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "sports":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "cultural":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "seminar":
      return "bg-teal-100 text-teal-800 hover:bg-teal-200";
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

export const DepartmentEventsCalendar = () => {
  const upcomingCount = mockEvents.filter((e) => e.status === "upcoming").length;

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Department Events Calendar</CardTitle>
            <CardDescription>All department events and activities</CardDescription>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{upcomingCount}</div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border-2 transition-all ${getStatusColor(
                event.status
              )}`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
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
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>

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
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
