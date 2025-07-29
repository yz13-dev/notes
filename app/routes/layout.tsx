import { Route } from ".react-router/types/app/routes/+types/layout";
import AppSidebar from "@/components/app-sidebar";
import { getV1AuthMe } from "@yz13/api";
import { SidebarProvider } from "@yz13/ui/sidebar";
import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router";


export const loader = async () => {
  try {
    const me = await getV1AuthMe({
      withCredentials: true, fetchOptions: {
        credentials: "include"
      }
    })

    return { user: me }
  } catch (error) {
    return { user: null }
  }
}

export default function ({ }: Route.ComponentProps) {
  const { user } = useLoaderData<typeof loader>()
  console.log(user)
  const nav = useNavigate()

  useEffect(() => {
    // if (!user) nav("/login")
  }, [user])
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="md:w-[calc(100%-var(--sidebar-width))] w-full max-w-7xl mx-auto h-dvh">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
