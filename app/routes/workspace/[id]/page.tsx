import { Route } from ".react-router/types/app/routes/workspace/[id]/+types/page";
import Breadcrumbs from "@/components/breadcrumbs";
import { useNotes } from "@/hooks/use-notes";
import { useWorkspace } from "@/hooks/use-workspace";
import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { ArrowRightIcon, TagIcon, TextIcon } from "lucide-react";
import { Link } from "react-router";


export default function ({ params }: Route.ComponentProps) {
  const id = params.id;

  const [workspace, loading] = useWorkspace(id);
  const [tags] = useWorkspaceTags(id);
  const [notes] = useNotes(id);

  const name = workspace?.name ?? "Без названия";
  const description = workspace?.description ?? "Без описания";

  return (
    <>
      <div className="px-6 py-3">
        <Breadcrumbs workspaceId={id} />
      </div>
      <div className="w-full py-8 px-6 *:block space-y-2">
        <h1 className="text-4xl font-semibold text-foreground">{name}</h1>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
      <div className="w-full px-6 space-y-3">
        <span className="text-muted-foreground block">Тэги</span>
        <div className="w-full flex flex-row flex-wrap iteitems-start gap-1">
          {
            tags
              .map((tag, i) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.tag}
                </Badge>
              ))
          }
        </div>
      </div>
      <div className="w-full px-6 space-y-3 py-8">
        <span className="text-muted-foreground block">Заметки</span>
        <div className="w-full grid grid-cols-4 gap-4">
          {
            notes.map(note => {
              const tags = (note.tags ?? []);
              const name = note.name ?? "Без названия";
              const description = note.description ?? "Без описания";

              const contentLength = (note.content ?? "").length;
              return (
                <div key={note.id} className="w-full h-80 border rounded-xl flex flex-col justify-between bg-card">
                  <div className="w-full p-3">
                    <Badge variant="secondary"><TagIcon />Тэги</Badge>
                  </div>
                  <div className="w-full px-3 h-full">
                    <div className="w-full *:block space-y-1">
                      <span className="text-2xl font-medium">{name}</span>
                      <span className="text-base text-muted-foreground">{description}</span>
                    </div>
                  </div>
                  <div className="w-full px-3 mt-auto pb-3 flex items-center justify-between gap-2">
                    <span className="text-muted-foreground inline-flex items-center gap-1 text-sm"><TextIcon size={14} /> {contentLength}</span>
                    <Button size="icon" variant="ghost" className="size-6" asChild>
                      <Link to={`/workspace/${id}/${note.id}`}>
                        <ArrowRightIcon />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
