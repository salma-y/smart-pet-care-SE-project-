import { Link, useLocation } from "wouter";
import { LayoutDashboard, PawPrint, Stethoscope, CalendarDays, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Pets", href: "/pets", icon: PawPrint },
    { name: "Symptom Checker", href: "/symptom-checker", icon: Stethoscope },
    { name: "Appointments", href: "/appointments", icon: CalendarDays },
    { name: "Lost Pet Alerts", href: "/lost-pets", icon: AlertTriangle },
  ];

  return (
    <aside className="w-64 border-r bg-sidebar h-[calc(100vh-4rem)] sticky top-16 hidden md:block overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-primary/10 p-4 rounded-xl text-center">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
            <PawPrint className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-semibold text-primary mb-1">Need help?</h4>
          <p className="text-xs text-muted-foreground mb-3">Our veterinary support team is available 24/7.</p>
          <Link href="/symptom-checker" className="block w-full py-2 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90 transition-colors">
            Start Triage
          </Link>
        </div>
      </div>
    </aside>
  );
}
