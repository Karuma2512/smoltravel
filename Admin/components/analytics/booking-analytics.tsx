"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const bookingTrendsData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 140 },
  { month: "Mar", bookings: 180 },
  { month: "Apr", bookings: 220 },
  { month: "May", bookings: 260 },
  { month: "Jun", bookings: 310 },
  { month: "Jul", bookings: 350 },
  { month: "Aug", bookings: 400 },
  { month: "Sep", bookings: 430 },
  { month: "Oct", bookings: 480 },
  { month: "Nov", bookings: 520 },
  { month: "Dec", bookings: 560 },
]

const bookingStatusData = [
  { name: "Confirmed", value: 65 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 10 },
]

const packageBookingsData = [
  { name: "Bali Adventure", bookings: 120 },
  { name: "Paris Getaway", bookings: 98 },
  { name: "Tokyo Explorer", bookings: 86 },
  { name: "New York City Break", bookings: 72 },
  { name: "Rome & Amalfi Coast", bookings: 65 },
]

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"]

export function BookingAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Booking Trends</CardTitle>
          <CardDescription>Monthly booking trends over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              bookings: {
                label: "Bookings",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingTrendsData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="var(--color-bookings)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Status</CardTitle>
          <CardDescription>Distribution of booking statuses</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="h-[300px] w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Popular Packages</CardTitle>
          <CardDescription>Most booked travel packages</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              bookings: {
                label: "Bookings",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={packageBookingsData} layout="vertical">
                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="bookings" fill="var(--color-bookings)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

