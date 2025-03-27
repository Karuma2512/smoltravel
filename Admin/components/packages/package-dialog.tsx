"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface PackageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  package: any
  onSave: (packageData: any) => void
}

export function PackageDialog({ open, onOpenChange, package: packageData, onSave }: PackageDialogProps) {
  
  const [formData, setFormData] = useState<{
    name: string
    destination: string
    duration: string
    price: string
    description: string
    featured: boolean
    status: string
    image_file: File | null
    image_url: string
  }>({
    name: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
    featured: false,
    status: "active",
    image_file: null,
    image_url: "",
  })


  useEffect(() => {

    if (packageData!==null) {
    
  
      setFormData({
        name: packageData.name ,
        destination: packageData.destination || "",
        duration: packageData.duration || "",
        price: packageData.price ? packageData.price.toString() : "",
        description: packageData.description || "",
        featured: packageData.featured === 1 || packageData.featured === true,  // Kiểm tra kỹ
        status: packageData.status || "inactive",
        image_file: null,
        image_url: packageData.image_url || "",
      });
    } else {
      setFormData({
        name: "",
        destination: "",
        duration: "",
        price: "",
        description: "",
        featured: false,
        status: "inactive",
        image_file: null,
        image_url: "",
      });
    }
    console.log(formData)
  }, [packageData]);
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image_file: file,
    }));
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const submittedData = new FormData();
    submittedData.append("name", formData.name);
    submittedData.append("destination", formData.destination);
    submittedData.append("duration", formData.duration);
    submittedData.append("price", formData.price);
    submittedData.append("description", formData.description);
  

    submittedData.append("featured", formData.featured ? "1" : "0");
    submittedData.append("status", formData.status || "inactive");
  
    if (formData.image_file) {
      submittedData.append("image", formData.image_file);
    } else if (formData.image_url) {
      submittedData.append("image_url", formData.image_url);
    }
  console.log(submittedData)
    onSave(submittedData);
   
  };
  


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{packageData ? "Edit Package" : "Add Package"}</DialogTitle>
            <DialogDescription>
              {packageData ? "Edit package details" : "Add a new travel package to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputField label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <InputField label="Destination" name="destination" value={formData.destination} onChange={handleChange} required />
            <InputField label="Duration" name="duration" value={formData.duration} onChange={handleChange} required placeholder="e.g. 7 days" />
            <InputField label="Price ($)" name="price" type="number" value={formData.price} onChange={handleChange} required min="0" step="0.01" />
            <TextareaField label="Description" name="description" value={formData.description} onChange={handleChange} />
            <InputField label="Upload Image" name="image_file" type="file" onChange={handleFileChange} accept="image/*" />

            {formData.image_url && <img src={formData.image_url} alt="Package" className="w-full h-40 object-cover rounded-lg" />}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
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
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, featured: checked }))
                }
              />


            </div>

          </div>
          <DialogFooter>
            <Button type="submit">{packageData ? "Save changes" : "Add package"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const InputField = ({ label, name, ...props }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={name} className="text-right">
      {label}
    </Label>
    <Input id={name} name={name} className="col-span-3" {...props} />
  </div>
);

const TextareaField = ({ label, name, ...props }: { label: string; name: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={name} className="text-right">
      {label}
    </Label>
    <Textarea id={name} name={name} className="col-span-3" rows={3} {...props} />
  </div>
);
