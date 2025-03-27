import { Calendar, MapPin, Plane, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Trips",
    value: "12",
    icon: Plane,
    description: "3 upcoming",
  },
  {
    title: "Countries Visited",
    value: "8",
    icon: MapPin,
    description: "4 this year",
  },
  {
    title: "Travel Days",
    value: "48",
    icon: Calendar,
    description: "This year",
  },
  {
    title: "Travel Buddies",
    value: "5",
    icon: Users,
    description: "Active friends",
  },
]

export function TravelStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

