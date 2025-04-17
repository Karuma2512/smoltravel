"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Package, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PackageDialog } from "@/components/packages/package-dialog";
import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api"


interface PackageData {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  description?: string;
  featured: boolean;
  status: "active" | "inactive";
  image_url: string;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<PackageData | null>(null);
  const { toast } = useToast();


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/packages")
      .then((response) => setPackages(response.data))
      .catch((error) => {
        console.error("Error fetching packages:", error);
        toast({ title: "Error", description: "Failed to fetch packages", variant: "destructive" });
      });
  }, []);
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast({ title: "Error", description: "Failed to fetch packages", variant: "destructive" });
    }
  };
  
  useEffect(() => {
    fetchPackages();
  }, []);
  
  const handleAddPackage = useCallback(() => {
    setCurrentPackage(null);
    setIsDialogOpen(true);
  }, []);


  const handleEditPackage = useCallback((pkg: PackageData) => {
    setCurrentPackage(pkg);
    setIsDialogOpen(true);
  }, []);

  const handleDeletePackage = useCallback(async (packageId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/packages/${packageId}`);
      toast({ title: "Deleted", description: `Package ID ${packageId} has been removed.` });
  
      fetchPackages(); // Load lại danh sách
    } catch (error) {
      console.error("Error deleting package:", error);
      toast({ title: "Error", description: "Failed to delete package", variant: "destructive" });
    }
  }, [toast]);
  


  const handleSavePackage = useCallback(
    async (packageData: PackageData) => {
      try {
        if (currentPackage) {
          // Cập nhật package
          await api.put(`packages/${currentPackage.id}`, packageData);
          toast({ title: "Updated", description: `Package ${packageData.name} has been updated.` });
        } else {
          // Thêm package mới
          await axios.post("http://localhost:8000/api/packages", packageData);
          toast({ title: "Created", description: `Package ${packageData.name} has been added.` });
        }
  
        setIsDialogOpen(false);
        fetchPackages(); // Load lại danh sách
      } catch (error) {
        console.error("Error saving package:", error);
        toast({ title: "Error", description: "Failed to save package", variant: "destructive" });
      }
    },
    [currentPackage, toast]
  );
  

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Package Management</h2>
          <p className="text-muted-foreground">Manage travel packages and tours</p>
        </div>
        <Button onClick={handleAddPackage}>
          <Package className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </div>

      <Card>
  <CardHeader>
    <CardTitle>Travel Packages</CardTitle>
    <CardDescription>View and manage all travel packages in the system</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="border rounded-md">
    
      <Table>
      <TableHeader style={{ backgroundColor: "#020817", color: "white" }}>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead >Destination</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      {/* Cuộn dữ liệu mà không cuộn tiêu đề */}
      <div className="max-h-[400px] overflow-y-auto">
        <Table>
          <TableBody>
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>
                    <img
                      src={pkg.image_url || "https://via.placeholder.com/100"}
                      alt={pkg.name}
                      className="h-12 w-20 object-cover"
                    />
                  </TableCell>
                  <TableCell>{pkg.name}</TableCell>
                  <TableCell className="p-2 text-center">{pkg.destination}</TableCell>

                  <TableCell>{pkg.duration}</TableCell>
                  <TableCell>${pkg.price}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
                      {pkg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditPackage(pkg)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePackage(pkg.id)}>
                      ❌
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  </CardContent>
</Card>


      <PackageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        package={currentPackage}
        onSave={handleSavePackage}
      />
    </div>
  );
}
