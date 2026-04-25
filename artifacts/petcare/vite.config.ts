import { defineConfig } from "vite";
import path from "path";

// Validate PORT
const rawPort = process.env.PORT;
if (!rawPort) throw new Error("PORT environment variable is required.");

const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT: "${rawPort}"`);
}

// Validate BASE_PATH
const basePath = process.env.BASE_PATH;
if (!basePath) throw new Error("BASE_PATH environment variable is required.");

const root = path.resolve(import.meta.dirname);

export default defineConfig({
  base: basePath,
  root,
  build: {
    outDir: path.resolve(root, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(root, "index.html"),
        login: path.resolve(root, "login.html"),
        register: path.resolve(root, "register.html"),
        forgot: path.resolve(root, "forgot-password.html"),
        dashboard: path.resolve(root, "dashboard.html"),
        pets: path.resolve(root, "pets.html"),
        petDetail: path.resolve(root, "pet-detail.html"),
        symptom: path.resolve(root, "symptom-checker.html"),
        appointments: path.resolve(root, "appointments.html"),
        appointmentsNew: path.resolve(root, "appointments-new.html"),
        lostPets: path.resolve(root, "lost-pets.html"),
        comingSoon: path.resolve(root, "coming-soon.html"),
        // Vet module
        vetDashboard: path.resolve(root, "vet-dashboard.html"),
        vetPatients: path.resolve(root, "vet-patients.html"),
        vetConsultation: path.resolve(root, "vet-consultation.html"),
        vetPrescription: path.resolve(root, "vet-prescription.html"),
        vetLabUpload: path.resolve(root, "vet-lab-upload.html"),
        vetReferral: path.resolve(root, "vet-referral.html"),
        vetSurgery: path.resolve(root, "vet-surgery.html"),
        vetIncome: path.resolve(root, "vet-income.html"),
        // Marketplace
        marketplace: path.resolve(root, "marketplace.html"),
        marketplaceProduct: path.resolve(root, "marketplace-product.html"),
        cart: path.resolve(root, "cart.html"),
        subscriptions: path.resolve(root, "subscriptions.html"),
        loyalty: path.resolve(root, "loyalty.html"),
        recalls: path.resolve(root, "recalls.html"),
        // Service Provider Module
        providerDashboard: path.resolve(root, "provider-dashboard.html"),
        providerAreas: path.resolve(root, "provider-areas.html"),
        providerBookings: path.resolve(root, "provider-bookings.html"),
        providerPricing: path.resolve(root, "provider-pricing.html"),
        providerTracker: path.resolve(root, "provider-tracker.html"),
        providerIncident: path.resolve(root, "provider-incident.html"),
        providerCheckin: path.resolve(root, "provider-checkin.html"),
        providerBriefing: path.resolve(root, "provider-briefing.html"),
        providerEarnings: path.resolve(root, "provider-earnings.html"),
        providerCertifications: path.resolve(root, "provider-certifications.html"),
        providerReviews: path.resolve(root, "provider-reviews.html"),
        // Admin module
        adminDashboard: path.resolve(root, "admin-dashboard.html"),
        adminUsers: path.resolve(root, "admin-users.html"),
        adminKyc: path.resolve(root, "admin-kyc.html"),
        adminDisputes: path.resolve(root, "admin-disputes.html"),
        adminEscrow: path.resolve(root, "admin-escrow.html"),
        adminAudit: path.resolve(root, "admin-audit.html"),
        adminArchive: path.resolve(root, "admin-archive.html"),
        adminAlerts: path.resolve(root, "admin-alerts.html"),
        adminRbac: path.resolve(root, "admin-rbac.html"),
        // Cross-cutting & polish
        notifications: path.resolve(root, "notifications.html"),
        notificationsEscalation: path.resolve(root, "notifications-escalation.html"),
        search: path.resolve(root, "search.html"),
        notFound: path.resolve(root, "404.html"),
        styleGuide: path.resolve(root, "style-guide.html"),
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});