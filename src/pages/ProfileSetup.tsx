import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    company_name: '',
  });

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('Error checking profile:', error);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          position: formData.position,
          company_name: formData.company_name,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
            <label className="text-sm font-medium text-nebula-200 block mb-2">
              Full Name
            </label>
            <Input
              required
              placeholder="John Doe"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              className="bg-nebula-800/20 border-nebula-700"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-nebula-200 block mb-2">
              Position
            </label>
            <Input
              required
              placeholder="Software Engineer"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="bg-nebula-800/20 border-nebula-700"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-nebula-200 block mb-2">
              Company Name
            </label>
            <Input
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
            disabled={loading}
          >
            {loading ? "Saving..." : "Complete Setup"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSetup;
