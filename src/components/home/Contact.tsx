"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Contact() {
  return (
    <section className="w-full py-20 bg-neutral-950 text-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Contactez-nous</h2>
        <p className="text-gray-400 mb-10 text-sm sm:text-base">
          Une question, un besoin d’assistance ? Envoyez-nous un message, nous vous répondrons rapidement.
        </p>

        <form className="space-y-6 text-left">
          <div>
            <Label htmlFor="name" className="text-white">Nom</Label>
            <Input
              id="name"
              placeholder="Votre nom complet"
              className="bg-neutral-900 border border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="bg-neutral-900 border border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-white">Message</Label>
            <Textarea
              id="message"
              rows={4}
              placeholder="Écrivez votre message ici..."
              className="bg-neutral-900 border border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Envoyer le message
          </Button>
        </form>
      </div>
    </section>
  )
}
