import { useState } from "react";
import { Link } from "wouter";
import { dummyPets, Pet } from "@/data/pets";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Activity, Heart, Info, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>(dummyPets);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const handleAddPet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newPet: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.get("name") as string,
      species: formData.get("species") as any,
      breed: formData.get("breed") as string,
      age: formData.get("age") as string,
      weight: Number(formData.get("weight")),
      photoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
      allergies: [],
      ownerNotes: formData.get("notes") as string,
    };

    setPets([...pets, newPet]);
    setIsAddOpen(false);
    toast({
      title: "Pet Added",
      description: `${newPet.name} has been added to your family.`
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Pets</h1>
          <p className="text-muted-foreground">Manage your furry family members.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Add New Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddPet}>
              <DialogHeader>
                <DialogTitle>Add New Pet</DialogTitle>
                <DialogDescription>
                  Enter your pet's details to create their medical profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="species" className="text-right">Species</Label>
                  <div className="col-span-3">
                    <Select name="species" defaultValue="Dog">
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Cat">Cat</SelectItem>
                        <SelectItem value="Bird">Bird</SelectItem>
                        <SelectItem value="Rabbit">Rabbit</SelectItem>
                        <SelectItem value="Reptile">Reptile</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="breed" className="text-right">Breed</Label>
                  <Input id="breed" name="breed" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="age" className="text-right">Age</Label>
                  <Input id="age" name="age" placeholder="e.g. 2 years, 3 months" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="weight" className="text-right">Weight (kg)</Label>
                  <Input id="weight" name="weight" type="number" step="0.1" required className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="photo" className="text-right">Photo</Label>
                  <Input id="photo" name="photo" type="file" accept="image/*" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right pt-2">Notes</Label>
                  <Input id="notes" name="notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Pet</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map(pet => (
          <Card key={pet.id} className="overflow-hidden hover:shadow-md transition-all duration-300 border-2 group">
            <div className="h-48 overflow-hidden relative">
              <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-white/90 text-foreground backdrop-blur shadow-sm hover:bg-white">
                  {pet.species}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-1">{pet.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    {pet.breed}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="gap-1 bg-secondary/50">
                  <Calendar className="w-3 h-3" /> {pet.age}
                </Badge>
                <Badge variant="secondary" className="gap-1 bg-secondary/50">
                  <Activity className="w-3 h-3" /> {pet.weight} kg
                </Badge>
                {pet.allergies.length > 0 && (
                  <Badge variant="outline" className="gap-1 border-orange-200 text-orange-700 bg-orange-50">
                    <Info className="w-3 h-3" /> {pet.allergies.length} Allergies
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                <Link href={`/pets/${pet.id}`}>View Medical Record</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
