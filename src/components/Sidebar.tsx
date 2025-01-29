import {
  LayoutDashboard,
  History,
  Pencil,
  FileText,
  Settings,
} from "lucide-react";
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarBranding,
  SidebarSection,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "./ui/sidebar";

export function Sidebar() {
  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarBranding>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white">Nebula</span>
          </div>
        </SidebarBranding>

        <SidebarSection>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <a href="/">
                  <LayoutDashboard className="h-5 w-5 stroke-[1.5]" />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/history">
                  <History className="h-5 w-5 stroke-[1.5]" />
                  <span>History</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/writer">
                  <Pencil className="h-5 w-5 stroke-[1.5]" />
                  <span>AI Writer</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/resources">
                  <FileText className="h-5 w-5 stroke-[1.5]" />
                  <span>Resources</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/settings">
                  <Settings className="h-5 w-5 stroke-[1.5]" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarSection>
      </SidebarContent>
    </SidebarComponent>
  );
}