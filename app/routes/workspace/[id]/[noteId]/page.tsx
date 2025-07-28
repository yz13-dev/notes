import { Route } from ".react-router/types/app/routes/workspace/[id]/[noteId]/+types/page";
import Breadcrumb from "@/components/breadcrumbs";
import { useNote } from "@/hooks/use-note";
import { useWorkspace } from "@/hooks/use-workspace";
import { Skeleton } from "@yz13/ui/skeleton";
import NoteContentEditor from "./note-content-editor";

export default function ({ params }: Route.ComponentProps) {
  const id = params.id;
  const noteId = params.noteId;

  const [workspace] = useWorkspace(id);
  const [note, loading] = useNote(noteId)

  const name = workspace?.name ?? "Без названия";
  const description = workspace?.description ?? "Без описания";

  const noteName = note?.name ?? "Без названия";
  const noteDescription = note?.description ?? "Без описания";

  return (
    <>
      <div className="px-6 py-3">
        <Breadcrumb noteId={noteId} workspaceId={id} />
      </div>
      <div className="w-full py-8 px-6 *:block space-y-2">
        <h1 className="text-4xl font-semibold text-foreground">{noteName}</h1>
        <p className="text-base text-muted-foreground">{noteDescription}</p>
      </div>
      <div className="w-full px-6 space-y-3">
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
