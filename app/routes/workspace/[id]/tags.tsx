import { useWorkspaceTags } from "@/hooks/use-workspace-tags";
import { Badge } from "@yz13/ui/badge";


type Props = {
  workspaceId: string
}
export default function ({ workspaceId }: Props) {

  const [tags, loading] = useWorkspaceTags(workspaceId);

  if (loading) return (
    <div className="w-full flex flex-row flex-wrap iteitems-start gap-1">
      <Badge variant="secondary">
        <span className="opacity-0">Загрузка...</span>
      </Badge>
      <Badge variant="secondary">
        <span className="opacity-0">Загрузка...</span>
      </Badge>
      <Badge variant="secondary">
        <span className="opacity-0">Загрузка...</span>
      </Badge>
      <Badge variant="secondary">
        <span className="opacity-0">Загрузка...</span>
      </Badge>
      <Badge variant="secondary">
        <span className="opacity-0">Загрузка...</span>
      </Badge>
    </div>
  )
  return (
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
  )
}
