import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ProfileData {
  full_name: string | null;
  position: string | null;
  company_name: string | null;
}

export function UserProfile() {
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email || "");
          
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Profile</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <div className="space-y-2">
          <Label>Full Name</Label>
          <p className="text-sm text-muted-foreground">{profile?.full_name || "Not set"}</p>
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <p className="text-sm text-muted-foreground">{profile?.position || "Not set"}</p>
        </div>
        <div className="space-y-2">
          <Label>Company</Label>
          <p className="text-sm text-muted-foreground">{profile?.company_name || "Not set"}</p>
        </div>
      </div>
    </div>
  );
}