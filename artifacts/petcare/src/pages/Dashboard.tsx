import { useState } from "react";
import { Link } from "wouter";
import { dummyPets, dummyVaccinations } from "@/data/pets";
import { dummyAppointments } from "@/data/appointments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarDays, AlertTriangle, FileText, ShoppingBag, Activity, MapPin, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const [demoEmergency, setDemoEmergency] = useState(false);

  // Get upcoming appointments (next 3)
  const upcomingAppointments = dummyAppointments
    .filter(a => a.status === "Upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Get overdue/due soon vaccinations
  const alertsVaccinations = dummyVaccinations.filter(v => v.status !== "Up to date");

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-primary/5 p-6 rounded-2xl border border-primary/10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Good morning, Jane!</h1>
          <p className="text-muted-foreground">Here's what's happening with your furry family members today.</p>
        </div>
        <div className="flex -space-x-3">
          {dummyPets.map((pet) => (
            <Link key={pet.id} href={`/pets/${pet.id}`}>
              <Avatar className="w-14 h-14 border-2 border-background cursor-pointer hover:-translate-y-1 transition-transform">
                <AvatarImage src={pet.photoUrl} alt={pet.name} className="object-cover" />
                <AvatarFallback>{pet.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
          ))}
          <Button variant="outline" size="icon" className="w-14 h-14 rounded-full border-2 border-background bg-white" asChild>
            <Link href="/pets">
              <span className="text-lg">+</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Emergency Status */}
      <Card className={`border-2 ${demoEmergency ? 'border-destructive bg-destructive/5' : 'border-green-500/20 bg-green-500/5'}`}>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${demoEmergency ? 'bg-destructive text-destructive-foreground' : 'bg-green-500 text-white'}`}>
              {demoEmergency ? <AlertTriangle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {demoEmergency ? "Requires attention: Mochi — Limping on right paw" : "Health Status: All Clear"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {demoEmergency ? "Reported today at 9:00 AM." : "No urgent issues reported across your pets."}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setDemoEmergency(!demoEmergency)}>
            Toggle Demo
          </Button>
        </CardContent>
      </Card>

      {/* Vaccination Alerts */}
      {alertsVaccinations.length > 0 && (
        <Alert variant="default" className="border-orange-500/30 bg-orange-500/5">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertTitle className="text-orange-700 font-semibold">Vaccination Reminders</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-3">
            {alertsVaccinations.map(vac => {
              const pet = dummyPets.find(p => p.id === vac.petId);
              return (
                <div key={vac.id} className="flex items-center justify-between bg-white/60 p-3 rounded-lg border border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={pet?.photoUrl} className="object-cover" />
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{pet?.name} — {vac.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {vac.status === "Overdue" ? <span className="text-destructive font-medium">Overdue since {vac.nextDue}</span> : `Due by ${vac.nextDue}`}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-orange-700 border-orange-500/30 hover:bg-orange-500/10" asChild>
                    <Link href={`/appointments/new?pet=${vac.petId}&type=Vaccination`}>Schedule</Link>
                  </Button>
                </div>
              );
            })}
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto flex-col py-6 gap-3 bg-card hover:bg-primary/5 hover:border-primary/30 hover-elevate transition-all" asChild>
          <Link href="/appointments/new">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CalendarDays className="w-6 h-6" />
            </div>
            <span className="font-medium">Book Appointment</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col py-6 gap-3 bg-card hover:bg-primary/5 hover:border-primary/30 hover-elevate transition-all" asChild>
          <Link href="/pets">
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <span className="font-medium">Medical Records</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col py-6 gap-3 bg-card hover:bg-primary/5 hover:border-primary/30 hover-elevate transition-all" asChild>
          <Link href="/coming-soon">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="font-medium">Shop Marketplace</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col py-6 gap-3 bg-card hover:bg-primary/5 hover:border-primary/30 hover-elevate transition-all" asChild>
          <Link href="/coming-soon">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="font-medium">Track Walk</span>
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link href="/appointments">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(app => {
                  const pet = dummyPets.find(p => p.id === app.petId);
                  return (
                    <div key={app.id} className="flex items-center gap-4 p-4 rounded-xl border bg-secondary/20 transition-colors hover:bg-secondary/40">
                      <div className="bg-white border rounded-lg p-2 text-center min-w-[3.5rem]">
                        <div className="text-xs font-semibold text-muted-foreground uppercase">{new Date(app.date).toLocaleString('default', { month: 'short' })}</div>
                        <div className="text-xl font-bold text-primary">{new Date(app.date).getDate()}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{app.type}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          {pet?.name} • {app.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/appointments"><ChevronRight className="w-5 h-5 text-muted-foreground" /></Link>
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No upcoming appointments.</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/appointments/new">Book one now</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pet Summaries */}
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Your Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyPets.map(pet => (
                <Link key={pet.id} href={`/pets/${pet.id}`} className="block">
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={pet.photoUrl} className="object-cover" />
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{pet.name}</h4>
                      <p className="text-sm text-muted-foreground">{pet.species} • {pet.age}</p>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      {pet.weight} kg
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
