"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import axios from "axios"

interface Booking {
  id: number
  booking_date: string
  status: string
  total_price: number
  payment_status: string
  special_request?: string
  number_of_people: number
  user: {
    id: number
    name: string
    email: string
    avatar?: string
  }
  package: {
    id: number
    name: string
    destination: string

  }
}

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/bookings")
      .then(response => setBookings(response.data))
      .catch(error => console.error("Error fetching bookings:", error))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Recent tour bookings and their status</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Thêm div có chiều cao cố định và cho phép cuộn */}
        <div className="max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>People</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Special Request</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.user?.avatar || "/placeholder-user.jpg"} alt={booking.user?.name} />
                        <AvatarFallback>{booking.user?.name?.charAt(0) || "?"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{booking.user?.name}</span>
                        <span className="text-xs text-muted-foreground">{booking.user?.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.package?.name}</TableCell>
                  <TableCell>{booking.package?.destination}</TableCell>
                  <TableCell>{booking.number_of_people}</TableCell>
                  <TableCell>${booking.total_price}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                          booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        booking.payment_status === "paid" ? "bg-green-100 text-green-800" :
                          "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {booking.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.special_request || "N/A"}</TableCell>
                  <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

  )
}
