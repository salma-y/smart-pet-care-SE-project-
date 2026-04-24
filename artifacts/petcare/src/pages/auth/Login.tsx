import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGoogle, SiApple, SiFacebook } from "react-icons/si";

export default function Login() {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
          PW
        </div>
        <span className="text-2xl font-bold tracking-tight text-primary">PetWell</span>
      </Link>

      <Card className="w-full max-w-md border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="space-y-1 text-center pb-8 pt-8">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@example.com" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl text-base mt-2">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" onClick={handleSubmit} className="h-12 rounded-xl bg-white">
              <SiGoogle className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleSubmit} className="h-12 rounded-xl bg-white">
              <SiApple className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleSubmit} className="h-12 rounded-xl bg-white">
              <SiFacebook className="h-5 w-5 text-blue-600" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-8 pt-4">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
