"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const services = [
  {
    title: "Simulation en ligne",
    description: "Obtenez une estimation instantanée de votre prêt en fonction de votre profil.",
  },
  {
    title: "Suivi du dossier",
    description: "Suivez en temps réel l’avancement de votre demande de crédit depuis votre espace client.",
  },
  {
    title: "Assistance personnalisée",
    description: "Nos conseillers vous accompagnent à chaque étape de votre demande.",
  },
  {
    title: "Offres adaptées",
    description: "Bénéficiez d’un crédit sur mesure, adapté à vos besoins et votre budget.",
  },
  {
    title: "Réponse rapide",
    description: "Recevez une réponse de principe rapidement après avoir soumis votre dossier.",
  },
  {
    title: "Support humain",
    description: "Un expert est toujours disponible pour répondre à vos besoins urgents.",
  },
]

export default function Services() {
  return (
    <section className="w-full py-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
          Nos services
        </h2>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 auto-rows-[minmax(180px,_1fr)]">
          {services.map((service, index) => (
            <Card
              key={index}
              className="flex flex-col justify-between h-full p-6 rounded-2xl text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-lg transition hover:brightness-110"
            >
              <CardHeader className="p-0 mb-4 flex flex-row items-start gap-3">
                <CheckCircle2 className="text-white mt-1" />
                <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-sm text-gray-200">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile stacked scroll with last card on top */}
        <div className="lg:hidden relative h-[1400px]">
          {services.map((service, index) => (
            <div
              key={index}
              className="sticky top-20"
              style={{ zIndex: index + 1 }}
            >
              <Card
                className="p-6 py-12 mb-4 rounded-2xl text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-xl transition hover:brightness-110"
              >
                <CardHeader className="p-0 mb-4 flex flex-row items-start gap-3">
                  <CheckCircle2 className="text-white mt-1" />
                  <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-sm text-gray-200">
                  {service.description}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
