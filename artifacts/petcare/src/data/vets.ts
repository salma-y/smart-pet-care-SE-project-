export interface Vet {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  nextAvailable: string;
  distance: string;
  photoUrl: string;
}

export const dummyVets: Vet[] = [
  {
    id: "v1",
    name: "Dr. Sarah Jenkins",
    specialty: "General Practice",
    rating: 4.9,
    reviews: 128,
    nextAvailable: "Today, 2:00 PM",
    distance: "2.1 miles",
    photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "v2",
    name: "Dr. Michael Chen",
    specialty: "Orthopedics & Surgery",
    rating: 4.8,
    reviews: 94,
    nextAvailable: "Tomorrow, 10:30 AM",
    distance: "3.5 miles",
    photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "v3",
    name: "Dr. Emily Rodriguez",
    specialty: "Feline Specialist",
    rating: 5.0,
    reviews: 215,
    nextAvailable: "Wed, 9:00 AM",
    distance: "1.8 miles",
    photoUrl: "https://images.unsplash.com/photo-1594824432258-f724622bfa0e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "v4",
    name: "Dr. James Wilson",
    specialty: "Avian & Exotic",
    rating: 4.7,
    reviews: 62,
    nextAvailable: "Thu, 1:15 PM",
    distance: "5.2 miles",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "v5",
    name: "Dr. Amanda Foster",
    specialty: "Dermatology",
    rating: 4.9,
    reviews: 110,
    nextAvailable: "Next Mon, 11:00 AM",
    distance: "4.0 miles",
    photoUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80"
  }
];
