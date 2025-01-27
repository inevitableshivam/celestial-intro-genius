import { Bell, Settings, UserRound } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 border-b border-nebula-800 bg-[#0B0F19]/50 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-end gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-nebula-300 hover:text-cosmic-300 hover:bg-cosmic-500/5 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cosmic-500 rounded-full"></span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-nebula-300 hover:text-cosmic-300 hover:bg-cosmic-500/5"
            >
              <UserRound className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Profile</TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}