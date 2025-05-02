
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";

// Mock users data with proper typing
const mockUsers: (User & { 
  enrolledCourses: number, 
  lastActive: string, 
  isActive: boolean 
})[] = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "user@example.com", 
    role: "admin" as const, 
    avatar: "/placeholder.svg",
    enrolledCourses: 4,
    lastActive: "2025-05-01T10:23:15Z",
    isActive: true
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com", 
    role: "user" as const, 
    avatar: "/placeholder.svg",
    enrolledCourses: 2,
    lastActive: "2025-05-01T08:45:30Z",
    isActive: true
  },
  { 
    id: "3", 
    name: "Alex Johnson", 
    email: "alex@example.com", 
    role: "user" as const, 
    avatar: "/placeholder.svg",
    enrolledCourses: 1,
    lastActive: "2025-04-29T14:12:08Z",
    isActive: true
  },
  { 
    id: "4", 
    name: "Michael Brown", 
    email: "michael@example.com", 
    role: "user" as const, 
    avatar: "/placeholder.svg",
    enrolledCourses: 3,
    lastActive: "2025-04-30T11:05:45Z",
    isActive: false
  },
  { 
    id: "5", 
    name: "Emily Wilson", 
    email: "emily@example.com", 
    role: "user" as const, 
    avatar: "/placeholder.svg",
    enrolledCourses: 5,
    lastActive: "2025-04-28T16:33:22Z",
    isActive: true
  }
];

const AdminUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<(User & { 
    enrolledCourses?: number, 
    lastActive?: string, 
    isActive?: boolean 
  })[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Fetch users (using mock data for now)
    setUsers(mockUsers);
  }, []);
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleToggleRole = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newRole = user.role === "admin" ? "user" : "admin";
        toast({
          title: "User role updated",
          description: `${user.name}'s role has been changed to ${newRole}.`,
        });
        return { ...user, role: newRole as "user" | "admin" };
      }
      return user;
    }));
  };
  
  const handleToggleActive = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newActiveState = !user.isActive;
        toast({
          title: newActiveState ? "User activated" : "User deactivated",
          description: `${user.name}'s account has been ${newActiveState ? "activated" : "deactivated"}.`,
        });
        return { ...user, isActive: newActiveState };
      }
      return user;
    }));
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">
              Manage platform users and their permissions
            </p>
          </div>
          <div>
            <Button variant="outline" onClick={() => navigate("/admin/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="capitalize">{user.role}</span>
                    </TableCell>
                    <TableCell>{user.enrolledCourses}</TableCell>
                    <TableCell>
                      {user.lastActive 
                        ? new Date(user.lastActive).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isActive 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`active-${user.id}`}
                            checked={user.isActive}
                            onCheckedChange={() => handleToggleActive(user.id)}
                          />
                          <span className="text-xs">Active</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`admin-${user.id}`}
                            checked={user.role === "admin"}
                            onCheckedChange={() => handleToggleRole(user.id)}
                          />
                          <span className="text-xs">Admin</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminUsers;
