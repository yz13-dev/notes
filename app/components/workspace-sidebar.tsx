import { useNotes } from "@/hooks/use-notes";
import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "@yz13/ui/sidebar";
import { HistoryIcon, StarIcon, StickyNoteIcon, TagIcon } from "lucide-react";
import { useParams } from "react-router";
import ConnectionStatus from "./connection-status";
import User from "./user";

export default function () {

  const params = useParams()

  const workspaceId = params.id;

  const [notes, loading] = useNotes(workspaceId);
  const [tags] = useWorkspaceTags(workspaceId);
  const notFavoriteNotes = notes.filter(note => !note.pinned)
  const favoriteNotes = notes.filter(note => note.pinned)

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
        {
          favoriteNotes.length > 0 &&
          <SidebarGroup>
            <SidebarGroupLabel>Избранное</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {
                  favoriteNotes.map((note) => {
                    return (
                      <SidebarMenuItem key={note.id}>
                        <SidebarMenuButton>
                          <StarIcon />
                          Заметка
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        }
        <SidebarGroup>
          <SidebarGroupLabel>Заметки</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                loading
                  ?
                  <>
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                  </>
                  :
                  notFavoriteNotes
                    .map(note => {
                      return (
                        <SidebarMenuItem key={note.id}>
                          <SidebarMenuButton>
                            <StickyNoteIcon />
                            {note.name}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Тэги</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                loading
                  ?
                  <>
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                    <SidebarMenuSkeleton />
                  </>
                  :
                  tags.map(tag => {
                    return (
                      <SidebarMenuItem key={tag.id}>
                        <SidebarMenuButton>
                          <TagIcon />
                          Тэг
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })
              }
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
                  <ConnectionStatus />
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
