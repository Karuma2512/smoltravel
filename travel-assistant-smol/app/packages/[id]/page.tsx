import { findPackageById } from "@/lib/packages"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hotel, MapPin, Clock, Star, Calendar, Plane, Camera } from "lucide-react"
import Link from "next/link"

export default async function PackageDetailsPage({ params }: { params: { id: string } }) {
  const packageId = params.id
  const packageDetails = await findPackageById(packageId)

  if (!packageDetails) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Package Not Found</h1>
        <p className="mb-4">Sorry, the travel package you're looking for doesn't exist.</p>
        <Link href="/" passHref>
          <Button>Return to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{packageDetails.name}</CardTitle>
                <Badge className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {packageDetails.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="h-48 md:h-64 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4">
                  {packageDetails.image ? (
                    <img
                      src={packageDetails.image || "/placeholder.svg"}
                      alt={packageDetails.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={`/placeholder.svg?height=300&width=600&text=${packageDetails.destination}`}
                      alt={packageDetails.destination}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex items-center text-lg mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-medium">{packageDetails.destination}</span>
                </div>

                <p className="text-muted-foreground">
                  {packageDetails.description ||
                    `Experience the beauty of ${packageDetails.destination} with our exclusive travel package. Enjoy comfortable accommodations, convenient transportation, and exciting activities.`}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <Clock className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">Duration</span>
                  <span className="text-sm">{packageDetails.duration}</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <Hotel className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">Accommodation</span>
                  <span className="text-sm">{packageDetails.accommodation}</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <Plane className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">Transportation</span>
                  <span className="text-sm">{packageDetails.transportation}</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <Calendar className="h-6 w-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium">Availability</span>
                  <span className="text-sm">Year-round</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Activities Included</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {packageDetails.activities.map((activity, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Camera className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Price</span>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {packageDetails.price.toLocaleString()} VND
                  </div>
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  Price includes all accommodations, transportation, and listed activities.
                </div>

                <Button className="w-full mb-2">Book Now</Button>
                <Button variant="outline" className="w-full">
                  Contact Us
                </Button>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">What's Included:</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {packageDetails.accommodation}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {packageDetails.transportation}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {packageDetails.transportation}
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    All activities listed
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Tour guide
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

