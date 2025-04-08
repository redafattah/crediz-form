"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Questions fréquentes</h2>

        <Accordion type="single" collapsible className="text-left space-y-2">
          <AccordionItem value="q1">
            <AccordionTrigger>Quels types de crédits proposez-vous ?</AccordionTrigger>
            <AccordionContent>
              Nous proposons des crédits auto, personnels et immobiliers. Chaque type est adapté à un besoin spécifique.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>Combien de temps pour avoir une réponse ?</AccordionTrigger>
            <AccordionContent>
              Vous recevez une réponse de principe en quelques minutes après votre demande en ligne.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>Comment suivre ma demande ?</AccordionTrigger>
            <AccordionContent>
              Vous pouvez suivre votre demande à tout moment depuis votre espace client sécurisé.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
