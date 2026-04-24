import { useState } from "react";
import { Link } from "wouter";
import { dummyAppointments } from "@/data/appointments";
import { dummyPets } from "@/data/pets";
import { dummyVets } from "@/data/vets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, CalendarDays, Plus, User, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Appointments() {
  const upcoming = dummyAppointments.filter(a => a.status === "Upcoming").sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = dummyAppointments.filter(a => a.status === "Completed" || a.status === "Cancelled").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const AppointmentCard = ({ app }: { app: any }) => {
    const pet = dummyPets.find(p => p.id === app.petId);
    const vet = dummyVets.find(v => v.id === app.vetId);
    
    return (
      <Card className="border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-secondary/40 p-6 flex md:flex-col justify-center items-center gap-4 md:w-40 border-b md:border-b-0 md:border-r">
            <div className="text-center">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{new Date(app.date).toLocaleString('default', { month: 'short' })}</div>
              <div className="text-3xl font-bold text-foreground">{new Date(app.date).getDate()}</div>
              <div className="text-sm text-muted-foreground">{new Date(app.date).getFullYear()}</div>
            </div>
            <Badge variant="outline" className={`
              ${app.status === 'Upcoming' ? 'bg-primary/10 text-primary border-primary/20' : ''}
              ${app.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
              ${app.status === 'Cancelled' ? 'bg-muted text-muted-foreground border-border' : ''}
            `}>
              {app.status}
            </Badge>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{app.type}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="w-4 h-4" /> {app.time}
                  </div>
                </div>
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={pet?.photoUrl} />
                  <AvatarFallback>{pet?.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex items-center gap-3 bg-secondary/20 p-3 rounded-lg border border-border/50 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={vet?.photoUrl} />
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{vet?.name}</p>
                  <p className="text-xs text-muted-foreground">{vet?.specialty}</p>
                </div>
              </div>

              {app.notes && (
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="italic">"{app.notes}"</p>
                </div>
              )}
            </div>
            
            {app.status === "Upcoming" && (
              <div className="flex gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" className="flex-1">Reschedule</Button>
                <Button variant="outline" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/5">Cancel</Button>
              </div>
            )}
            {app.status === "Completed" && (
              <div className="flex gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/pets/${app.petId}`}>View Medical Record</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Manage your vet visits and schedules.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/appointments/new"><Plus className="w-4 h-4" /> Book Appointment</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past History</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length > 0 ? upcoming.map(app => <AppointmentCard key={app.id} app={app} />) : (
            <div className="text-center py-16 bg-card border rounded-2xl border-dashed">
              <CalendarDays className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
              <p className="text-muted-foreground mb-6">Your pets are all caught up on their visits.</p>
              <Button asChild variant="outline">
                <Link href="/appointments/new">Book a Checkup</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {past.length > 0 ? past.map(app => <AppointmentCard key={app.id} app={app} />) : (
            <div className="text-center py-16 bg-card border rounded-2xl border-dashed">
              <p className="text-muted-foreground">No past appointments found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
