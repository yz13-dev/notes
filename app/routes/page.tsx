import AppSidebar from "@/components/app-sidebar";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, PlusIcon, SearchIcon, TagIcon } from "lucide-react";
import { Link } from "react-router";


export default function () {
  const [workspaces, loading] = useWorkspaces()

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="md:w-[calc(100%-var(--sidebar-width))] w-full h-dvh">
        <div className="max-w-lg w-full mx-auto">
          <div className="w-full py-6">
            <div className="w-full relative flex items-center h-10">
              <SearchIcon className="text-muted-foreground absolute left-2.5" size={16} />
              <Input placeholder="Поиск" className="pl-8 h-full text-base" />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div className={cn(
              "w-full h-24 border rounded-lg flex items-center justify-center gap-2 text-muted-foreground",
              "hover:!border-foreground hover:text-foreground hover:bg-card hover:cursor-pointer transition-colors"
            )}>
              <PlusIcon size={16} />
              <span className="text-sm">Новая заметка</span>
            </div>
            <div className={cn(
              "w-full h-24 border rounded-lg flex items-center justify-center gap-2 text-muted-foreground",
              "hover:!border-foreground hover:text-foreground hover:bg-card hover:cursor-pointer transition-colors"
            )}>
              <div className="relative">
                <div className="p-0.5 rounded-full z-0 bg-secondary absolute -bottom-1.5 -right-1.5">
                  <TagIcon size={8} />
                </div>
                <PlusIcon size={16} className="z-10" />
              </div>
              <span className="text-sm">Новая тэг</span>
            </div>
          </div>
          <div className="py-6 space-y-4">

            {
              loading
                ?
                <>
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-32" />
                </>
                :
                workspaces.map(workspace => {

                  const name = workspace.name ?? "Неизвестно";
                  const description = workspace.description ?? "Без описания";
                  const isPublic = workspace.public ?? false;

                  return (
                    <div key={workspace.id} className="w-full rounded-3xl h-fit border">
                      <div className="w-full p-3">
                        <Badge variant="secondary">
                          {isPublic ? <EyeIcon /> : <EyeOffIcon />}
                          <span>{isPublic ? "Публичная" : "Приватная"}</span>
                        </Badge>
                      </div>
                      <div className="w-full px-3 pb-3 h-full">
                        <div className="w-full *:block space-y-1">
                          <span className="text-2xl font-medium">{name}</span>
                          <span className="text-base text-muted-foreground">{description}</span>
                        </div>
                      </div>

                      <div className="p-3 flex items-center justify-end">
                        <Button asChild variant="secondary">
                          <Link to={`/workspace/${workspace.id}`}>
                            Открыть <ArrowRightIcon />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )
                })
            }

          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
