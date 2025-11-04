"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Home, Loader2 } from "lucide-react";
import type { Property } from "@/components/PropertyCard";

interface CompanyListingsTabProps {
  companyId: string;
}

export function CompanyListingsTab({ companyId }: CompanyListingsTabProps) {
  const [listings, setListings] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchListings();
  }, [companyId]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`/api/properties?company_id=${companyId}`);
      if (response.ok) {
        const data = await response.json();
        setListings(data.properties || []);
      }
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredListings = listings.filter((listing) => {
    if (statusFilter === 'all') return true;
    return listing.status === statusFilter;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Property Listings ({filteredListings.length})</CardTitle>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No listings found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Beds</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div className="relative w-20 h-14 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={listing.imageUrl}
                        alt={listing.address}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{listing.address}</TableCell>
                  <TableCell>{listing.city}</TableCell>
                  <TableCell>€{listing.price.toLocaleString()}</TableCell>
                  <TableCell>{listing.property_type}</TableCell>
                  <TableCell>{listing.beds}</TableCell>
                  <TableCell>
                    <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/en/property/${listing.id}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

