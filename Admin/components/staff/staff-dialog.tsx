"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X } from "lucide-react"
import api from '../../services/api';
interface StaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staff: any
  onSave: (staffData: any) => void,
  onSuccess: () => void;

}

export function StaffDialog({ open, onOpenChange, staff, onSave, onSuccess }: StaffDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "Operations",
    status: "active",
    phone: "",
    hireDate: "",
    profile_picture: "/placeholder.svg?height=40&width=40",
  })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  
  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        position: staff.position || "",
        department: staff.department || "Operations",
        status: staff.status || "active",
        phone: staff.phone || "",
        hireDate: staff.hireDate || "",
        profile_picture: staff.profile_picture || "/placeholder.svg?height=40&width=40",
      })
      setAvatarPreview(staff.avatar || null)
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
        department: "Operations",
        status: "active",
        phone: "",
        hireDate: "",
        profile_picture: "/placeholder.svg?height=40&width=40",
      })
      setAvatarPreview(null)
    }
  }, [staff])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

 const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Tạo URL xem trước
    setAvatarPreview(imageUrl);
    setProfileFile(file);
  }
};
const handleRemoveAvatar = () => {
  setAvatarPreview(null);
  setProfileFile(null);
  setFormData((prev) => ({ ...prev, avatar: "/placeholder.svg?height=40&width=40" }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format!");
      return;
    }

    // Kiểm tra ngày tuyển dụng không được ở tương lai
    if (formData.hireDate && new Date(formData.hireDate) > new Date()) {
      alert("Hire date cannot be in the future!");
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("position", formData.position);
      formPayload.append("department", formData.department);
      formPayload.append("status", formData.status);
      formPayload.append("phone", formData.phone);
      formPayload.append("hireDate", formData.hireDate);

      // Kiểm tra nếu có file ảnh thì gửi file
      if (profileFile) {
        formPayload.append("profile_picture", profileFile);
      }

      if (staff) {
        await api.put(`staff/${staff.id}`, formPayload);
      } else {
        await api.post("staff", formPayload);
      }

      onSuccess();
      onOpenChange(false); // Đóng dialog sau khi lưu thành công
      setFormData({
        name: "",
        email: "",
        position: "",
        department: "Operations",
        status: "active",
        phone: "",
        hireDate: "",
        profile_picture: "/placeholder.svg?height=40&width=40",
      });
      setAvatarPreview(null);
      setProfileFile(null); // Xóa ảnh đã chọn
  
    } catch (error) {
      console.error("Error saving staff:", error);
      alert("Failed to save staff. Please try again.");
    }
};



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{staff ? "Edit Staff Member" : "Add Staff Member"}</DialogTitle>
            <DialogDescription>
              {staff ? "Edit staff member details" : "Add a new staff member to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2">
              <Label>Profile Picture</Label>
              <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || formData.profile_picture} />
                <AvatarFallback>{formData.name.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
                {avatarPreview && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={handleRemoveAvatar}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="avatar-upload" className="cursor-pointer text-sm text-primary hover:underline">
                  <div className="flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    {avatarPreview ? "Change Image" : "Upload Image"}
                  </div>
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                <SelectTrigger id="department" className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hireDate" className="text-right">
                Hire Date
              </Label>
              <Input
                id="hireDate"
                name="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
           

          </div>
          <DialogFooter>
            
            <Button type="submit">{staff ? "Save changes" : "Add staff member"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
    }


