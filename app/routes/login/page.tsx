import { redirect } from "react-router";





export const loader = async () => {

  const url = new URL("/auth/signin", "https://yz13.ru")
  const searchParams = url.searchParams;

  searchParams.set("next", "https://notes.yz13.ru")
  searchParams.set("appId", "ffb97704-95fb-4862-aabf-30165e3d8f39")

  return redirect(url.toString())
}


export default function () {
  return null
}
