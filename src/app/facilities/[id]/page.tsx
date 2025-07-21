
"use client";

import { useParams } from 'next/navigation';
import { facilities } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m19 13-1-1" />
        <path d="M6 13h5" />
        <path d="M13 13s-2-2-4-2" />
        <path d="M4 21 16.5 4" />
    </svg>
);


export default function FacilityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const facility = facilities.find(f => f.id === parseInt(id));
  const { toast } = useToast();
  const { isAuthenticated, addBooking } = useAuth();
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!facility) {
    notFound();
  }
  
  const availableSlots = [
      '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '14:00 - 15:00',
      '15:00 - 16:00', '16:00 - 17:00', '18:00 - 19:00', '19:00 - 20:00'
  ];

  const handleBooking = () => {
    if (!date || !selectedSlot) {
        toast({
            title: "Booking Error",
            description: "Please select a date and a time slot.",
            variant: "destructive",
        });
        return;
    }
    if(facility) {
        addBooking(facility, date, selectedSlot);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="mt-8">
            <h1 className="text-3xl font-bold font-headline mb-2">{facility.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5"/> {facility.city}
              </div>
              <div className="flex items-center gap-2">
                <RupeeIcon className="h-5 w-5"/> {facility.hourly_rate} / hour
              </div>
            </div>
             <p className="text-foreground/80">
                Welcome to {facility.name}, a premier destination for {facility.sport_type} enthusiasts in {facility.city}. Our state-of-the-art facility provides the perfect environment for both competitive matches and casual play.
             </p>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Book Your Slot</CardTitle>
              <CardDescription>Select a date and time to reserve the facility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                </div>
                <div>
                    <h3 className="font-semibold mb-4 text-lg">Available Slots for {date?.toLocaleDateString()}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {availableSlots.map(slot => (
                            <Button 
                                key={slot}
                                variant={selectedSlot === slot ? "default" : "outline"}
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {slot.split(' ')[0]}
                            </Button>
                        ))}
                    </div>
                </div>
                {isAuthenticated ? (
                    <Button size="lg" className="w-full" onClick={handleBooking} disabled={!date || !selectedSlot}>
                        Confirm Booking
                    </Button>
                ) : (
                    <div className="text-center p-4 border-dashed border-2 rounded-lg">
                        <p className="mb-2 text-muted-foreground">You need to be logged in to book.</p>
                        <Button asChild>
                            <Link href="/login">Login to Book</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
