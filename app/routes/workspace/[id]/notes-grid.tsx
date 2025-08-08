import { useNotes } from "@/hooks/use-notes"
import { useWorkspaceTags } from "@/hooks/use-workspace-tags"
import { Badge } from "@yz13/ui/badge"
import { Button } from "@yz13/ui/button"
import { Skeleton } from "@yz13/ui/skeleton"
import { ArrowRightIcon, PlusIcon, TagIcon, TextIcon } from "lucide-react"
import { Link } from "react-router"


type Props = {
  workspaceId: string
}
export default function ({ workspaceId }: Props) {

  const [notes, loading] = useNotes(workspaceId);
  const [tags] = useWorkspaceTags(workspaceId);

  if (loading) {
    return (
      <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
      </div>
    )
  }
  return (
    <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {
        notes.map(note => {
          const noteTags = (note.tags ?? []).map(tag => tags.find(t => t.id === tag)).filter(tag => tag !== undefined);
          const name = note.name ?? "Без названия";
          const description = note.description ?? "Без описания";

          const contentLength = (note.content ?? "").length;
          const isMoreThanSlice = noteTags.length > 2;
          const sliceDiff = isMoreThanSlice ? noteTags.length - 2 : 0;
          return (
            <div key={note.id} className="w-full h-80 border rounded-xl flex flex-col justify-between bg-card">
              <div className="w-full p-3 flex items-center gap-2">
                {
                  noteTags.length === 0 &&
                  <Badge variant="secondary">Без тегов</Badge>
                }
                {
                  noteTags
                    .slice(0, 2)
                    .map(tag => (
                      <Badge variant="secondary" key={`${note.id}/${tag.id}`}>
                        <TagIcon />
                        {tag.tag}
                      </Badge>
                    ))
                }
                {
                  isMoreThanSlice &&
                  <Badge variant="secondary">+{sliceDiff}</Badge>
                }
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
                  <Link to={`/workspace/${workspaceId}/${note.id}`}>
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          )
        })
      }
      <div className="relative w-full h-80 border rounded-xl flex items-center justify-center bg-card group hover:!border-foreground hover:cursor-pointer transition-all">
        <Link to={`/workspace/${workspaceId}/new`} className="absolute inset-0" />
        <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground *:transition-all">
          <PlusIcon />
          <span>Добавить заметку</span>
        </div>
      </div>
    </div>
  )
}
