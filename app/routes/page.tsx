import AppSidebar from "@/components/app-sidebar";
import { Input } from "@yz13/ui/input";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { cn } from "@yz13/ui/utils";
import { PlusIcon, SearchIcon, TagIcon } from "lucide-react";




export default function () {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-[calc(100%-var(--sidebar-width))] h-dvh">
        <div className="max-w-lg w-full mx-auto">
          <div className="w-full py-6">
            <div className="w-full relative flex items-center h-10">
              <SearchIcon className="text-muted-foreground absolute left-2.5" size={16} />
              <Input placeholder="Поиск" className="pl-8 h-full text-base" />
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div className={cn(
              "w-full h-24 border rounded-lg flex items-center justify-center gap-2 text-muted-foreground",
              "hover:!border-foreground hover:text-foreground hover:bg-card hover:cursor-pointer transition-colors"
            )}>
              <PlusIcon size={16} />
              <span className="text-sm">Новая заметка</span>
            </div>
            <div className={cn(
              "w-full h-24 border rounded-lg flex items-center justify-center gap-2 text-muted-foreground",
              "hover:!border-foreground hover:text-foreground hover:bg-card hover:cursor-pointer transition-colors"
            )}>
              <div className="relative">
                <div className="p-0.5 rounded-full z-0 bg-secondary absolute -bottom-1.5 -right-1.5">
                  <TagIcon size={8} />
                </div>
                <PlusIcon size={16} className="z-10" />
              </div>
              <span className="text-sm">Новая тэг</span>
            </div>
          </div>
          <div className="py-6 space-y-4">

            <div className="w-full rounded-lg h-32 bg-secondary"></div>
            <div className="w-full rounded-lg h-32 bg-secondary"></div>
            <div className="w-full rounded-lg h-32 bg-secondary"></div>

          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
