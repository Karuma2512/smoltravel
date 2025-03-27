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
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
    featured: false,
    status: "active",
    image_url: "",
  })

  useEffect(() => {
    if (packageData) {
      setFormData({
        name: packageData.name || "",
        destination: packageData.destination || "",
        duration: packageData.duration || "",
        price: packageData.price ? packageData.price.toString() : "",
        description: packageData.description || "",
        featured: packageData.featured || false,
        status: packageData.status || "active",
        image_url: packageData.image_url || "",
      })
    } else {
      setFormData({
        name: "",
        destination: "",
        duration: "",
        price: "",
        description: "",
        featured: false,
        status: "active",
        image_url: "",
      })
    }
  }, [packageData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submittedData = {
      ...formData,
      price: Number.parseFloat(formData.price),
    }
    onSave(submittedData)
  }

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
            <InputField label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />
            {formData.image_url && <img src={formData.image_url} alt="Package" className="w-full h-40 object-cover rounded-lg" />}
            <SelectField label="Status" name="status" value={formData.status} onChange={handleSelectChange} options={["active", "inactive"]} />
            <SwitchField label="Featured" name="featured" checked={formData.featured} onChange={handleSwitchChange} />
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

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: string[];
}

const SelectField = ({ label, name, value, onChange, options }: SelectFieldProps) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={name} className="text-right">
      {label}
    </Label>
    <Select value={value} onValueChange={(val) => onChange(name, val)}>
      <SelectTrigger id={name} className="col-span-3">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

interface SwitchFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (name: string, checked: boolean) => void;
}

const SwitchField = ({ label, name, checked, onChange }: SwitchFieldProps) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={name} className="text-right">
      {label}
    </Label>
    <div className="flex items-center space-x-2">
      <Switch id={name} checked={checked} onCheckedChange={(val) => onChange(name, val)} />
      <Label htmlFor={name}>{checked ? "Yes" : "No"}</Label>
    </div>
  </div>
);
