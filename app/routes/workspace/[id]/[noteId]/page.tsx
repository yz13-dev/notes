import { Route } from ".react-router/types/app/routes/workspace/[id]/[noteId]/+types/page";
import Breadcrumb from "@/components/breadcrumbs";
import { useNote } from "@/hooks/use-note";
import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { Badge } from "@yz13/ui/badge";
import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import NoteContentEditor from "./note-content-editor";

export default function ({ params }: Route.ComponentProps) {
  const id = params.id;
  const noteId = params.noteId;

  const [tags] = useWorkspaceTags(id);
  const [note, loading] = useNote(noteId)

  const noteName = note?.name ?? "Без названия";
  const noteDescription = note?.description ?? "Без описания";

  const created_at = note?.created_at ? parseISO(note?.created_at) : null;

  return (
    <>
      <div className="px-6 py-3 border-b">
        <Breadcrumb noteId={noteId} workspaceId={id} />
      </div>
      <div className="w-full py-8 px-6 *:block space-y-2">
        <div className="flex flex-wrap flex-row gap-1 items-start w-full">
          {
            loading
              ? <Skeleton className="w-16 h-5" />
              :
              tags.map(tag => {
                return <Badge variant="secondary" key={tag.id}>{tag.tag}</Badge>
              })
          }
        </div>
        <h1 className="text-4xl font-semibold text-foreground">{noteName}</h1>
        <p className="text-base text-muted-foreground">{noteDescription}</p>
        <div className="flex items-center gap-2">
          {
            created_at &&
            <span className="text-muted-foreground text-sm">
              Создано:{" "}
              {format(created_at, "HH:mm - dd MMMM yyyy", { locale: ru })}
            </span>
          }
        </div>
      </div>
      <Separator />
      <div className="w-full px-6 py-8 space-y-3">
        {
          loading &&
          <>
            <Skeleton className="w-1/3 h-12" />
            <Skeleton className="w-32 h-9" />
            <Skeleton className="w-24 h-9" />
          </>
        }
        {
          !loading &&
          <NoteContentEditor noteId={noteId} defaultContent={note?.content ?? ""} />
        }
      </div>
    </>
  )
}
