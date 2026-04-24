import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
        <Wrench className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Coming in Next Iteration</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        This area of PetWell is currently under construction. We're working hard to bring you the best experience for veterinarians, service providers, and our marketplace.
      </p>
      <Button asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
