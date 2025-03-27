import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PopularDestinations } from "@/components/popular-destinations"
import { TravelStats } from "@/components/travel-stats"
import { TripCards } from "@/components/trip-cards"
import { UpcomingTrips } from "@/components/upcoming-trips"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6 md:p-10">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Travel Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <TravelStats />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2">
                <UpcomingTrips />
              </div>
              <div>
                <TripCards />
              </div>
            </div>
            <PopularDestinations />
          </div>
        </main>
      </div>
    </div>
  )
}

