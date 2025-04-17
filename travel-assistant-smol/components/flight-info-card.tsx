import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Calendar, ArrowRight } from "lucide-react"

interface FlightInfoCardProps {
  flight: {
    airline: string
    flightNumber: string
    departure: {
      airport: string
      iata: string
      time: string
      terminal?: string
      gate?: string
    }
    arrival: {
      airport: string
      iata: string
      time: string
      terminal?: string
      gate?: string
    }
    status: string
    aircraft?: string
    duration?: string
  }
}

export default function FlightInfoCard({ flight }: FlightInfoCardProps) {
  // Function to determine status color
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("on time") || statusLower.includes("landed") || statusLower.includes("scheduled")) {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    } else if (statusLower.includes("delayed") || statusLower.includes("diverted")) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    } else if (statusLower.includes("cancelled")) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
    } else {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    }
  }

  return (
    <Card className="w-full border-blue-200 dark:border-blue-800 overflow-hidden mt-1">
      <CardContent className="p-2">
        <div className="flex justify-between items-start mb-1">
          <div>
            <div className="flex items-center">
              <Plane className="h-3 w-3 mr-1 text-blue-500" />
              <span className="font-medium text-xs">
                {flight.airline} {flight.flightNumber}
              </span>
            </div>
            <Badge className={`mt-1 text-[10px] px-1 py-0 ${getStatusColor(flight.status)}`}>{flight.status}</Badge>
          </div>
          {flight.duration && (
            <div className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-2 w-2 mr-1" />
              {flight.duration}
            </div>
          )}
        </div>

        <div className="flex items-stretch justify-between mt-2">
          <div className="text-left">
            <div className="text-sm font-bold">{flight.departure.time}</div>
            <div className="font-medium text-xs">{flight.departure.iata}</div>
            <div className="text-[10px] text-muted-foreground truncate max-w-[80px]">{flight.departure.airport}</div>
          </div>

          <div className="flex flex-col items-center justify-center px-2">
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700 relative">
              <ArrowRight className="h-3 w-3 absolute -right-1 -top-1 text-gray-500" />
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              <Calendar className="h-2 w-2 inline mr-1" />
              {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-bold">{flight.arrival.time}</div>
            <div className="font-medium text-xs">{flight.arrival.iata}</div>
            <div className="text-[10px] text-muted-foreground truncate max-w-[80px]">{flight.arrival.airport}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

