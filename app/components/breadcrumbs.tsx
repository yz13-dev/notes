import { useNote } from "@/hooks/use-note";
import { useWorkspace } from "@/hooks/use-workspace";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@yz13/ui/breadcrumb";
import { Skeleton } from "@yz13/ui/skeleton";
import { Link } from "react-router";


type Props = {
  workspaceId?: string;
  noteId?: string;
}

export default function ({ noteId, workspaceId }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              Пространства
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {
          (workspaceId || noteId) &&
          <BreadcrumbSeparator />
        }
        {
          workspaceId &&
          <WorkspaceBreadCrumb workspaceId={workspaceId} asLink={!!noteId} />
        }
        {
          workspaceId && noteId &&
          <BreadcrumbSeparator />
        }
        {
          noteId &&
          <NoteBreadCrumb noteId={noteId} />
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export const WorkspaceBreadCrumb = ({ workspaceId, asLink = false }: { workspaceId: string, asLink?: boolean }) => {
  const [workspace, loading] = useWorkspace(workspaceId);

  const name = workspace?.name ?? "Без названия";

  if (loading) return <Skeleton className="w-32 h-5" />
  if (asLink) {
    return (
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to={`/workspace/${workspaceId}`}>
            {name}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    )
  }
  return <BreadcrumbPage>{name}</BreadcrumbPage>
}

export const NoteBreadCrumb = ({ noteId, asLink = false }: { noteId: string, asLink?: boolean }) => {
  const [note, loading] = useNote(noteId)

  const name = note?.name ?? "Без названия";

  if (loading) return <Skeleton className="w-32 h-5" />
  if (asLink) {
    return (
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link to={`/workspace/${noteId}`}>
            {name}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    )
  }
  return <BreadcrumbPage>{name}</BreadcrumbPage>
}
