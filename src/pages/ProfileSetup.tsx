import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface ProfileFormData {
  full_name: string;
  position: string;
  company_name: string;
}

export default function ProfileSetup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    position: '',
    company_name: '',
  });

  // Check if user is authenticated and if profile exists
  useEffect(() => {
    const checkAuthAndProfile = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          console.error('Auth error:', authError);
          navigate('/auth');
          return;
        }

        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          setIsLoading(false);
          return;
        }

        // If profile exists and has a name, redirect to main app
        if (profile?.full_name) {
          navigate('/', { replace: true });
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in auth check:', error);
        setIsLoading(false);
      }
    };

    checkAuthAndProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Authentication error');
      }

      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) throw upsertError;

      toast({
        title: "Profile Created",
        description: "Your profile has been set up successfully.",
      });

      // Use replace to prevent going back to profile setup
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Profile setup error:', error);
      toast({
        title: "Error",
        description: "Failed to set up profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nebula-900 via-nebula-950 to-black flex items-center justify-center">
        <div className="text-nebula-50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nebula-900 via-nebula-950 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-nebula-900/50 backdrop-blur-xl border-nebula-800/20">
        <h1 className="text-2xl font-semibold text-nebula-50 mb-6">Complete Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="full_name" className="text-sm font-medium text-nebula-200 block mb-2">
              Full Name
            </label>
            <Input
              id="full_name"
              required
              placeholder="John Doe"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="bg-nebula-800/20 border-nebula-700"
            />
          </div>
          <div>
            <label htmlFor="position" className="text-sm font-medium text-nebula-200 block mb-2">
              Position
            </label>
            <Input
              id="position"
              required
              placeholder="Software Engineer"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="bg-nebula-800/20 border-nebula-700"
            />
          </div>
          <div>
            <label htmlFor="company_name" className="text-sm font-medium text-nebula-200 block mb-2">
              Company Name
            </label>
            <Input
              id="company_name"
              required
              placeholder="Acme Inc"
              value={formData.company_name}
              onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              className="bg-nebula-800/20 border-nebula-700"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-nebula-600 hover:bg-nebula-500"
            disabled={isSaving}
          >
            {isSaving ? "Setting up..." : "Complete Setup"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
