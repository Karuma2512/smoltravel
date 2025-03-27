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
const popularDestinationsData = [
  { name: "Bali, Indonesia", visits: 4200 },
  { name: "Paris, France", visits: 3800 },
  { name: "Tokyo, Japan", visits: 3500 },
  { name: "New York, USA", visits: 3200 },
  { name: "Rome, Italy", visits: 2900 },
]

const seasonalTrendsData = [
  { month: "Jan", visitors: 2200 },
  { month: "Feb", visitors: 2400 },
  { month: "Mar", visitors: 2800 },
  { month: "Apr", visitors: 3200 },
  { month: "May", visitors: 3600 },
  { month: "Jun", visitors: 4200 },
  { month: "Jul", visitors: 4800 },
  { month: "Aug", visitors: 5000 },
  { month: "Sep", visitors: 4400 },
  { month: "Oct", visitors: 3800 },
  { month: "Nov", visitors: 3200 },
  { month: "Dec", visitors: 2800 },
]

const visitorDemographicsData = [
  { name: "Families", value: 35 },
  { name: "Couples", value: 30 },
  { name: "Solo Travelers", value: 20 },
  { name: "Groups", value: 15 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function DestinationAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Popular Destinations</CardTitle>
          <CardDescription>Most visited destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              visits: {
                label: "Visits",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularDestinationsData} layout="vertical">
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
                <Bar dataKey="visits" fill="var(--color-visits)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Demographics</CardTitle>
          <CardDescription>Types of travelers</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="h-[300px] w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visitorDemographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {visitorDemographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Seasonal Trends</CardTitle>
          <CardDescription>Monthly visitor trends throughout the year</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              visitors: {
                label: "Visitors",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seasonalTrendsData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

