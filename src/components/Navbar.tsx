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
import { GearIcon } from "@radix-ui/react-icons";

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
    <div className="sticky top-0 z-50 w-full border-b border-nebula-800/20 bg-background/80 backdrop-blur">
      <div className="w-full flex h-16 items-center px-8 gap-8">
        <div className="flex items-center gap-8 w-[280px] border-r border-nebula-800/20 px-6">
          <img 
            src="/lovable-uploads/4b9c5868-6b83-4442-98b7-7e71d5e13838.png" 
            alt="Logo" 
            className="h-8"
          />
        </div>

        <div className="flex-1">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 h-10 bg-muted/50 border-muted hover:bg-muted/70 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <GearIcon className="h-5 w-5" />
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-muted/50"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmic-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cosmic-500"></span>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          <div className="h-6 w-px bg-border/50" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-muted/50">
                <Avatar className="h-9 w-9 transition-transform">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-1" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-muted/50">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-muted/50">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 hover:text-red-600 hover:bg-red-100/10" 
                onClick={handleSignOut}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}