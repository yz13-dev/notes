import { Route } from ".react-router/types/app/routes/workspace/[id]/+types/page";
import Breadcrumbs from "@/components/breadcrumbs";
import { useWorkspace } from "@/hooks/use-workspace";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { Trash2Icon } from "lucide-react";
import NotesGrid from "./notes-grid";
import Tags from "./tags";


export default function ({ params }: Route.ComponentProps) {
  const id = params.id;

  const [workspace, loading] = useWorkspace(id);

  const name = workspace?.name ?? "Без названия";
  const description = workspace?.description ?? "Без описания";

  return (
    <>
      <title>{workspace?.name ?? "Без названия"}</title>
      <div className="px-6 py-3 border-b flex items-center justify-between">
        <Breadcrumbs workspaceId={id} />
        <Button variant="destructive"><Trash2Icon /><span>Удалить</span></Button>
      </div>
      <div className="w-full py-8 px-6 *:block space-y-2">
        {
          loading
            ? <Skeleton className="h-10 w-1/2" />
            : <h1 className="text-4xl font-semibold text-foreground">{name}</h1>
        }
        {
          loading
            ? <Skeleton className="h-6 w-1/3" />
            : <p className="text-base text-muted-foreground">{description}</p>
        }
      </div>
      <div className="w-full px-6 space-y-3">
        <span className="text-muted-foreground block">Тэги</span>
        <Tags workspaceId={id} />
      </div>
      <div className="w-full px-6 space-y-3 py-8">
        <span className="text-muted-foreground block">Заметки</span>
        <NotesGrid workspaceId={id} />
      </div>
    </>
  )
}
