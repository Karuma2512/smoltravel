"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Calendar,
  Flag,
  Package,
  ArrowLeft,
  LogOut
} from "lucide-react"
import useAuth from "@/hooks/token"

export default function ProfilePage() {
  const { user, token, logout, loading } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
type Package = {
  id: number
  name: string
  status: "active" | "inactive"
  price: string
}

type User = {
  name: string
  email: string
  age: number
  country: string
  avatar?: string
  packages: Package[]
}

  useEffect(() => {
    if (!loading && !user) router.push("/login")
  }, [loading, user, router])

  const handleBack = () => router.back()

  const handleLogout = () => {
    setIsLoggingOut(true)
    logout()
  }

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Đang tải dữ liệu...</p>
      </div>
    )
  }

  const packages = Array.isArray(user.packages) ? user.packages : []

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <Button variant="outline" size="icon" onClick={handleBack} className="mr-2" aria-label="Quay lại">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut} className="flex items-center">
          <LogOut className="h-4 w-4 mr-2" />
          {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Thông tin cá nhân */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || ""} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Mail className="h-4 w-4 mr-1" />
                {user.email}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Age</p>
                  <p>{user.age}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Flag className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Nationality</p>
                  <p>{user.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danh sách gói đã mua */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Packages
            </CardTitle>
            <CardDescription>List of purchased packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <div key={pkg.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">{pkg.name}</h3>
                      </div>
                      <div className="mt-2 sm:mt-0 flex items-center gap-2">
                        <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
                          {pkg.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                        </Badge>
                        <span className="text-sm font-medium">{pkg.price}</span>
                      </div>
                    </div>
                    {index < packages.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Bạn chưa mua gói nào.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
