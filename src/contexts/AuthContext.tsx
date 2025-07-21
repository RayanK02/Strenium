
"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole, Booking, Facility } from '@/lib/types';
import { useRouter } from "next/navigation";
import { users as mockUsers, bookings as mockBookings, facilities as mockFacilities } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (userData: Omit<User, 'id'>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  bookings: Booking[];
  addBooking: (facility: Facility, date: Date, slot: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
        setUser(foundUser);
        toast({
            title: "Login Successful",
            description: `Welcome back, ${foundUser.firstName}!`,
        });
        const targetDashboard = foundUser.role === 'sfo' ? '/sfo/dashboard' : '/dashboard';
        router.push(targetDashboard);
    } else {
        toast({
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
        });
    }
  };

  const signup = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Math.floor(Math.random() * 1000) + users.length + 1,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setUser(newUser);
    toast({
        title: "Account Created!",
        description: "You have been successfully signed up.",
    });
    const targetDashboard = newUser.role === 'sfo' ? '/sfo/dashboard' : '/dashboard';
    router.push(targetDashboard);
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  const addBooking = (facility: Facility, date: Date, slot: string) => {
    if (!user) {
        toast({
            title: "Authentication Error",
            description: "You must be logged in to make a booking.",
            variant: "destructive"
        });
        return;
    }

    const newBooking: Booking = {
        id: Math.floor(Math.random() * 1000) + bookings.length + 1,
        user_id: user.id,
        facility_id: facility.id,
        facility: facility,
        booking_date: date.toISOString().split('T')[0],
        start_time: slot.split(' - ')[0],
        end_time: slot.split(' - ')[1],
        status: 'Confirmed' // Or 'Pending' if you want an approval flow
    };

    setBookings(prevBookings => [...prevBookings, newBooking]);

    toast({
        title: "Booking Successful!",
        description: `You've booked ${facility.name} on ${date.toLocaleDateString()} for ${slot}.`,
    });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated: !!user, isLoading, bookings, addBooking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
