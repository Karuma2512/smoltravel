"use client";
import { useEffect, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";


export default function UsersPage() {
  interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    country: string;
    created_at: string;
    deleted_at: string | null;
  }


  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Lưu user đang chọn để ẩn
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hiddenUsers, setHiddenUsers] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))

  }, []);
  const hideUser = (userId: number) => {
    fetch(`http://127.0.0.1:8000/api/users/${userId}/hide`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(() => {
        setUsers(users.filter(user => user.id !== userId)); // Xóa user khỏi danh sách hiện tại
        toast.success("User has been hidden successfully!"); // Hiển thị thông báo thành công
        setIsDialogOpen(false); // Đóng hộp thoại sau khi ẩn
      })
      .catch((error) => {
        console.error("Error hiding user:", error);
        toast.error("Failed to hide user.");
      });
  };
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === "all") {
      return matchesSearch;
    }
    // Nếu chọn "Inactive", chỉ lấy user có deleted_at khác null
    if (statusFilter === "inactive") {
      return matchesSearch && user.deleted_at !== null;
    }

    // Nếu chọn "Active" hoặc "All", chỉ lấy user chưa bị ẩn
    return matchesSearch && user.deleted_at === null;
  });


  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">View registered users of your travel platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View all registered users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Chỉ phần bảng có thể cuộn */}
          <div className="rounded-md border max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableHeader>

              </TableHeader>

              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <TableCell>
                          <Badge variant={user.deleted_at ? "secondary" : "default"}>
                            {user.deleted_at ? "Inactive" : "Active"}
                          </Badge>
                        </TableCell>

                      </TableCell>
                      <TableCell>{user.country}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-center"> {/* Căn giữa nút */}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDialogOpen(true);
                          }}
                        >
                          Hide
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Hide User</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to hide {selectedUser?.name}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>No</Button>
            <Button variant="destructive" onClick={() => hideUser(selectedUser!.id)}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
