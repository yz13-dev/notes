import { Route } from ".react-router/types/app/routes/+types/layout";
import AppSidebar from "@/components/app-sidebar";
import { useUser } from "@/hooks/use-user";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { useDebounceEffect } from "ahooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";


export default function ({ }: Route.ComponentProps) {
  const [user, loading] = useUser()
  const nav = useNavigate()

  useDebounceEffect(() => {
    if (!loading && !user) nav("/login")
  }, [user, loading],{wait:1000})
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="md:w-[calc(100%-var(--sidebar-width))] w-full max-w-7xl mx-auto h-dvh">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
