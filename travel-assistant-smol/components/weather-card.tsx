import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Droplets, Thermometer, Sun, CloudRain, CloudSnow, Wind } from "lucide-react"

interface WeatherCardProps {
  location: string
  weather: {
    temperature: number
    condition: string
    humidity: number
    forecast?: {
      date: string
      temperature: number
      condition: string
    }[]
  }
}

export default function WeatherCard({ location, weather }: WeatherCardProps) {
  // Function to get the appropriate weather icon
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return <Sun className="h-4 w-4 text-yellow-500" />
    } else if (conditionLower.includes("rain")) {
      return <CloudRain className="h-4 w-4 text-blue-500" />
    } else if (conditionLower.includes("snow")) {
      return <CloudSnow className="h-4 w-4 text-blue-200" />
    } else if (conditionLower.includes("wind")) {
      return <Wind className="h-4 w-4 text-gray-500" />
    } else {
      return <Cloud className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 overflow-hidden mt-1">
      <CardContent className="p-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm">{location}</h3>
            <div className="flex items-center mt-1">
              <Thermometer className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-base font-bold">{weather.temperature}°C</span>
            </div>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Droplets className="h-2 w-2 mr-1 text-blue-500" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
          </div>
          <div className="flex items-center justify-center p-1 rounded-full bg-white/80 dark:bg-gray-800/80">
            {getWeatherIcon(weather.condition)}
          </div>
        </div>

        <div className="mt-1">
          <p className="text-xs">{weather.condition}</p>
        </div>

        {weather.forecast && (
          <div className="mt-2">
            <h4 className="text-xs font-medium mb-1">Forecast</h4>
            <div className="grid grid-cols-3 gap-1">
              {weather.forecast.map((day, index) => (
                <div key={index} className="text-center p-1 rounded-md bg-white/50 dark:bg-gray-800/50">
                  <div className="text-[10px] text-muted-foreground">{day.date}</div>
                  <div className="my-1">{getWeatherIcon(day.condition)}</div>
                  <div className="text-xs font-medium">{day.temperature}°C</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

