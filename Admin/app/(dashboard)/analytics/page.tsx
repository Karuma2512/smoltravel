"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAnalytics } from "@/components/analytics/user-analytics"
import { BookingAnalytics } from "@/components/analytics/booking-analytics"
import { RevenueAnalytics } from "@/components/analytics/revenue-analytics"
import { DestinationAnalytics } from "@/components/analytics/destination-analytics"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Detailed analytics and statistics for your travel business</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserAnalytics />
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <BookingAnalytics />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <RevenueAnalytics />
        </TabsContent>

        <TabsContent value="destinations" className="space-y-4">
          <DestinationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

