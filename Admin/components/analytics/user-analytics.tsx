"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data
const userGrowthData = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1400 },
  { month: "Mar", users: 1800 },
  { month: "Apr", users: 2200 },
  { month: "May", users: 2600 },
  { month: "Jun", users: 3100 },
  { month: "Jul", users: 3500 },
  { month: "Aug", users: 4000 },
  { month: "Sep", users: 4300 },
  { month: "Oct", users: 4800 },
  { month: "Nov", users: 5200 },
  { month: "Dec", users: 5600 },
]

const userDemographicsData = [
  { age: "18-24", count: 1200 },
  { age: "25-34", count: 2400 },
  { age: "35-44", count: 1800 },
  { age: "45-54", count: 1100 },
  { age: "55-64", count: 700 },
  { age: "65+", count: 400 },
]

const userActivityData = [
  { day: "Mon", active: 2400, new: 400 },
  { day: "Tue", active: 2200, new: 380 },
  { day: "Wed", active: 2600, new: 450 },
  { day: "Thu", active: 2900, new: 470 },
  { day: "Fri", active: 3100, new: 520 },
  { day: "Sat", active: 3500, new: 580 },
  { day: "Sun", active: 3200, new: 540 },
]

export function UserAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly user growth over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              users: {
                label: "Users",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Daily active users and new registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              active: {
                label: "Active Users",
                color: "hsl(var(--chart-1))",
              },
              new: {
                label: "New Users",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="active" fill="var(--color-active)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="var(--color-new)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Demographics</CardTitle>
          <CardDescription>Age distribution of users</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Users",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userDemographicsData}>
                <XAxis dataKey="age" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

