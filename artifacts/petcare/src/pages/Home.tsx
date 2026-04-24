import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Activity, CalendarDays, Store, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-32">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 hidden lg:block">
          <Heart className="w-96 h-96" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              The warm, trustworthy hub for your pet's entire life.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Manage vaccinations, vet visits, medical records, and daily care in one beautiful, simple place. Because they're not just pets, they're family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base h-14 px-8 rounded-full">
                <Link href="/register?role=owner">I'm a Pet Owner</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base h-14 px-8 rounded-full bg-white">
                <Link href="/register?role=pro">I'm a Professional</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need, connected.</h2>
            <p className="text-muted-foreground text-lg">PetWell brings together owners, veterinarians, and service providers into one seamless ecosystem.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Pet Owners</h3>
              <p className="text-muted-foreground mb-6">Keep medical records, track vaccinations, book appointments, and monitor your pet's health all in one place.</p>
              <ul className="space-y-2 mb-8">
                {["Digital medical records", "Vaccination reminders", "Symptom checker", "Lost pet alerts"].map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard">Explore Owner Dashboard</Link>
              </Button>
            </div>

            <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Veterinarians</h3>
              <p className="text-muted-foreground mb-6">Streamline your clinic with modern scheduling, digital records sharing, and direct client communication.</p>
              <ul className="space-y-2 mb-8">
                {["Smart scheduling", "Digital patient records", "Lab result sharing", "Client messaging"].map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/coming-soon">Explore Vet Dashboard</Link>
              </Button>
            </div>

            <div className="bg-card border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                <Store className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Service Providers</h3>
              <p className="text-muted-foreground mb-6">Groomers, walkers, and sitters can manage bookings, verify vaccinations, and accept payments easily.</p>
              <ul className="space-y-2 mb-8">
                {["Booking management", "Vaccine verification", "Client notes", "Integrated payments"].map(feature => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/coming-soon">Explore Provider Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How PetWell Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-primary shadow-sm mx-auto mb-6 relative z-10 border border-primary/20">
                1
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-border border-dashed z-0"></div>
              <h4 className="text-xl font-semibold mb-2">Create a Profile</h4>
              <p className="text-muted-foreground">Add your pets, their photos, and basic info to get started.</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-primary shadow-sm mx-auto mb-6 relative z-10 border border-primary/20">
                2
              </div>
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-border border-dashed z-0"></div>
              <h4 className="text-xl font-semibold mb-2">Connect Your Vet</h4>
              <p className="text-muted-foreground">Link your preferred clinic to automatically import medical records.</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-primary shadow-sm mx-auto mb-6 relative z-10 border border-primary/20">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">Manage with Ease</h4>
              <p className="text-muted-foreground">Book appointments, get vaccine reminders, and track health trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Loved by pet parents</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Sarah M.", pet: "Owner of Max (Golden Retriever)", text: "PetWell completely changed how I manage Max's care. The vaccine reminders alone are a lifesaver." },
              { name: "David T.", pet: "Owner of Luna (Siamese)", text: "Having all of Luna's lab results explained in plain English is incredible. I finally understand what the numbers mean." },
              { name: "Emily R.", pet: "Owner of Bella & Cooper", text: "Booking vet appointments used to take three phone calls. Now it takes three taps on my phone." },
              { name: "Mark J.", pet: "Owner of Zeus (German Shepherd)", text: "The weight tracking helped us notice a trend early, and we adjusted Zeus's diet before it became an issue." }
            ].map((t, i) => (
              <div key={i} className="bg-card border p-6 rounded-2xl shadow-sm">
                <div className="flex gap-1 mb-4 text-orange-400">
                  {Array(5).fill(0).map((_, j) => <Activity key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground mb-6 line-clamp-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
