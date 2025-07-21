"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { activities } from "@/lib/mock-data";
import ActivityCard from "@/components/ActivityCard";
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function ActivitiesPage() {
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [cityFilter, setCityFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('all');

  const handleFilter = () => {
    let tempActivities = activities;

    if (cityFilter) {
      tempActivities = tempActivities.filter(activity =>
        activity.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (sportFilter !== 'all') {
      tempActivities = tempActivities.filter(activity =>
        activity.sport_type === sportFilter
      );
    }

    setFilteredActivities(tempActivities);
  };
  
  const resetFilters = () => {
      setCityFilter('');
      setSportFilter('all');
      setFilteredActivities(activities);
  }

  const uniqueSports = ['all', ...Array.from(new Set(activities.map(a => a.sport_type)))];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline">Community Activities</h1>
            <p className="text-muted-foreground">Find and join sports activities hosted by players like you.</p>
        </div>
        <Button asChild>
            <Link href="#">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post an Activity
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="city-filter" className="text-sm font-medium">City</label>
                <Input
                  id="city-filter"
                  placeholder="e.g. Lahore"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="sport-filter" className="text-sm font-medium">Sport</label>
                <Select value={sportFilter} onValueChange={setSportFilter}>
                  <SelectTrigger id="sport-filter">
                    <SelectValue placeholder="Select a sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueSports.map(sport => (
                      <SelectItem key={sport} value={sport}>{sport.charAt(0).toUpperCase() + sport.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <Button onClick={handleFilter}>Apply Filters</Button>
                <Button variant="ghost" onClick={resetFilters}>Reset</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No Activities Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
