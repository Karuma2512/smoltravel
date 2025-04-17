import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plane, Clock } from "lucide-react"

interface AirportInfoCardProps {
  airport: {
    name: string
    iata: string
    icao?: string
    location: {
      city: string
      country: string
      latitude?: number
      longitude?: number
    }
    timezone?: string
    terminals?: string[]
  }
}

export default function AirportInfoCard({ airport }: AirportInfoCardProps) {
  return (
    <Card className="w-full border-blue-200 dark:border-blue-800 overflow-hidden mt-1">
      <CardContent className="p-2">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-medium text-sm truncate max-w-[200px]">{airport.name}</h3>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <MapPin className="h-2 w-2 mr-1" />
              <span>
                {airport.location.city}, {airport.location.country}
              </span>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
            {airport.iata}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          {airport.icao && (
            <div className="flex items-center text-xs">
              <Plane className="h-2 w-2 mr-1 text-blue-500" />
              <span>ICAO: {airport.icao}</span>
            </div>
          )}

          {airport.timezone && (
            <div className="flex items-center text-xs">
              <Clock className="h-2 w-2 mr-1 text-blue-500" />
              <span>Timezone: {airport.timezone}</span>
            </div>
          )}
        </div>

        {airport.terminals && airport.terminals.length > 0 && (
          <div className="mt-1">
            <div className="text-xs font-medium mb-1">Terminals:</div>
            <div className="flex flex-wrap gap-1">
              {airport.terminals.map((terminal, index) => (
                <Badge key={index} variant="outline" className="text-[10px] px-1 py-0">
                  {terminal}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

