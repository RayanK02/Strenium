"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { facilities } from "@/lib/mock-data";
import FacilityCard from "@/components/FacilityCard";

export default function ExplorePage() {
  const [cityFilter, setCityFilter] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const filteredFacilities = useMemo(() => {
    return facilities.filter(facility => {
      const cityMatch = cityFilter ? facility.city.toLowerCase().includes(cityFilter.toLowerCase()) : true;
      const sportMatch = sportFilter !== 'all' ? facility.sport_type === sportFilter : true;
      const priceMatch = facility.hourly_rate >= priceRange[0] && facility.hourly_rate <= priceRange[1];
      return cityMatch && sportMatch && priceMatch;
    });
  }, [cityFilter, sportFilter, priceRange]);
  
  const resetFilters = () => {
    setCityFilter('');
    setSportFilter('all');
    setPriceRange([0, 5000]);
  }

  const uniqueSports = ['all', ...Array.from(new Set(facilities.map(f => f.sport_type)))];
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Explore Facilities</h1>
        <p className="text-muted-foreground">Find the perfect spot for your next game.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-20">
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <p className="text-sm text-muted-foreground">Rs. {priceRange[0]} - Rs. {priceRange[1]}</p>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  step={100}
                />
              </div>
              <Button onClick={resetFilters} variant="ghost" className="w-full">Reset Filters</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-3">
          {filteredFacilities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No Facilities Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
