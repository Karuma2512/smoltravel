"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { ArrowUpDown, Eye, Globe, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DestinationDialog } from "@/components/destinations/destination-dialog"
import { useToast } from "@/components/ui/use-toast"
import api from "@/services/api"

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [featuredFilter, setFeaturedFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentDestination, setCurrentDestination] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch destinations from the backend API
    axios.get("http://localhost:8000/api/destinations")

      .then(response => {
        setDestinations(response.data)
      })
      .catch(error => {
        toast({
          title: "Error fetching destinations",
          description: error.message,
          variant: "destructive",
        })
      })
  }, [])
 
  const fetchdestiantion = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/destinations");
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching co-founders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch co-founders",
        variant: "destructive",
      });
    }
  }, []);
  useEffect(() => {
    fetchdestiantion()
  }, [fetchdestiantion])

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || destination.status === statusFilter
    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && destination.featured) ||
      (featuredFilter === "not-featured" && !destination.featured)

    return matchesSearch && matchesStatus && matchesFeatured
  })

  const handleAddDestination = () => {
    setCurrentDestination(null)
    setIsDialogOpen(true)
  }
  const handleDeleteDestination = async (destinationId: string) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/destinations/${destinationId}`);
  
      if (response.status === 200 || response.status === 204) {
        setDestinations((prev) => prev.filter(dest => dest.id !== destinationId));
        toast({
          title: "✅ Destination deleted",
          description: `Destination ID: ${destinationId} has been successfully deleted.`,
        });
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      console.error("❌ Error deleting destination:", error.response?.data || error.message);
      toast({
        title: "❌ Error deleting destination",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  const handleEditDestination = (destination: any) => {
    setCurrentDestination(destination)
    setIsDialogOpen(true)
  }
  
  const handleSaveDestination = (destinationData: any) => {
    const request = currentDestination
      ?api.put(`destinations/${currentDestination.id}`, destinationData)
      : api.post("destinations", destinationData)

    request
      .then((response) => {
        if (currentDestination) {
          setDestinations(destinations.map(dest =>
            dest.id === currentDestination.id ? response.data : dest
          ))
        } else {
          setDestinations([response.data, ...destinations])
        }

        toast({
          title: currentDestination ? "Destination updated" : "Destination created",
          description: `Destination ${destinationData.name} has been ${currentDestination ? "updated" : "created"}`,
        })
        setIsDialogOpen(false)
      })
      .catch(error => {
        toast({
          title: "Error saving destination",
          description: error.message,
          variant: "destructive",
        })
      })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Destination Management</h2>
          <p className="text-muted-foreground">Manage travel destinations</p>
        </div>
        <Button onClick={handleAddDestination}>
          <Globe className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Destinations</CardTitle>
          <CardDescription>View and manage all destinations in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="not-featured">Not Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
          <div className="rounded-md border max-h-[400px] overflow-y-auto">
    <Table>
      <TableHeader className="table-header">
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>
            <div className="flex items-center">
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filteredDestinations.map((destination) => (
          <TableRow key={destination.id}>
            <TableCell className="font-medium">{destination.id}</TableCell>
            <TableCell>
              <img
                src={destination.image_url || "/placeholder.svg"}
                alt={destination.name}
                className="h-12 w-20 rounded-md object-cover"
              />
            </TableCell>
            <TableCell>{destination.name}</TableCell>
            <TableCell>{destination.country}</TableCell>
            <TableCell>
              <Badge variant={destination.status === "active" ? "default" : "secondary"}>
                {destination.status}
              </Badge>
            </TableCell>
            <TableCell>
              {destination.featured ? (
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                >
                  Featured
                </Badge>
              ) : (
                <Badge variant="outline">Regular</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => handleEditDestination(destination)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" /> View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDeleteDestination(destination.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
</div>

        </CardContent>
      </Card>

      <DestinationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        destination={currentDestination}
        onSave={handleSaveDestination}
        onSuccess={() => console.log("Destination saved successfully!")} 
      />
    </div>
  )
}
