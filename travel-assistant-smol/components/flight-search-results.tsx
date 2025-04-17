import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Calendar, ArrowRight, DollarSign } from "lucide-react"

interface FlightSearchResultsProps {
  flights: {
    id: string
    airline: string
    flightNumber: string
    departure: {
      airport: string
      iata: string
      time: string
      date: string
    }
    arrival: {
      airport: string
      iata: string
      time: string
      date: string
    }
    duration: string
    stops: number
    price: {
      amount: number
      currency: string
    }
    seatsAvailable?: number
  }[]
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
}

export default function FlightSearchResults({
  flights,
  origin,
  destination,
  departureDate,
  returnDate,
}: FlightSearchResultsProps) {
  if (!flights || flights.length === 0) {
    return (
      <Card className="w-full border-blue-200 dark:border-blue-800 overflow-hidden mt-1">
        <CardContent className="p-2">
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground">Không tìm thấy chuyến bay nào phù hợp với yêu cầu của bạn.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-blue-200 dark:border-blue-800 overflow-hidden mt-1">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium">
            {origin} → {destination}
          </div>
          <div className="text-xs text-muted-foreground">
            <Calendar className="h-2 w-2 inline mr-1" />
            {departureDate}
            {returnDate && ` - ${returnDate}`}
          </div>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="flex gap-2 min-w-fit">
            {flights.slice(0, 5).map((flight) => (
              <div key={flight.id} className="w-[200px] flex-shrink-0 border rounded-md p-2">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <Plane className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="text-xs font-medium">
                      {flight.airline} {flight.flightNumber}
                    </span>
                  </div>
                  <Badge className="text-[10px] px-1 py-0 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {flight.stops === 0 ? "Trực tiếp" : `${flight.stops} điểm dừng`}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="text-left">
                    <div className="text-sm font-bold">{flight.departure.time}</div>
                    <div className="text-xs">{flight.departure.iata}</div>
                  </div>

                  <div className="flex flex-col items-center mx-1">
                    <div className="text-[10px] text-muted-foreground">{flight.duration}</div>
                    <div className="w-10 h-px bg-gray-300 dark:bg-gray-700 relative">
                      <ArrowRight className="h-2 w-2 absolute -right-1 -top-0.5 text-gray-500" />
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold">{flight.arrival.time}</div>
                    <div className="text-xs">{flight.arrival.iata}</div>
                  </div>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    <DollarSign className="h-3 w-3 inline" />
                    {flight.price.amount} {flight.price.currency}
                  </div>
                  {flight.seatsAvailable && (
                    <div className="text-[10px] text-muted-foreground">{flight.seatsAvailable} ghế trống</div>
                  )}
                </div>

                <Button size="sm" className="w-full mt-1 h-6 text-xs">
                  Chọn
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

