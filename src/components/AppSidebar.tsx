import { Rocket, History, PenTool, Book, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: Rocket,
  },
  {
    title: "History",
    path: "/history",
    icon: History,
  },
  {
    title: "AI Writer",
    path: "/writer",
    icon: PenTool,
  },
  {
    title: "Resources",
    path: "/resources",
    icon: Book,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center gap-2 px-6 py-4 mb-6">
          <img 
            src="/lovable-uploads/e7e2ffa4-41f9-4d64-bfbf-7cf60a710117.png" 
            alt="Nebula Logo" 
            className="h-8"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-3 px-6 py-2 w-full text-nebula-300 hover:text-nebula-50 hover:bg-white/5 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}