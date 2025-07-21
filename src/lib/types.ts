
export type UserRole = 'player' | 'sfo';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface Facility {
  id: number;
  user_id: number;
  name: string;
  city: string;
  sport_type: string;
  hourly_rate: number;
}

export interface Activity {
  id: number;
  user_id: number;
  user: User;
  title: string;
  description: string;
  city: string;
  sport_type: string;
  activity_date: string;
}

export interface Booking {
    id: number;
    user_id: number;
    facility_id: number;
    facility: Facility;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}
