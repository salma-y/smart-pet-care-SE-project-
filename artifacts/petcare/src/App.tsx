import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppShell } from "@/components/layout/AppShell";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Pets from "@/pages/Pets";
import PetDetail from "@/pages/PetDetail";
import SymptomChecker from "@/pages/SymptomChecker";
import Appointments from "@/pages/Appointments";
import AppointmentNew from "@/pages/AppointmentNew";
import LostPets from "@/pages/LostPets";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      
      <Route path="/dashboard"><AppShell><Dashboard /></AppShell></Route>
      <Route path="/pets"><AppShell><Pets /></AppShell></Route>
      <Route path="/pets/:id"><AppShell><PetDetail /></AppShell></Route>
      <Route path="/symptom-checker"><AppShell><SymptomChecker /></AppShell></Route>
      <Route path="/appointments"><AppShell><Appointments /></AppShell></Route>
      <Route path="/appointments/new"><AppShell><AppointmentNew /></AppShell></Route>
      <Route path="/lost-pets"><AppShell><LostPets /></AppShell></Route>
      
      <Route path="/coming-soon"><AppShell><ComingSoon /></AppShell></Route>
      
      <Route><AppShell><NotFound /></AppShell></Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
