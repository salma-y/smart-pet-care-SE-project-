import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Store } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Register() {
  const [location, setLocation] = useLocation();
  const [role, setRole] = useState<"owner" | "pro" | "service">("owner");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const roleParam = searchParams.get('role');
    if (roleParam === 'pro') setRole('pro');
    if (roleParam === 'service') setRole('service');
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "owner") {
      setLocation("/dashboard");
    } else {
      setLocation("/coming-soon");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 p-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
          PW
        </div>
        <span className="text-2xl font-bold tracking-tight text-primary">PetWell</span>
      </Link>

      <Card className="w-full max-w-lg border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="space-y-1 text-center pb-6 pt-8">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Join PetWell to manage your pet's health
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>I am a...</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={cn(
                  "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                  role === "owner" 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-white hover:border-primary/30"
                )}
              >
                <Heart className={cn("w-6 h-6 mb-2", role === "owner" ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", role === "owner" ? "text-primary" : "text-muted-foreground")}>Pet Owner</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole("pro")}
                className={cn(
                  "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                  role === "pro" 
                    ? "border-blue-500 bg-blue-500/5" 
                    : "border-border bg-white hover:border-blue-500/30"
                )}
              >
                <Shield className={cn("w-6 h-6 mb-2", role === "pro" ? "text-blue-500" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", role === "pro" ? "text-blue-500" : "text-muted-foreground")}>Veterinarian</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("service")}
                className={cn(
                  "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                  role === "service" 
                    ? "border-orange-500 bg-orange-500/5" 
                    : "border-border bg-white hover:border-orange-500/30"
                )}
              >
                <Store className={cn("w-6 h-6 mb-2", role === "service" ? "text-orange-500" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", role === "service" ? "text-orange-500" : "text-muted-foreground")}>Service Provider</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@example.com" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
            </div>
            
            <Button type="submit" className={cn(
              "w-full h-12 rounded-xl text-base mt-2",
              role === "pro" && "bg-blue-600 hover:bg-blue-700",
              role === "service" && "bg-orange-600 hover:bg-orange-700"
            )}>
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 pt-2">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
