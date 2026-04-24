import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
        {submitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Check your email</h2>
              <p className="text-muted-foreground">
                We've sent a password reset link to your email address.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full h-12 rounded-xl">
              <Link href="/login">Return to login</Link>
            </Button>
          </div>
        ) : (
          <>
            <CardHeader className="space-y-1 text-center pb-8 pt-8">
              <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" required className="h-12 rounded-xl bg-secondary/50 border-transparent focus:bg-white" />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl text-base mt-2">
                  Send reset link
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center pb-8 pt-4">
              <Link href="/login" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
}
