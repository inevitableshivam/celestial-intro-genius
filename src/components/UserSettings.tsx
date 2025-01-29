import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function UserSettings() {
  const { toast } = useToast();

  const handleResetPassword = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("No user email found");

      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          className="justify-start"
          onClick={handleResetPassword}
        >
          <Lock className="mr-2 h-4 w-4" />
          Change Password
        </Button>
        <Button
          variant="outline"
          className="justify-start"
          disabled
        >
          <Settings2 className="mr-2 h-4 w-4" />
          More settings coming soon
        </Button>
      </div>
    </div>
  );
}