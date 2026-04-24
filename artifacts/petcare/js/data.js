/* ============================================================
   PetWell — Data Layer
   This file is the boundary for future PHP integration:
   replace these JS arrays with `fetch()` calls to PHP endpoints
   that return the same JSON shapes. The rendering code does
   not import data directly — it reads from window.PetData.
   ============================================================ */

window.PetData = (function () {
  const pets = [
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
      ownerNotes: "Very active, loves squeaky toys. Sometimes stubborn on walks.",
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
      ownerNotes: "Prefers wet food. Sleeps 18 hours a day.",
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
      ownerNotes: "Sings the Andy Griffith theme song.",
    },
  ];

  const vaccinations = [
    { id: "v1", petId: "1", name: "Rabies 3-Year", dateAdministered: "2022-05-10", nextDue: "2025-05-10", status: "Due soon" },
    { id: "v2", petId: "1", name: "DHPP", dateAdministered: "2023-08-15", nextDue: "2024-08-15", status: "Up to date" },
    { id: "v3", petId: "1", name: "Bordetella", dateAdministered: "2022-10-01", nextDue: "2023-10-01", status: "Overdue" },
    { id: "v4", petId: "2", name: "FVRCP", dateAdministered: "2023-11-20", nextDue: "2024-11-20", status: "Up to date" },
    { id: "v5", petId: "2", name: "Rabies 1-Year", dateAdministered: "2023-11-20", nextDue: "2024-11-20", status: "Up to date" },
  ];

  const labResults = [
    { id: "l1", petId: "1", date: "2024-01-15", testName: "Complete Blood Count (CBC)", status: "Normal", summary: "All red and white blood cell counts are within the healthy normal range. Mochi is showing excellent overall blood health." },
    { id: "l2", petId: "1", date: "2023-06-10", testName: "Fecal Parasite Screen", status: "Negative", summary: "No parasites or eggs were found in the sample. Keep up with the monthly preventative!" },
    { id: "l3", petId: "2", date: "2024-02-20", testName: "Urinalysis", status: "Review", summary: "Slightly elevated protein levels detected. This is common in older cats but we should monitor it and encourage Pickle to drink more water." },
    { id: "l4", petId: "2", date: "2023-11-20", testName: "Feline Leukemia Virus (FeLV) Screen", status: "Negative", summary: "Pickle is negative for Feline Leukemia." },
  ];

  const prescriptions = [
    { id: "p1", petId: "1", medication: "Simparica Trio", dosage: "1 tablet (20mg) monthly", schedule: "Monthly on the 1st", vet: "Dr. Sarah Jenkins", refills: 2 },
    { id: "p2", petId: "1", medication: "Apoquel", dosage: "1 tablet daily", schedule: "Daily with food", vet: "Dr. Michael Chen", refills: 0 },
    { id: "p3", petId: "2", medication: "Revolution Plus", dosage: "1 tube topically monthly", schedule: "Monthly on the 15th", vet: "Dr. Sarah Jenkins", refills: 5 },
  ];

  const medicalNotes = [
    { id: "m1", petId: "1", date: "2024-01-15", vet: "Dr. Sarah Jenkins", note: "Annual checkup. Mochi looks great, coat is healthy, teeth have mild tartar build-up. Recommended dental chew treats." },
    { id: "m2", petId: "1", date: "2023-08-15", vet: "Dr. Michael Chen", note: "Presented with mild limping on front right paw. Examined and found a small thorn between pads. Removed, cleaned area. No signs of infection." },
    { id: "m3", petId: "2", date: "2024-02-20", vet: "Dr. Sarah Jenkins", note: "Routine senior bloodwork and urinalysis performed. Weight is stable." },
  ];

  const weightHistory = [
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
    { date: "Dec", weight: 5.2, id: "2" },
  ];

  const chronicConditions = [
    { id: "c1", petId: "1", date: "2024-04-10", condition: "Seasonal Allergies", severity: 3, notes: "Scratching ears more than usual. Gave Apoquel." },
    { id: "c2", petId: "1", date: "2024-04-12", condition: "Seasonal Allergies", severity: 2, notes: "Slight improvement, less redness." },
    { id: "c3", petId: "1", date: "2024-04-15", condition: "Seasonal Allergies", severity: 1, notes: "Almost back to normal." },
  ];

  const vets = [
    { id: "v1", name: "Dr. Sarah Jenkins", specialty: "General Practice", rating: 4.9, reviews: 128, nextAvailable: "Today, 2:00 PM", distance: "2.1 miles", photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" },
    { id: "v2", name: "Dr. Michael Chen", specialty: "Orthopedics & Surgery", rating: 4.8, reviews: 94, nextAvailable: "Tomorrow, 10:30 AM", distance: "3.5 miles", photoUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80" },
    { id: "v3", name: "Dr. Emily Rodriguez", specialty: "Feline Specialist", rating: 5.0, reviews: 215, nextAvailable: "Wed, 9:00 AM", distance: "1.8 miles", photoUrl: "https://images.unsplash.com/photo-1594824432258-f724622bfa0e?auto=format&fit=crop&w=400&q=80" },
    { id: "v4", name: "Dr. James Wilson", specialty: "Avian & Exotic", rating: 4.7, reviews: 62, nextAvailable: "Thu, 1:15 PM", distance: "5.2 miles", photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
    { id: "v5", name: "Dr. Amanda Foster", specialty: "Dermatology", rating: 4.9, reviews: 110, nextAvailable: "Next Mon, 11:00 AM", distance: "4.0 miles", photoUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80" },
  ];

  const appointments = [
    { id: "a1", petId: "1", vetId: "v1", date: "2024-06-15", time: "10:00 AM", type: "Annual Checkup", status: "Upcoming", notes: "Mochi needs his updated rabies tag." },
    { id: "a2", petId: "2", vetId: "v3", date: "2024-06-22", time: "2:30 PM", type: "Consultation", status: "Upcoming", notes: "Checking on Pickle's water intake." },
    { id: "a3", petId: "3", vetId: "v4", date: "2024-07-05", time: "11:15 AM", type: "Beak Trim", status: "Upcoming" },
    { id: "a4", petId: "1", vetId: "v1", date: "2024-01-15", time: "09:00 AM", type: "Annual Checkup", status: "Completed" },
    { id: "a5", petId: "2", vetId: "v3", date: "2024-02-20", time: "3:00 PM", type: "Lab Results Review", status: "Completed" },
    { id: "a6", petId: "1", vetId: "v2", date: "2023-08-15", time: "1:30 PM", type: "Emergency Visit", status: "Completed", notes: "Limping on right paw." },
  ];

  const lostPets = [
    { id: "lp1", petName: "Bella", species: "Dog", breed: "Golden Retriever Mix", lastSeenLocation: "Oak Park near 4th St", dateLost: "2024-05-10T14:30:00Z", description: "Wearing a red collar with a bone-shaped tag. Very friendly but might be scared.", photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80", contactPhone: "(555) 123-4567", reward: "$200", status: "Active" },
    { id: "lp2", petName: "Shadow", species: "Cat", breed: "Black Domestic Shorthair", lastSeenLocation: "Maple Ave & 10th St", dateLost: "2024-05-08T09:00:00Z", description: "All black, yellow eyes. Small nick on left ear. No collar. Skittish.", photoUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=400&q=80", contactPhone: "(555) 987-6543", status: "Active" },
    { id: "lp3", petName: "Charlie", species: "Dog", breed: "Beagle", lastSeenLocation: "Riverside Trail", dateLost: "2024-05-11T16:45:00Z", description: "Older beagle, slightly graying muzzle. Blue harness. Deaf.", photoUrl: "https://images.unsplash.com/photo-1537151608804-ea2f1fa3dfc7?auto=format&fit=crop&w=400&q=80", contactPhone: "(555) 555-1212", reward: "$500", status: "Active" },
  ];

  // public API
  return {
    getPets: () => pets.slice(),
    getPet: (id) => pets.find((p) => p.id === id),
    addPet: (pet) => { pets.push(pet); return pet; },

    getVaccinations: (petId) => petId ? vaccinations.filter((v) => v.petId === petId) : vaccinations.slice(),
    getAlertVaccinations: () => vaccinations.filter((v) => v.status !== "Up to date"),

    getLabResults: (petId) => petId ? labResults.filter((l) => l.petId === petId) : labResults.slice(),
    getPrescriptions: (petId) => petId ? prescriptions.filter((p) => p.petId === petId) : prescriptions.slice(),
    getMedicalNotes: (petId) => petId ? medicalNotes.filter((n) => n.petId === petId) : medicalNotes.slice(),
    getWeightHistory: (petId) => petId ? weightHistory.filter((w) => w.id === petId) : weightHistory.slice(),
    getChronicConditions: (petId) => petId ? chronicConditions.filter((c) => c.petId === petId) : chronicConditions.slice(),

    getVets: () => vets.slice(),
    getVet: (id) => vets.find((v) => v.id === id),

    getAppointments: () => appointments.slice(),
    getUpcomingAppointments: () =>
      appointments.filter((a) => a.status === "Upcoming")
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
    getPastAppointments: () =>
      appointments.filter((a) => a.status !== "Upcoming")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),

    getLostPets: () => lostPets.slice(),
    addLostPet: (alert) => { lostPets.unshift(alert); return alert; },
  };
})();
