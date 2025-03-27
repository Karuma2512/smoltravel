"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X, Trash2 } from "lucide-react";
import api from '../../services/api'; // Import the axios instance

interface CofounderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cofounder?: any;
  onSuccess: () => void;
  onSave?: (cofounderData: any) => Promise<void>;
}

export function CofounderDialog({
  open,
  onOpenChange,
  cofounder,
  onSuccess,
  onSave,
}: CofounderDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    bio: "",
    profile_picture: "/placeholder.svg?height=40&width=40",
    linkedin: "",
    twitter: "",
    join_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (cofounder) {
      setFormData({
        name: cofounder.name || "",
        email: cofounder.email || "",
        position: cofounder.position || "",
        bio: cofounder.bio || "",
        profile_picture: cofounder.profile_picture || "/placeholder.svg?height=40&width=40",
        linkedin: cofounder.linkedin || "",
        twitter: cofounder.twitter || "",
        join_date: cofounder.join_date || "",
      });
      setAvatarPreview(cofounder.profile_picture || null);
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
        bio: "",
        profile_picture: "/placeholder.svg?height=40&width=40",
        linkedin: "",
        twitter: "",
        join_date: "",
      });
      setAvatarPreview(null);
    }
  }, [cofounder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [profileFile, setProfileFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      setProfileFile(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setFormData((prev) => ({ ...prev, profile_picture: "/placeholder.svg?height=40&width=40" }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formPayload = new FormData();
      
      // Append dữ liệu vào payload
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
  
      // Kiểm tra nếu có file ảnh thì gửi file
      if (profileFile) {
        formPayload.append("profile_picture", profileFile);
      }
  
      // Gửi request API (PUT nếu cập nhật, POST nếu thêm mới)
      const endpoint = cofounder ? `co-founders/${cofounder.id}` : "co-founders";
      const method = cofounder ? api.put : api.post;
  
      await method(endpoint, formPayload);
  
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving cofounder:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!cofounder) return;

    setLoading(true);
    try {
      await api.delete(`co-founders/${cofounder.id}`);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting co-founder:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{cofounder ? "Edit Co-founder" : "Add Co-founder"}</DialogTitle>
            <DialogDescription>
              {cofounder ? "Edit co-founder details" : "Add a new co-founder to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Avatar */}
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
                <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="col-span-3" required />
            </div>

            {/* Position */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">Position</Label>
              <Input id="position" name="position" value={formData.position} onChange={handleChange} className="col-span-3" required />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} className="col-span-3" />
            </div>
            {/* Join Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="join_date" className="text-right">Join Date</Label>
              <Input id="join_date" name="join_date" type="date" value={formData.join_date} onChange={handleChange} className="col-span-3" required />
            </div>

            {/* LinkedIn */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedin" className="text-right">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="col-span-3" />
            </div>

            {/* Twitter */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="twitter" className="text-right">Twitter</Label>
              <Input id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            {cofounder && (
              <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : cofounder ? "Save Changes" : "Add Co-founder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
