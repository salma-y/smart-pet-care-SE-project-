import { ReactNode } from "react";
import { useLocation } from "wouter";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [location] = useLocation();
  
  // Pages that have the sidebar
  const hasSidebar = 
    location.startsWith("/dashboard") || 
    location.startsWith("/pets") || 
    location.startsWith("/symptom-checker") || 
    location.startsWith("/appointments") || 
    location.startsWith("/lost-pets");
    
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      
      <div className="flex flex-1">
        {hasSidebar && <Sidebar />}
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
