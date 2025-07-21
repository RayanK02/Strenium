import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, Search } from 'lucide-react';
import { facilities, activities } from '@/lib/mock-data';
import FacilityCard from '@/components/FacilityCard';
import ActivityCard from '@/components/ActivityCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/20 to-background">
         <div className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
         <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 text-center items-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Strenium Lite
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Your ultimate destination for booking sports facilities and connecting with fellow players. Find your game, anytime, anywhere.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/explore">
                    Book a Facility
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/activities">
                    Join an Activity
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">How Strenium Works</h2>
              <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide a seamless platform for players and facility owners to connect, play, and manage.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
            <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-card transition-all duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Find Facilities</h3>
              <p className="text-sm text-foreground/70">
                Easily search for football, cricket, and badminton courts near you with our powerful filters.
              </p>
            </div>
            <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-card transition-all duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Book Instantly</h3>
              <p className="text-sm text-foreground/70">
                Check available slots and book your preferred time with a few simple clicks.
              </p>
            </div>
            <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-card transition-all duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Join Activities</h3>
              <p className="text-sm text-foreground/70">
                Connect with the community by joining friendly matches or training sessions posted by other players.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl text-center">Featured Facilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
            {facilities.slice(0, 3).map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl text-center">Latest Activities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
             {activities.slice(0, 3).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
