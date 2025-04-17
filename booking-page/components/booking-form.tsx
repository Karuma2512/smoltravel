"use client"
import React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function BookingForm() {
  const [date, setDate] = useState<Date>()
  const [packages, setPackages] = useState<any[]>([])
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    user_id: "1",
    package_id: "",
    booking_date: "",
    status: "pending",
    total_price: "",
    payment_status: "unpaid",
    special_request: "",
    number_of_people: 1,
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/packages")
        const data = await res.json()
        setPackages(data)
      } catch (error) {
        console.error("Lỗi khi lấy packages:", error)
      }
    }

    fetchPackages()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "number_of_people" ? Number.parseInt(value) || 1 : value,
    }))
  }

  const handleNextStep = () => setStep((prev) => prev + 1)
  const handlePrevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
   
    e.preventDefault()
  
    if (!selectedPackage || !date) {
      alert("Chưa chọn gói tour hoặc ngày đặt!")
      return
    }
  
    const token = localStorage.getItem("token") // hoặc từ context nếu bạn dùng
  
    if (!token) {
      alert("Bạn chưa đăng nhập!")
      return
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          package_id: selectedPackage,
          booking_date: date.toISOString().split("T")[0], // format yyyy-mm-dd
          status: "pending",
          total_price: selectedPackageDetails?.price * formData.number_of_people,
          payment_status: "pending",
          special_request: formData.special_request,
          number_of_people: formData.number_of_people,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      })
  
      if (!response.ok) {
        const error = await response.json()
        console.error("Booking failed:", error)
        alert(`Đặt tour thất bại: ${error.message || "Unknown error"}`)
        return
      }
  
      const result = await response.json()
      console.log("Booking success:", result)
      alert("Đặt tour thành công!")
      // Redirect hoặc reset form sau khi đặt thành công
    } catch (error) {
      console.error("Lỗi gửi booking:", error)
      alert("Có lỗi xảy ra khi gửi booking.")
    }
  }
  
  
  

  const selectedPackageDetails = packages.find((pkg) => pkg.id.toString() === selectedPackage)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Booking Details</CardTitle>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full border",
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {s}
                </div>
                {s < 3 && <Separator className="w-8" />}
              </React.Fragment>
            ))}

          </div>
        </div>
        <CardDescription>
          {step === 1 && "Select your preferred package and date"}
          {step === 2 && "Fill in your details"}
          {step === 3 && "Review and confirm your booking"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="package">Package Type</Label>
                <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                  <SelectTrigger id="package">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.id.toString()}>
                        <div className="flex flex-col w-full">
                          <span className="font-medium">{pkg.name}</span>
                          <span className="text-sm text-muted-foreground">${pkg.price} - {pkg.destination}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {["number_of_people", "name", "email", "phone"].map((field) => (
                <div className="space-y-2" key={field}>
                  <Label htmlFor={field}>{field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : field === "number_of_people" ? "number" : "text"}
                    min={field === "number_of_people" ? 1 : undefined}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${field.replace(/_/g, " ")}`}
                    required
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="special_request">Special Requests</Label>
                <Textarea
                  id="special_request"
                  name="special_request"
                  value={formData.special_request}
                  onChange={handleInputChange}
                  placeholder="Any special requests or information we should know"
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-4 space-y-3">
                <h3 className="font-medium mb-4">Booking Summary</h3>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium">{selectedPackageDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{date ? format(date, "PPP") : ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of People:</span>
                  <span className="font-medium">{formData.number_of_people}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                {formData.special_request && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Special Request:</span>
                    <span className="font-medium">{formData.special_request}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="font-medium">Unpaid</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Price:</span>
                  <span>${selectedPackageDetails?.price}</span>
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-4 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-green-700">Your booking is ready to be confirmed!</p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handlePrevStep}>
            Back
          </Button>
        ) : <div />}
        {step < 3 ? (
          <Button
            onClick={handleNextStep}
            disabled={
              (step === 1 && (!date || !selectedPackage)) ||
              (step === 2 && (!formData.number_of_people || !formData.name || !formData.email || !formData.phone))
            }
          >
            Continue
          </Button>
        ) : (
          <Button  onClick={handleSubmit}>Confirm Booking</Button>
        )}
      </CardFooter>
    </Card>
  )
}
