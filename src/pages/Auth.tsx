import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, Building2, User, Briefcase, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/background-beams";

const UserProfileForm = ({ 
  onSubmit, 
  loading 
}: { 
  onSubmit: (data: { fullName: string; position: string; companyName: string }) => void;
  loading: boolean;
}) => {
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ fullName, position, companyName });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
          <Input
            required
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Position</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
          <Input
            required
            placeholder="Enter your position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Company</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
          <Input
            required
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Button type="submit" className="w-full nebula-gradient" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Complete Profile
      </Button>
    </form>
  );
};

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setShowProfileForm(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });
      if (error) throw error;
      setShowProfileForm(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (data: { fullName: string; position: string; companyName: string }) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.fullName,
          position: data.position,
          company_name: data.companyName,
        });

      if (error) throw error;
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const dummyProfiles = [
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      name: "Sarah Wilson",
      role: "Product Manager",
      company: "TechCorp"
    },
    {
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      name: "Michael Chen",
      role: "Lead Developer",
      company: "InnovateSoft"
    },
    {
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignHub"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-nebula-900">
      <BackgroundBeams className="opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex gap-8 items-center justify-center">
          <Card className="w-full max-w-md p-8 space-y-6 glass-card backdrop-blur-xl bg-opacity-20">
            <div className="text-center">
              <img 
                src="/lovable-uploads/4b9c5868-6b83-4442-98b7-7e71d5e13838.png" 
                alt="Nebula Logo" 
                className="h-12 mx-auto mb-6"
              />
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cosmic-300 via-cosmic-400 to-cosmic-500 bg-clip-text text-transparent">
                Welcome to Nebula
              </h2>
              <p className="text-nebula-300 mt-2">Your AI-Powered Email Personalization Tool</p>
            </div>

            {showProfileForm ? (
              <UserProfileForm onSubmit={handleProfileSubmit} loading={loading} />
            ) : (
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label>Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full nebula-gradient"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label>Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-nebula-400" />
                          <Input
                            type="password"
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full nebula-gradient"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Continue
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </Card>

          <div className="hidden lg:grid grid-cols-1 gap-4 w-96">
            {dummyProfiles.map((profile, index) => (
              <div 
                key={index}
                className="relative h-48 overflow-hidden rounded-xl transition-all hover:scale-105"
                style={{
                  backgroundImage: `url(${profile.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-nebula-900/90 to-transparent p-4 flex flex-col justify-end">
                  <h3 className="font-medium text-nebula-100">{profile.name}</h3>
                  <p className="text-sm text-nebula-300">{profile.role}</p>
                  <p className="text-xs text-nebula-400">@ {profile.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
