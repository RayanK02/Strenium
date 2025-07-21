import Link from 'next/link';
import type { Facility } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-6">
         <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl mb-2">{facility.name}</CardTitle>
            <Badge variant="secondary">{facility.sport_type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="mr-2 h-4 w-4" />
          {facility.city}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">Rs. {facility.hourly_rate}<span className="text-sm font-normal text-muted-foreground">/hr</span></p>
        <Button asChild>
          <Link href={`/facilities/${facility.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
