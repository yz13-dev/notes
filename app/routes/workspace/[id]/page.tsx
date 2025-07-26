import { Badge } from "@yz13/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@yz13/ui/breadcrumb";
import { Button } from "@yz13/ui/button";
import { ArrowRightIcon, TagIcon, TextIcon } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/page";


export default function ({ params }: Route.ComponentProps) {
  const id = params.id;
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
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full py-8 px-6 *:block space-y-2">
        <h1 className="text-4xl font-semibold text-foreground">{id}</h1>
        <p className="text-base text-muted-foreground">Description for this workspace</p>
      </div>
      <div className="w-full px-6 space-y-3">
        <span className="text-muted-foreground block">Тэги</span>
        <div className="w-full flex flex-row flex-wrap iteitems-start gap-1">
          {
            Array.from({ length: 5 }).map((_, i) => (
              <Badge key={i} variant="secondary">
                Tag {i}
              </Badge>
            ))
          }
        </div>
      </div>
      <div className="w-full px-6 space-y-3 py-8">
        <span className="text-muted-foreground block">Заметки</span>
        <div className="w-full grid grid-cols-4 gap-4">

          <div className="w-full h-80 border rounded-xl flex flex-col justify-between bg-card">
            <div className="w-full p-3">
              <Badge variant="secondary"><TagIcon />Тэги</Badge>
            </div>
            <div className="w-full px-3 h-full">
              <div className="w-full *:block space-y-1">
                <span className="text-2xl font-medium">Title for this note</span>
                <span className="text-base text-muted-foreground">Description for this note</span>
              </div>
            </div>
            <div className="w-full px-3 mt-auto pb-3 flex items-center justify-between gap-2">
              <span className="text-muted-foreground inline-flex items-center gap-1 text-sm"><TextIcon size={14} /> 0</span>
              <Button size="icon" variant="ghost" className="size-6"><ArrowRightIcon /></Button>
            </div>
          </div>
          <div className="w-full h-80 border rounded-xl bg-card"></div>
          <div className="w-full h-80 border rounded-xl bg-card"></div>
          <div className="w-full h-80 border rounded-xl bg-card"></div>
          <div className="w-full h-80 border rounded-xl bg-card"></div>
          <div className="w-full h-80 border rounded-xl bg-card"></div>
        </div>
      </div>
    </>
  )
}
