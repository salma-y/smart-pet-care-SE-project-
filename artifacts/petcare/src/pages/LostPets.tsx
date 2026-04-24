import { useState } from "react";
import { dummyLostPets, LostPetAlert } from "@/data/lostPets";
import { dummyPets } from "@/data/pets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, MapPin, Map as MapIcon, Share2, Search, CheckCircle2, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function LostPets() {
  const [alerts, setAlerts] = useState<LostPetAlert[]>(dummyLostPets);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [broadcastState, setBroadcastState] = useState<"idle" | "sending" | "sent">("idle");
  const [broadcastCount, setBroadcastCount] = useState(0);

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBroadcastState("sending");
    
    // Simulate finding users and sending alerts
    let count = 0;
    const interval = setInterval(() => {
      count += 142;
      setBroadcastCount(count);
      if (count > 1200) {
        clearInterval(interval);
        setBroadcastState("sent");
        
        // Add new alert to list
        const formData = new FormData(e.currentTarget);
        const petId = formData.get("petId") as string;
        const myPet = dummyPets.find(p => p.id === petId);
        
        const newAlert: LostPetAlert = {
          id: Math.random().toString(),
          petName: myPet ? myPet.name : "Unknown",
          species: myPet ? myPet.species : "Dog",
          breed: myPet ? myPet.breed : "Mixed",
          lastSeenLocation: formData.get("location") as string,
          dateLost: new Date().toISOString(),
          description: formData.get("description") as string,
          photoUrl: myPet ? myPet.photoUrl : "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
          contactPhone: formData.get("phone") as string,
          reward: formData.get("reward") as string,
          status: "Active"
        };
        
        setAlerts([newAlert, ...alerts]);
      }
    }, 100);
  };

  const resetForm = () => {
    setIsReportOpen(false);
    setTimeout(() => {
      setBroadcastState("idle");
      setBroadcastCount(0);
    }, 500);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-destructive/5 p-6 md:p-8 rounded-3xl border border-destructive/20 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 text-destructive/5">
          <AlertTriangle className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20 mb-4 text-sm px-3 py-1">Community Alert Network</Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Lost Pet Alerts</h1>
          <p className="text-muted-foreground text-lg">Mobilize the PetWell community. When a pet goes missing, every minute counts. Report a lost pet to instantly alert users in your area.</p>
        </div>
        
        <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogTrigger asChild>
            <Button size="lg" variant="destructive" className="relative z-10 h-14 px-8 text-base shadow-lg shadow-destructive/20">
              <AlertTriangle className="w-5 h-5 mr-2" /> Report Lost Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            {broadcastState === "idle" && (
              <form onSubmit={handleReportSubmit}>
                <div className="bg-destructive text-destructive-foreground p-6">
                  <DialogTitle className="text-2xl font-bold text-white mb-2">Create Emergency Alert</DialogTitle>
                  <DialogDescription className="text-white/80">
                    This will send a push notification to all PetWell users within a 5-mile radius of the last seen location.
                  </DialogDescription>
                </div>
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Which pet is missing?</Label>
                    <Select name="petId" required>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your pet" />
                      </SelectTrigger>
                      <SelectContent>
                        {dummyPets.map(pet => (
                          <SelectItem key={pet.id} value={pet.id}>{pet.name} ({pet.breed})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Last Seen Location</Label>
                    <Input name="location" placeholder="e.g. Intersection of Maple St and 4th Ave" required className="h-12" />
                    
                    {/* Map Placeholder */}
                    <div className="w-full h-40 bg-secondary/50 rounded-xl border-2 border-dashed border-border relative flex flex-col items-center justify-center text-muted-foreground overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                      <MapIcon className="w-8 h-8 mb-2" />
                      <span>Map selection area</span>
                      <Button type="button" variant="outline" size="sm" className="mt-2 bg-white relative z-10">Use Current Location</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Contact Phone</Label>
                      <Input name="phone" type="tel" placeholder="(555) 123-4567" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Reward (Optional)</Label>
                      <Input name="reward" placeholder="e.g. $200" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Details</Label>
                    <Textarea name="description" placeholder="Collar color, distinct markings, behavioral traits (skittish, friendly, food motivated)..." className="h-24 resize-none" required />
                  </div>
                </div>
                <div className="p-6 border-t bg-secondary/10 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsReportOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="destructive" className="px-8">Broadcast Alert</Button>
                </div>
              </form>
            )}

            {broadcastState === "sending" && (
              <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative">
                  <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
                    <Share2 className="w-10 h-10 text-destructive animate-pulse" />
                  </div>
                  {/* Radar ripple effects */}
                  <div className="absolute inset-0 border-2 border-destructive rounded-full animate-ping opacity-20" style={{ animationDuration: '2s' }}></div>
                  <div className="absolute inset-[-20px] border-2 border-destructive rounded-full animate-ping opacity-10" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Broadcasting Alert...</h3>
                  <p className="text-muted-foreground mb-6">Locating PetWell users in your area</p>
                </div>

                <div className="text-5xl font-mono font-bold text-destructive tabular-nums">
                  {broadcastCount.toLocaleString()}
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Users Alerted</p>
              </div>
            )}

            {broadcastState === "sent" && (
              <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Alert Successfully Sent</h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    <span className="font-bold text-foreground">{broadcastCount.toLocaleString()}</span> local pet owners have been notified and are looking out for your pet.
                  </p>
                </div>

                <Button className="w-full h-12 text-base" onClick={resetForm}>View Active Alerts</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Alerts Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> Active Local Alerts
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" /> 5 mile radius
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map(alert => (
            <Card key={alert.id} className="overflow-hidden border-2 flex flex-col">
              <div className="h-56 relative group">
                <img src={alert.photoUrl} alt={alert.petName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <Badge variant="destructive" className="absolute top-4 left-4 bg-destructive text-white border-none shadow-md px-3 py-1 text-sm font-bold uppercase tracking-wider animate-pulse">
                  Missing
                </Badge>
                {alert.reward && (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white border-none shadow-md font-bold">
                    Reward: {alert.reward}
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{alert.petName}</h3>
                  <p className="text-white/80 font-medium">{alert.breed}</p>
                </div>
              </div>
              
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase mb-0.5">Last Seen Location</p>
                    <p className="font-medium text-foreground">{alert.lastSeenLocation}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(alert.dateLost), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
                
                <div className="bg-secondary/40 p-4 rounded-xl text-sm leading-relaxed text-foreground/80 mb-4 flex-1">
                  "{alert.description}"
                </div>
              </CardContent>
              
              <CardFooter className="p-5 pt-0 border-t mt-auto gap-3">
                <Button variant="default" className="flex-1 font-semibold h-12" asChild>
                  <a href={`tel:${alert.contactPhone}`}>Contact Owner</a>
                </Button>
                <Button variant="outline" className="flex-1 font-semibold h-12 bg-card hover:bg-secondary">
                  I've Seen {alert.petName}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
