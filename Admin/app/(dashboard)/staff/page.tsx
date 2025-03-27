"use client"
import { useState, useEffect } from "react"; // Thêm useEffect ở đây
import axios from "axios";
import { ArrowUpDown, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StaffDialog } from "@/components/staff/staff-dialog";
import { useToast } from "@/components/ui/use-toast";
import api from '../../../services/api';
interface StaffMember {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: string;
  profile_picture_url: string;
  phone: string;
  hireDate: string;
}
export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]); // Khai báo kiểu cho staffMembers
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái hiển thị dialog
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null); // Nhân viên hiện tại đang chỉnh sửa
  const { toast } = useToast();

  // Gọi API để lấy danh sách nhân viên
  useEffect(() => {
    axios.get("http://localhost:8000/api/staff") // Thay URL bằng API thực tế
      .then(response => {
        setStaffMembers(response.data); // Lưu dữ liệu từ API vào state
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
      });
  }, []); // Gọi API chỉ một lần khi component mount


  const fetchStaff = () => {
    axios.get("http://localhost:8000/api/staff")
      .then(response => setStaffMembers(response.data))
      .catch(error => console.error("Lỗi khi lấy danh sách nhân viên:", error));
  };

  const addStaff = (staff: StaffMember) => {
    console.log("Dữ liệu gửi đi:", staff); // Kiểm tra giá trị status
    api.post("staff", staff)
      .then(() => {
        toast({ title: "Staff added successfully" });
        fetchStaff();
        setIsDialogOpen(false);
      })
      .catch(error => console.error("Lỗi khi thêm nhân viên:", error));
  };

  const editStaff = (staff: StaffMember) => {
    api.put(`staff/${staff.id}`, staff)
      .then(() => {
        toast({ title: "Staff updated successfully" });
        fetchStaff();
        setIsDialogOpen(false);
      })
      .catch(error => console.error("Update Staff Error:", error));
  };

  const deleteStaff = (id: string) => {
    axios.delete(`http://localhost:8000/api/staff/${id}`)
      .then(() => {
        toast({ title: "Staff deleted successfully" });
        fetchStaff();
      })
      .catch(error => console.error("Deleted ErrorError:", error));
  };
  const handleSaveStaff = () => {
    fetchStaff(); 
  };
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-muted-foreground">Manage staff members and their information</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
        <StaffDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          staff={currentStaff}
          onSave={handleSaveStaff} // Pass handleSaveStaff to trigger list reload
        onSuccess={handleSaveStaff} // Ensure the list is reloaded when save is successful
   
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff</CardTitle>
          <CardDescription>View and manage all staff members in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
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

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={staff.profile_picture_url || "/placeholder.svg"} alt={staff.name} />
                            <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>
                        <Badge variant={staff.status === "active" ? "default" : "secondary"}>{staff.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              setCurrentStaff(staff); // Cập nhật nhân viên cần sửa
                              setIsDialogOpen(true);  // Mở dialog
                            }}>
                              Edit
                            </DropdownMenuItem>


                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => deleteStaff(staff.id)} // Gọi hàm xoá
                            >
                              Delete
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No staff members found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}

