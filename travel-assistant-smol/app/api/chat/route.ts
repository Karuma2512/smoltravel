import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { z } from "zod"
import { env } from "@/lib/env"
import { findPackagesByDestination, getAllDestinations } from "@/lib/packages"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Lấy danh sách tất cả các điểm đến có sẵn
    const availableDestinations = await getAllDestinations()

    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      system: `You are a helpful travel assistant that specializes in providing travel information in Vietnamese and English.
      You can provide real-time weather updates, suggest travel packages, search for flights, and provide destination images.
      When a user asks about weather, flight information, travel packages, or destination images, use the appropriate tool.
      Keep your responses concise and focused on travel-related queries.
      When showing images, DO NOT add any commentary about the image quality, photographer, or other metadata.
      Just show the images and continue the conversation without mentioning the image information.
      
      For flight searches, always use future dates. If the user doesn't specify a date, suggest searching for flights in the next few days or weeks.
      When the user asks for flights on a specific date, make sure to format the date as YYYY-MM-DD.
      
      We have travel packages available for the following destinations: ${availableDestinations.join(", ")}.
      When a customer asks about travel to any of these destinations, use the getTravelPackages tool to show them our available packages.
      Always include the URL to the package details page in your response, which has the format: http://localhost:3000/packages/[package-id]
      
      When recommending packages, always mention that they can click on "View Details" or visit the URL to see more information.`,
      tools: {
        getWeather: {
          description: "Get the current weather and forecast for a location",
          parameters: z.object({
            location: z.string().describe("The city or location to get weather for"),
          }),
          execute: async ({ location }) => {
            // Simulate API call with mock data
            await new Promise((resolve) => setTimeout(resolve, 500))

            // Return mock weather data for the specified location
            return {
              temperature: Math.round(Math.random() * 15) + 15, // 15-30°C
              condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Stormy"][Math.floor(Math.random() * 5)],
              humidity: Math.round(Math.random() * 50) + 30, // 30-80%
              forecast: Array(3)
                .fill(null)
                .map((_, i) => ({
                  date: new Date(Date.now() + 86400000 * (i + 1)).toLocaleDateString(),
                  temperature: Math.round(Math.random() * 15) + 15,
                  condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Stormy"][Math.floor(Math.random() * 5)],
                })),
            }
          },
        },

        getTravelPackages: {
          description: "Get travel packages for a destination within a budget",
          parameters: z.object({
            destination: z.string().describe("The destination to get travel packages for"),
            budget: z.number().optional().describe("Maximum budget in USD"),
            duration: z.number().optional().describe("Duration in days"),
          }),
          execute: async ({ destination, budget = 1000000, duration = 7 }) => {
            try {
              // Tìm kiếm gói du lịch từ API
              const packages = await findPackagesByDestination(destination)

              // Lọc theo ngân sách nếu có
              const filteredPackages = packages.filter((pkg) => (budget ? pkg.price <= budget : true))

              // Nếu không tìm thấy gói nào, trả về dữ liệu mẫu
              if (filteredPackages.length === 0) {
                // Simulate API call with mock data
                await new Promise((resolve) => setTimeout(resolve, 800))

                // Generate 2-4 mock travel packages
                const numPackages = Math.floor(Math.random() * 3) + 2
                return Array(numPackages)
                  .fill(null)
                  .map((_, i) => ({
                    id: `pkg-${i + 1}`,
                    name: `${duration}-Day ${destination} Adventure`,
                    destination,
                    price: Math.round((Math.random() * budget * 0.8 + budget * 0.2) / 100) * 100,
                    duration: `${duration} days`,
                    accommodation: ["Hotel", "Resort", "Villa", "Apartment"][Math.floor(Math.random() * 4)],
                    transportation: ["Flight", "Train", "Bus", "Car Rental"][Math.floor(Math.random() * 4)],
                    activities: [
                      "Sightseeing Tour",
                      "Beach Day",
                      "Museum Visit",
                      "Local Cuisine Tour",
                      "Hiking",
                      "Shopping Trip",
                      "Cultural Show",
                      "Boat Tour",
                    ]
                      .sort(() => 0.5 - Math.random())
                      .slice(0, Math.floor(Math.random() * 3) + 3),
                    rating: Math.floor(Math.random() * 15 + 35) / 10, // 3.5-5.0
                  }))
              }

              return filteredPackages
            } catch (error) {
              console.error(`Error in getTravelPackages for ${destination}:`, error)

              // Trả về dữ liệu mẫu nếu có lỗi
              const numPackages = Math.floor(Math.random() * 3) + 2
              return Array(numPackages)
                .fill(null)
                .map((_, i) => ({
                  id: `pkg-${i + 1}`,
                  name: `${duration}-Day ${destination} Adventure`,
                  destination,
                  price: Math.round((Math.random() * budget * 0.8 + budget * 0.2) / 100) * 100,
                  duration: `${duration} days`,
                  accommodation: ["Hotel", "Resort", "Villa", "Apartment"][Math.floor(Math.random() * 4)],
                  transportation: ["Flight", "Train", "Bus", "Car Rental"][Math.floor(Math.random() * 4)],
                  activities: [
                    "Sightseeing Tour",
                    "Beach Day",
                    "Museum Visit",
                    "Local Cuisine Tour",
                    "Hiking",
                    "Shopping Trip",
                    "Cultural Show",
                    "Boat Tour",
                  ]
                    .sort(() => 0.5 - Math.random())
                    .slice(0, Math.floor(Math.random() * 3) + 3),
                  rating: Math.floor(Math.random() * 15 + 35) / 10, // 3.5-5.0
                }))
            }
          },
        },

        getFlightStatus: {
          description: "Get the status of a flight",
          parameters: z.object({
            airline: z.string().describe("The airline code (e.g., VN, VJ, UA)"),
            flightNumber: z.string().describe("The flight number"),
            date: z.string().optional().describe("The date of the flight (YYYY-MM-DD)"),
          }),
          execute: async ({ airline, flightNumber, date }) => {
            if (!env.AERODATABOX_API_KEY) {
              // Return mock flight data
              const statuses = ["On Time", "Delayed", "In Air", "Landed", "Scheduled"]
              const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

              const departureTime = `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`

              // Calculate arrival time (1-5 hours later)
              const deptHours = Number.parseInt(departureTime.split(":")[0])
              const deptMinutes = Number.parseInt(departureTime.split(":")[1])
              const flightDurationHours = Math.floor(Math.random() * 5) + 1
              const flightDurationMinutes = Math.floor(Math.random() * 60)

              const arrHours = (deptHours + flightDurationHours) % 24
              const arrMinutes = (deptMinutes + flightDurationMinutes) % 60
              const arrivalTime = `${String(arrHours).padStart(2, "0")}:${String(arrMinutes).padStart(2, "0")}`

              return {
                airline,
                flightNumber,
                departure: {
                  airport: "Origin Airport",
                  iata: "ORG",
                  time: departureTime,
                  terminal: String(Math.floor(Math.random() * 5) + 1),
                  gate: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(Math.random() * 20),
                },
                arrival: {
                  airport: "Destination Airport",
                  iata: "DST",
                  time: arrivalTime,
                  terminal: String(Math.floor(Math.random() * 5) + 1),
                  gate: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Math.floor(Math.random() * 20),
                },
                status: randomStatus,
                aircraft: ["Boeing 787", "Airbus A350", "Boeing 777", "Airbus A321"][Math.floor(Math.random() * 4)],
                duration: `${flightDurationHours}h ${flightDurationMinutes}m`,
              }
            }

            try {
              // Format the date if provided
              const formattedDate = date || new Date().toISOString().split("T")[0]

              // Fetch real flight data from AeroDataBox API
              const response = await fetch(
                `https://aerodatabox.p.rapidapi.com/flights/number/${airline}${flightNumber}/${formattedDate}`,
                {
                  headers: {
                    "X-RapidAPI-Key": env.AERODATABOX_API_KEY!,
                    "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
                  },
                },
              )

              if (!response.ok) {
                throw new Error(`AeroDataBox API error: ${response.status}`)
              }

              const data = await response.json()

              if (!data || data.length === 0) {
                throw new Error("No flight data found")
              }

              // Get the first flight
              const flight = data[0]

              // Format departure info
              const departure = flight.departure || {}
              const departureTime = departure.scheduledTime
                ? new Date(departure.scheduledTime.utc).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A"

              // Format arrival info
              const arrival = flight.arrival || {}
              const arrivalTime = arrival.scheduledTime
                ? new Date(arrival.scheduledTime.utc).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A"

              // Determine flight status
              let status = "Scheduled"
              if (flight.status) {
                status = flight.status
              }

              return {
                airline,
                flightNumber,
                departure: {
                  airport: departure.airport?.name || "Unknown",
                  iata: departure.airport?.iata || "N/A",
                  time: departureTime,
                  terminal: departure.terminal || "N/A",
                  gate: departure.gate || "N/A",
                },
                arrival: {
                  airport: arrival.airport?.name || "Unknown",
                  iata: arrival.airport?.iata || "N/A",
                  time: arrivalTime,
                  terminal: arrival.terminal || "N/A",
                  gate: arrival.gate || "N/A",
                },
                status,
                aircraft: flight.aircraft?.model || "N/A",
                duration: flight.duration ? `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m` : "N/A",
              }
            } catch (error) {
              console.error("Error fetching flight data:", error)

              // Return mock flight data on API error
              return {
                airline,
                flightNumber,
                departure: {
                  airport: "Origin Airport",
                  iata: "ORG",
                  time: "09:00",
                  terminal: "2",
                  gate: "B12",
                },
                arrival: {
                  airport: "Destination Airport",
                  iata: "DST",
                  time: "11:30",
                  terminal: "3",
                  gate: "C45",
                },
                status: "Scheduled",
                aircraft: "Boeing 787",
                duration: "2h 30m",
              }
            }
          },
        },

        searchAirports: {
          description: "Search for airports by name, city, or code",
          parameters: z.object({
            query: z.string().describe("The search query for airport name, city, or code"),
          }),
          execute: async ({ query }) => {
            // Return mock airport data based on the query
            return [
              {
                name: `${query} International Airport`,
                iata: query.length === 3 ? query.toUpperCase() : query.substring(0, 3).toUpperCase(),
                icao: `${query.substring(0, 1).toUpperCase()}${query.substring(0, 3).toUpperCase()}A`,
                location: {
                  city: query,
                  country: "Vietnam",
                  latitude: (Math.random() * 180 - 90).toFixed(6),
                  longitude: (Math.random() * 360 - 180).toFixed(6),
                },
                timezone: "GMT+7",
                terminals: ["T1", "T2", "International"],
              },
            ]
          },
        },

        getDestinationImages: {
          description: "Get images of a travel destination",
          parameters: z.object({
            destination: z.string().describe("The destination to get images for"),
            count: z.number().optional().default(5).describe("Number of images to return"),
          }),
          execute: async ({ destination, count = 5 }) => {
            if (!env.UNSPLASH_ACCESS_KEY) {
              // Return mock image data
              return {
                destination,
                images: Array(count)
                  .fill(null)
                  .map((_, i) => ({
                    url: `/placeholder.svg?height=150&width=150&text=${destination}`,
                    alt: `${destination} image ${i + 1}`,
                  })),
              }
            }

            try {
              const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${encodeURIComponent(destination)}&per_page=${count}&client_id=${env.UNSPLASH_ACCESS_KEY}`,
              )

              if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`)
              }

              const data = await response.json()

              return {
                destination,
                images: data.results.map((photo: any) => ({
                  url: photo.urls.thumb,
                  alt: photo.alt_description || `${destination} travel photo`,
                })),
              }
            } catch (error) {
              console.error("Error fetching destination images:", error)

              // Return mock image data on API error
              return {
                destination,
                images: Array(count)
                  .fill(null)
                  .map((_, i) => ({
                    url: `/placeholder.svg?height=150&width=150&text=${destination}`,
                    alt: `${destination} image ${i + 1}`,
                  })),
              }
            }
          },
        },

        searchFlights: {
          description: "Search for flights between two locations",
          parameters: z.object({
            origin: z.string().describe("Origin airport or city code (e.g., HAN, SGN, NYC)"),
            destination: z.string().describe("Destination airport or city code (e.g., HAN, SGN, NYC)"),
            departureDate: z.string().describe("Departure date in YYYY-MM-DD format"),
            returnDate: z.string().optional().describe("Return date in YYYY-MM-DD format for round trips"),
            adults: z.number().optional().default(1).describe("Number of adult passengers"),
            currency: z.string().optional().default("VND").describe("Currency code for prices (e.g., VND, USD)"),
          }),
          execute: async ({ origin, destination, departureDate, returnDate, adults = 1, currency = "VND" }) => {
            try {
              // Kiểm tra và chuẩn hóa tham số
              const originCode = origin.trim().toUpperCase()
              const destinationCode = destination.trim().toUpperCase()

              // Lấy ngày hiện tại
              const today = new Date()
              today.setHours(0, 0, 0, 0)

              // Tạo ngày mai và ngày kia
              const tomorrow = new Date(today)
              tomorrow.setDate(tomorrow.getDate() + 1)

              const dayAfterTomorrow = new Date(today)
              dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

              // Kiểm tra và điều chỉnh ngày khởi hành
              let depDate
              try {
                depDate = new Date(departureDate)
                // Kiểm tra xem ngày có hợp lệ không
                if (isNaN(depDate.getTime())) {
                  console.log(`Invalid departure date format: ${departureDate}, using tomorrow`)
                  depDate = tomorrow
                }
              } catch (error) {
                console.log(`Error parsing departure date: ${departureDate}, using tomorrow`)
                depDate = tomorrow
              }

              // Kiểm tra xem ngày khởi hành có trong quá khứ không
              if (depDate < today) {
                console.log(`Departure date is in the past: ${departureDate}, using tomorrow`)
                depDate = tomorrow
              }

              // Định dạng ngày khởi hành thành YYYY-MM-DD
              const formattedDepartureDate = depDate.toISOString().split("T")[0]

              // Kiểm tra và điều chỉnh ngày trở về (nếu có)
              let retDate
              let formattedReturnDate

              if (returnDate) {
                try {
                  retDate = new Date(returnDate)
                  // Kiểm tra xem ngày có hợp lệ không
                  if (isNaN(retDate.getTime())) {
                    console.log(`Invalid return date format: ${returnDate}, using day after tomorrow`)
                    retDate = dayAfterTomorrow
                  }
                } catch (error) {
                  console.log(`Error parsing return date: ${returnDate}, using day after tomorrow`)
                  retDate = dayAfterTomorrow
                }

                // Kiểm tra xem ngày trở về có trong quá khứ không
                if (retDate < today) {
                  console.log(`Return date is in the past: ${returnDate}, using day after tomorrow`)
                  retDate = dayAfterTomorrow
                }

                // Kiểm tra xem ngày trở về có trước ngày khởi hành không
                if (retDate < depDate) {
                  console.log(`Return date is before departure date, adjusting to day after departure`)
                  retDate = new Date(depDate)
                  retDate.setDate(retDate.getDate() + 1)
                }

                // Định dạng ngày trở về thành YYYY-MM-DD
                formattedReturnDate = retDate.toISOString().split("T")[0]
              }

              console.log(
                `Searching flights from ${originCode} to ${destinationCode} on ${formattedDepartureDate}${formattedReturnDate ? ` returning on ${formattedReturnDate}` : ""}`,
              )

              // Kiểm tra API key Amadeus
              const apiKey = env.AMADEUS_API_KEY
              const apiSecret = env.AMADEUS_API_SECRET

              if (!apiKey || !apiSecret) {
                console.log("Amadeus API credentials not found, using mock data")
                return generateMockFlightData(
                  originCode,
                  destinationCode,
                  formattedDepartureDate,
                  formattedReturnDate,
                  currency,
                )
              }

              // Lấy token xác thực từ Amadeus
              const tokenResponse = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
              })

              if (!tokenResponse.ok) {
                const tokenError = await tokenResponse.text()
                console.error(`Failed to get Amadeus token: ${tokenResponse.status}`, tokenError)
                throw new Error(`Failed to get Amadeus token: ${tokenResponse.status}`)
              }

              const tokenData = await tokenResponse.json()
              const token = tokenData.access_token
              console.log("Successfully obtained Amadeus token")

              // Tìm kiếm chuyến bay
              let url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destinationCode}&departureDate=${formattedDepartureDate}&adults=${adults}&currencyCode=${currency}&max=5`

              if (formattedReturnDate) {
                url += `&returnDate=${formattedReturnDate}`
              }

              console.log(`Requesting Amadeus API: ${url}`)
              const flightResponse = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })

              const responseText = await flightResponse.text()

              if (!flightResponse.ok) {
                console.error(`Amadeus API error: ${flightResponse.status}`, responseText)
                throw new Error(`Amadeus API error: ${flightResponse.status}`)
              }

              // Parse JSON response
              const flightData = JSON.parse(responseText)
              console.log(`Received ${flightData.data?.length || 0} flight offers`)

              // Kiểm tra nếu không có dữ liệu
              if (!flightData.data || flightData.data.length === 0) {
                console.log("No flights found, returning mock data")
                return generateMockFlightData(
                  originCode,
                  destinationCode,
                  formattedDepartureDate,
                  formattedReturnDate,
                  currency,
                )
              }

              // Xử lý dữ liệu từ Amadeus và chuyển đổi sang định dạng của chúng ta
              const flights = flightData.data
                .map((offer: any) => {
                  try {
                    const itinerary = offer.itineraries[0]
                    const firstSegment = itinerary.segments[0]
                    const lastSegment = itinerary.segments[itinerary.segments.length - 1]

                    return {
                      id: offer.id,
                      airline: firstSegment.carrierCode,
                      flightNumber: firstSegment.number,
                      departure: {
                        airport: firstSegment.departure.iataCode,
                        iata: firstSegment.departure.iataCode,
                        time: firstSegment.departure.at.split("T")[1].substring(0, 5),
                        date: firstSegment.departure.at.split("T")[0],
                      },
                      arrival: {
                        airport: lastSegment.arrival.iataCode,
                        iata: lastSegment.arrival.iataCode,
                        time: lastSegment.arrival.at.split("T")[1].substring(0, 5),
                        date: lastSegment.arrival.at.split("T")[0],
                      },
                      duration: formatDuration(itinerary.duration),
                      stops: itinerary.segments.length - 1,
                      price: {
                        amount: Number.parseFloat(offer.price.total),
                        currency: offer.price.currency,
                      },
                      seatsAvailable: offer.numberOfBookableSeats,
                    }
                  } catch (error) {
                    console.error("Error parsing flight offer:", error)
                    return null
                  }
                })
                .filter(Boolean)

              return {
                flights,
                origin: originCode,
                destination: destinationCode,
                departureDate: formattedDepartureDate,
                returnDate: formattedReturnDate,
              }
            } catch (error) {
              console.error("Error searching flights:", error)
              // Trả về dữ liệu mẫu nếu có lỗi
              return generateMockFlightData(origin, destination, departureDate, returnDate, currency)
            }
          },
        },
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Helper function to generate mock flight data
function generateMockFlightData(
  origin: string,
  destination: string,
  departureDate: string,
  returnDate?: string,
  currency = "VND",
) {
  const airlines = ["VN", "VJ", "BL", "QH", "SQ", "TG", "JL", "KE"]
  const flightNumbers = ["123", "456", "789", "246", "135", "680", "777", "888"]

  // Generate random departure and arrival times
  const generateTime = () => {
    const hours = Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0")
    const minutes = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")
    return `${hours}:${minutes}`
  }

  // Generate random flight duration between 1-10 hours
  const generateDuration = () => {
    const hours = Math.floor(Math.random() * 10) + 1
    const minutes = Math.floor(Math.random() * 60)
    return `${hours}h ${minutes}m`
  }

  // Generate random price
  const generatePrice = (currency: string) => {
    if (currency === "VND") {
      return Math.floor(Math.random() * 10000000) + 1000000
    } else {
      return Math.floor(Math.random() * 1000) + 100
    }
  }

  // Create sample flight list
  const flights = Array(5)
    .fill(null)
    .map((_, index) => {
      const departureTime = generateTime()
      const duration = generateDuration()
      const airline = airlines[Math.floor(Math.random() * airlines.length)]
      const flightNumber = flightNumbers[Math.floor(Math.random() * flightNumbers.length)]
      const stops = Math.floor(Math.random() * 3) // 0-2 stops

      return {
        id: `flight-${index + 1}`,
        airline,
        flightNumber,
        departure: {
          airport: origin,
          iata: origin,
          time: departureTime,
          date: departureDate,
        },
        arrival: {
          airport: destination,
          iata: destination,
          time: departureTime,
          date: departureDate,
        },
        duration,
        stops,
        price: {
          amount: generatePrice(currency),
          currency,
        },
        seatsAvailable: Math.floor(Math.random() * 50) + 1,
      }
    })

  // Sort flights by price
  flights.sort((a, b) => a.price.amount - b.price.amount)

  return {
    flights,
    origin,
    destination,
    departureDate,
    returnDate,
  }
}

// Helper function to format duration
function formatDuration(durationString: string) {
  // Convert PT2H30M format to 2h 30m
  const hourMatch = durationString.match(/(\d+)H/)
  const minuteMatch = durationString.match(/(\d+)M/)

  const hours = hourMatch ? Number.parseInt(hourMatch[1]) : 0
  const minutes = minuteMatch ? Number.parseInt(minuteMatch[1]) : 0

  return `${hours}h ${minutes}m`
}

