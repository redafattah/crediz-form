"use client"

import DemanderMonCreditButton from "../form/DemanderMonCreditButton"


export default function Hero() {
  return (
    <section className="w-full flex h-screen flex-col justify-center items-center text-center px-6 py-24 bg-transparent">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 max-w-3xl leading-tight">
        Demandez votre crédit en toute confiance
      </h1>
      <p className="text-muted-foreground max-w-xl mb-8 text-base sm:text-lg">
        Simulez votre prêt, soumettez une demande personnalisée et suivez votre dossier en toute simplicité.
      </p>

      {/* Reusable button with Supabase session logic */}
      <DemanderMonCreditButton />
    </section>
  )
}
