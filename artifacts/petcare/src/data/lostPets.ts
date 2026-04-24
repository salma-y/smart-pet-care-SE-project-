export interface LostPetAlert {
  id: string;
  petName: string;
  species: string;
  breed: string;
  lastSeenLocation: string;
  dateLost: string;
  description: string;
  photoUrl: string;
  contactPhone: string;
  reward?: string;
  status: "Active" | "Found";
}

export const dummyLostPets: LostPetAlert[] = [
  {
    id: "lp1",
    petName: "Bella",
    species: "Dog",
    breed: "Golden Retriever Mix",
    lastSeenLocation: "Oak Park near 4th St",
    dateLost: "2024-05-10T14:30:00Z",
    description: "Wearing a red collar with a bone-shaped tag. Very friendly but might be scared.",
    photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    contactPhone: "(555) 123-4567",
    reward: "$200",
    status: "Active"
  },
  {
    id: "lp2",
    petName: "Shadow",
    species: "Cat",
    breed: "Black Domestic Shorthair",
    lastSeenLocation: "Maple Ave & 10th St",
    dateLost: "2024-05-08T09:00:00Z",
    description: "All black, yellow eyes. Small nick on left ear. No collar. Skittish.",
    photoUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=400&q=80",
    contactPhone: "(555) 987-6543",
    status: "Active"
  },
  {
    id: "lp3",
    petName: "Charlie",
    species: "Dog",
    breed: "Beagle",
    lastSeenLocation: "Riverside Trail",
    dateLost: "2024-05-11T16:45:00Z",
    description: "Older beagle, slightly graying muzzle. Blue harness. Deaf.",
    photoUrl: "https://images.unsplash.com/photo-1537151608804-ea2f1fa3dfc7?auto=format&fit=crop&w=400&q=80",
    contactPhone: "(555) 555-1212",
    reward: "$500",
    status: "Active"
  }
];
