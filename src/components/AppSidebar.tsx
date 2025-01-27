import { 
  HomeIcon,
  ClockIcon,
  Pencil2Icon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    title: "History",
    path: "/history",
    icon: ClockIcon,
  },
  {
    title: "AI Writer",
    path: "/writer",
    icon: Pencil2Icon,
  },
  {
    title: "Resources",
    path: "/resources",
    icon: ReaderIcon,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-[calc(100vh-64px)] w-[280px] flex-shrink-0 border-r border-l border-nebula-800/20 bg-background/40">
      <div className="flex-1 py-8">
        <nav className="space-y-4 px-3">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.title}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full justify-start gap-8 px-5 py-3 text-lg rounded-md",
                  "hover:bg-white/5 hover:text-white",
                  "transition-colors duration-200",
                  "relative font-medium",
                  {
                    "bg-white/5 text-white": isActive,
                    "text-muted-foreground": !isActive,
                  }
                )}
              >
                <item.icon className="h-[24px] w-[24px]" />
                <span>{item.title}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}