
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { activities } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PlayerDashboard() {
  const { user, isLoading, bookings } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'player') {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">You must be logged in as a Player to view this page.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  const myBookings = bookings.filter(b => b.user_id === user.id);
  const myActivities = activities.filter(a => a.user_id === user.id);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome, {user.firstName}!</h1>
        <p className="text-muted-foreground">Here's an overview of your bookings and activities.</p>
      </div>

      <Tabs defaultValue="bookings">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="activities">My Posted Activities</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
              <CardDescription>Manage your upcoming and past facility bookings.</CardDescription>
            </CardHeader>
            <CardContent>
              {myBookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Facility</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myBookings.map(booking => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.facility.name}</TableCell>
                        <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                        <TableCell>{booking.start_time} - {booking.end_time}</TableCell>
                        <TableCell><Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={booking.status === 'Confirmed' ? 'bg-green-600' : ''}>{booking.status}</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="outline" size="sm">View Details</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p>You have no bookings yet. <Link href="/explore" className="text-primary underline">Explore facilities</Link> to get started.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Your Activities</CardTitle>
              <CardDescription>Manage the activities you've posted to the community.</CardDescription>
            </CardHeader>
            <CardContent>
               {myActivities.length > 0 ? (
                <div className="space-y-4">
                  {myActivities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.city} - {new Date(activity.activity_date).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  ))}
                </div>
               ) : (
                <p>You haven't posted any activities. <Link href="/activities/new" className="text-primary underline">Post one now</Link> to connect with other players.</p>
               )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
