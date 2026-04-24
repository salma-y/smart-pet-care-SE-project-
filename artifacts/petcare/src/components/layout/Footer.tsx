import { ReactNode } from "react";
import { Link, useLocation } from "wouter";

export function Footer() {
  const [location] = useLocation();
  const isAuth = location === "/login" || location === "/register" || location === "/forgot-password";
  
  if (isAuth) return null;

  return (
    <footer className="bg-white border-t py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
              PW
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">PetWell</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            The warm, trustworthy hub where pet owners manage everything about their animals.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Pet Owners</Link></li>
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Veterinarians</Link></li>
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Service Providers</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Emergency</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/coming-soon" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} PetWell. All rights reserved.
      </div>
    </footer>
  );
}
