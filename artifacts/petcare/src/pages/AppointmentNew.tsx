import { useState } from "react";
import { Link, useLocation } from "wouter";
import { dummyPets } from "@/data/pets";
import { dummyVets } from "@/data/vets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle2, Star } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function AppointmentNew() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [petId, setPetId] = useState<string>(dummyPets[0].id);
  const [type, setType] = useState<string>("Consultation");
  const [vetId, setVetId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const selectedPet = dummyPets.find(p => p.id === petId);
  const selectedVet = dummyVets.find(v => v.id === vetId);

  const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "11:00 AM", "01:30 PM", "02:00 PM", "03:30 PM", "04:00 PM"];

  const handleConfirm = () => {
    setSuccess(true);
    toast({
      title: "Appointment Confirmed",
      description: `Your booking for ${selectedPet?.name} has been confirmed.`,
    });
    // Normally we would save to API here
  };

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[80vh]">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-foreground">Booking Confirmed!</h1>
        <p className="text-muted-foreground max-w-md mb-8 text-lg">
          You're all set. We've sent a confirmation email with details for {selectedPet?.name}'s appointment.
        </p>
        
        <Card className="max-w-md w-full mb-8 text-left bg-secondary/30">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pet</span>
              <span className="font-medium text-foreground">{selectedPet?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">{type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-foreground">{date ? format(date, 'PPP') : ''} at {time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Veterinarian</span>
              <span className="font-medium text-foreground">{selectedVet?.name}</span>
            </div>
          </CardContent>
        </Card>

        <Button asChild size="lg" className="px-8">
          <Link href="/appointments">View My Appointments</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/appointments")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground">Step {step} of 3</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Booking Flow */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Visit Details</CardTitle>
                <CardDescription>Who is this appointment for and what do they need?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-base">Select Pet</Label>
                  <RadioGroup value={petId} onValueChange={setPetId} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dummyPets.map((pet) => (
                      <div key={pet.id}>
                        <RadioGroupItem value={pet.id} id={`pet-${pet.id}`} className="peer sr-only" />
                        <Label
                          htmlFor={`pet-${pet.id}`}
                          className="flex flex-col items-center justify-between rounded-xl border-2 p-4 hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <Avatar className="w-12 h-12 mb-3">
                            <AvatarImage src={pet.photoUrl} />
                            <AvatarFallback>{pet.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{pet.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Appointment Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">General Consultation</SelectItem>
                      <SelectItem value="Vaccination">Vaccination Update</SelectItem>
                      <SelectItem value="Checkup">Annual Checkup</SelectItem>
                      <SelectItem value="Surgery">Surgery / Procedure</SelectItem>
                      <SelectItem value="Grooming">Grooming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Additional Notes (Optional)</Label>
                  <Textarea placeholder="Please describe the reason for your visit..." className="resize-none h-24" />
                </div>
                
                <Button className="w-full h-12 text-base" onClick={() => setStep(2)}>
                  Continue to Provider Selection
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-0 shadow-sm animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Select a Veterinarian</CardTitle>
                <CardDescription>Choose from our available professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={vetId} onValueChange={setVetId} className="space-y-4">
                  {dummyVets.map((vet) => (
                    <div key={vet.id}>
                      <RadioGroupItem value={vet.id} id={`vet-${vet.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`vet-${vet.id}`}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border-2 p-4 hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <Avatar className="w-16 h-16 border">
                          <AvatarImage src={vet.photoUrl} className="object-cover" />
                          <AvatarFallback>{vet.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-semibold text-lg">{vet.name}</span>
                            <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded">
                              <Star className="w-3 h-3 mr-1 fill-current" /> {vet.rating} ({vet.reviews})
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{vet.specialty} • {vet.distance} away</p>
                          <p className="text-xs font-medium text-primary mt-2">Next available: {vet.nextAvailable}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="flex gap-4 pt-6">
                  <Button variant="outline" className="h-12 w-full" onClick={() => setStep(1)}>Back</Button>
                  <Button className="h-12 w-full" onClick={() => setStep(3)} disabled={!vetId}>
                    Continue to Date & Time
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-0 shadow-sm animate-in fade-in slide-in-from-right-4">
              <CardHeader>
                <CardTitle>Date & Time</CardTitle>
                <CardDescription>When would you like to come in?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-xl border shadow-sm p-3 w-full"
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <Label className="text-base block mb-2">Available Slots {date ? `on ${format(date, 'MMM d')}` : ''}</Label>
                    {date ? (
                      <RadioGroup value={time} onValueChange={setTime} className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <div key={slot}>
                            <RadioGroupItem value={slot} id={`time-${slot}`} className="peer sr-only" />
                            <Label
                              htmlFor={`time-${slot}`}
                              className="flex items-center justify-center py-3 rounded-lg border text-sm font-medium hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer transition-all"
                            >
                              {slot}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="h-full flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-xl p-8 bg-secondary/20">
                        Please select a date first
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Button variant="outline" className="h-12 w-full" onClick={() => setStep(2)}>Back</Button>
                  <Button className="h-12 w-full" onClick={handleConfirm} disabled={!date || !time}>
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-0 shadow-sm bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pet Info */}
              <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                <Avatar className="w-12 h-12 border bg-white">
                  <AvatarImage src={selectedPet?.photoUrl} />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-semibold text-foreground">{selectedPet?.name || "Not selected"}</p>
                </div>
              </div>

              {/* Type Info */}
              <div className="border-b border-primary/10 pb-4">
                <p className="text-sm text-muted-foreground mb-1">Reason for Visit</p>
                <p className="font-semibold text-foreground">{type}</p>
              </div>

              {/* Vet Info */}
              <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                {selectedVet ? (
                  <>
                    <Avatar className="w-10 h-10 border bg-white">
                      <AvatarImage src={selectedVet.photoUrl} className="object-cover" />
                    </Avatar>
                    <div>
                      <p className="text-sm text-muted-foreground">Provider</p>
                      <p className="font-semibold text-foreground">{selectedVet.name}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-semibold text-foreground italic opacity-50">Not selected</p>
                  </div>
                )}
              </div>

              {/* Date/Time Info */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                {date && time ? (
                  <div className="flex items-center gap-2 text-primary font-medium bg-white p-3 rounded-lg border border-primary/20 shadow-sm">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{format(date, 'MMM d, yyyy')} at {time}</span>
                  </div>
                ) : (
                  <p className="font-semibold text-foreground italic opacity-50">Not selected</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
