"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import api from '../../services/api'; // Import the axios instance

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface DestinationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  destination: any
  onSave: (destinationData: any) => void
  onSuccess: ()=>void
}

export function DestinationDialog({ open,  onSuccess, onOpenChange, destination, onSave }: DestinationDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    featured: false,
    status: "active",
    image_url: "/placeholder.svg?height=100&width=200",
  })
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
 const [imagePreview, setImagePreview] = useState<string | null>(null); 
 useEffect(() => {
  if (destination) {
    setFormData({
      name: destination.name || "",
      country: destination.country || "",
      description: destination.description || "",
      featured: destination.featured || false,
      status: destination.status || "active",
      image_url: destination.image_url || "", // Để giá trị rỗng nếu không có URL
    });
  } else {
    setFormData({
      name: "",
      country: "",
      description: "",
      featured: false,
      status: "active",
      image_url: "", // Không đặt lại placeholder
    });
  }
}, [destination]);

  
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
const handleDeleteDestination = async () => {
    if (!destination) return;

    setLoading(true);
    try {
      await api.delete(`co-founders/${destination.id}`);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting co-founder:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    // Kiểm tra URL hợp lệ
    if (!isValidUrl(formData.image_url)) {
      alert("Image URL is not valid! Please enter a valid URL.");
      setLoading(false);
      return;
    }
  
    try {
      const formPayload = new FormData();
  
    
Object.entries(formData).forEach(([key, value]) => {
  if (key === "featured") {
    formPayload.append(key, key === "featured" ? (value ? "1" : "0") : value as string);
  } else {
    formPayload.append(key, value as string);
  }
});
      
      
  
      formPayload.append("image_url", formData.image_url); // Gửi ảnh bằng URL
  
      const endpoint = destination ? `destinations/${destination.id}` : "destinations";
      const method = destination ? api.put : api.post;
  
      await method(endpoint, formPayload);
  
      onSuccess();
      console.log("✅ Đã gọi onOpenChange(false)"); 
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving destination:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{destination ? "Edit Destination" : "Add Destination"}</DialogTitle>
            <DialogDescription>
              {destination ? "Edit destination details" : "Add a new destination to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} className="col-span-3" />

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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                />
                <Label htmlFor="featured">{formData.featured ? "Yes" : "No"}</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{destination ? "Save changes" : "Add destination"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

