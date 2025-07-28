import { useNetwork } from "ahooks";
import { Loader2Icon, WifiIcon, WifiOffIcon } from "lucide-react";
import { useEffect, useState } from "react";




export default function () {

  const network = useNetwork();
  const [loading, setLoading] = useState<boolean>(true);

  console.log("network", network)

  const isOnline = network.online ?? false;

  useEffect(() => {
    setLoading(false)
  }, [])
  if (loading) return <><Loader2Icon className="animate-spin" /><span>Подключение...</span></>
  if (!isOnline) return <><WifiOffIcon /><span>Нет подключения</span></>
  return (
    <>
      <WifiIcon />
      <span>Подключено</span>
    </>
  )
}
