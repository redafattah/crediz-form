'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'

const schema = z.object({
  clientType: z.string().min(1, 'Required'),
  loanType: z.string().min(1, 'Required'),
  amount: z.number().min(1000, 'Minimum is 1000'),
  duration: z.number().min(6, 'Minimum is 6 months'),
  apport: z.number().optional(),
})

export default function SimulationStep({ onNext }: { onNext: (data: any) => void }) {
  const [showApport, setShowApport] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      clientType: '',
      loanType: '',
      amount: 50000,
      duration: 12,
      apport: 0,
    },
    mode: 'onChange',
  })

  const loanType = form.watch('loanType')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          if (loanType !== 'automobile') delete data.apport
          onNext(data)
        })}
        className="space-y-6 w-full"
      >
       

        {/* Client & Loan Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="clientType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select Client Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setShowApport(value === 'automobile')
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select Loan Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="automobile">Automobile</SelectItem>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className='grid grid-col-4 gap-4'>
              <FormLabel className='col-span-4'>Amount (MAD)</FormLabel>
              <Slider
                min={1000}
                max={500000}
                step={1000}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                className='col-span-3'
                
              />
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                min={1000}
                max={500000}
                step={1000}
                className='border bg-muted  shadow-none'
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem  className='grid grid-col-4 gap-4'>
              <FormLabel  className='col-span-4'>Duration (Months)</FormLabel>
              <Slider
                min={6}
                max={84}
                step={1}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                 className='col-span-3'
             
              />
              <Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                min={6}
                max={84}
                className='border bg-muted  shadow-none'
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Apport */}
        {showApport && (
          <FormField
            control={form.control}
            name="apport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apport (MAD)</FormLabel>
                <Slider
                  min={0}
                  max={100000}
                  step={1000}
                  value={[field.value || 0]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
                <Input
                  type="number"
                  value={field.value || 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  min={0}
                  max={100000}
                  step={1000}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="w-full"
        >
          Next
        </Button>
      </form>
    </Form>
  )
}
