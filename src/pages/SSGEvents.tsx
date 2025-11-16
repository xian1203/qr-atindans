import { useState } from "react";
import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Zap,
  FileText,
  X,
} from "lucide-react";

interface EventData {
  id: string;
  name: string;
  category: "educational" | "sports" | "cultural" | "social";
  date: string;
  time: string;
  location: string;
  department: string;
  capacity: number;
  registered: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  description: string;
  organizer: string;
  budget: number;
}

const initialMockEvents: EventData[] = [
  {
    id: "1",
    name: "Leadership Seminar",
    category: "educational",
    date: "2024-12-15",
    time: "2:00 PM - 5:00 PM",
    location: "Main Auditorium",
    department: "All Departments",
    capacity: 500,
    registered: 245,
    status: "upcoming",
    description: "Annual leadership development workshop for all students",
    organizer: "Maria Garcia",
    budget: 25000,
  },
  {
    id: "2",
    name: "Career Fair 2024",
    category: "educational",
    date: "2024-12-18",
    time: "9:00 AM - 4:00 PM",
    location: "Gymnasium",
    department: "CBA & CECE",
    capacity: 300,
    registered: 156,
    status: "upcoming",
    description: "Connect with top companies and explore career opportunities",
    organizer: "Juan Reyes",
    budget: 35000,
  },
  {
    id: "3",
    name: "Sports Fest Opening",
    category: "sports",
    date: "2024-12-20",
    time: "6:00 PM - 9:00 PM",
    location: "Athletic Field",
    department: "All Departments",
    capacity: 1000,
    registered: 389,
    status: "upcoming",
    description: "Kickoff for the semester sports festival with opening ceremony",
    organizer: "Carlos Diaz",
    budget: 50000,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "educational":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    case "sports":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
    case "cultural":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
    case "social":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "upcoming":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "ongoing":
      return <Zap className="w-4 h-4 text-teal-500" />;
    case "completed":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "cancelled":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

const getAttendancePercentage = (registered: number, capacity: number) => {
  return Math.round((registered / capacity) * 100);
};

const SSGEvents = () => {
  const [events, setEvents] = useState<EventData[]>(initialMockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<EventData>>({
    name: "",
    category: "educational",
    date: "",
    time: "",
    location: "",
    department: "All Departments",
    capacity: 100,
    status: "upcoming",
    description: "",
    organizer: "",
    budget: 0,
  });

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    const matchesStatus = !statusFilter || event.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: events.length,
    upcoming: events.filter((e) => e.status === "upcoming").length,
    ongoing: events.filter((e) => e.status === "ongoing").length,
    completed: events.filter((e) => e.status === "completed").length,
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "educational",
      date: "",
      time: "",
      location: "",
      department: "All Departments",
      capacity: 100,
      status: "upcoming",
      description: "",
      organizer: "",
      budget: 0,
    });
  };

  const handleCreateEvent = () => {
    if (!formData.name || !formData.date || !formData.time || !formData.location) {
      return;
    }

    const newEvent: EventData = {
      id: Date.now().toString(),
      name: formData.name || "",
      category: (formData.category as EventData["category"]) || "educational",
      date: formData.date || "",
      time: formData.time || "",
      location: formData.location || "",
      department: formData.department || "",
      capacity: formData.capacity || 100,
      registered: 0,
      status: (formData.status as EventData["status"]) || "upcoming",
      description: formData.description || "",
      organizer: formData.organizer || "",
      budget: formData.budget || 0,
    };

    setEvents([...events, newEvent]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditEvent = () => {
    if (!editingEvent) return;

    const updatedEvent: EventData = {
      ...editingEvent,
      name: formData.name || editingEvent.name,
      category: (formData.category as EventData["category"]) || editingEvent.category,
      date: formData.date || editingEvent.date,
      time: formData.time || editingEvent.time,
      location: formData.location || editingEvent.location,
      department: formData.department || editingEvent.department,
      capacity: formData.capacity || editingEvent.capacity,
      status: (formData.status as EventData["status"]) || editingEvent.status,
      description: formData.description || editingEvent.description,
      organizer: formData.organizer || editingEvent.organizer,
      budget: formData.budget || editingEvent.budget,
    };

    setEvents(
      events.map((e) =>
        e.id === editingEvent.id ? updatedEvent : e
      )
    );

    setIsEditOpen(false);
    setEditingEvent(null);
    resetForm();
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleOpenEdit = (event: EventData) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      department: event.department,
      capacity: event.capacity,
      status: event.status,
      description: event.description,
      organizer: event.organizer,
      budget: event.budget,
    });
    setIsEditOpen(true);
  };

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-muted-foreground">Create, manage and track all SSG events</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Fill in the event details below</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Event Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Leadership Seminar"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      placeholder="e.g., 2:00 PM - 5:00 PM"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Main Auditorium"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="e.g., All Departments"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          capacity: parseInt(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (₱)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: parseInt(e.target.value) })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger id="status" className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizer">Organizer</Label>
                    <Input
                      id="organizer"
                      placeholder="e.g., Maria Garcia"
                      value={formData.organizer}
                      onChange={(e) =>
                        setFormData({ ...formData, organizer: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Event description..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateEvent}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Create Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Events</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stats.upcoming}</p>
                <p className="text-sm text-muted-foreground mt-1">Upcoming</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-600">{stats.ongoing}</p>
                <p className="text-sm text-muted-foreground mt-1">Ongoing</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={categoryFilter || "all"}
                onValueChange={(v) => setCategoryFilter(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter || "all"}
                onValueChange={(v) => setStatusFilter(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Event Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{event.name}</h3>
                          <Badge className={getCategoryColor(event.category)}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(event.status)}
                            <Badge variant="outline">
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Date & Time</p>
                          <p className="font-medium">{event.date}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Registered</p>
                          <p className="font-medium">
                            {event.registered}/{event.capacity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="font-medium">₱{event.budget.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attendance Rate</span>
                        <span className="font-semibold">
                          {getAttendancePercentage(event.registered, event.capacity)}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-teal-600"
                          style={{
                            width: `${getAttendancePercentage(
                              event.registered,
                              event.capacity
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Organizer */}
                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Organized by</p>
                        <p className="font-medium">{event.organizer}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Dialog open={isViewOpen && selectedEvent?.id === event.id} onOpenChange={setIsViewOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">View</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{selectedEvent?.name}</DialogTitle>
                              <DialogDescription>Event Details</DialogDescription>
                            </DialogHeader>

                            {selectedEvent && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                                    <p className="text-lg font-semibold mt-1 capitalize">{selectedEvent.category}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <div className="mt-1">
                                      <Badge variant="outline">
                                        {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                  <h4 className="font-semibold mb-3">Event Information</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                      <Calendar className="w-5 h-5 text-teal-600 mt-1" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Date & Time</p>
                                        <p className="font-medium">{selectedEvent.date}</p>
                                        <p className="text-sm">{selectedEvent.time}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-medium">{selectedEvent.location}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <Users className="w-5 h-5 text-teal-600 mt-1" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Registered Participants</p>
                                        <p className="font-medium">{selectedEvent.registered} / {selectedEvent.capacity}</p>
                                        <p className="text-sm text-teal-600 font-semibold mt-1">
                                          {getAttendancePercentage(selectedEvent.registered, selectedEvent.capacity)}% Capacity
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <FileText className="w-5 h-5 text-teal-600 mt-1" />
                                      <div>
                                        <p className="text-sm text-muted-foreground">Budget Allocation</p>
                                        <p className="font-medium">₱{selectedEvent.budget.toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedEvent.description}
                                  </p>
                                </div>

                                <div className="border-t border-border pt-4">
                                  <h4 className="font-semibold mb-2">Organizer</h4>
                                  <p className="text-sm font-medium">{selectedEvent.organizer}</p>
                                  <p className="text-sm text-muted-foreground">{selectedEvent.department}</p>
                                </div>

                                <div className="flex gap-2 justify-end pt-4 border-t border-border">
                                  <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                                    Close
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Dialog open={isEditOpen && editingEvent?.id === event.id} onOpenChange={setIsEditOpen}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                              onClick={() => handleOpenEdit(event)}
                            >
                              <Edit className="w-4 h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Event</DialogTitle>
                              <DialogDescription>Update event details</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-name">Event Name *</Label>
                                  <Input
                                    id="edit-name"
                                    placeholder="e.g., Leadership Seminar"
                                    value={formData.name}
                                    onChange={(e) =>
                                      setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-category">Category *</Label>
                                  <Select
                                    value={formData.category}
                                    onValueChange={(value: any) =>
                                      setFormData({ ...formData, category: value })
                                    }
                                  >
                                    <SelectTrigger id="edit-category" className="mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="educational">Educational</SelectItem>
                                      <SelectItem value="sports">Sports</SelectItem>
                                      <SelectItem value="cultural">Cultural</SelectItem>
                                      <SelectItem value="social">Social</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-date">Date *</Label>
                                  <Input
                                    id="edit-date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                      setFormData({ ...formData, date: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-time">Time *</Label>
                                  <Input
                                    id="edit-time"
                                    placeholder="e.g., 2:00 PM - 5:00 PM"
                                    value={formData.time}
                                    onChange={(e) =>
                                      setFormData({ ...formData, time: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-location">Location *</Label>
                                  <Input
                                    id="edit-location"
                                    placeholder="e.g., Main Auditorium"
                                    value={formData.location}
                                    onChange={(e) =>
                                      setFormData({ ...formData, location: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-department">Department</Label>
                                  <Input
                                    id="edit-department"
                                    placeholder="e.g., All Departments"
                                    value={formData.department}
                                    onChange={(e) =>
                                      setFormData({ ...formData, department: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                  <Label htmlFor="edit-capacity">Capacity</Label>
                                  <Input
                                    id="edit-capacity"
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        capacity: parseInt(e.target.value),
                                      })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-budget">Budget (₱)</Label>
                                  <Input
                                    id="edit-budget"
                                    type="number"
                                    value={formData.budget}
                                    onChange={(e) =>
                                      setFormData({ ...formData, budget: parseInt(e.target.value) })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    value={formData.status}
                                    onValueChange={(value: any) =>
                                      setFormData({ ...formData, status: value })
                                    }
                                  >
                                    <SelectTrigger id="edit-status" className="mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="upcoming">Upcoming</SelectItem>
                                      <SelectItem value="ongoing">Ongoing</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-organizer">Organizer</Label>
                                  <Input
                                    id="edit-organizer"
                                    placeholder="e.g., Maria Garcia"
                                    value={formData.organizer}
                                    onChange={(e) =>
                                      setFormData({ ...formData, organizer: e.target.value })
                                    }
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  placeholder="Event description..."
                                  value={formData.description}
                                  onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                  }
                                  className="mt-1"
                                  rows={4}
                                />
                              </div>

                              <div className="flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsEditOpen(false);
                                    setEditingEvent(null);
                                    resetForm();
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleEditEvent}
                                  className="bg-teal-600 hover:bg-teal-700"
                                >
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No events found matching your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SSGLayout>
  );
};

export default SSGEvents;

