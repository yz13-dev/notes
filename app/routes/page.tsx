import { useNotes } from "@/hooks/use-notes";
import { Workspace } from "@/hooks/use-workspace";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { SidebarTrigger } from "@yz13/ui/sidebar";
import { Skeleton } from "@yz13/ui/skeleton";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, PlusIcon, SearchIcon, SidebarIcon } from "lucide-react";
import { Link } from "react-router";

export default function () {
  const [workspaces, loading] = useWorkspaces()

  return (
    <div className="w-full h-dvh">
      <title>Пространства</title>
      <div className="w-full max-w-4xl mx-auto">

        <div className="w-full p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden flex">
                <SidebarIcon />
              </SidebarTrigger>
              <h1 className="text-2xl font-medium">Пространства</h1>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/workspace/new">
                <PlusIcon />
                Создать пространство
              </Link>
            </Button>
          </div>
          <div className="w-full relative flex items-center h-10">
            <SearchIcon className="text-muted-foreground absolute left-2.5" size={16} />
            <Input placeholder="Поиск" className="pl-8 h-full text-base" />
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 grid-cols-1 gap-4">

          {
            loading
              ?
              <>
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-full h-48" />
                <Skeleton className="w-full h-48" />
              </>
              :
              workspaces.map(workspace => {

                return (
                  <WorkspaceCard key={workspace.id} workspace={workspace} />
                )
              })
          }

        </div>
      </div>
    </div>
  )
}


const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {

  const name = workspace.name ?? "Неизвестно";
  const description = workspace.description ?? "Без описания";
  const isPublic = workspace.public ?? false;

  const [notes, loading] = useNotes(workspace.id)

  return (
    <div key={workspace.id} className="w-full rounded-3xl flex flex-col justify-between min-h-fit h-full border bg-card">
      <div>
        <div className="w-full p-3">
          <Badge variant="secondary">
            {isPublic ? <EyeIcon /> : <EyeOffIcon />}
            <span>{isPublic ? "Публичная" : "Приватная"}</span>
          </Badge>
        </div>
        <div className="w-full px-3 pb-3 h-fit">
          <div className="w-full *:block space-y-1">
            <span className="text-2xl font-medium">{name}</span>
            <span className="text-base text-muted-foreground">{description}</span>
          </div>
        </div>
      </div>
      {
        loading
          ?
          <ul className="divide-y">
            <li><Skeleton className="rounded-none h-[52px]" /></li>
            <li><Skeleton className="rounded-none h-[52px]" /></li>
            <li><Skeleton className="rounded-none h-[52px]" /></li>
          </ul>
          :
          notes.length === 0
            ?
            <div className="w-full h-full flex items-center py-3 justify-center">
              <span className="text-muted-foreground">Нет заметок</span>
            </div>
            :
            <ul className="divide-y *:min-h-9 *:py-1.5 *:px-3">
              {
                notes
                  .map(note => {
                    return <li key={`card/${note.id}`} className="flex flex-col hover:bg-secondary/20 relative">
                      <Link to={`/workspace/${workspace.id}/${note.id}`} className="absolute inset-0 w-full h-full" />
                      <span className="font-medium">{note.name ?? "Неизвестно"}</span>
                      <span className="text-muted-foreground line-clamp-1 text-xs">{note.description ?? "Без описания"}</span>
                    </li>
                  })
              }
            </ul>
      }
      <div className="p-3 flex items-center justify-end">
        <Button asChild variant="secondary">
          <Link to={`/workspace/${workspace.id}`}>
            Открыть <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  )
}
