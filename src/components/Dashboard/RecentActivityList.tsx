import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2 } from "lucide-react";

interface RecentActivityItem {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  action: string;
  timestamp: string;
  status: 'active' | 'pending' | 'inactive';
}

interface RecentActivityProps {
  items?: RecentActivityItem[];
}

export const RecentActivityList = ({ items = defaultItems }: RecentActivityProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-primary/10 text-primary';
      case 'Student':
        return 'bg-success/10 text-success';
      case 'Dean':
        return 'bg-blue-500/10 text-blue-500';
      case 'LSG':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest user actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleColor(item.role)} border`}>{item.role}</Badge>
                  </TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.action}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(item.status)} border`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.timestamp}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

const defaultItems: RecentActivityItem[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@university.edu',
    role: 'Student',
    department: 'CBA',
    action: 'Created',
    timestamp: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@university.edu',
    role: 'Dean',
    department: 'CECE',
    action: 'Updated',
    timestamp: '5 hours ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@university.edu',
    role: 'LSG',
    department: 'CTELAN',
    action: 'Created',
    timestamp: '1 day ago',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@university.edu',
    role: 'Admin',
    department: 'CBA',
    action: 'Updated',
    timestamp: '2 days ago',
    status: 'active',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@university.edu',
    role: 'Student',
    department: 'CECE',
    action: 'Deleted',
    timestamp: '3 days ago',
    status: 'inactive',
  },
];
