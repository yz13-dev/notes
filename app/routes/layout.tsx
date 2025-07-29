import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { Outlet } from "react-router";




export default function () {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-[calc(100%-var(--sidebar-width))] max-w-7xl mx-auto h-dvh">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
