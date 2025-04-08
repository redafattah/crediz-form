import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

const steps = ['Simulation', 'Situation', 'Documents', 'Confirmation']

interface LoanStepperProps {
  activeStep: number
  setActiveStep: (step: number) => void
  completed: { [key: number]: boolean }
  onCompleteStep: (step: number) => void
}

export default function LoanStepper({
  activeStep,
  setActiveStep,
  completed,
  onCompleteStep,
}: LoanStepperProps) {
  const totalSteps = steps.length
  const completedSteps = () => Object.keys(completed).length
  const isLastStep = activeStep === totalSteps - 1
  const allStepsCompleted = completedSteps() === totalSteps

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel sx={{ cursor: 'default' }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        

        {allStepsCompleted && (
          <Box sx={{ mt: 2 }}>
            <Typography>✅ All steps completed – you're done!</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}
