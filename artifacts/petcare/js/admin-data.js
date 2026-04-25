/* ============================================================
   PetWell — Admin Data Layer (Iteration 3)
   ============================================================ */

window.AdminData = (function () {
  // ---------- Platform metrics ----------
  const platformMetrics = {
    activeUsers: 12480,
    bookingsToday: 318,
    openDisputes: 7,
    recallAlerts: 2,
    newSignupsThisWeek: 412,
    monthlyGMV: 488210,
  };

  // ---------- Users ----------
  const users = [
    { id: "u1", name: "Jane Doe", email: "jane.doe@example.com", role: "Pet Owner", status: "Active", joined: "2024-08-12", rating: 4.9, kyc: "verified", flagged: false },
    { id: "u2", name: "Dr. Sarah Jenkins", email: "sarah.jenkins@petwell.vet", role: "Veterinarian", status: "Active", joined: "2023-06-04", rating: 4.95, kyc: "verified", flagged: false },
    { id: "u3", name: "Mark Johnson", email: "mark.j@example.com", role: "Pet Owner", status: "Active", joined: "2025-02-18", rating: 4.7, kyc: "verified", flagged: false },
    { id: "u4", name: "Tony Reeves", email: "treeves@petsitter.io", role: "Service Provider", status: "Suspended", joined: "2024-11-22", rating: 3.2, kyc: "review", flagged: true },
    { id: "u5", name: "Anna Park", email: "anna.p@example.com", role: "Pet Owner", status: "Active", joined: "2025-04-08", rating: 4.8, kyc: "verified", flagged: false },
    { id: "u6", name: "Carlos Diaz", email: "cdiaz@example.com", role: "Pet Owner", status: "Active", joined: "2024-12-30", rating: 4.6, kyc: "pending", flagged: false },
    { id: "u7", name: "Maya Patel", email: "maya.p@bestcare.io", role: "Service Provider", status: "Active", joined: "2024-04-15", rating: 4.9, kyc: "verified", flagged: false },
    { id: "u8", name: "Dr. Michael Chen", email: "mchen@petwell.vet", role: "Veterinarian", status: "Active", joined: "2023-09-22", rating: 4.85, kyc: "verified", flagged: false },
    { id: "u9", name: "Brett Owens", email: "bowens@example.com", role: "Service Provider", status: "Pending", joined: "2026-04-21", rating: 0, kyc: "submitted", flagged: false },
    { id: "u10", name: "Lisa Cho", email: "lisa.cho@example.com", role: "Pet Owner", status: "Active", joined: "2025-08-01", rating: 4.4, kyc: "verified", flagged: false },
    { id: "u11", name: "Vince Carter", email: "vc@scammer.example", role: "Pet Owner", status: "Suspended", joined: "2026-01-09", rating: 1.8, kyc: "rejected", flagged: true },
    { id: "u12", name: "Hannah Wilson", email: "hwilson@example.com", role: "Service Provider", status: "Active", joined: "2025-11-04", rating: 4.85, kyc: "verified", flagged: false },
  ];

  // ---------- KYC submissions ----------
  const kycSubmissions = [
    { id: "k1", userId: "u9", userName: "Brett Owens", role: "Service Provider", submitted: "2026-04-21", documents: ["Government ID", "Background Check", "Insurance Bond"], status: "submitted", history: [{ action: "Submitted", actor: "Brett Owens", at: "2026-04-21 09:14" }] },
    { id: "k2", userId: "u6", userName: "Carlos Diaz", role: "Pet Owner", submitted: "2026-04-19", documents: ["Government ID"], status: "pending", history: [{ action: "Submitted", actor: "Carlos Diaz", at: "2026-04-19 14:22" }, { action: "Reviewer assigned", actor: "Admin", at: "2026-04-19 16:01" }] },
    { id: "k3", userId: "u4", userName: "Tony Reeves", role: "Service Provider", submitted: "2026-04-10", documents: ["Government ID", "Insurance Bond"], status: "more_info", history: [{ action: "Requested clarification on insurance expiry", actor: "Admin", at: "2026-04-12 10:18" }] },
    { id: "k4", userId: "u11", userName: "Vince Carter", role: "Pet Owner", submitted: "2026-01-09", documents: ["Government ID"], status: "rejected", history: [{ action: "Rejected — fraudulent ID", actor: "Admin", at: "2026-01-10 11:45" }] },
  ];

  // ---------- Disputes ----------
  const disputes = [
    {
      id: "d1", priority: "high", title: "Service not delivered — refund requested",
      owner: "Sarah M.", provider: "Tony Reeves", amount: 165, opened: "2026-04-22",
      timeline: [
        { time: "Apr 22, 09:14", actor: "Sarah M.", note: "Sitter never showed up for boarding drop-off." },
        { time: "Apr 22, 11:42", actor: "Tony Reeves", note: "Vehicle broke down, did notify owner via app." },
        { time: "Apr 23, 08:05", actor: "Mediator", note: "Reviewing app logs — no notification was sent before scheduled time." },
      ],
      photos: ["https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80"],
    },
    {
      id: "d2", priority: "medium", title: "Damage to property",
      owner: "Anna P.", provider: "Maya Patel", amount: 80, opened: "2026-04-19",
      timeline: [
        { time: "Apr 19, 16:30", actor: "Anna P.", note: "Sitter dropped a vase during cat-sitting visit." },
        { time: "Apr 19, 18:10", actor: "Maya Patel", note: "Confirmed and offered to reimburse via app." },
        { time: "Apr 20, 10:00", actor: "Mediator", note: "Both parties agreed — closing with $80 from provider escrow." },
      ],
      photos: [],
    },
    {
      id: "d3", priority: "low", title: "Late arrival — partial refund",
      owner: "Mark J.", provider: "Hannah Wilson", amount: 28, opened: "2026-04-20",
      timeline: [
        { time: "Apr 20, 10:42", actor: "Mark J.", note: "Walker arrived 30 minutes late." },
        { time: "Apr 20, 11:00", actor: "Hannah Wilson", note: "Apologized, offered free walk credit." },
      ],
      photos: [],
    },
  ];

  // ---------- Escrow ----------
  const escrow = [
    { id: "e1", service: "3-day Boarding", owner: "Jane D.", provider: "Maya Patel", amount: 195, releaseAt: "Apr 27, 6:00 PM", state: "Holding" },
    { id: "e2", service: "Group Walk", owner: "Mark J.", provider: "Hannah Wilson", amount: 42, releaseAt: "Apr 25, 8:00 PM", state: "Releasing" },
    { id: "e3", service: "Cat Sitting Drop-in", owner: "Anna P.", provider: "Maya Patel", amount: 38, releaseAt: "Apr 25, 9:00 PM", state: "Holding" },
    { id: "e4", service: "Surgery Deposit", owner: "Emily R.", provider: "Vet — Dr. Chen", amount: 320, releaseAt: "May 02, 12:00 PM", state: "Holding" },
    { id: "e5", service: "Marketplace Order #PW-10932", owner: "Lisa C.", provider: "Hill's", amount: 64.99, releaseAt: "Apr 28, 12:00 PM", state: "Holding" },
  ];

  // ---------- Audit log ----------
  const auditLog = [
    { id: "a1", time: "2026-04-25 09:14:22", record: "Pet #1 (Mochi) medical chart", accessedBy: "Dr. Sarah Jenkins", role: "Veterinarian", action: "Viewed" },
    { id: "a2", time: "2026-04-25 09:08:01", record: "User #u4 (Tony Reeves) account", accessedBy: "Admin Jordan", role: "Admin", action: "Suspended" },
    { id: "a3", time: "2026-04-25 08:51:09", record: "Lab result #l3 (Pickle urinalysis)", accessedBy: "Jane Doe", role: "Pet Owner", action: "Viewed" },
    { id: "a4", time: "2026-04-25 08:40:55", record: "Booking #b3 (Bella group walk)", accessedBy: "Hannah Wilson", role: "Service Provider", action: "Updated" },
    { id: "a5", time: "2026-04-25 08:32:11", record: "User #u9 (Brett Owens) KYC", accessedBy: "Admin Jordan", role: "Admin", action: "Viewed" },
    { id: "a6", time: "2026-04-25 08:14:48", record: "Prescription #p1 (Simparica Trio)", accessedBy: "Dr. Michael Chen", role: "Veterinarian", action: "Created" },
    { id: "a7", time: "2026-04-24 22:12:31", record: "Pet #2 (Pickle) medical chart", accessedBy: "Jane Doe", role: "Pet Owner", action: "Exported" },
    { id: "a8", time: "2026-04-24 19:48:09", record: "Subscription #sub1", accessedBy: "Jane Doe", role: "Pet Owner", action: "Modified" },
    { id: "a9", time: "2026-04-24 17:22:55", record: "Dispute #d1 (Sarah M.)", accessedBy: "Mediator Alex", role: "Admin", action: "Updated" },
    { id: "a10", time: "2026-04-24 14:11:08", record: "Surgery slot #ss3", accessedBy: "Dr. Michael Chen", role: "Veterinarian", action: "Created" },
  ];

  // ---------- Archive (inactive pets) ----------
  const archivedPets = [
    { id: "ap1", name: "Buddy", species: "Dog", breed: "Bichon Frise", owner: "Sandra K.", reason: "Deceased", since: "2024-09-12", archivedBy: "Owner request", recordsCount: 38 },
    { id: "ap2", name: "Mittens", species: "Cat", breed: "Persian", owner: "Lou M.", reason: "Owner inactive 18 mo", since: "2024-06-30", archivedBy: "Auto-archive policy", recordsCount: 22 },
    { id: "ap3", name: "Sunny", species: "Bird", breed: "Parakeet", owner: "Elena R.", reason: "Deceased", since: "2025-01-04", archivedBy: "Owner request", recordsCount: 9 },
  ];

  const activeArchiveCandidates = [
    { id: "ac1", name: "Kona", species: "Dog", breed: "Poodle", owner: "Inactive 13 mo", lastSeen: "2025-03-19", recordsCount: 14 },
    { id: "ac2", name: "Snickers", species: "Cat", breed: "Maine Coon", owner: "Inactive 11 mo", lastSeen: "2025-05-22", recordsCount: 8 },
  ];

  const archiveLog = [
    { time: "2025-01-04 10:14", action: "Archived Sunny (Bird)", actor: "Elena R." },
    { time: "2024-09-12 19:42", action: "Archived Buddy (Dog)", actor: "Sandra K." },
    { time: "2024-06-30 02:00", action: "Archived Mittens — auto policy", actor: "System" },
  ];

  // ---------- System health alerts ----------
  const healthAlerts = [
    { id: "ha1", region: "Bay Area, CA", condition: "Canine Influenza outbreak", severity: "high", message: "Confirmed cases in 3 daycares — recommend updated bivalent vaccination.", reach: 4820, expiresAt: "2026-05-15", active: true },
    { id: "ha2", region: "Pacific Northwest", condition: "Tick-borne illness rise", severity: "medium", message: "Increased Lyme cases reported. Apply prevention now through October.", reach: 12410, expiresAt: "2026-10-01", active: true },
    { id: "ha3", region: "Nationwide", condition: "Food recall — Sportmix", severity: "high", message: "Discontinue affected lots immediately. Aflatoxin contamination.", reach: 49800, expiresAt: "2026-05-30", active: true },
  ];

  // ---------- RBAC matrix ----------
  const rbacRoles = ["Pet Owner", "Veterinarian", "Service Provider", "Admin"];
  const rbacFeatures = [
    { id: "f1", group: "Records", name: "View own pet medical records", perms: { "Pet Owner": "edit", "Veterinarian": "edit", "Service Provider": "view", "Admin": "edit" } },
    { id: "f2", group: "Records", name: "Edit medical records", perms: { "Pet Owner": "none", "Veterinarian": "edit", "Service Provider": "none", "Admin": "edit" } },
    { id: "f3", group: "Records", name: "Export medical history", perms: { "Pet Owner": "edit", "Veterinarian": "edit", "Service Provider": "none", "Admin": "edit" } },
    { id: "f4", group: "Bookings", name: "Book a service", perms: { "Pet Owner": "edit", "Veterinarian": "none", "Service Provider": "view", "Admin": "edit" } },
    { id: "f5", group: "Bookings", name: "Manage own bookings", perms: { "Pet Owner": "edit", "Veterinarian": "edit", "Service Provider": "edit", "Admin": "edit" } },
    { id: "f6", group: "Bookings", name: "View all bookings", perms: { "Pet Owner": "none", "Veterinarian": "none", "Service Provider": "none", "Admin": "edit" } },
    { id: "f7", group: "Marketplace", name: "Place an order", perms: { "Pet Owner": "edit", "Veterinarian": "edit", "Service Provider": "edit", "Admin": "edit" } },
    { id: "f8", group: "Marketplace", name: "Issue a recall", perms: { "Pet Owner": "none", "Veterinarian": "none", "Service Provider": "none", "Admin": "edit" } },
    { id: "f9", group: "Admin", name: "Suspend a user", perms: { "Pet Owner": "none", "Veterinarian": "none", "Service Provider": "none", "Admin": "edit" } },
    { id: "f10", group: "Admin", name: "Approve KYC", perms: { "Pet Owner": "none", "Veterinarian": "none", "Service Provider": "none", "Admin": "edit" } },
    { id: "f11", group: "Admin", name: "Mediate disputes", perms: { "Pet Owner": "none", "Veterinarian": "none", "Service Provider": "none", "Admin": "edit" } },
    { id: "f12", group: "Admin", name: "Publish health alert", perms: { "Pet Owner": "none", "Veterinarian": "view", "Service Provider": "view", "Admin": "edit" } },
  ];

  // ---------- Public API ----------
  return {
    getMetrics: () => ({ ...platformMetrics }),
    getUsers: () => users.slice(),
    getUser: (id) => users.find((u) => u.id === id),
    suspendUser: (id) => { const u = users.find((x) => x.id === id); if (u) u.status = u.status === "Suspended" ? "Active" : "Suspended"; },
    getKycSubmissions: () => kycSubmissions.map((k) => ({ ...k, history: k.history.slice(), documents: k.documents.slice() })),
    decideKyc: (id, status) => { const k = kycSubmissions.find((x) => x.id === id); if (k) { k.status = status; k.history.unshift({ action: status === "verified" ? "Approved" : status === "rejected" ? "Rejected" : "More info requested", actor: "Admin Jordan", at: new Date().toISOString().slice(0, 16).replace("T", " ") }); } },
    getDisputes: () => disputes.map((d) => ({ ...d, timeline: d.timeline.slice(), photos: d.photos.slice() })),
    getDispute: (id) => disputes.find((d) => d.id === id),
    resolveDispute: (id, action) => { const d = disputes.find((x) => x.id === id); if (d) d.timeline.unshift({ time: new Date().toLocaleString(), actor: "Mediator", note: `Resolution: ${action}` }); },
    getEscrow: () => escrow.slice(),
    releaseEscrow: (id) => { const e = escrow.find((x) => x.id === id); if (e) e.state = "Released"; },
    getAuditLog: () => auditLog.slice(),
    getArchivedPets: () => archivedPets.slice(),
    getActiveArchiveCandidates: () => activeArchiveCandidates.slice(),
    getArchiveLog: () => archiveLog.slice(),
    archivePet: (id) => { const i = activeArchiveCandidates.findIndex((p) => p.id === id); if (i >= 0) { const p = activeArchiveCandidates.splice(i, 1)[0]; archivedPets.unshift({ ...p, reason: "Owner inactive", since: new Date().toISOString().slice(0, 10), archivedBy: "Admin manual" }); archiveLog.unshift({ time: new Date().toLocaleString(), action: `Archived ${p.name} (${p.species})`, actor: "Admin Jordan" }); } },
    restorePet: (id) => { const i = archivedPets.findIndex((p) => p.id === id); if (i >= 0) { const p = archivedPets.splice(i, 1)[0]; archiveLog.unshift({ time: new Date().toLocaleString(), action: `Restored ${p.name} (${p.species})`, actor: "Admin Jordan" }); } },
    getHealthAlerts: () => healthAlerts.slice(),
    addHealthAlert: (a) => { healthAlerts.unshift(a); return a; },
    expireHealthAlert: (id) => { const a = healthAlerts.find((x) => x.id === id); if (a) a.active = false; },
    getRbacRoles: () => rbacRoles.slice(),
    getRbacFeatures: () => rbacFeatures.map((f) => ({ ...f, perms: { ...f.perms } })),
    setRbacPerm: (featureId, role, level) => { const f = rbacFeatures.find((x) => x.id === featureId); if (f) f.perms[role] = level; },
  };
})();
