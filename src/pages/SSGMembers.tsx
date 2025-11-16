import { useState } from "react";
import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Edit,
  Trash2,
  Trophy,
  Award,
  MessageSquare,
  X,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  position: "core" | "officer" | "volunteer";
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  eventsOrganized: number;
  hoursContributed: number;
  status: "active" | "inactive";
  avatar: string;
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Maria Garcia",
    role: "Vice President",
    position: "core",
    department: "CBA",
    email: "maria.garcia@university.edu",
    phone: "+63 912 345 6789",
    joinDate: "Jan 2024",
    eventsOrganized: 12,
    hoursContributed: 156,
    status: "active",
    avatar: "MG",
  },
  {
    id: "2",
    name: "Juan Reyes",
    role: "Treasurer",
    position: "core",
    department: "CECE",
    email: "juan.reyes@university.edu",
    phone: "+63 912 345 6790",
    joinDate: "Jan 2024",
    eventsOrganized: 10,
    hoursContributed: 142,
    status: "active",
    avatar: "JR",
  },
  {
    id: "3",
    name: "Ana Santos",
    role: "Secretary",
    position: "core",
    department: "CTELAN",
    email: "ana.santos@university.edu",
    phone: "+63 912 345 6791",
    joinDate: "Feb 2024",
    eventsOrganized: 9,
    hoursContributed: 138,
    status: "active",
    avatar: "AS",
  },
  {
    id: "4",
    name: "Carlos Diaz",
    role: "Sports Officer",
    position: "officer",
    department: "CBA",
    email: "carlos.diaz@university.edu",
    phone: "+63 912 345 6792",
    joinDate: "Mar 2024",
    eventsOrganized: 8,
    hoursContributed: 124,
    status: "active",
    avatar: "CD",
  },
  {
    id: "5",
    name: "Rosa Lopez",
    role: "Events Coordinator",
    position: "officer",
    department: "CNS",
    email: "rosa.lopez@university.edu",
    phone: "+63 912 345 6793",
    joinDate: "Mar 2024",
    eventsOrganized: 7,
    hoursContributed: 118,
    status: "active",
    avatar: "RL",
  },
  {
    id: "6",
    name: "Pedro Castillo",
    role: "Logistics Lead",
    position: "officer",
    department: "CECE",
    email: "pedro.castillo@university.edu",
    phone: "+63 912 345 6794",
    joinDate: "Apr 2024",
    eventsOrganized: 6,
    hoursContributed: 96,
    status: "active",
    avatar: "PC",
  },
  {
    id: "7",
    name: "Sofia Mendez",
    role: "Volunteer",
    position: "volunteer",
    department: "CBA",
    email: "sofia.mendez@university.edu",
    phone: "+63 912 345 6795",
    joinDate: "May 2024",
    eventsOrganized: 3,
    hoursContributed: 45,
    status: "active",
    avatar: "SM",
  },
  {
    id: "8",
    name: "Diego Torres",
    role: "Volunteer",
    position: "volunteer",
    department: "CTELAN",
    email: "diego.torres@university.edu",
    phone: "+63 912 345 6796",
    joinDate: "May 2024",
    eventsOrganized: 2,
    hoursContributed: 32,
    status: "inactive",
    avatar: "DT",
  },
];

const getRoleColor = (position: string) => {
  switch (position) {
    case "core":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200";
    case "officer":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
    case "volunteer":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
    : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200";
};

const SSGMembers = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    position: "volunteer" as "core" | "officer" | "volunteer",
    department: "",
    email: "",
    phone: "",
    joinDate: "",
    status: "active" as "active" | "inactive",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      position: "volunteer",
      department: "",
      email: "",
      phone: "",
      joinDate: "",
      status: "active",
    });
  };

  const handleAddMember = () => {
    if (!formData.name || !formData.role || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      ...formData,
      eventsOrganized: 0,
      hoursContributed: 0,
      avatar: formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };

    setMembers([...members, newMember]);
    setIsAddOpen(false);
    resetForm();
  };

  const handleEditMember = () => {
    if (!editingMember) return;
    if (!formData.name || !formData.role || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    setMembers(
      members.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              ...formData,
              avatar: formData.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2),
            }
          : m
      )
    );
    setIsEditOpen(false);
    setEditingMember(null);
    resetForm();
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const handleOpenEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      position: member.position,
      department: member.department,
      email: member.email,
      phone: member.phone,
      joinDate: member.joinDate,
      status: member.status,
    });
    setIsEditOpen(true);
  };

  const handleOpenView = (member: Member) => {
    setSelectedMember(member);
    setIsViewOpen(true);
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !positionFilter || member.position === positionFilter;
    const matchesStatus = !statusFilter || member.status === statusFilter;

    return matchesSearch && matchesPosition && matchesStatus;
  });

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    core: members.filter((m) => m.position === "core").length,
    officers: members.filter((m) => m.position === "officer").length,
  };

  const topContributors = members
    .sort((a, b) => b.hoursContributed - a.hoursContributed)
    .slice(0, 3);

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Members Management</h1>
            <p className="text-muted-foreground">Manage SSG team members and roles</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>Add a new team member to the SSG</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-name">Full Name *</Label>
                    <Input
                      id="add-name"
                      placeholder="Enter member name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="add-email">Email *</Label>
                    <Input
                      id="add-email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-role">Role *</Label>
                    <Input
                      id="add-role"
                      placeholder="e.g., Vice President"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="add-phone">Phone Number</Label>
                    <Input
                      id="add-phone"
                      placeholder="+63 912 345 6789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-position">Position</Label>
                    <Select
                      value={formData.position}
                      onValueChange={(v) => setFormData({ ...formData, position: v as "core" | "officer" | "volunteer" })}
                    >
                      <SelectTrigger id="add-position">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="core">Core Team</SelectItem>
                        <SelectItem value="officer">Officer</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="add-status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "inactive" })}
                    >
                      <SelectTrigger id="add-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="add-department">Department</Label>
                    <Input
                      id="add-department"
                      placeholder="e.g., CBA"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="add-joinDate">Join Date</Label>
                    <Input
                      id="add-joinDate"
                      placeholder="e.g., Jan 2024"
                      value={formData.joinDate}
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={handleAddMember}
                  >
                    Add Member
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
              <div className="space-y-2">
                <Users className="w-8 h-8 text-teal-600" />
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Award className="w-8 h-8 text-purple-600" />
                <p className="text-3xl font-bold">{stats.core}</p>
                <p className="text-sm text-muted-foreground">Core Team</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Trophy className="w-8 h-8 text-blue-600" />
                <p className="text-3xl font-bold">{stats.officers}</p>
                <p className="text-sm text-muted-foreground">Officers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <MessageSquare className="w-8 h-8 text-green-600" />
                <p className="text-3xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </CardContent>
          </Card>
        </div>

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
                    placeholder="Search by name or email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select
                value={positionFilter || "all"}
                onValueChange={(v) => setPositionFilter(v === "all" ? null : v)}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="core">Core Team</SelectItem>
                  <SelectItem value="officer">Officer</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter || "all"} onValueChange={(v) => setStatusFilter(v === "all" ? null : v)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Top Contributors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>Members with highest hours contributed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContributors.map((member, i) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{member.hoursContributed}h</p>
                    <p className="text-sm text-muted-foreground">{member.eventsOrganized} events</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Members</h2>
          {filteredMembers.length > 0 ? (
            <div className="grid gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Member Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {member.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <Badge className={getRoleColor(member.position)}>
                              {member.position === "core"
                                ? "Core"
                                : member.position === "officer"
                                  ? "Officer"
                                  : "Volunteer"}
                            </Badge>
                            <Badge className={getStatusColor(member.status)}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-teal-600">{member.role}</p>
                          <p className="text-xs text-muted-foreground mt-1">{member.department} • Joined {member.joinDate}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center w-full sm:w-auto">
                        <div>
                          <p className="text-sm font-semibold">{member.eventsOrganized}</p>
                          <p className="text-xs text-muted-foreground">Events</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{member.hoursContributed}h</p>
                          <p className="text-xs text-muted-foreground">Hours</p>
                        </div>
                        <div>
                          <Dialog open={isViewOpen && selectedMember?.id === member.id} onOpenChange={setIsViewOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost" onClick={() => handleOpenView(member)}>
                                More
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{selectedMember?.name}</DialogTitle>
                                <DialogDescription>{selectedMember?.role}</DialogDescription>
                              </DialogHeader>
                              {selectedMember && (
                                <div className="space-y-6">
                                  {/* Member Info */}
                                  <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                                      {selectedMember.avatar}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Badge className={getRoleColor(selectedMember.position)}>
                                          {selectedMember.position === "core"
                                            ? "Core"
                                            : selectedMember.position === "officer"
                                              ? "Officer"
                                              : "Volunteer"}
                                        </Badge>
                                        <Badge className={getStatusColor(selectedMember.status)}>
                                          {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground">{selectedMember.department} • Joined {selectedMember.joinDate}</p>
                                    </div>
                                  </div>

                                  {/* Contact Information */}
                                  <div className="border rounded-lg p-4 space-y-3">
                                    <h4 className="font-semibold">Contact Information</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <a href={`mailto:${selectedMember.email}`} className="text-blue-600 hover:underline">
                                          {selectedMember.email}
                                        </a>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <a href={`tel:${selectedMember.phone}`} className="text-blue-600 hover:underline">
                                          {selectedMember.phone}
                                        </a>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Contribution Stats */}
                                  <div className="border rounded-lg p-4 space-y-3">
                                    <h4 className="font-semibold">Contribution Statistics</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                                        <p className="text-2xl font-bold text-blue-600">{selectedMember.eventsOrganized}</p>
                                        <p className="text-sm text-muted-foreground">Events Organized</p>
                                      </div>
                                      <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">{selectedMember.hoursContributed}h</p>
                                        <p className="text-sm text-muted-foreground">Hours Contributed</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                                      Close
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Actions */}
                    <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4 text-sm">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={isEditOpen && editingMember?.id === member.id} onOpenChange={setIsEditOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1" onClick={() => handleOpenEdit(member)}>
                              <Edit className="w-4 h-4" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Member</DialogTitle>
                              <DialogDescription>Update member information</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-name">Full Name *</Label>
                                  <Input
                                    id="edit-name"
                                    placeholder="Enter member name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-email">Email *</Label>
                                  <Input
                                    id="edit-email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-role">Role *</Label>
                                  <Input
                                    id="edit-role"
                                    placeholder="e.g., Vice President"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-phone">Phone Number</Label>
                                  <Input
                                    id="edit-phone"
                                    placeholder="+63 912 345 6789"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-position">Position</Label>
                                  <Select
                                    value={formData.position}
                                    onValueChange={(v) => setFormData({ ...formData, position: v as "core" | "officer" | "volunteer" })}
                                  >
                                    <SelectTrigger id="edit-position">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="core">Core Team</SelectItem>
                                      <SelectItem value="officer">Officer</SelectItem>
                                      <SelectItem value="volunteer">Volunteer</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select
                                    value={formData.status}
                                    onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "inactive" })}
                                  >
                                    <SelectTrigger id="edit-status">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-department">Department</Label>
                                  <Input
                                    id="edit-department"
                                    placeholder="e.g., CBA"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-joinDate">Join Date</Label>
                                  <Input
                                    id="edit-joinDate"
                                    placeholder="e.g., Jan 2024"
                                    value={formData.joinDate}
                                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end gap-2 pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setIsEditOpen(false);
                                    setEditingMember(null);
                                    resetForm();
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="bg-teal-600 hover:bg-teal-700 text-white"
                                  onClick={handleEditMember}
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
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No members found matching your filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SSGLayout>
  );
};

export default SSGMembers;

