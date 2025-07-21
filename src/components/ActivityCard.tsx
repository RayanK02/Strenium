"use client";

import type { Activity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Goal, Swords, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityCardProps {
  activity: Activity;
}

const ShuttlecockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 20.75a2.5 2.5 0 0 0-3.53 0L7 21l-1-1 3-3-2-2-4 4 1 1 3.5 3.5" />
        <path d="M14 11l6-6" />
        <path d="m15 12 3.5 3.5" />
        <path d="m17 14 2.5 2.5" />
        <path d="M7 11.5 5 14" />
        <path d="M8 9.5 7 12" />
        <path d="m11 11-2 2" />
        <path d="m13 9-1 1" />
    </svg>
);


const sportIcons: { [key: string]: React.ReactNode } = {
  Football: <Goal className="h-4 w-4 text-muted-foreground" />,
  Cricket: <Swords className="h-4 w-4 text-muted-foreground" />,
  Badminton: <ShuttlecockIcon className="h-4 w-4 text-muted-foreground" />,
  default: <Trophy className="h-4 w-4 text-muted-foreground" />,
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const { toast } = useToast();

  const handleJoin = () => {
    toast({
      title: 'Activity Joined!',
      description: `You have successfully joined "${activity.title}".`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{activity.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Users className="h-4 w-4" /> Posted by {activity.user.firstName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground">{activity.description}</p>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center gap-2">
            {sportIcons[activity.sport_type] || sportIcons.default}
            <span>{activity.sport_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{activity.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(activity.activity_date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleJoin}>Join Activity</Button>
      </CardFooter>
    </Card>
  );
}
