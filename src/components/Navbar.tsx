import { Bell, Settings, UserRound } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4">
      <div className="container mx-auto flex items-center justify-end gap-4">
        <Button variant="ghost" size="icon" className="text-nebula-300 hover:text-cosmic-300 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="text-nebula-300 hover:text-cosmic-300">
          <UserRound className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};