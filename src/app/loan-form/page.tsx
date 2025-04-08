'use client'

import { useState } from 'react'

import SituationStep from '@/components/form/SituationStep'
import DocumentsStep from '@/components/form/DocumentsStep'
import ConfirmationStep from '@/components/form/ConfirmationStep'
import SimulationStep from '@/components/form/SimulationStep'
import SummaryPanel from '@/components/summary/SummaryPanel'
import LoanStepper from '@/components/ui/LoanStepper'

export default function LoanFormPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({})
  const [formData, setFormData] = useState<any>({})

  const handleNext = (data: any) => {
    // Merge form data and mark step as complete
    setFormData((prev: any) => ({ ...prev, ...data }))
    setCompleted((prev) => ({ ...prev, [activeStep]: true }))
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleCompleteStep = (step: number) => {
    setCompleted((prev) => ({ ...prev, [step]: true }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side - Form */}
      <div className="md:col-span-2 space-y-6">
        <LoanStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          completed={completed}
          onCompleteStep={handleCompleteStep}
        />

        {activeStep === 0 && <SimulationStep onNext={handleNext} />}
        {activeStep === 1 && (
          <SituationStep onNext={handleNext} onBack={handleBack} />
        )}
        {activeStep === 2 && (
          <DocumentsStep onNext={handleNext} onBack={handleBack} />
        )}
        {activeStep === 3 && <ConfirmationStep formData={formData} />}
      </div>

      {/* Right side - Summary */}
      <SummaryPanel formData={formData} />
    </div>
  )
}
