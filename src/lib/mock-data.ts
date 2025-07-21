
import type { User, Facility, Activity, Booking } from './types';

export const users: User[] = [
  { id: 1, firstName: 'Ali', lastName: 'Khan', email: 'player@strenium.com', role: 'player', password: 'password123' },
  { id: 2, firstName: 'Fatima', lastName: 'Ahmed', email: 'sfo@strenium.com', role: 'sfo', password: 'password123' },
];

export const facilities: Facility[] = [
  {
    id: 1,
    user_id: 2,
    name: 'National Stadium',
    city: 'Karachi',
    sport_type: 'Cricket',
    hourly_rate: 3000,
  },
  {
    id: 2,
    user_id: 2,
    name: 'Lahore City Arena',
    city: 'Lahore',
    sport_type: 'Football',
    hourly_rate: 2500,
  },
  {
    id: 3,
    user_id: 2,
    name: 'Islamabad Sports Complex',
    city: 'Islamabad',
    sport_type: 'Badminton',
    hourly_rate: 1500,
  },
    {
    id: 4,
    user_id: 2,
    name: 'Gaddafi Stadium',
    city: 'Lahore',
    sport_type: 'Cricket',
    hourly_rate: 3500,
  },
    {
    id: 5,
    user_id: 2,
    name: 'Karachi United Football Ground',
    city: 'Karachi',
    sport_type: 'Football',
    hourly_rate: 2000,
  },
    {
    id: 6,
    user_id: 2,
    name: 'Rawalpindi Badminton Arena',
    city: 'Rawalpindi',
    sport_type: 'Badminton',
    hourly_rate: 1200,
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    user_id: 1,
    user: users[0],
    title: 'Evening Cricket Match',
    description: 'Looking for players for a friendly T20 match. All skill levels are welcome!',
    city: 'Lahore',
    sport_type: 'Cricket',
    activity_date: '2024-08-15',
  },
  {
    id: 2,
    user_id: 1,
    user: users[0],
    title: 'Weekend Football Game',
    description: 'Casual 7-a-side football game. Let\'s have some fun and a good workout.',
    city: 'Karachi',
    sport_type: 'Football',
    activity_date: '2024-08-17',
  },
  {
    id: 3,
    user_id: 1,
    user: users[0],
    title: 'Badminton Doubles Practice',
    description: 'Need partners for some doubles practice. Intermediate level preferred.',
    city: 'Islamabad',
    sport_type: 'Badminton',
    activity_date: '2024-08-18',
  },
];

export const bookings: Booking[] = [
    {
        id: 1,
        user_id: 1,
        facility_id: 2,
        facility: facilities[1],
        booking_date: '2024-08-20',
        start_time: '18:00',
        end_time: '19:00',
        status: 'Confirmed'
    },
    {
        id: 2,
        user_id: 1,
        facility_id: 3,
        facility: facilities[2],
        booking_date: '2024-08-22',
        start_time: '14:00',
        end_time: '15:00',
        status: 'Pending'
    }
];
