"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn, Github } from "lucide-react"
import { supabase } from "@/lib/supabase" // make sure this points to your config

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push("/loan-form") // or your desired redirect
    }
  }

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "github" })
    if (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Connexion à votre compte</h1>
        <p className="text-sm text-muted-foreground">
          Entrez votre email et mot de passe pour continuer
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password with toggle */}
        <div className="grid gap-2 relative">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <a
              href="#"
              className="text-sm underline underline-offset-4 text-muted-foreground hover:text-primary"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <LogIn className="animate-spin h-4 w-4" />
              Connexion...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn size={18} />
              Se connecter
            </span>
          )}
        </Button>

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>

        {/* GitHub button */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGitHubLogin}
        >
          <Github size={18} />
          Se connecter avec GitHub
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm">
        Pas encore de compte ?{" "}
        <a href="/register" className="underline underline-offset-4 hover:text-primary">
          Créer un compte
        </a>
      </div>
    </form>
  )
}
