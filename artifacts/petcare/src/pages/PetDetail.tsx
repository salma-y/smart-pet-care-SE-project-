import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { dummyPets, dummyVaccinations, dummyLabResults, dummyPrescriptions, dummyMedicalNotes, dummyWeightHistory, dummyChronicConditions } from "@/data/pets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Activity, Calendar, FileText, Pill, Syringe, HeartPulse, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

export default function PetDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const petId = params.id;
  
  const pet = dummyPets.find(p => p.id === petId);
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  if (!pet) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Pet not found</h2>
        <Button onClick={() => setLocation("/pets")}>Back to Pets</Button>
      </div>
    );
  }

  const petVaccinations = dummyVaccinations.filter(v => v.petId === petId);
  const petLabs = dummyLabResults.filter(l => l.petId === petId);
  const petPrescriptions = dummyPrescriptions.filter(p => p.petId === petId);
  const petNotes = dummyMedicalNotes.filter(n => n.petId === petId);
  const petWeights = dummyWeightHistory.filter(w => w.id === petId);
  const petConditions = dummyChronicConditions.filter(c => c.petId === petId);

  const handleDownloadPassport = () => {
    toast({
      title: "Download Started",
      description: `${pet.name}'s travel passport is being generated.`
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/pets")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Medical Record</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 overflow-hidden border-2">
          <div className="h-48 overflow-hidden relative">
            <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
          </div>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{pet.name}</CardTitle>
                <CardDescription className="text-base text-primary font-medium">{pet.breed}</CardDescription>
              </div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{pet.species}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-3 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Age</p>
                <p className="font-medium">{pet.age}</p>
              </div>
              <div className="bg-secondary/50 p-3 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Weight</p>
                <p className="font-medium">{pet.weight} kg</p>
              </div>
            </div>
            
            {pet.microchipId && (
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Microchip ID</p>
                <p className="text-sm font-mono bg-secondary/30 p-2 rounded border">{pet.microchipId}</p>
              </div>
            )}
            
            {pet.allergies.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {pet.allergies.map(a => (
                    <Badge key={a} variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {pet.ownerNotes && (
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Owner Notes</p>
                <p className="text-sm text-muted-foreground italic">"{pet.ownerNotes}"</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2" onClick={handleDownloadPassport}>
              <Download className="w-4 h-4" /> Pet Passport
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="vaccinations" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto p-1 bg-secondary/50 rounded-xl mb-6">
              <TabsTrigger value="vaccinations" className="py-2.5 rounded-lg text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Vaccines</TabsTrigger>
              <TabsTrigger value="labs" className="py-2.5 rounded-lg text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Labs</TabsTrigger>
              <TabsTrigger value="meds" className="py-2.5 rounded-lg text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Meds</TabsTrigger>
              <TabsTrigger value="notes" className="py-2.5 rounded-lg text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Notes</TabsTrigger>
              <TabsTrigger value="weight" className="py-2.5 rounded-lg text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Weight</TabsTrigger>
              <TabsTrigger value="logs" className="py-2.5 rounded-lg text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="vaccinations" className="space-y-4 m-0">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Syringe className="w-5 h-5 text-primary" /> Vaccination History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {petVaccinations.length > 0 ? (
                    <div className="rounded-xl border overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-secondary/50 text-muted-foreground">
                          <tr>
                            <th className="px-4 py-3 font-medium">Vaccine</th>
                            <th className="px-4 py-3 font-medium">Date Given</th>
                            <th className="px-4 py-3 font-medium">Next Due</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {petVaccinations.map(v => (
                            <tr key={v.id} className="bg-white">
                              <td className="px-4 py-3 font-medium">{v.name}</td>
                              <td className="px-4 py-3 text-muted-foreground">{v.dateAdministered}</td>
                              <td className="px-4 py-3">{v.nextDue}</td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className={`
                                  ${v.status === 'Up to date' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                  ${v.status === 'Due soon' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                                  ${v.status === 'Overdue' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                `}>
                                  {v.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No vaccination records found.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labs" className="m-0">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Lab Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {petLabs.length > 0 ? petLabs.map(lab => (
                    <div key={lab.id} className="border rounded-xl overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-secondary/20 transition-colors"
                        onClick={() => setExpandedLab(expandedLab === lab.id ? null : lab.id)}
                      >
                        <div>
                          <h4 className="font-semibold text-foreground">{lab.testName}</h4>
                          <p className="text-sm text-muted-foreground">{lab.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={lab.status === 'Normal' || lab.status === 'Negative' ? 'default' : 'destructive'} 
                                 className={lab.status === 'Normal' || lab.status === 'Negative' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}>
                            {lab.status}
                          </Badge>
                          {expandedLab === lab.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      </div>
                      {expandedLab === lab.id && (
                        <div className="p-4 bg-blue-50/50 border-t border-blue-100">
                          <p className="text-sm text-blue-900 leading-relaxed">
                            <strong>Simplified Insight:</strong> {lab.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">No lab results found.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meds" className="m-0">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-orange-500" /> Prescriptions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {petPrescriptions.length > 0 ? petPrescriptions.map(p => (
                    <div key={p.id} className="border rounded-xl p-4 bg-white flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-lg text-foreground flex items-center gap-2">
                          {p.medication}
                          {p.refills === 0 && <Badge variant="destructive" className="text-[10px] h-5 px-1.5">No Refills</Badge>}
                        </h4>
                        <p className="text-muted-foreground mt-1">{p.dosage}</p>
                        <div className="flex items-center gap-2 mt-3 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{p.schedule}</span>
                        </div>
                      </div>
                      <div className="sm:text-right text-sm text-muted-foreground">
                        <p>Prescribed by</p>
                        <p className="font-medium text-foreground">{p.vet}</p>
                        <p className="mt-2 text-xs">Refills remaining: <span className="font-bold text-foreground">{p.refills}</span></p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">No active prescriptions.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="m-0">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" /> Medical Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {petNotes.length > 0 ? petNotes.map(n => (
                    <div key={n.id} className="relative pl-6 pb-6 border-l-2 border-secondary last:border-0 last:pb-0">
                      <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                      <div className="bg-secondary/30 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-foreground">{n.date}</p>
                          <p className="text-sm text-muted-foreground">{n.vet}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground/80">{n.note}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">No medical notes found.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weight" className="m-0">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" /> Weight History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {petWeights.length > 0 ? (
                    <div className="h-[300px] w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={petWeights} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                          <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            formatter={(value: number) => [`${value} kg`, 'Weight']}
                          />
                          {/* Example ideal range for demo purposes */}
                          <ReferenceArea y1={pet.weight - 1} y2={pet.weight + 1} fill="#10b981" fillOpacity={0.1} />
                          <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "#fff"}} activeDot={{r: 6}} />
                        </LineChart>
                      </ResponsiveContainer>
                      <p className="text-center text-xs text-muted-foreground mt-4">Shaded area represents ideal weight range for {pet.breed}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No weight history recorded.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="m-0">
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-red-500" /> Chronic Conditions Log
                  </CardTitle>
                  <Button variant="outline" size="sm">Add Entry</Button>
                </CardHeader>
                <CardContent className="mt-4 space-y-4">
                  {petConditions.length > 0 ? petConditions.map(c => (
                    <div key={c.id} className="border rounded-xl p-4 bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{c.condition}</h4>
                          <p className="text-xs text-muted-foreground">{c.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <div key={star} className={`w-3 h-3 rounded-full ${star <= c.severity ? 'bg-red-400' : 'bg-secondary'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80">{c.notes}</p>
                    </div>
                  )) : (
                    <p className="text-muted-foreground text-center py-8">No chronic condition logs.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
