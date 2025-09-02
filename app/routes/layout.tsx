import { Route } from ".react-router/types/app/routes/+types/layout";
import AppSidebar from "@/components/app-sidebar";
import { useUserStore } from "@/stores/user-store";
import { getAuthV1Me } from "@yz13/api";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { useEffect } from "react";
import { Outlet, redirect } from "react-router";

export const clientLoader = async ({ }: Route.ClientLoaderArgs) => {
  const user = await getAuthV1Me()
  if (!user) {
    redirect("/login")
    return { user: null }
  }
  return { user }
}

export default function ({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    if (data.user) setUser(data.user)
  }, [data])
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="md:w-[calc(100%-var(--sidebar-width))] w-full max-w-7xl mx-auto h-dvh">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
