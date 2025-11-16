import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Users2, Clock } from "lucide-react";
import { useState } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  date: number;
  type: "academic" | "sports" | "cultural" | "seminar";
  time: string;
  location: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed";
}

const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Midterm Examinations",
    date: 15,
    type: "academic",
    time: "8:00 AM - 5:00 PM",
    location: "Multiple Venues",
    attendees: 420,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Business Plan Competition",
    date: 18,
    type: "academic",
    time: "9:00 AM - 12:00 PM",
    location: "Auditorium A",
    attendees: 150,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Leadership Workshop",
    date: 12,
    type: "seminar",
    time: "2:00 PM - 5:00 PM",
    location: "Conference Room B",
    attendees: 75,
    status: "ongoing",
  },
  {
    id: "4",
    title: "Sports Day",
    date: 10,
    type: "sports",
    time: "7:00 AM - 6:00 PM",
    location: "Sports Complex",
    attendees: 320,
    status: "completed",
  },
  {
    id: "5",
    title: "Career Fair",
    date: 5,
    type: "academic",
    time: "9:00 AM - 4:00 PM",
    location: "Campus Grounds",
    attendees: 500,
    status: "completed",
  },
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "academic":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "sports":
      return "bg-green-100 text-green-800 border-green-200";
    case "cultural":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "seminar":
      return "bg-teal-100 text-teal-800 border-teal-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-amber-500 hover:bg-amber-600";
    case "ongoing":
      return "bg-blue-500 hover:bg-blue-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

export const EventsCalendarView = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDate = (date: number) => {
    return calendarEvents.filter((event) => event.date === date);
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Events Calendar</CardTitle>
            <CardDescription>Visual calendar of all department events</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="min-w-[200px] text-center font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calendar Grid */}
          <div className="border rounded-lg overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-muted">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center font-semibold text-sm border-r border-border last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {/* Empty cells for days before month starts */}
              {emptyDays.map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="min-h-[120px] bg-muted/30 border-r border-b border-border p-2"
                />
              ))}

              {/* Days of month */}
              {days.map((day) => {
                const dayEvents = getEventsForDate(day);
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                return (
                  <div
                    key={day}
                    className={`min-h-[120px] border-r border-b border-border p-2 overflow-hidden ${
                      isToday ? "bg-blue-50" : "bg-background"
                    } last:border-r-0`}
                  >
                    <div
                      className={`text-sm font-semibold mb-2 p-1 rounded ${
                        isToday
                          ? "bg-blue-500 text-white w-6 h-6 flex items-center justify-center"
                          : "text-foreground"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1.5 rounded border ${getEventTypeColor(
                            event.type
                          )} cursor-pointer hover:shadow-md transition-all truncate font-medium`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
              <span className="text-sm text-muted-foreground">Academic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-100 border border-green-200" />
              <span className="text-sm text-muted-foreground">Sports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-100 border border-purple-200" />
              <span className="text-sm text-muted-foreground">Cultural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-teal-100 border border-teal-200" />
              <span className="text-sm text-muted-foreground">Seminar</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const EventsTimelineView = () => {
  const [selectedType, setSelectedType] = useState("all");

  const filteredEvents = selectedType === "all" 
    ? calendarEvents 
    : calendarEvents.filter((e) => e.type === selectedType);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Events Timeline</CardTitle>
            <CardDescription>Chronological view of all events</CardDescription>
          </div>
          <div className="flex gap-2">
            {["all", "academic", "sports", "cultural", "seminar"].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="relative pb-3 last:pb-0"
            >
              {/* Timeline line */}
              {index !== filteredEvents.length - 1 && (
                <div className="absolute left-4 top-12 w-0.5 h-12 bg-border" />
              )}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full border-4 border-background flex items-center justify-center z-10 ${
                      event.status === "upcoming"
                        ? "bg-amber-500"
                        : event.status === "ongoing"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>

                {/* Event content */}
                <div className={`flex-1 p-4 rounded-lg border-2 ${getEventTypeColor(event.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        <Badge className={`text-xs ${getStatusBadgeColor(event.status)}`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users2 className="w-3.5 h-3.5" />
                      <span>{event.attendees} attendees</span>
                    </div>
                    <div className="text-right">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
