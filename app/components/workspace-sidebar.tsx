import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@yz13/ui/sidebar";
import { HistoryIcon, StarIcon, StickyNoteIcon, TagIcon, WifiIcon } from "lucide-react";
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
                  <HistoryIcon />
                  Последние
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Избранное</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <StarIcon />
                  Заметка
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Заметки</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <StickyNoteIcon />
                  Заметка
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Тэги</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <TagIcon />
                  Тэг
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
