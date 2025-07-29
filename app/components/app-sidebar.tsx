import { useNotes } from "@/hooks/use-notes";
import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { useWorkspaces, Workspace } from "@/hooks/use-workspaces";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@yz13/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem } from "@yz13/ui/sidebar";
import { FolderIcon, PlusIcon, StickyNoteIcon, TagIcon, WifiIcon } from "lucide-react";
import { Link, useParams } from "react-router";
import User from "./user";

export default function () {

  const [workspaces, loading] = useWorkspaces();

  const params = useParams();
  const workspaceId = params.id;

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
                  <PlusIcon />
                  <span>Добавить заметку</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2">
            Пространства
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                loading &&
                <>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                </>
              }
              {
                workspaces.map(workspace => {
                  return (
                    <WorkspaceMenu key={workspace.id} workspace={workspace} />
                  )
                })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {
          workspaceId &&
          <WorkspaceTags workspaceId={workspaceId} />
        }
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

const WorkspaceTags = ({ workspaceId }: { workspaceId: string }) => {

  const [tags, loading] = useWorkspaceTags(workspaceId);

  return (
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
                      {tag.tag}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })
          }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const WorkspaceMenu = ({ workspace }: { workspace: Workspace }) => {

  const [notes, loading] = useNotes(workspace.id);

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }
  return (
    <SidebarMenu>
      <Collapsible className="group/collapsible" defaultOpen>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <FolderIcon />
              {workspace.name ?? "Без названия"}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {
                notes.map(note => {
                  return (
                    <SidebarMenuSubItem key={note.id}>
                      <SidebarMenuButton asChild>
                        <Link to={`/workspace/${workspace.id}/${note.id}`}>
                          <StickyNoteIcon />
                          {note.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  )
                })
              }
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}
