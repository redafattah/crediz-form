"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function DemanderMonCreditButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const { data } = await supabase.auth.getSession()
    const session = data.session

    if (session) {
      router.push("/loan-form")
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <Button
      size="lg"
      className="px-8"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Redirection...
        </span>
      ) : (
        "Demander mon crédit"
      )}
    </Button>
  )
}
