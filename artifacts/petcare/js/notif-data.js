/* ============================================================
   PetWell — Notification & Search Data Layer (Iteration 3)
   ============================================================ */

window.NotifData = (function () {
  const notifications = [
    { id: "n1", type: "Medical", title: "Mochi's Bordetella vaccine is overdue", body: "Last administered 2022-10-01. Recommended every 12 months.", time: "Just now", read: false, channel: "App + Email", icon: "syringe", color: "red" },
    { id: "n2", type: "Marketplace", title: "Recall alert affecting Mochi", body: "Hill's Prescription Diet c/d Multicare — elevated Vitamin D.", time: "2 hr ago", read: false, channel: "App + Email + SMS", icon: "alert-triangle", color: "orange" },
    { id: "n3", type: "Service", title: "Hannah Wilson accepted your walk request", body: "Walk for Bella confirmed on Apr 27, 10:00 AM.", time: "4 hr ago", read: false, channel: "App + Email", icon: "footprints", color: "green" },
    { id: "n4", type: "System", title: "New device signed in", body: "iPhone 15 Pro — San Francisco, CA.", time: "Yesterday", read: true, channel: "App + Email", icon: "smartphone", color: "blue" },
    { id: "n5", type: "Medical", title: "Lab results uploaded for Pickle", body: "Urinalysis — slightly elevated protein. Tap to view summary.", time: "Yesterday", read: true, channel: "App", icon: "flask-conical", color: "blue" },
    { id: "n6", type: "Marketplace", title: "Subscription auto-shipped", body: "Hill's Science Diet Adult Chicken — arriving Tue, Jun 8.", time: "2 days ago", read: true, channel: "App + Email", icon: "truck", color: "green" },
    { id: "n7", type: "Service", title: "Mark Johnson left a 5-star review", body: "\"Patient with our deaf senior beagle. A real gem.\"", time: "3 days ago", read: true, channel: "App", icon: "star", color: "amber" },
    { id: "n8", type: "System", title: "Privacy policy updated", body: "Effective Apr 1, 2026 — review the changes.", time: "1 week ago", read: true, channel: "App + Email", icon: "shield", color: "blue" },
    { id: "n9", type: "Medical", title: "Heartworm test due for Bella", body: "Recommended annually — book a vet visit.", time: "1 week ago", read: true, channel: "App", icon: "stethoscope", color: "yellow" },
    { id: "n10", type: "Marketplace", title: "Loyalty milestone: 2,500 points!", body: "You've unlocked the $25 marketplace credit reward.", time: "2 weeks ago", read: true, channel: "App + Email", icon: "award", color: "primary" },
  ];

  const preferences = {
    Medical: { app: true, email: true, sms: true },
    Marketplace: { app: true, email: true, sms: false },
    Service: { app: true, email: true, sms: false },
    System: { app: true, email: false, sms: false },
  };

  const escalations = [
    { id: "esc1", reminder: "Mochi — Bordetella vaccine overdue", currentChannel: "Email", path: ["App Push", "Email", "SMS"], step: 2, ownerLastSeen: "32 hours ago" },
    { id: "esc2", reminder: "Charlie — Glucose curve overdue", currentChannel: "App Push", path: ["App Push", "Email", "SMS"], step: 1, ownerLastSeen: "4 hours ago" },
    { id: "esc3", reminder: "Pickle — Lab review reminder", currentChannel: "SMS", path: ["App Push", "Email", "SMS"], step: 3, ownerLastSeen: "5 days ago" },
  ];

  // ---------- Global search index ----------
  const searchIndex = {
    pets: [
      { id: "1", name: "Mochi", subtitle: "Shiba Inu — owned by Jane Doe", href: "pet-detail.html?id=1", icon: "paw-print" },
      { id: "2", name: "Pickle", subtitle: "Orange Tabby — owned by Jane Doe", href: "pet-detail.html?id=2", icon: "paw-print" },
      { id: "3", name: "Bella", subtitle: "Labrador — owned by Mark Johnson", href: "pet-detail.html?id=1", icon: "paw-print" },
      { id: "4", name: "Charlie", subtitle: "Beagle — owned by Emily Rodriguez", href: "pet-detail.html?id=1", icon: "paw-print" },
    ],
    vets: [
      { id: "v1", name: "Dr. Sarah Jenkins", subtitle: "General Practice — 4.9★", href: "vet-dashboard.html", icon: "stethoscope" },
      { id: "v2", name: "Dr. Michael Chen", subtitle: "Orthopedics & Surgery — 4.8★", href: "vet-dashboard.html", icon: "stethoscope" },
      { id: "v3", name: "Dr. Emily Rodriguez", subtitle: "Feline Specialist — 5.0★", href: "vet-dashboard.html", icon: "stethoscope" },
    ],
    providers: [
      { id: "sp1", name: "Hannah Wilson", subtitle: "Dog Walker — 4.85★", href: "provider-dashboard.html", icon: "footprints" },
      { id: "sp2", name: "Maya Patel", subtitle: "Cat Sitter — 4.9★", href: "provider-dashboard.html", icon: "cat" },
    ],
    products: [
      { id: "pr1", name: "Hill's Science Diet Adult Chicken", subtitle: "Food — $64.99", href: "marketplace-product.html?id=pr1", icon: "package" },
      { id: "pr3", name: "Cosequin DS Joint Health Chews", subtitle: "Supplements — $38.50", href: "marketplace-product.html?id=pr3", icon: "package" },
      { id: "pr7", name: "Apoquel 16mg (30 tablets)", subtitle: "Prescription — $129.50", href: "marketplace-product.html?id=pr7", icon: "package" },
    ],
  };

  return {
    getNotifications: () => notifications.map((n) => ({ ...n })),
    markRead: (id) => { const n = notifications.find((x) => x.id === id); if (n) n.read = true; },
    markAllRead: () => { notifications.forEach((n) => (n.read = true)); },
    getPreferences: () => JSON.parse(JSON.stringify(preferences)),
    setPreference: (cat, channel, val) => { if (preferences[cat] && channel in preferences[cat]) preferences[cat][channel] = val; },
    getEscalations: () => escalations.slice(),
    search: (q) => {
      q = (q || "").toLowerCase().trim();
      const filter = (arr) => !q ? arr.slice() : arr.filter((x) => x.name.toLowerCase().includes(q) || x.subtitle.toLowerCase().includes(q));
      return {
        pets: filter(searchIndex.pets),
        vets: filter(searchIndex.vets),
        providers: filter(searchIndex.providers),
        products: filter(searchIndex.products),
      };
    },
  };
})();
