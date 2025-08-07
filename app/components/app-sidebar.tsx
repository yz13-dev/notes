import { useNotes } from "@/hooks/use-notes";
import { Tag, useRefreshTags, useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { useWorkspaces, Workspace } from "@/hooks/use-workspaces";
import { deleteV1TagsTag, postV1Tags, putV1TagsTag } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@yz13/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/dropdown-menu";
import { Input } from "@yz13/ui/input";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem } from "@yz13/ui/sidebar";
import { ArrowRightIcon, CheckIcon, ContactIcon, Edit3Icon, EllipsisIcon, FolderIcon, KeyboardIcon, Loader2Icon, PlusIcon, StickyNoteIcon, TagIcon, Trash2Icon, WifiIcon, XIcon } from "lucide-react";
import { useState } from "react";
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
                <SidebarMenuButton asChild>
                  <Link to="/workspace/new">
                    <PlusIcon />
                    <span>Добавить пространство</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {
                workspaceId &&
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={`/workspace/${workspaceId}/new`}>
                      <PlusIcon />
                      <span>Добавить заметку</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              }
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
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="text-muted-foreground">
                <SidebarMenuButton>
                  <WifiIcon />
                  Подключение
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="text-muted-foreground">
                <SidebarMenuButton disabled>
                  <KeyboardIcon />
                  <span>Горячие клавиши</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="text-muted-foreground">
                <SidebarMenuButton disabled>
                  <ContactIcon />
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

  const [tags, loading, refresh] = useWorkspaceTags(workspaceId);

  const newTag = async () => {
    try {
      const tag = await postV1Tags({ tag: "Новый тэг", workspace_id: workspaceId });
      console.log(tag)

      if (tag) {
        refresh();
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Тэги</SidebarGroupLabel>
      <SidebarGroupAction disabled={loading} onClick={newTag}>
        {
          loading
            ? <Loader2Icon className="animate-spin" />
            : <PlusIcon />
        }
      </SidebarGroupAction>
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
                  <WorkspaceTag key={tag.id} tag={tag} workspaceId={workspaceId} />
                )
              })
          }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const WorkspaceTag = ({ tag, workspaceId }: { tag: Tag, workspaceId: string }) => {

  const [open, setOpen] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);
  const [refresh, loading] = useRefreshTags(workspaceId);

  const [name, setName] = useState<string>(tag.tag);

  const update = async () => {
    try {
      const result = await putV1TagsTag(tag.id, { tag: name, workspace_id: workspaceId })

      if (result) {
        refresh();
        setEdit(false);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const remove = async () => {
    try {
      await deleteV1TagsTag(tag.id);
      refresh();
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
  }

  if (edit) return (
    <SidebarMenuItem className="flex flex-row gap-2 justify-between">
      <Input className="h-8" value={name} onChange={e => setName(e.target.value)} />
      {
        loading
          ?
          <Loader2Icon className="animate-spin" />
          :
          <div className="flex flex-row items-center *:size-6">
            <Button
              size="icon"
              variant="ghost"
              onClick={update}
            >
              <CheckIcon />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEdit(false)}
            >
              <XIcon />
            </Button>
          </div>
      }
    </SidebarMenuItem>
  )
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <TagIcon />
        {tag.tag}
      </SidebarMenuButton>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <EllipsisIcon />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEdit(true)}>
            <Edit3Icon />
            <span>Изменить</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={remove}>
            <Trash2Icon />
            <span>Удалить</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
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
          <SidebarMenuAction asChild>
            <Link to={`/workspace/${workspace.id}`}>
              <ArrowRightIcon />
            </Link>
          </SidebarMenuAction>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  )
}
