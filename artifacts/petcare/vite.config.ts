import { defineConfig } from "vite";
import path from "path";

const rawPort = process.env.PORT;
if (!rawPort) throw new Error("PORT environment variable is required.");
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT: "${rawPort}"`);

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
