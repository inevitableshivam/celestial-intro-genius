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
            src="/lovable-uploads/4b9c5868-6b83-4442-98b7-7e71d5e13838.png" 
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
                    className="flex items-center gap-3 px-6 py-3 w-full text-nebula-300 hover:text-cosmic-300 hover:bg-cosmic-500/5 transition-colors rounded-lg"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
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