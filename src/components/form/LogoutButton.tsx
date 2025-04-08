"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { LogOut } from "lucide-react"

export default function LogoutButton({
  className,
  variant = "ghost",
  onClick,
}: {
  className?: string
  variant?: "ghost" | "outline" | "default"
  onClick?: () => void
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    if (onClick) onClick()
    router.push("/") // or "/sign-in"
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Se déconnecter
    </Button>
  )
}
