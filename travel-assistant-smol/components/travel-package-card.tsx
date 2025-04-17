import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hotel, DollarSign, MapPin, Clock, Star } from "lucide-react"
import Link from "next/link"

interface TravelPackageProps {
  package: {
    id: string
    name: string
    destination: string
    price: number
    duration: string
    accommodation: string
    transportation: string
    activities: string[]
    rating: number
    image?: string
    description?: string
  }
}

export default function TravelPackageCard({ package: pkg }: TravelPackageProps) {
  return (
    <Card className="overflow-hidden border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="relative h-24 bg-gray-100 dark:bg-gray-800">
        {pkg.image ? (
          <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-full object-cover" />
        ) : (
          <img
            src={`/placeholder.svg?height=96&width=200&text=${pkg.destination}`}
            alt={pkg.destination}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-1 right-1">
          <Badge variant="secondary" className="flex items-center gap-1 bg-white/90 dark:bg-gray-800/90 text-xs py-0">
            <Star className="h-2 w-2 fill-yellow-400 text-yellow-400" />
            {pkg.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-2">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-xs">{pkg.name}</h3>
          <div className="flex items-center text-green-600 dark:text-green-400 font-bold text-xs">
            <DollarSign className="h-3 w-3" />
            {pkg.price.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center text-xs text-muted-foreground mb-1">
          <MapPin className="h-2 w-2 mr-1" />
          {pkg.destination}
        </div>

        <div className="grid grid-cols-2 gap-1 mb-2">
          <div className="flex items-center text-[10px] text-muted-foreground">
            <Clock className="h-2 w-2 mr-1" />
            {pkg.duration}
          </div>
          <div className="flex items-center text-[10px] text-muted-foreground">
            <Hotel className="h-2 w-2 mr-1" />
            {pkg.accommodation}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-[10px] font-medium mb-1">Activities:</div>
          <div className="flex flex-wrap gap-1">
            {pkg.activities.slice(0, 2).map((activity, index) => (
              <Badge key={index} variant="outline" className="text-[10px] px-1 py-0">
                {activity}
              </Badge>
            ))}
            {pkg.activities.length > 2 && (
              <Badge variant="outline" className="text-[10px] px-1 py-0">
                +{pkg.activities.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        <Link href={`/packages/${pkg.id}`} passHref>
          <Button size="sm" className="w-full h-6 text-xs">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

