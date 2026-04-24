import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Stethoscope, AlertTriangle, ArrowRight, HeartPulse, ShieldAlert } from "lucide-react";

export default function SymptomChecker() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        urgency: "Soon", // Routine, Soon, Urgent, Emergency
        specialist: "General Vet",
        title: "Requires evaluation within 24-48 hours",
        steps: [
          "Keep your pet comfortable and monitor food/water intake.",
          "Avoid rigorous exercise until evaluated.",
          "Take a video of the symptom if it's intermittent to show the vet."
        ]
      });
      setStep(4);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Symptom Checker</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Answer a few questions to get guidance on the urgency of your pet's symptoms and who they should see.
        </p>
      </div>

      <Card className="border-2 shadow-sm relative overflow-hidden">
        {/* Progress bar */}
        {step < 4 && (
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <CardContent className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">What species is your pet?</h2>
                <RadioGroup defaultValue="dog" className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Dog', 'Cat', 'Bird', 'Rabbit', 'Reptile', 'Other'].map((s) => (
                    <div key={s}>
                      <RadioGroupItem value={s.toLowerCase()} id={`s-${s}`} className="peer sr-only" />
                      <Label
                        htmlFor={`s-${s}`}
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-secondary hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                      >
                        <span className="font-semibold mt-2">{s}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="pt-4 flex justify-end">
                <Button onClick={() => setStep(2)} className="gap-2 px-8">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <h2 className="text-xl font-semibold mb-4">What is the primary symptom area?</h2>
                <RadioGroup defaultValue="digestive" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Skin/Coat', 'Eyes/Ears', 'Digestive', 'Behavior', 'Breathing', 'Mobility', 'Urinary', 'Other'].map((s) => (
                    <div key={s}>
                      <RadioGroupItem value={s.toLowerCase()} id={`a-${s}`} className="peer sr-only" />
                      <Label
                        htmlFor={`a-${s}`}
                        className="flex items-center p-4 rounded-xl border-2 border-muted bg-transparent hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <span className="font-medium">{s}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="pt-4 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="gap-2 px-8">
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div>
                <h2 className="text-xl font-semibold mb-6">Severity & Duration</h2>
                
                <div className="space-y-4 mb-8">
                  <Label className="text-base">How severe is the symptom?</Label>
                  <Slider defaultValue={[2]} max={5} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mild (1)</span>
                    <span>Moderate (3)</span>
                    <span>Severe (5)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">How long has this been happening?</Label>
                  <RadioGroup defaultValue="days" className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hours" id="dur-hours" />
                      <Label htmlFor="dur-hours">Just started (hours)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="days" id="dur-days" />
                      <Label htmlFor="dur-days">A few days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weeks" id="dur-weeks" />
                      <Label htmlFor="dur-weeks">Weeks or longer</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label className="text-base block mb-3">Accompanying signs (check all that apply)</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {['Lethargy', 'Loss of appetite', 'Vomiting', 'Diarrhea', 'Pain when touched', 'Fever'].map(s => (
                    <div key={s} className="flex items-center space-x-2 border p-3 rounded-lg bg-secondary/20">
                      <Checkbox id={`check-${s}`} />
                      <Label htmlFor={`check-${s}`} className="cursor-pointer flex-1">{s}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handleAnalyze} disabled={analyzing} className="gap-2 px-8 min-w-[140px]">
                  {analyzing ? "Analyzing..." : "Analyze Symptoms"}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  result.urgency === 'Emergency' ? 'bg-red-100 text-red-600' :
                  result.urgency === 'Urgent' ? 'bg-orange-100 text-orange-600' :
                  result.urgency === 'Soon' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {result.urgency === 'Emergency' ? <ShieldAlert className="w-10 h-10" /> : <HeartPulse className="w-10 h-10" />}
                </div>
                <h2 className="text-2xl font-bold mb-2">Evaluation: See Vet {result.urgency}</h2>
                <p className="text-muted-foreground">{result.title}</p>
              </div>

              <div className="bg-secondary/30 p-6 rounded-2xl border">
                <h3 className="font-semibold mb-4 text-foreground">Recommended Next Steps</h3>
                <ul className="space-y-3">
                  {result.steps.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i+1}</div>
                      <span className="text-foreground/80 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-12 text-base" onClick={() => setStep(1)}>
                  Start Over
                </Button>
                <Button className="flex-1 h-12 text-base" asChild>
                  <Link href={`/appointments/new?specialty=${encodeURIComponent(result.specialist)}`}>
                    Book Appointment Now
                  </Link>
                </Button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Disclaimer: This tool provides general guidance based on common veterinary practices. It does not replace professional medical advice. If you feel your pet is having a true emergency, go to the nearest emergency clinic immediately.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
