import { Settings, UserRound } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 glass-card mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/e7e2ffa4-41f9-4d64-bfbf-7cf60a710117.png" 
            alt="Nebula Logo" 
            className="h-8"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-nebula-300 hover:text-cosmic-300">
            <UserRound className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-nebula-300 hover:text-cosmic-300">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};