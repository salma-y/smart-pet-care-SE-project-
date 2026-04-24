export interface Pet {
  id: string;
  name: string;
  species: "Dog" | "Cat" | "Bird" | "Rabbit" | "Reptile" | "Other";
  breed: string;
  age: string;
  weight: number;
  photoUrl: string;
  microchipId?: string;
  allergies: string[];
  ownerNotes?: string;
}

export const dummyPets: Pet[] = [
  {
    id: "1",
    name: "Mochi",
    species: "Dog",
    breed: "Shiba Inu",
    age: "3 years",
    weight: 10.5,
    photoUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
    microchipId: "981020000123456",
    allergies: ["Chicken", "Pollen"],
    ownerNotes: "Very active, loves squeaky toys. Sometimes stubborn on walks."
  },
  {
    id: "2",
    name: "Pickle",
    species: "Cat",
    breed: "Orange Tabby",
    age: "5 years",
    weight: 5.2,
    photoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
    microchipId: "981020000654321",
    allergies: [],
    ownerNotes: "Prefers wet food. Sleeps 18 hours a day."
  },
  {
    id: "3",
    name: "Banjo",
    species: "Bird",
    breed: "Cockatiel",
    age: "2 years",
    weight: 0.1,
    photoUrl: "https://images.unsplash.com/photo-1522926193341-e9eb1b36bb86?auto=format&fit=crop&w=400&q=80",
    allergies: [],
    ownerNotes: "Sings the Andy Griffith theme song."
  }
];

export interface Vaccination {
  id: string;
  petId: string;
  name: string;
  dateAdministered: string;
  nextDue: string;
  status: "Up to date" | "Due soon" | "Overdue";
}

export const dummyVaccinations: Vaccination[] = [
  { id: "v1", petId: "1", name: "Rabies 3-Year", dateAdministered: "2022-05-10", nextDue: "2025-05-10", status: "Due soon" },
  { id: "v2", petId: "1", name: "DHPP", dateAdministered: "2023-08-15", nextDue: "2024-08-15", status: "Up to date" },
  { id: "v3", petId: "1", name: "Bordetella", dateAdministered: "2022-10-01", nextDue: "2023-10-01", status: "Overdue" },
  { id: "v4", petId: "2", name: "FVRCP", dateAdministered: "2023-11-20", nextDue: "2024-11-20", status: "Up to date" },
  { id: "v5", petId: "2", name: "Rabies 1-Year", dateAdministered: "2023-11-20", nextDue: "2024-11-20", status: "Up to date" }
];

export const dummyLabResults = [
  { id: "l1", petId: "1", date: "2024-01-15", testName: "Complete Blood Count (CBC)", status: "Normal", summary: "All red and white blood cell counts are within the healthy normal range. Mochi is showing excellent overall blood health." },
  { id: "l2", petId: "1", date: "2023-06-10", testName: "Fecal Parasite Screen", status: "Negative", summary: "No parasites or eggs were found in the sample. Keep up with the monthly preventative!" },
  { id: "l3", petId: "2", date: "2024-02-20", testName: "Urinalysis", status: "Review", summary: "Slightly elevated protein levels detected. This is common in older cats but we should monitor it and encourage Pickle to drink more water." },
  { id: "l4", petId: "2", date: "2023-11-20", testName: "Feline Leukemia Virus (FeLV) Screen", status: "Negative", summary: "Pickle is negative for Feline Leukemia." }
];

export const dummyPrescriptions = [
  { id: "p1", petId: "1", medication: "Simparica Trio", dosage: "1 tablet (20mg) monthly", schedule: "Monthly on the 1st", vet: "Dr. Sarah Jenkins", refills: 2 },
  { id: "p2", petId: "1", medication: "Apoquel", dosage: "1 tablet daily", schedule: "Daily with food", vet: "Dr. Michael Chen", refills: 0 },
  { id: "p3", petId: "2", medication: "Revolution Plus", dosage: "1 tube topically monthly", schedule: "Monthly on the 15th", vet: "Dr. Sarah Jenkins", refills: 5 }
];

export const dummyMedicalNotes = [
  { id: "m1", petId: "1", date: "2024-01-15", vet: "Dr. Sarah Jenkins", note: "Annual checkup. Mochi looks great, coat is healthy, teeth have mild tartar build-up. Recommended dental chew treats." },
  { id: "m2", petId: "1", date: "2023-08-15", vet: "Dr. Michael Chen", note: "Presented with mild limping on front right paw. Examined and found a small thorn between pads. Removed, cleaned area. No signs of infection." },
  { id: "m3", petId: "2", date: "2024-02-20", vet: "Dr. Sarah Jenkins", note: "Routine senior bloodwork and urinalysis performed. Weight is stable." }
];

export const dummyWeightHistory = [
  { date: "Jan", weight: 9.8, id: "1" },
  { date: "Feb", weight: 9.9, id: "1" },
  { date: "Mar", weight: 10.1, id: "1" },
  { date: "Apr", weight: 10.0, id: "1" },
  { date: "May", weight: 10.2, id: "1" },
  { date: "Jun", weight: 10.5, id: "1" },
  { date: "Jul", weight: 10.4, id: "1" },
  { date: "Aug", weight: 10.6, id: "1" },
  { date: "Sep", weight: 10.7, id: "1" },
  { date: "Oct", weight: 10.5, id: "1" },
  { date: "Nov", weight: 10.6, id: "1" },
  { date: "Dec", weight: 10.5, id: "1" },
  
  { date: "Jan", weight: 5.4, id: "2" },
  { date: "Jun", weight: 5.3, id: "2" },
  { date: "Dec", weight: 5.2, id: "2" }
];

export const dummyChronicConditions = [
  { id: "c1", petId: "1", date: "2024-04-10", condition: "Seasonal Allergies", severity: 3, notes: "Scratching ears more than usual. Gave Apoquel." },
  { id: "c2", petId: "1", date: "2024-04-12", condition: "Seasonal Allergies", severity: 2, notes: "Slight improvement, less redness." },
  { id: "c3", petId: "1", date: "2024-04-15", condition: "Seasonal Allergies", severity: 1, notes: "Almost back to normal." }
];
