import { 
  HomeIcon,
  ClockIcon,
  Pencil2Icon,
  ReaderIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

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
  {
    title: "Settings",
    path: "/settings",
    icon: GearIcon,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-16 left-0 w-[280px] h-[calc(100vh-4rem)] border-r border-nebula-800/20 bg-gray-900">
      <nav className="h-full overflow-y-auto">
        <div className="space-y-2 px-3 py-4">
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
      </div>
      </nav>
    </aside>

  );
}