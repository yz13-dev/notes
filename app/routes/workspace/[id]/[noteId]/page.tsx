import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@yz13/ui/breadcrumb";
import { Link } from "react-router";
import type { Route } from "./+types/page";


export default function ({ params }: Route.ComponentProps) {

  const id = params.id;
  const noteId = params.noteId;

  return (
    <>
      <div className="px-6 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  Пространство
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/workspace/${id}`}>
                  {id}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{noteId}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  )
}
