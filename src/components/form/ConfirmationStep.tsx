'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface ConfirmationStepProps {
  formData: any
}

export default function ConfirmationStep({ formData }: ConfirmationStepProps) {
  const [loading, setLoading] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<HTMLInputElement[]>([])
  const verificationCode = useRef('')
  const router = useRouter()

  const handleSendCode = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user?.email) {
      toast.error("Vous devez être connecté.")
      return
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()
    verificationCode.current = code

    const res = await fetch('/api/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, code }),
    })

    const data = await res.json()
    if (data.success) {
      setCodeSent(true)
      toast.success('Code de vérification envoyé 📧')
    } else {
      toast.error("Échec lors de l’envoi du code ❌")
    }
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otpValues]
    newOtp[index] = value
    setOtpValues(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const getEnteredCode = () => otpValues.join('')

  const handleSubmit = async () => {
    if (getEnteredCode() !== verificationCode.current) {
      toast.error('Code de vérification invalide !')
      return
    }

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
          {formData.fullName}, vérifiez votre email avant de soumettre.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!codeSent ? (
          <Button onClick={handleSendCode} className="w-full">
            Envoyer le code de vérification
          </Button>
        ) : (
          <>
            <div className="flex gap-2 justify-center">
            {otpValues.map((val, index) => (
  <Input
    key={index}
    ref={(el) => {
      inputRefs.current[index] = el!
    }}
    maxLength={1}
    className="w-12 h-12 text-center text-xl font-mono"
    value={val}
    onChange={(e) => handleChange(index, e.target.value)}
  />
))}
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={loading || otpValues.includes('')}
            >
              {loading ? 'Envoi en cours...' : 'Soumettre la demande'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
