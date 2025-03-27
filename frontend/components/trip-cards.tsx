import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TripCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trip Budget</CardTitle>
        <CardDescription>Your travel expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">Bali Trip</div>
              <div>$2,450</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-full w-[65%] rounded-full bg-primary" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>$1,600 spent</div>
              <div>$2,450 budget</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">Paris Trip</div>
              <div>$1,800</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-full w-[25%] rounded-full bg-primary" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>$450 spent</div>
              <div>$1,800 budget</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">Tokyo Trip</div>
              <div>$3,200</div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-full w-[10%] rounded-full bg-primary" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>$320 spent</div>
              <div>$3,200 budget</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

