import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/ui/sidebar";
import { FoldersIcon, WifiIcon } from "lucide-react";
import User from "./user";

export default function () {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <User />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FoldersIcon />
                  Пространства
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="text-muted-foreground">
                <SidebarMenuButton>
                  <WifiIcon />
                  Подключение
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="text-muted-foreground">
                <SidebarMenuButton>
                  <span>Горячие клавиши</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="text-muted-foreground">
                <SidebarMenuButton>
                  <span>Контакты</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
