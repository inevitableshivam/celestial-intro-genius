import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Edit, Plus } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img src="/lovable-uploads/4b9c5868-6b83-4442-98b7-7e71d5e13838.png" alt="Nebula Logo" className="h-6" />
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button
                variant={isActive('/') ? "secondary" : "ghost"}
                size="sm"
                className="w-9 px-0"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Dashboard</span>
              </Button>
            </Link>
            <Link to="/writer">
              <Button
                variant={isActive('/writer') ? "secondary" : "ghost"}
                size="sm"
                className="w-9 px-0"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">AI Writer</span>
              </Button>
            </Link>
            <Link to="/extra">
              <Button
                variant={isActive('/extra') ? "secondary" : "ghost"}
                size="sm"
                className="w-9 px-0"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Extra</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}