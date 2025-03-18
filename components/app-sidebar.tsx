import { Home, LogOut, Settings, User, Book, UserSquare2Icon } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Virtual Teacher",
    url: "/dashboard/virtual",
    icon: UserSquare2Icon,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: User,
  },
  {
    title: "Lesson Plan",
    url: "/dashboard/lessons",
    icon: Book,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border/50">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 py-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">VT</span>
                </div>
                <span className="text-xl font-semibold">Virtual Teacher</span>
              </div>
            </SidebarGroupLabel>
            <SidebarSeparator />
            <SidebarGroupContent className="px-2 py-2">
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url} className="flex items-center gap-3 px-3 py-2 text-[0.95rem] font-medium transition-colors">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-border/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={logout}
                className=" flex items-center mb-2 gap-3 px-5 py-3 text-[0.95rem] font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

    </SidebarProvider>
  )
}
