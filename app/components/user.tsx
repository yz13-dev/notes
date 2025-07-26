import useUser from "@/hooks/use-user"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar"
import { Button } from "@yz13/ui/button"
import { Skeleton } from "@yz13/ui/skeleton"
import { LogOutIcon } from "lucide-react"



export default function () {

  const [user, loading] = useUser()


  if (loading) return <Skeleton className="w-full h-9" />
  if (!user) return <Button className="w-full">Войти</Button>
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
      <Button variant="ghost" className="ml-auto"><LogOutIcon /></Button>
    </div>
  )
}
