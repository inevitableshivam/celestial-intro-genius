import { Bell, Settings, UserRound, Search, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserNav } from "./UserNav";
import { NotificationsPopover } from "./NotificationsPopover";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-nebula-800/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="flex h-full items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/4b9c5868-6b83-4442-98b7-7e71d5e13838.png"
            alt="Nebula Logo"
            className="h-8"
          />
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 h-10 bg-muted/50 border-muted hover:bg-muted/70 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <NotificationsPopover />
          <div className="h-6 w-px bg-border/50" />
          <UserNav />
        </div>
      </div>
    </header>
  );
}