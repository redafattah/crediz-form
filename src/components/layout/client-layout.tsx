"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/home/Header"
import { supabase } from "@/lib/supabase"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loggedIn, setLoggedIn] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setLoggedIn(!!data.session)
    }

    getSession()

    // Listen to login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const hideHeaderRoutes = ["/sign-in", "/register"]
  const shouldHideHeader = hideHeaderRoutes.includes(pathname)

  return (
    <>
      {!shouldHideHeader && <Header loggedIn={loggedIn} />}
      {children}
    </>
  )
}
