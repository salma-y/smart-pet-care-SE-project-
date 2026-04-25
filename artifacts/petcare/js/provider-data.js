/* ============================================================
   PetWell — Service Provider Module Data Layer (Iteration 3)
   Same boundary as data.js / vet-data.js — replace these JS
   arrays with fetch() calls to PHP endpoints later.
   ============================================================ */

window.ProviderData = (function () {
  // ---------- Today's bookings ----------
  const todayBookings = [
    { id: "b1", time: "07:30", duration: 45, petName: "Mochi", ownerName: "Jane Doe", service: "Morning Walk", address: "812 Maple Ave", status: "Completed", price: 28 },
    { id: "b2", time: "09:00", duration: 60, petName: "Max", ownerName: "Sarah M.", service: "Drop-in Visit", address: "304 Oak St", status: "Completed", price: 35 },
    { id: "b3", time: "11:00", duration: 90, petName: "Bella", ownerName: "Mark J.", service: "Group Walk", address: "Riverside Park", status: "In Progress", price: 42 },
    { id: "b4", time: "13:30", duration: 60, petName: "Pickle", ownerName: "Jane Doe", service: "Cat Sitting Visit", address: "812 Maple Ave", status: "Upcoming", price: 38 },
    { id: "b5", time: "15:00", duration: 45, petName: "Rocky", ownerName: "Carlos D.", service: "Afternoon Walk", address: "115 Pine Ln", status: "Upcoming", price: 28 },
    { id: "b6", time: "17:30", duration: 90, petName: "Charlie", ownerName: "Emily R.", service: "Evening Boarding Drop", address: "421 Birch Rd", status: "Upcoming", price: 65 },
  ];

  // ---------- Pending requests ----------
  const pendingRequests = [
    { id: "r1", petName: "Luna", ownerName: "David T.", service: "Cat Sitting (3 days)", date: "May 4 – May 6", price: 165, sentAt: "12 min ago", notes: "Senior cat, needs medication 2x/day." },
    { id: "r2", petName: "Whiskers", ownerName: "Anna P.", service: "Daily Drop-in", date: "Apr 28", price: 35, sentAt: "1 hr ago", notes: "Indoor only. Please refill water fountain." },
    { id: "r3", petName: "Duke", ownerName: "Tom B.", service: "Group Walk", date: "Apr 27, 10:00 AM", price: 42, sentAt: "3 hr ago", notes: "Reactive to skateboards." },
  ];

  // ---------- Earnings (provider) ----------
  const earnings = {
    today: 168,
    week: 1244,
    month: 4980,
    pendingPayout: 612.50,
    paidYTD: 18420,
    weeklyChart: [
      { label: "Mon", value: 142 },
      { label: "Tue", value: 188 },
      { label: "Wed", value: 156 },
      { label: "Thu", value: 210 },
      { label: "Fri", value: 244 },
      { label: "Sat", value: 168 },
      { label: "Sun", value: 136 },
    ],
    monthlyChart: [
      { label: "Jan", value: 3640 },
      { label: "Feb", value: 3820 },
      { label: "Mar", value: 4210 },
      { label: "Apr", value: 4980 },
      { label: "May", value: 4760 },
      { label: "Jun", value: 5120 },
      { label: "Jul", value: 4890 },
      { label: "Aug", value: 5320 },
      { label: "Sep", value: 4980 },
      { label: "Oct", value: 5410 },
      { label: "Nov", value: 5680 },
      { label: "Dec", value: 6120 },
    ],
    payouts: [
      { id: "po1", date: "Apr 22, 2026", amount: 1224.40, method: "ACH ••3421", status: "Paid" },
      { id: "po2", date: "Apr 15, 2026", amount: 1418.25, method: "ACH ••3421", status: "Paid" },
      { id: "po3", date: "Apr 8, 2026", amount: 1102.10, method: "ACH ••3421", status: "Paid" },
      { id: "po4", date: "Apr 1, 2026", amount: 1235.60, method: "ACH ••3421", status: "Paid" },
    ],
    mileage: [
      { date: "Apr 25", miles: 22.4, deductible: 14.68 },
      { date: "Apr 24", miles: 18.1, deductible: 11.85 },
      { date: "Apr 23", miles: 26.2, deductible: 17.16 },
      { date: "Apr 22", miles: 14.8, deductible: 9.69 },
      { date: "Apr 21", miles: 20.5, deductible: 13.43 },
    ],
  };

  // ---------- Service zones (geofence) ----------
  const serviceZones = [
    { id: "z1", name: "Downtown / Maple District", radiusMi: 2.5, active: true, color: "#2dd4bf", coords: { x: 35, y: 40, r: 60 } },
    { id: "z2", name: "Riverside Loop", radiusMi: 1.8, active: true, color: "#a855f7", coords: { x: 65, y: 35, r: 45 } },
    { id: "z3", name: "Oak Park & North", radiusMi: 3.2, active: false, color: "#f59e0b", coords: { x: 50, y: 70, r: 75 } },
  ];

  // ---------- Pricing ----------
  const pricing = {
    base: { walking: 25, sitting: 38, boarding: 65, dropIn: 22 },
    durationMultiplier: { "30": 0.75, "60": 1.0, "90": 1.4, "120": 1.75 },
    holidayMarkup: 25, // %
    multiPetDiscount: 10, // % per extra pet
    holidayDates: ["2026-05-25", "2026-07-04", "2026-12-25"],
  };

  // ---------- Active session ----------
  const activeSession = {
    id: "ses1",
    petName: "Bella",
    ownerName: "Mark J.",
    service: "Group Walk",
    startedAt: "11:00 AM",
    elapsed: 38, // minutes
    durationMin: 90,
    milestones: [
      { id: "m1", label: "Started", icon: "play-circle", time: "11:00 AM", done: true },
      { id: "m2", label: "Potty Break", icon: "leaf", time: "11:14 AM", done: true },
      { id: "m3", label: "Arrived at Park", icon: "trees", time: "11:22 AM", done: true },
      { id: "m4", label: "Water Break", icon: "droplets", time: "—", done: false },
      { id: "m5", label: "Heading Back", icon: "footprints", time: "—", done: false },
      { id: "m6", label: "Ended", icon: "check-circle-2", time: "—", done: false },
    ],
    pathPoints: [
      [10, 80], [22, 72], [35, 60], [48, 50], [56, 38], [62, 30],
    ],
  };

  // ---------- Behavioral briefings ----------
  const briefings = [
    { petName: "Bella", ownerName: "Mark J.", handling: "Use slip-lead initially; she pulls. Reward calm walking with treats from the front pocket of the leash bag.", warnings: ["Reactive to skateboards", "Will chase squirrels — keep leash short near oaks"], emergency: "Mark J. — (555) 888-1212 / Riverside Vet — (555) 555-0911", allergies: "None reported", acknowledged: false },
    { petName: "Charlie", ownerName: "Emily R.", handling: "Older beagle, deaf. Approach from front and use hand signals. Walk slowly — about 1.5 mph max.", warnings: ["Deaf — startles easily", "Has slight arthritis in rear hips"], emergency: "Emily R. — (555) 555-1212", allergies: "Avoid chicken-based treats", acknowledged: true },
  ];

  // ---------- Incident reports ----------
  const incidents = [
    { id: "inc1", date: "2026-04-12", pet: "Rocky", type: "Minor Injury", severity: "Low", description: "Small scratch on left front paw from running through brush.", caseNumber: "PW-INC-00214" },
    { id: "inc2", date: "2026-03-29", pet: "Max", type: "Behavioral", severity: "Medium", description: "Lunged at another dog — separated immediately, no contact made.", caseNumber: "PW-INC-00198" },
  ];

  // ---------- Certifications ----------
  const certifications = [
    { id: "c1", type: "Pet First Aid & CPR", issuer: "American Red Cross", expiry: "2027-03-15", state: "verified" },
    { id: "c2", type: "Dog Behavior Specialist", issuer: "IAABC", expiry: "2026-11-08", state: "verified" },
    { id: "c3", type: "Background Check", issuer: "Checkr", expiry: "2026-12-01", state: "verified" },
    { id: "c4", type: "Insurance Bond", issuer: "Pet Sitters Insurance", expiry: "2026-09-12", state: "review" },
    { id: "c5", type: "Fear-Free Certified Professional", issuer: "Fear Free Pets", expiry: "—", state: "submitted" },
  ];

  // ---------- Reviews ----------
  const reviews = {
    averageReceived: 4.9,
    totalReceived: 87,
    received: [
      { id: "rv1", from: "Jane D.", pet: "Mochi", rating: 5, date: "Apr 24, 2026", comment: "Mochi adores her. We get photo updates every walk. Cannot recommend more." },
      { id: "rv2", from: "Sarah M.", pet: "Max", rating: 5, date: "Apr 19, 2026", comment: "Showed up early, brought her own treats. Max was so calm when we got home." },
      { id: "rv3", from: "Carlos D.", pet: "Rocky", rating: 4, date: "Apr 15, 2026", comment: "Solid walks. Would love a quick text when finishing — overall great." },
      { id: "rv4", from: "Emily R.", pet: "Charlie", rating: 5, date: "Apr 11, 2026", comment: "Patient with our deaf senior beagle. A real gem." },
    ],
    given: [
      { id: "gv1", to: "Mochi (owner Jane D.)", rating: 5, date: "Apr 24, 2026", comment: "Friendly, no pulling, well socialized." },
      { id: "gv2", to: "Max (owner Sarah M.)", rating: 5, date: "Apr 19, 2026", comment: "Sweet golden — easy to handle." },
      { id: "gv3", to: "Rocky (owner Carlos D.)", rating: 4, date: "Apr 15, 2026", comment: "Strong puller but very food motivated." },
    ],
  };

  // ---------- Public API ----------
  return {
    getTodayBookings: () => todayBookings.slice(),
    getPendingRequests: () => pendingRequests.slice(),
    acceptRequest: (id) => { const i = pendingRequests.findIndex((r) => r.id === id); if (i >= 0) pendingRequests.splice(i, 1); },
    declineRequest: (id) => { const i = pendingRequests.findIndex((r) => r.id === id); if (i >= 0) pendingRequests.splice(i, 1); },
    getEarnings: () => JSON.parse(JSON.stringify(earnings)),
    getServiceZones: () => serviceZones.map((z) => ({ ...z })),
    toggleZone: (id) => { const z = serviceZones.find((x) => x.id === id); if (z) z.active = !z.active; return z; },
    addZone: (z) => { serviceZones.push(z); return z; },
    removeZone: (id) => { const i = serviceZones.findIndex((z) => z.id === id); if (i >= 0) serviceZones.splice(i, 1); },
    getPricing: () => JSON.parse(JSON.stringify(pricing)),
    setBaseRate: (key, val) => { pricing.base[key] = val; },
    getActiveSession: () => JSON.parse(JSON.stringify(activeSession)),
    getBriefings: () => briefings.map((b) => ({ ...b, warnings: b.warnings.slice() })),
    acknowledgeBriefing: (petName) => { const b = briefings.find((x) => x.petName === petName); if (b) b.acknowledged = true; },
    getIncidents: () => incidents.slice(),
    addIncident: (i) => { incidents.unshift(i); return i; },
    getCertifications: () => certifications.slice(),
    addCertification: (c) => { certifications.unshift(c); return c; },
    getReviews: () => JSON.parse(JSON.stringify(reviews)),
  };
})();
