import {
  LayoutDashboard,
  History,
  Pencil,
  FileText,
  Settings,
} from "lucide-react";
import { Sidebar as SidebarComponent } from "./ui/sidebar";

export function Sidebar() {
  return (
    <SidebarComponent>
      <SidebarComponent.Content>
        <SidebarComponent.Branding>
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
        </SidebarComponent.Branding>

        <SidebarComponent.Section>
          <SidebarComponent.Item
            href="/dashboard"
            icon={<LayoutDashboard className="h-5 w-5 stroke-[1.5]" />}
            isActive
          >
            Dashboard
          </SidebarComponent.Item>

          <SidebarComponent.Item
            href="/history"
            icon={<History className="h-5 w-5 stroke-[1.5]" />}
          >
            History
          </SidebarComponent.Item>

          <SidebarComponent.Item
            href="/ai-writer"
            icon={<Pencil className="h-5 w-5 stroke-[1.5]" />}
          >
            AI Writer
          </SidebarComponent.Item>

          <SidebarComponent.Item
            href="/resources"
            icon={<FileText className="h-5 w-5 stroke-[1.5]" />}
          >
            Resources
          </SidebarComponent.Item>

          <SidebarComponent.Item
            href="/settings"
            icon={<Settings className="h-5 w-5 stroke-[1.5]" />}
          >
            Settings
          </SidebarComponent.Item>
        </SidebarComponent.Section>
      </SidebarComponent.Content>
    </SidebarComponent>
  );
}
