// src/app/success/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center space-y-4">
        <CheckCircle className="mx-auto text-green-500 w-12 h-12" />
        <h1 className="text-2xl font-semibold text-foreground">Loan Submitted</h1>
        <p className="text-muted-foreground text-sm">
          Thank you for submitting your request. You’ll be contacted soon.
        </p>
        <Link href="/espace-client">
          <Button className="w-full mt-4">Access Client Space</Button>
        </Link>
      </div>
    </div>
  )
}
