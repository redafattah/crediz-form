"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sara Benali",
    message:
      "Un service rapide, transparent et efficace. J'ai pu obtenir mon crédit auto sans stress, tout est bien expliqué.",
  },
  {
    name: "Youssef El Amrani",
    message:
      "J’ai adoré l’expérience digitale. Le suivi de dossier en ligne m’a rassuré et j’ai reçu une réponse rapidement.",
  },
]

export default function Testimonial() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Témoignages clients</h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <Card key={index} className="text-left shadow-md hover:shadow-lg transition">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <div className="flex gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{t.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
