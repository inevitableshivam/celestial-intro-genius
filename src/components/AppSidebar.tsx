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
    path: "/dashboard",
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

const socialLinks = [
  {
    title: "Discord",
    href: "https://discord.gg/a9du9Wwz",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill="currentColor"
          d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
        />
      </svg>
    ),
  },
  {
    title: "X (Twitter)",
    href: "https://x.com/nebula_tool",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fill="currentColor"
          d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        />
      </svg>
    ),
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-16 left-0 w-[280px] h-[calc(100vh-4rem)] border-r border-nebula-800/20 bg-[#0B1120] flex flex-col">
      <nav className="flex-1 overflow-y-auto">
        <div className="space-y-2 px-3 py-4">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  isActive && "bg-nebula-900/50"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            );
          })}
        </div>
      </nav>
      <div className="px-3 py-8 border-t border-nebula-800/20">
        <p className="text-sm text-nebula-400 mb-4 px-2">Join us on other platforms!</p>
        <div className="flex items-center gap-6 px-2">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nebula-400 hover:text-nebula-300 transition-colors"
              title={link.title}
            >
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.title}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}