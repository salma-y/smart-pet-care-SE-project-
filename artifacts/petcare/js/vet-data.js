/* ============================================================
   PetWell — Vet & Marketplace Data Layer (Iteration 2)
   Same boundary as data.js — replace these JS arrays with
   fetch() calls to PHP endpoints later.
   ============================================================ */

window.VetData = (function () {
  // ---------- Vet patients (extends pet roster with conditions) ----------
  const patients = [
    { id: "p1", name: "Mochi", species: "Dog", breed: "Shiba Inu", age: "3 years", weight: 10.5, ownerName: "Jane Doe", lastVisit: "2024-04-15", photoUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80", conditions: ["Seasonal Allergies"], flags: ["Overdue Bordetella"] },
    { id: "p2", name: "Pickle", species: "Cat", breed: "Orange Tabby", age: "5 years", weight: 5.2, ownerName: "Jane Doe", lastVisit: "2024-02-20", photoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", conditions: ["Mild Renal Watch"], flags: ["Lab Review Needed"] },
    { id: "p3", name: "Max", species: "Dog", breed: "Golden Retriever", age: "7 years", weight: 32.0, ownerName: "Sarah Mitchell", lastVisit: "2024-04-22", photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80", conditions: ["Hip Dysplasia"], flags: [] },
    { id: "p4", name: "Luna", species: "Cat", breed: "Siamese", age: "4 years", weight: 4.1, ownerName: "David Tran", lastVisit: "2024-04-10", photoUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=400&q=80", conditions: [], flags: [] },
    { id: "p5", name: "Charlie", species: "Dog", breed: "Beagle", age: "9 years", weight: 14.2, ownerName: "Emily Rodriguez", lastVisit: "2024-04-18", photoUrl: "https://images.unsplash.com/photo-1537151608804-ea2f1fa3dfc7?auto=format&fit=crop&w=400&q=80", conditions: ["Diabetes Type II"], flags: ["Glucose Recheck"] },
    { id: "p6", name: "Bella", species: "Dog", breed: "Labrador", age: "2 years", weight: 28.0, ownerName: "Mark Johnson", lastVisit: "2024-04-19", photoUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80", conditions: [], flags: [] },
    { id: "p7", name: "Whiskers", species: "Cat", breed: "Maine Coon", age: "6 years", weight: 7.8, ownerName: "Anna Park", lastVisit: "2024-03-30", photoUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80", conditions: ["Hyperthyroidism"], flags: ["Medication Refill"] },
    { id: "p8", name: "Rocky", species: "Dog", breed: "French Bulldog", age: "4 years", weight: 12.0, ownerName: "Carlos Diaz", lastVisit: "2024-04-21", photoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80", conditions: ["Brachycephalic Syndrome"], flags: [] },
  ];

  // ---------- Today's appointments for vet ----------
  const todaySchedule = [
    { id: "t1", time: "08:30", duration: 30, patientId: "p1", patientName: "Mochi", ownerName: "Jane Doe", type: "Allergy Recheck", status: "Completed", room: "Exam 1" },
    { id: "t2", time: "09:00", duration: 45, patientId: "p3", patientName: "Max", ownerName: "Sarah M.", type: "Joint Injection", status: "Completed", room: "Exam 2" },
    { id: "t3", time: "10:15", duration: 30, patientId: "p4", patientName: "Luna", ownerName: "David T.", type: "Annual Wellness", status: "In Progress", room: "Exam 1" },
    { id: "t4", time: "11:00", duration: 60, patientId: "p5", patientName: "Charlie", ownerName: "Emily R.", type: "Diabetes Check", status: "Upcoming", room: "Exam 3" },
    { id: "t5", time: "13:30", duration: 90, patientId: "p7", patientName: "Whiskers", ownerName: "Anna P.", type: "Surgery — Dental", status: "Upcoming", room: "OR 1" },
    { id: "t6", time: "15:30", duration: 30, patientId: "p8", patientName: "Rocky", ownerName: "Carlos D.", type: "Vaccinations", status: "Upcoming", room: "Exam 2" },
    { id: "t7", time: "16:30", duration: 30, patientId: "p2", patientName: "Pickle", ownerName: "Jane Doe", type: "Lab Results Review", status: "Upcoming", room: "Exam 1" },
  ];

  // ---------- Patient alerts ----------
  const patientAlerts = [
    { id: "al1", patientId: "p1", patientName: "Mochi", message: "Bordetella vaccine overdue by 218 days", severity: "high" },
    { id: "al2", patientId: "p5", patientName: "Charlie", message: "Glucose curve overdue — last test 6 weeks ago", severity: "high" },
    { id: "al3", patientId: "p2", patientName: "Pickle", message: "Lab results awaiting your review", severity: "medium" },
    { id: "al4", patientId: "p7", patientName: "Whiskers", message: "Methimazole refill requested by owner", severity: "medium" },
    { id: "al5", patientId: "p3", patientName: "Max", message: "Owner reported stiffness post-injection (follow-up)", severity: "low" },
  ];

  // ---------- Surgery rooms / scheduler ----------
  const surgeryRooms = [
    { id: "or1", name: "OR 1", equipment: ["Anesthesia", "X-Ray"] },
    { id: "or2", name: "OR 2", equipment: ["Anesthesia", "Ultrasound"] },
    { id: "or3", name: "OR 3", equipment: ["Anesthesia", "Endoscopy"] },
  ];
  const surgerySlots = [
    { id: "ss1", roomId: "or1", date: "today", start: "08:00", end: "10:00", patient: "Bear", procedure: "Spay", surgeon: "Dr. Sarah Jenkins" },
    { id: "ss2", roomId: "or1", date: "today", start: "13:30", end: "15:00", patient: "Whiskers", procedure: "Dental Cleaning", surgeon: "Dr. Sarah Jenkins" },
    { id: "ss3", roomId: "or2", date: "today", start: "09:00", end: "11:30", patient: "Duke", procedure: "ACL Repair", surgeon: "Dr. Michael Chen" },
    { id: "ss4", roomId: "or3", date: "today", start: "10:00", end: "11:00", patient: "Coco", procedure: "Mass Removal", surgeon: "Dr. Emily Rodriguez" },
    { id: "ss5", roomId: "or2", date: "today", start: "14:00", end: "15:30", patient: "Buddy", procedure: "Neuter", surgeon: "Dr. Michael Chen" },
  ];

  // ---------- Drug formulary ----------
  const drugs = [
    { name: "Apoquel", category: "Anti-itch", interactionsWith: ["Atopica"] },
    { name: "Atopica", category: "Immunomodulator", interactionsWith: ["Apoquel", "Ketoconazole"] },
    { name: "Carprofen", category: "NSAID", interactionsWith: ["Prednisone", "Furosemide"] },
    { name: "Cerenia", category: "Antiemetic", interactionsWith: [] },
    { name: "Clavamox", category: "Antibiotic", interactionsWith: [] },
    { name: "Doxycycline", category: "Antibiotic", interactionsWith: ["Antacids"] },
    { name: "Furosemide", category: "Diuretic", interactionsWith: ["Carprofen", "ACE Inhibitors"] },
    { name: "Gabapentin", category: "Pain / Sedation", interactionsWith: ["Antacids"] },
    { name: "Insulin (Vetsulin)", category: "Diabetes", interactionsWith: ["Prednisone"] },
    { name: "Ketoconazole", category: "Antifungal", interactionsWith: ["Atopica"] },
    { name: "Methimazole", category: "Antithyroid", interactionsWith: [] },
    { name: "Prednisone", category: "Corticosteroid", interactionsWith: ["Carprofen", "Insulin (Vetsulin)"] },
    { name: "Simparica Trio", category: "Parasiticide", interactionsWith: [] },
    { name: "Trazodone", category: "Sedative", interactionsWith: ["MAOIs"] },
  ];

  // ---------- Referrals ----------
  const referrals = [
    { id: "r1", patient: "Max", recipientClinic: "Bay Area Veterinary Surgery", specialist: "Orthopedic Surgeon", reason: "Hip dysplasia surgical consult", attached: ["X-Rays", "Bloodwork", "History"], status: "In Progress", date: "2024-04-12" },
    { id: "r2", patient: "Luna", recipientClinic: "Feline Specialty Clinic", specialist: "Feline Internal Medicine", reason: "Recurrent UTI workup", attached: ["Urinalysis", "Culture"], status: "Sent", date: "2024-04-20" },
    { id: "r3", patient: "Charlie", recipientClinic: "Endocrine Vet Group", specialist: "Endocrinologist", reason: "Diabetes regulation second opinion", attached: ["Glucose Curve", "History"], status: "Completed", date: "2024-03-28" },
  ];

  // ---------- Vet income ----------
  const monthlyAppointmentStats = [
    { month: "Jan", count: 142 }, { month: "Feb", count: 138 }, { month: "Mar", count: 167 },
    { month: "Apr", count: 184 }, { month: "May", count: 175 }, { month: "Jun", count: 192 },
    { month: "Jul", count: 178 }, { month: "Aug", count: 165 }, { month: "Sep", count: 188 },
    { month: "Oct", count: 201 }, { month: "Nov", count: 195 }, { month: "Dec", count: 220 },
  ];

  // ---------- Marketplace products ----------
  const products = [
    { id: "pr1", name: "Hill's Science Diet Adult Chicken", category: "Food", price: 64.99, originalPrice: 72.99, rating: 4.8, reviews: 2401, vetRecommended: true, prescription: false, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80", vendor: "Hill's", ingredients: ["Chicken", "Brown Rice", "Cracked Pearled Barley", "Whole Grain Wheat"], allergenWarnings: ["Chicken"], dietCompat: "compatible", description: "Veterinarian-recommended adult dry food with high-quality protein for lean muscle." },
    { id: "pr2", name: "Royal Canin Veterinary Renal Support", category: "Prescription Diet", price: 89.99, rating: 4.9, reviews: 854, vetRecommended: true, prescription: true, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80", vendor: "Royal Canin", ingredients: ["Chicken Fat", "Rice", "Wheat Gluten"], allergenWarnings: [], dietCompat: "compatible", description: "Therapeutic diet formulated for adult cats with chronic kidney disease." },
    { id: "pr3", name: "Cosequin DS Joint Health Chews", category: "Supplements", price: 38.50, rating: 4.7, reviews: 5230, vetRecommended: true, prescription: false, image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=600&q=80", vendor: "Nutramax", ingredients: ["Glucosamine", "Chondroitin", "MSM"], allergenWarnings: [], dietCompat: "compatible", description: "Daily joint health support chews for dogs of all sizes." },
    { id: "pr4", name: "KONG Classic Rubber Toy", category: "Accessories", price: 14.99, rating: 4.9, reviews: 12010, vetRecommended: false, prescription: false, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80", vendor: "KONG", ingredients: ["Natural Rubber"], allergenWarnings: [], dietCompat: "compatible", description: "The world's most durable, stuffable, and bouncy chew toy." },
    { id: "pr5", name: "Purina Pro Plan Salmon & Rice", category: "Food", price: 58.99, rating: 4.6, reviews: 1840, vetRecommended: false, prescription: false, image: "https://images.unsplash.com/photo-1601758174039-9d7e5dcc1b4f?auto=format&fit=crop&w=600&q=80", vendor: "Purina", ingredients: ["Salmon", "Rice", "Oat Meal"], allergenWarnings: [], dietCompat: "compatible", description: "Sensitive skin and stomach formula for adult dogs." },
    { id: "pr6", name: "Greenies Dental Treats", category: "Supplements", price: 19.99, rating: 4.8, reviews: 8902, vetRecommended: true, prescription: false, image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80", vendor: "Greenies", ingredients: ["Wheat Flour", "Glycerin", "Gelatin"], allergenWarnings: ["Wheat"], dietCompat: "compatible", description: "Vet-recommended dental treats that fight tartar and freshen breath." },
    { id: "pr7", name: "Apoquel 16mg (30 tablets)", category: "Prescription Diet", price: 129.50, rating: 4.7, reviews: 412, vetRecommended: true, prescription: true, image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80", vendor: "Zoetis", ingredients: ["Oclacitinib"], allergenWarnings: [], dietCompat: "restricted", description: "Prescription anti-itch medication for dogs with allergic dermatitis." },
    { id: "pr8", name: "Frisco Heated Cat Bed", category: "Accessories", price: 49.99, originalPrice: 64.99, rating: 4.5, reviews: 1240, vetRecommended: false, prescription: false, image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=80", vendor: "Frisco", ingredients: ["Polyester"], allergenWarnings: [], dietCompat: "compatible", description: "Self-warming, cozy bed perfect for senior cats." },
    { id: "pr9", name: "Hill's Prescription Diet i/d Digestive Care", category: "Prescription Diet", price: 96.00, rating: 4.8, reviews: 612, vetRecommended: true, prescription: true, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80", vendor: "Hill's", ingredients: ["Chicken", "Brewers Rice", "Beet Pulp"], allergenWarnings: ["Chicken"], dietCompat: "compatible", description: "Therapeutic diet for dogs with digestive issues." },
    { id: "pr10", name: "Vetericyn Plus Wound Spray", category: "Supplements", price: 23.99, rating: 4.6, reviews: 3120, vetRecommended: true, prescription: false, image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80", vendor: "Vetericyn", ingredients: ["Hypochlorous Acid"], allergenWarnings: [], dietCompat: "compatible", description: "Antimicrobial spray for cuts, scrapes, and irritation." },
    { id: "pr11", name: "PetSafe Easy Walk Harness", category: "Accessories", price: 27.99, rating: 4.4, reviews: 9210, vetRecommended: false, prescription: false, image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80", vendor: "PetSafe", ingredients: ["Nylon"], allergenWarnings: [], dietCompat: "compatible", description: "No-pull harness designed to prevent leash pulling." },
    { id: "pr12", name: "Blue Buffalo Wilderness Grain-Free", category: "Food", price: 71.99, rating: 4.7, reviews: 4230, vetRecommended: false, prescription: false, image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=600&q=80", vendor: "Blue Buffalo", ingredients: ["Deboned Chicken", "Chicken Meal", "Pea Protein"], allergenWarnings: ["Chicken"], dietCompat: "incompatible", description: "High-protein, grain-free recipe with real chicken." },
  ];

  // ---------- Subscriptions ----------
  const subscriptions = [
    { id: "sub1", productId: "pr1", productName: "Hill's Science Diet Adult Chicken", frequency: "Every 4 weeks", nextDelivery: "2024-06-08", price: 58.49, status: "Active" },
    { id: "sub2", productId: "pr3", productName: "Cosequin DS Joint Health Chews", frequency: "Every 8 weeks", nextDelivery: "2024-06-21", price: 34.65, status: "Active" },
    { id: "sub3", productId: "pr10", productName: "Vetericyn Plus Wound Spray", frequency: "Every 12 weeks", nextDelivery: "2024-07-30", price: 21.59, status: "Paused" },
  ];

  // ---------- Cart ----------
  const cart = [
    { productId: "pr1", quantity: 1, autoShip: true },
    { productId: "pr3", quantity: 2, autoShip: false },
    { productId: "pr4", quantity: 1, autoShip: false },
  ];

  // ---------- Loyalty ----------
  const loyalty = {
    balance: 2480,
    nextRewardAt: 3000,
    history: [
      { date: "2024-04-22", action: "Order #PW-10428", points: 145 },
      { date: "2024-04-18", action: "Vaccination logged for Mochi", points: 100 },
      { date: "2024-04-12", action: "Wellness review completed", points: 50 },
      { date: "2024-04-05", action: "Order #PW-10401", points: 230 },
      { date: "2024-03-28", action: "Subscription auto-ship", points: 75 },
      { date: "2024-03-15", action: "Referred a friend", points: 500 },
    ],
    redeemable: [
      { id: "rw1", name: "$5 off next order", points: 500 },
      { id: "rw2", name: "Free shipping (3 months)", points: 1200 },
      { id: "rw3", name: "$25 marketplace credit", points: 2500 },
      { id: "rw4", name: "Annual wellness discount", points: 5000 },
    ],
  };

  // ---------- Recalls ----------
  const recalls = [
    { id: "rc1", productName: "Hill's Prescription Diet c/d Multicare", reason: "Elevated Vitamin D — potential toxicity", action: "Stop feeding immediately. Return to retailer for refund.", date: "2024-04-15", severity: "high", affectsPurchase: true },
    { id: "rc2", productName: "Sportmix Premium Pet Food (select lots)", reason: "Aflatoxin contamination above acceptable limits", action: "Discontinue use and dispose of remaining product.", date: "2024-03-22", severity: "high", affectsPurchase: false },
    { id: "rc3", productName: "Greenies Pill Pockets — Cheese Flavor", reason: "Possible mold contamination in single batch", action: "Check lot number against advisory; return if affected.", date: "2024-02-10", severity: "medium", affectsPurchase: true },
    { id: "rc4", productName: "Pet Pride Cat Litter (clay clumping)", reason: "Reports of dust irritation in sensitive cats", action: "Discontinue use if pet shows respiratory symptoms.", date: "2024-01-05", severity: "low", affectsPurchase: false },
  ];

  // ---------- Public API ----------
  return {
    // Vet
    getPatients: () => patients.slice(),
    getPatient: (id) => patients.find((p) => p.id === id),
    getTodaySchedule: () => todaySchedule.slice(),
    getPatientAlerts: () => patientAlerts.slice(),
    getSurgeryRooms: () => surgeryRooms.slice(),
    getSurgerySlots: () => surgerySlots.slice(),
    addSurgerySlot: (s) => { surgerySlots.push(s); return s; },
    getDrugs: () => drugs.slice(),
    getDrug: (name) => drugs.find((d) => d.name.toLowerCase() === name.toLowerCase()),
    getReferrals: () => referrals.slice(),
    addReferral: (r) => { referrals.unshift(r); return r; },
    getMonthlyStats: () => monthlyAppointmentStats.slice(),

    // Marketplace
    getProducts: () => products.slice(),
    getProduct: (id) => products.find((p) => p.id === id),
    getProductsByCategory: (cat) => cat === "All" ? products.slice() : products.filter((p) => p.category === cat),

    getSubscriptions: () => subscriptions.slice(),
    pauseSubscription: (id) => { const s = subscriptions.find((x) => x.id === id); if (s) s.status = s.status === "Paused" ? "Active" : "Paused"; return s; },
    cancelSubscription: (id) => {
      const idx = subscriptions.findIndex((x) => x.id === id);
      if (idx >= 0) subscriptions.splice(idx, 1);
    },

    getCart: () => cart.slice(),
    updateCartItem: (productId, qty) => {
      const item = cart.find((c) => c.productId === productId);
      if (item) {
        if (qty <= 0) cart.splice(cart.indexOf(item), 1);
        else item.quantity = qty;
      }
    },
    toggleCartAutoShip: (productId) => {
      const item = cart.find((c) => c.productId === productId);
      if (item) item.autoShip = !item.autoShip;
    },

    getLoyalty: () => ({ ...loyalty, history: loyalty.history.slice(), redeemable: loyalty.redeemable.slice() }),
    getRecalls: () => recalls.slice(),
    getRelevantRecalls: () => recalls.filter((r) => r.affectsPurchase),
  };
})();
