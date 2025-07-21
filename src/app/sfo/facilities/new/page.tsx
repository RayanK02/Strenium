"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const facilitySchema = z.object({
  name: z.string().min(3, "Facility name must be at least 3 characters"),
  sport_type: z.string().min(1, "Please select a sport type"),
  city: z.string().min(1, "City is required"),
  hourly_rate: z.coerce.number().min(1, "Hourly rate must be a positive number"),
  description: z.string().optional(),
});

type FacilityFormValues = z.infer<typeof facilitySchema>;

export default function NewFacilityPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  const form = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      name: "",
      sport_type: "",
      city: "",
      hourly_rate: 1000,
    },
  });

  const onSubmit = (data: FacilityFormValues) => {
    console.log(data);
    toast({
      title: "Facility Listed!",
      description: `${data.name} has been successfully added to your listings.`,
    });
    router.push('/sfo/dashboard');
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (!user || user.role !== 'sfo') {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
       <div className="mb-4">
            <Button variant="ghost" asChild>
                <Link href="/sfo/dashboard"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Dashboard</Link>
            </Button>
       </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">List a New Facility</CardTitle>
          <CardDescription>Fill out the details below to add your facility to Strenium Lite.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facility Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., National Stadium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sport_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a sport" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Football">Football</SelectItem>
                          <SelectItem value="Cricket">Cricket</SelectItem>
                          <SelectItem value="Badminton">Badminton</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Karachi" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>
                <FormField
                    control={form.control}
                    name="hourly_rate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Hourly Rate (PKR)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 2500" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Tell players about your facility..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              <Button type="submit" className="w-full">
                List Facility
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
