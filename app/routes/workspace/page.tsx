import WorkspaceSidebar from "@/components/workspace-sidebar";
import { SidebarProvider } from "@yz13/ui/sidebar";


export default function () {
  return (
    <SidebarProvider>
      <WorkspaceSidebar />
      <div className="w-[calc(100%-var(--sidebar-width))] h-dvh">

      </div>
    </SidebarProvider>
  )
}
