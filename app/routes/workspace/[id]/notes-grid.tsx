import { useNotes } from "@/hooks/use-notes"
import { Badge } from "@yz13/ui/badge"
import { Button } from "@yz13/ui/button"
import { Skeleton } from "@yz13/ui/skeleton"
import { ArrowRightIcon, TagIcon, TextIcon } from "lucide-react"
import { Link } from "react-router"


type Props = {
  workspaceId: string
}
export default function ({ workspaceId }: Props) {

  const [notes, loading] = useNotes(workspaceId)

  if (loading) {
    return (
      <div className="w-full grid grid-cols-4 gap-4">
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
        <Skeleton className="w-full h-80" />
      </div>
    )
  }
  return (
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
                  <Link to={`/workspace/${workspaceId}/${note.id}`}>
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
