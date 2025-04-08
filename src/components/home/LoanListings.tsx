"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loanTypes = [
  {
    title: "Crédit Auto",
    description: "Financez votre voiture neuve ou d'occasion avec des mensualités adaptées à votre budget.",
    badge: "Populaire",
  },
  {
    title: "Crédit Personnel",
    description: "Un prêt flexible pour tous vos projets personnels : mariage, voyage, études, etc.",
  },
  {
    title: "Crédit Immobilier",
    description: "Devenez propriétaire grâce à un financement sur mesure et des taux compétitifs.",
  },
]

export default function LoansListings() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleCardClick = (loanTitle: string) => {
    setSelectedType(loanTitle)
  }

  return (
    <section className="bg-white min-h-screen w-full py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-start mb-12">
          Nos types de prêts
        </h2>

        <Dialog>
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto sm:hidden px-1 -mx-1 pb-4 scroll-snap-x snap-x snap-mandatory">
            {loanTypes.map((loan, index) => {
              const isFirst = index === 0
              return (
                <DialogTrigger asChild key={index}>
                  <Card
                    onClick={() => handleCardClick(loan.title)}
                    className={`min-w-[280px] snap-center shadow-none border-none p-6 flex h-70 justify-between items-start gap-4 hover:shadow-md transition rounded-2xl cursor-pointer ${
                      isFirst ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{loan.title}</h3>
                        {loan.badge && (
                          <Badge variant="default" className={`text-xs ${isFirst ? "bg-white text-black" : ""}`}>
                            {loan.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-base ${isFirst ? "text-gray-300" : "text-muted-foreground"}`}>
                        {loan.description}
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant={isFirst ? "secondary" : "outline"}
                      className={`rounded-full border-none ${isFirst ? "bg-white text-black hover:bg-gray-200" : "border-gray-300"}`}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Card>
                </DialogTrigger>
              )
            })}
          </div>

          {/* Desktop & tablet: grid layout */}
          <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loanTypes.map((loan, index) => {
              const isFirst = index === 0
              return (
                <DialogTrigger asChild key={index}>
                  <Card
                    onClick={() => handleCardClick(loan.title)}
                    className={`border-none h-80 p-6 flex justify-between items-start gap-4 hover:shadow-md transition rounded-2xl cursor-pointer ${
                      isFirst ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{loan.title}</h3>
                        {loan.badge && (
                          <Badge variant="default" className={`text-xs ${isFirst ? "bg-white text-black" : ""}`}>
                            {loan.badge}
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${isFirst ? "text-gray-300" : "text-muted-foreground"}`}>
                        {loan.description}
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant={isFirst ? "secondary" : "outline"}
                      className={`rounded-full border-none ${isFirst ? "bg-white text-black hover:bg-gray-200" : "border-gray-300"}`}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Card>
                </DialogTrigger>
              )
            })}
          </div>

          {/* Loan Form Dialog */}
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Demande de prêt</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="loan-type">Type de prêt</Label>
                <Input id="loan-type" value={selectedType || ""} readOnly />
              </div>
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Votre nom" />
              </div>
              <div>
                <Label htmlFor="amount">Montant souhaité</Label>
                <Input id="amount" type="number" placeholder="ex: 100000" />
              </div>
              <Button type="submit" className="w-full">
                Soumettre la demande
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
