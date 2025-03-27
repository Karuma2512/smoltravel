import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const destinations = [
  {
    name: "Santorini, Greece",
    image: "/placeholder.svg?height=150&width=250",
    rating: 4.9,
    reviews: 1458,
  },
  {
    name: "Kyoto, Japan",
    image: "/placeholder.svg?height=150&width=250",
    rating: 4.8,
    reviews: 1286,
  },
  {
    name: "Machu Picchu, Peru",
    image: "/placeholder.svg?height=150&width=250",
    rating: 4.9,
    reviews: 1672,
  },
  {
    name: "Amalfi Coast, Italy",
    image: "/placeholder.svg?height=150&width=250",
    rating: 4.7,
    reviews: 1124,
  },
]

export function PopularDestinations() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-0.5">
          <CardTitle>Popular Destinations</CardTitle>
          <CardDescription>Trending places to visit</CardDescription>
        </div>
        <Button className="ml-auto" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.name} className="overflow-hidden rounded-lg border">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="h-32 w-full object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium">{destination.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{destination.rating}</span>
                  <span className="text-muted-foreground">({destination.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

