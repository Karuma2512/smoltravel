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

// 🎯 Định nghĩa kiểu dữ liệu Package
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

  // 🔹 Fetch danh sách package từ API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/packages")
      .then((response) => setPackages(response.data))
      .catch((error) => {
        console.error("Error fetching packages:", error);
        toast({ title: "Error", description: "Failed to fetch packages", variant: "destructive" });
      });
  }, []);

  // 🔹 Mở dialog thêm mới package
  const handleAddPackage = useCallback(() => {
    setCurrentPackage(null);
    setIsDialogOpen(true);
  }, []);

  // 🔹 Mở dialog chỉnh sửa package
  const handleEditPackage = useCallback((pkg: PackageData) => {
    setCurrentPackage(pkg);
    setIsDialogOpen(true);
  }, []);

  // 🔹 Xóa package
  const handleDeletePackage = useCallback((packageId: number) => {
    axios
      .delete(`http://localhost:8000/api/packages/${packageId}`)
      .then(() => {
        setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== packageId));
        toast({ title: "Deleted", description: `Package ID ${packageId} has been removed.` });
      })
      .catch((error) => {
        console.error("Error deleting package:", error);
        toast({ title: "Error", description: "Failed to delete package", variant: "destructive" });
      });
  }, [toast]);

  // 🔹 Lưu package (thêm mới hoặc cập nhật)
  const handleSavePackage = useCallback(
    (packageData: PackageData) => {
      if (currentPackage) {
        axios
          .put(`http://localhost:8000/api/packages/${currentPackage.id}`, packageData)
          .then((response) => {
            setPackages((prevPackages) =>
              prevPackages.map((pkg) => (pkg.id === response.data.id ? response.data : pkg))
            );
            toast({ title: "Updated", description: `Package ${packageData.name} has been updated.` });
          })
          .catch((error) => {
            console.error("Error updating package:", error);
            toast({ title: "Error", description: "Failed to update package", variant: "destructive" });
          });
      } else {
        axios
          .post("http://localhost:8000/api/packages", packageData)
          .then((response) => {
            setPackages((prevPackages) => [...prevPackages, response.data]);
            toast({ title: "Created", description: `Package ${packageData.name} has been added.` });
          })
          .catch((error) => {
            console.error("Error creating package:", error);
            toast({ title: "Error", description: "Failed to create package", variant: "destructive" });
          });
      }
      setIsDialogOpen(false);
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.id}</TableCell>
                      <TableCell>
                        <img
                          src={`http://localhost:8000/storage/${pkg.image_url}`}
                          alt={pkg.name}
                          className="h-12 w-20 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.destination}</TableCell>
                      <TableCell>{pkg.duration}</TableCell>
                      <TableCell>${pkg.price}</TableCell>
                      <TableCell>
                        <Badge variant={pkg.status === "active" ? "default" : "secondary"}>{pkg.status}</Badge>
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
