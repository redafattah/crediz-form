'use client'
import dynamic from 'next/dynamic'
import { useId } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  CreditCard,
  User,
  Home,
  FileText,
  PiggyBank,
  Download,
} from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { SimulationPDF } from '../pdf/SimulationPDF'
import PDFDownloadClient from '../pdf/PDFDownloadClient'


interface SummaryPanelProps {
  formData: any
}

export default function SummaryPanel({ formData }: SummaryPanelProps) {
  const containerId = useId()

  const calculatedApport =
    formData.loanType === 'automobile' && !formData.apport
      ? Math.round(Number(formData.amount) * 0.1)
      : null

  const finalApport = formData.apport || calculatedApport
  const principal = Number(formData.amount) - (finalApport || 0)
  const duration = Number(formData.duration)
  const monthlyInterestRate = 0.007

  const mensualite =
    duration > 0
      ? Math.round(
          (principal * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -duration))
        )
      : 0

  return (
    <div className="hidden md:block">
      <Card className="bg-background border shadow-md" id={containerId}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            🧾 Summary
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Review your information before submitting.
          </CardDescription>
        </CardHeader>

        <ScrollArea className="h-[500px]">
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            {/* 🏦 Loan Info */}
            {formData.loanType && (
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-foreground font-medium">
                    Loan Details
                  </span>
                </div>
                <p className="flex justify-between">
                  <strong>Type:</strong> {formData.loanType}
                </p>
                <p className="flex justify-between">
                  <strong>Amount:</strong> {formData.amount} MAD
                </p>
                <p className="flex justify-between">
                  <strong>Duration:</strong> {formData.duration} months
                </p>
                {finalApport && (
                  <p className="flex justify-between">
                    <strong>Downpayment:</strong> {finalApport} MAD
                  </p>
                )}
                <p className="flex justify-between text-blue-600">
                  <strong>Monthly Payment:</strong>{' '}
                  {mensualite.toLocaleString()} MAD
                </p>
                <Separator className="my-3" />
              </div>
            )}

            {/* 👤 Personal Info */}
            {formData.fullName && (
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-foreground font-medium">
                    Personal Info
                  </span>
                </div>
                <p className="flex justify-between">
                  <strong>Name:</strong> {formData.fullName}
                </p>
                <p className="flex justify-between">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="flex justify-between">
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p className="flex justify-between">
                  <strong>CIN:</strong> {formData.cin}
                </p>
                <p className="flex justify-between">
                  <strong>DOB:</strong> {formData.dob}
                </p>
                <p className="flex justify-between">
                  <strong>Status:</strong> {formData.maritalStatus}
                </p>
                <p className="flex justify-between">
                  <strong>Dependents:</strong> {formData.dependents}
                </p>
                <Separator className="my-3" />
              </div>
            )}

            {/* 🏠 Address */}
            {formData.address && (
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Home className="w-4 h-4" />
                  <span className="text-foreground font-medium">Address</span>
                </div>
                <p>{formData.address}</p>
                <Separator className="my-3" />
              </div>
            )}

            {/* 📎 Documents */}
            {(formData.cinFile || formData.incomeProof) && (
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-foreground font-medium">
                    Documents
                  </span>
                </div>
                {formData.cinFile && <p>📎 CIN uploaded</p>}
                {formData.incomeProof && <p>📎 Income Proof uploaded</p>}
                {formData.bankStatement && <p>📎 Bank Statement uploaded</p>}
                {formData.salarySlip && <p>📎 Salary Slip uploaded</p>}
              </div>
            )}
          </CardContent>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-muted flex flex-col gap-3">
        <PDFDownloadClient formData={formData} />
      
          <div className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Estimated Monthly Payment: {mensualite.toLocaleString()} MAD
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
