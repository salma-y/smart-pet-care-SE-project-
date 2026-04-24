export interface Appointment {
  id: string;
  petId: string;
  vetId: string;
  date: string;
  time: string;
  type: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  notes?: string;
}

export const dummyAppointments: Appointment[] = [
  {
    id: "a1",
    petId: "1",
    vetId: "v1",
    date: "2024-06-15",
    time: "10:00 AM",
    type: "Annual Checkup",
    status: "Upcoming",
    notes: "Mochi needs his updated rabies tag."
  },
  {
    id: "a2",
    petId: "2",
    vetId: "v3",
    date: "2024-06-22",
    time: "2:30 PM",
    type: "Consultation",
    status: "Upcoming",
    notes: "Checking on Pickle's water intake."
  },
  {
    id: "a3",
    petId: "3",
    vetId: "v4",
    date: "2024-07-05",
    time: "11:15 AM",
    type: "Beak Trim",
    status: "Upcoming"
  },
  {
    id: "a4",
    petId: "1",
    vetId: "v1",
    date: "2024-01-15",
    time: "09:00 AM",
    type: "Annual Checkup",
    status: "Completed"
  },
  {
    id: "a5",
    petId: "2",
    vetId: "v3",
    date: "2024-02-20",
    time: "3:00 PM",
    type: "Lab Results Review",
    status: "Completed"
  },
  {
    id: "a6",
    petId: "1",
    vetId: "v2",
    date: "2023-08-15",
    time: "1:30 PM",
    type: "Emergency Visit",
    status: "Completed",
    notes: "Limping on right paw."
  }
];
