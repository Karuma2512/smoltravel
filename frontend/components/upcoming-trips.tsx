import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const upcomingTrips = [
  {
    destination: "Bali, Indonesia",
    dates: "Aug 18 - Aug 30, 2023",
    image: "/placeholder.svg?height=100&width=200",
    status: "Confirmed",
  },
  {
    destination: "Paris, France",
    dates: "Sep 12 - Sep 18, 2023",
    image: "/placeholder.svg?height=100&width=200",
    status: "Planning",
  },
  {
    destination: "Tokyo, Japan",
    dates: "Nov 5 - Nov 15, 2023",
    image: "/placeholder.svg?height=100&width=200",
    status: "Booking",
  },
]

export function UpcomingTrips() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-0.5">
          <CardTitle>Upcoming Trips</CardTitle>
          <CardDescription>Your next adventures await</CardDescription>
        </div>
        <Button className="ml-auto" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTrips.map((trip) => (
            <div key={trip.destination} className="flex items-center gap-4">
              <img
                src={trip.image || "/placeholder.svg"}
                alt={trip.destination}
                className="h-16 w-24 rounded-md object-cover"
              />
              <div className="grid gap-1">
                <h3 className="font-semibold">{trip.destination}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{trip.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      trip.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : trip.status === "Planning"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

