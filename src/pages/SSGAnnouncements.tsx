import { useState } from "react";
import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Megaphone,
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "event" | "update" | "alert" | "achievement";
  priority: "low" | "medium" | "high";
  author: string;
  createdDate: string;
  views: number;
  status: "draft" | "published" | "archived";
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Leadership Seminar Confirmed for December 15",
    content:
      "The annual leadership seminar has been confirmed and is scheduled for December 15, 2024 at the Main Auditorium. Registration is now open for all students.",
    category: "event",
    priority: "high",
    author: "Maria Garcia",
    createdDate: "2 hours ago",
    views: 234,
    status: "published",
  },
  {
    id: "2",
    title: "SSG Meeting This Friday at 3 PM",
    content:
      "Important SSG core team meeting scheduled for this Friday at 3:00 PM in the Student Center. Attendance is mandatory for all core members.",
    category: "update",
    priority: "medium",
    author: "Juan Reyes",
    createdDate: "5 hours ago",
    views: 156,
    status: "published",
  },
  {
    id: "3",
    title: "Budget Request Deadline Extended",
    content:
      "The deadline for submitting budget requests for the next semester has been extended to December 20. Please ensure all documentation is complete.",
    category: "alert",
    priority: "high",
    author: "Ana Santos",
    createdDate: "1 day ago",
    views: 189,
    status: "published",
  },
  {
    id: "4",
    title: "Record Attendance at Sports Fest",
    content:
      "Congratulations! The Sports Fest Opening attracted 389 participants, setting a new record for SSG events. Special thanks to all volunteers.",
    category: "achievement",
    priority: "low",
    author: "Carlos Diaz",
    createdDate: "2 days ago",
    views: 412,
    status: "published",
  },
  {
    id: "5",
    title: "New Venue for Career Fair",
    content:
      "Due to high registration numbers, the Career Fair has been moved to the Gymnasium. The date remains December 18, 2024.",
    category: "update",
    priority: "medium",
    author: "Rosa Lopez",
    createdDate: "3 days ago",
    views: 267,
    status: "published",
  },
  {
    id: "6",
    title: "Volunteer Appreciation Event Planning",
    content: "Draft announcement for upcoming volunteer appreciation event. Details to be finalized.",
    category: "event",
    priority: "low",
    author: "Pedro Castillo",
    createdDate: "4 days ago",
    views: 0,
    status: "draft",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "event":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    case "update":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
    case "alert":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200";
    case "achievement":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-600 dark:text-red-400";
    case "medium":
      return "text-teal-600 dark:text-teal-400";
    case "low":
      return "text-green-600 dark:text-green-400";
    default:
      return "text-gray-600";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200";
    case "archived":
      return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const SSGAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || announcement.category === categoryFilter;
    const matchesStatus = !statusFilter || announcement.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: mockAnnouncements.length,
    published: mockAnnouncements.filter((a) => a.status === "published").length,
    draft: mockAnnouncements.filter((a) => a.status === "draft").length,
    totalViews: mockAnnouncements.reduce((sum, a) => sum + a.views, 0),
  };

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-muted-foreground">Manage and publish SSG announcements</p>
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white gap-2"
            onClick={() => setShowNewForm(!showNewForm)}
          >
            <Plus className="w-4 h-4" />
            New Announcement
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Megaphone className="w-8 h-8 text-teal-600" />
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <p className="text-3xl font-bold">{stats.published}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <AlertCircle className="w-8 h-8 text-purple-600" />
                <p className="text-3xl font-bold">{stats.draft}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Eye className="w-8 h-8 text-blue-600" />
                <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Announcement Form */}
        {showNewForm && (
          <Card className="border-teal-200 dark:border-teal-900/50">
            <CardHeader className="bg-teal-50 dark:bg-teal-950/20">
              <CardTitle>Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input placeholder="Announcement title..." className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea placeholder="Write your announcement here..." className="mt-1" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowNewForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Publish
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements..."
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
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter || "all"} onValueChange={(v) => setStatusFilter(v === "all" ? null : v)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold flex-grow">{announcement.title}</h3>
                          <Badge className={getCategoryColor(announcement.category)}>
                            {announcement.category.charAt(0).toUpperCase() +
                              announcement.category.slice(1)}
                          </Badge>
                          <Badge className={getStatusColor(announcement.status)}>
                            {announcement.status.charAt(0).toUpperCase() +
                              announcement.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {announcement.content}
                        </p>
                      </div>
                      <div className={`text-lg font-bold flex-shrink-0 ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority === "high" && "🔴"}
                        {announcement.priority === "medium" && "🟠"}
                        {announcement.priority === "low" && "🟢"}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span>By {announcement.author}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {announcement.createdDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {announcement.views} views
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
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
                No announcements found matching your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SSGLayout>
  );
};

export default SSGAnnouncements;

