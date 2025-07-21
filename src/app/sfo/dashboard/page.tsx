
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { facilities } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

export default function SFODashboard() {
  const { user, isLoading, bookings } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'sfo') {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You must be logged in as a Facility Owner to view this page.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  const myFacilities = facilities.filter(f => f.user_id === user.id);
  const myFacilityIds = myFacilities.map(f => f.id);
  const myFacilityBookings = bookings.filter(b => myFacilityIds.includes(b.facility_id));

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">SFO Dashboard</h1>
        <p className="text-muted-foreground">Manage your facilities and bookings, {user.firstName}.</p>
      </div>

      <Tabs defaultValue="facilities">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="facilities">My Facilities</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="facilities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Facilities</CardTitle>
                <CardDescription>View and manage your listed facilities.</CardDescription>
              </div>
              <Button asChild>
                <Link href="/sfo/facilities/new"><PlusCircle className="mr-2 h-4 w-4" /> Add Facility</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {myFacilities.length > 0 ? (
                <div className="space-y-4">
                   {myFacilities.map(facility => (
                     <div key={facility.id} className="flex items-center justify-between p-4 border rounded-lg">
                       <div>
                         <h3 className="font-semibold">{facility.name}</h3>
                         <p className="text-sm text-muted-foreground">{facility.city} - {facility.sport_type}</p>
                       </div>
                       <Button variant="outline" size="sm">Manage</Button>
                     </div>
                   ))}
                 </div>
              ) : (
                <p>You haven't listed any facilities yet. <Link href="/sfo/facilities/new" className="text-primary underline">Add one now</Link> to get started.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>A list of recent bookings for your facilities.</CardDescription>
            </CardHeader>
            <CardContent>
              {myFacilityBookings.length > 0 ? (
                 <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Facility</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myFacilityBookings.map(booking => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.facility.name}</TableCell>
                        <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                        <TableCell>{booking.start_time} - {booking.end_time}</TableCell>
                        <TableCell><Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={booking.status === 'Confirmed' ? 'bg-green-600' : ''}>{booking.status}</Badge></TableCell>
                        <TableCell className="text-right flex gap-2 justify-end">
                            <Button variant="outline" size="sm">Confirm</Button>
                            <Button variant="destructive" size="sm">Cancel</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>No bookings for your facilities yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
