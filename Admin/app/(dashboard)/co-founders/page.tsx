"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useCallback } from "react";

import { ArrowUpDown, MoreHorizontal, Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CofounderDialog } from "@/components/co-founders/cofounder-dialog"
import { useToast } from "@/components/ui/use-toast"

const API_BASE_URL = "http://localhost:8000/api/co-founders";


export default function CoFoundersPage() {
  const [cofounders, setCofounders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCofounder, setCurrentCofounder] = useState<any>(null)
  const { toast } = useToast()

  // Gọi API để lấy danh sách Co-Founder
 
  const fetchCoFounders = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setCofounders(response.data);
    } catch (error) {
      console.error("Error fetching co-founders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch co-founders",
        variant: "destructive",
      });
    }
  }, []);
  useEffect(() => {
    fetchCoFounders()
  }, [fetchCoFounders])

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredCofounders = cofounders.filter((cofounder) =>
    ["name", "position", "email"].some((key) =>
      cofounder[key]?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Xử lý thêm mới Co-founder
  const handleAddCofounder = () => {
    setCurrentCofounder(null)
    setIsDialogOpen(true)
  }

  // Xử lý chỉnh sửa Co-founder
  const handleEditCofounder = (cofounder: any) => {
    setCurrentCofounder({
      id: cofounder.id,
      name: cofounder.name,
      email: cofounder.email,
      position: cofounder.position,
      bio: cofounder.bio || "", 
      linkedin: cofounder.linkedin || "",
      twitter: cofounder.twitter || "",
      join_date: cofounder.join_date || "",
      profile_picture: cofounder.profile_picture || "",
    });
    setIsDialogOpen(true);
  };
  

  // Xử lý xóa Co-founder
  const handleDeleteCofounder = async (cofounderId: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${cofounderId}`)
      toast({
        title: "Co-founder deleted",
        description: `Co-founder ID: ${cofounderId} has been deleted`,
      })
      fetchCoFounders() // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting co-founder:", error)
      toast({
        title: "Error",
        description: "Failed to delete co-founder",
        variant: "destructive",
      })
    }
  }

  // Xử lý lưu dữ liệu (thêm mới hoặc cập nhật)
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveCofounder = async (cofounderData: any) => {
    setIsSaving(true);
    try {
      if (currentCofounder) {
        await axios.put(`${API_BASE_URL}/${currentCofounder.id}`, cofounderData);
        toast({ title: "Updated", description: `${cofounderData.name} updated successfully.` });
      } else {
        await axios.post(API_BASE_URL, cofounderData);
        toast({ title: "Added", description: `${cofounderData.name} added successfully.` });
      }
      fetchCoFounders();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving co-founder:", error);
      toast({ title: "Error", description: "Failed to save co-founder", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Co-founder Management</h2>
          <p className="text-muted-foreground">Manage company co-founders and their information</p>
        </div>
        <Button onClick={handleAddCofounder}>
          <Users className="mr-2 h-4 w-4" />
          Add Co-founder
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Co-founders</CardTitle>
          <CardDescription>View and manage company co-founders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search co-founders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
          <div className="rounded-md border max-h-[400px] overflow-y-auto">
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
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCofounders.length > 0 ? (
                  filteredCofounders.map((cofounder) => (
                    <TableRow key={cofounder.id}>
                      <TableCell className="font-medium">{cofounder.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={cofounder.profile_picture_url || "/placeholder.svg"} alt={cofounder.name} />
                            <AvatarFallback>{cofounder.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{cofounder.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{cofounder.position}</TableCell>
                      <TableCell>{cofounder.email}</TableCell>
                      <TableCell>{cofounder.join_date}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEditCofounder(cofounder)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteCofounder(cofounder.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No co-founders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          </div>
        </CardContent>
      </Card>

      <CofounderDialog 
  open={isDialogOpen} 
  onOpenChange={setIsDialogOpen} 
  cofounder={currentCofounder} 
  onSave={handleSaveCofounder} 
  onSuccess={() => fetchCoFounders()} // Thêm dòng này
/>

    </div>
  )
}
