'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface ConfirmationStepProps {
  formData: any
}

export default function ConfirmationStep({ formData }: ConfirmationStepProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email) {
      toast.error('Vous devez être connecté.')
      setLoading(false)
      return
    }

    const loanId = formData.loanId || crypto.randomUUID()

    const uploadFile = async (file: File | null, type: string) => {
      if (!file) return null
      const path = `${loanId}/${type}-${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage.from('loan-docs').upload(path, file)
      if (error) {
        console.error(`Erreur upload ${type}`, error)
        return null
      }
      return data.path
    }

    const [cin, income, bank, slip] = await Promise.all([
      uploadFile(formData.rawFiles?.cinFile, 'cin'),
      uploadFile(formData.rawFiles?.incomeProof, 'income_proof'),
      uploadFile(formData.rawFiles?.bankStatement, 'bank_statement'),
      uploadFile(formData.rawFiles?.salarySlip, 'salary_slip'),
    ])

    const principal = Number(formData.amount) - (formData.apport || 0)
    const mensualite = Math.round(
      (principal * 0.007) / (1 - Math.pow(1 + 0.007, -formData.duration))
    )

    const { error } = await supabase.from('loan_requests').insert([{
      id: loanId,
      client_type: formData.clientType,
      loan_type: formData.loanType,
      amount: Number(formData.amount),
      duration: Number(formData.duration),
      apport: formData.apport || null,
      mensualite,
      full_name: formData.fullName,
      email: user.email,
      phone: formData.phone,
      address: formData.address,
      cin: formData.cin,
      dob: formData.dob,
      marital_status: formData.maritalStatus,
      dependents: formData.dependents,
      cin_file_url: cin,
      income_proof_url: income,
      bank_statement_url: bank,
      salary_slip_url: slip,
      status: 'en attente',
    }])

    if (error) {
      console.error(error.message)
      toast.error('Erreur lors de la soumission.')
      setLoading(false)
      return
    }

    toast.success('Demande soumise avec succès 🎉')
    router.push('/success')
  }

  return (
    <Card className="text-center max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-green-600">Étape finale 🎉</CardTitle>
        <CardDescription className="mt-2 text-gray-600">
          {formData.fullName}, cliquez sur "Soumettre la demande" pour finaliser.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Envoi en cours...' : 'Soumettre la demande'}
        </Button>
      </CardContent>
    </Card>
  )
}
