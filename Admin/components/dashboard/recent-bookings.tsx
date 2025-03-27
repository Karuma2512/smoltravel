"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data
const bookings = [
  {
    id: "INV-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-user.jpg",
    },
    package: "Bali Adventure",
    destination: "Bali, Indonesia",
    amount: 1299,
    status: "confirmed",
    date: "2023-06-15",
  },
  {
    id: "INV-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder-user.jpg",
    },
    package: "Paris Getaway",
    destination: "Paris, France",
    amount: 1499,
    status: "pending",
    date: "2023-06-14",
  },
  {
    id: "INV-003",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "/placeholder-user.jpg",
    },
    package: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    amount: 2299,
    status: "confirmed",
    date: "2023-06-13",
  },
  {
    id: "INV-004",
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder-user.jpg",
    },
    package: "New York City Break",
    destination: "New York, USA",
    amount: 999,
    status: "cancelled",
    date: "2023-06-12",
  },
  {
    id: "INV-005",
    customer: {
      name: "Michael Wilson",
      email: "michael@example.com",
      avatar: "/placeholder-user.jpg",
    },
    package: "Rome & Amalfi Coast",
    destination: "Rome, Italy",
    amount: 1899,
    status: "confirmed",
    date: "2023-06-11",
  },
]

export function RecentBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Recent tour bookings and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
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
                      <AvatarImage src={booking.customer.avatar} alt={booking.customer.name} />
                      <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{booking.customer.name}</span>
                      <span className="text-xs text-muted-foreground">{booking.customer.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{booking.package}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell>${booking.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "pending"
                          ? "outline"
                          : "secondary"
                    }
                    className={
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>{booking.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

