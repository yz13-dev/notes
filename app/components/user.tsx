import { useUser } from "@/hooks/use-user"
import { postAuthV1Logout } from "@yz13/api"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar"
import { Button } from "@yz13/ui/button"
import { useSidebar } from "@yz13/ui/sidebar"
import { Skeleton } from "@yz13/ui/skeleton"
import { LogInIcon, LogOutIcon } from "lucide-react"



export default function () {

  const [user, loading, refresh] = useUser();
  const { open } = useSidebar()

  const logout = async () => {
    try {
      await postAuthV1Logout()
    } catch (e) {
      console.error(e)
    } finally {
      await refresh()
    }
  }

  if (loading) return <Skeleton className="w-full h-9" />
  if (!user) {
    if (!open) return <Button size="icon"><LogInIcon /></Button>
    return <Button className="w-full">Войти</Button>
  }
  if (!open) return (
    <Avatar>
      <AvatarImage src={user.avatar_url ?? undefined} alt={user.username} />
      <AvatarFallback className="uppercase">{user.username.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.avatar_url ?? undefined} alt={user.username} />
        <AvatarFallback className="uppercase">{user.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-foreground">{user.username}</span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
      <Button variant="ghost" className="ml-auto" onClick={logout}><LogOutIcon /></Button>
    </div>
  )
}
