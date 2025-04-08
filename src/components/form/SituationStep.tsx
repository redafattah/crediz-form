'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'

const schema = z.object({
  fullName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(8, 'Minimum 8 digits'),
  cin: z.string().min(4, 'Minimum 4 characters'),
  dob: z.string().min(1, 'Required'),
  maritalStatus: z.string().min(1, 'Required'),
  dependents: z.string(),
  address: z.string().min(1, 'Required'),
})

export default function SituationStep({
  onNext,
  onBack,
}: {
  onNext: (data: any) => void
  onBack: () => void
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      cin: '',
      dob: '',
      maritalStatus: '',
      dependents: '',
      address: '',
    },
  })

  const onSubmit = (data: any) => onNext(data)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
       

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email + Phone */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="you@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="0600000000" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="123 Main Street, Casablanca" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CIN + Date of Birth */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CIN</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="AB123456" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => field.onChange(date?.toISOString())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!form.formState.errors.dob,
                          helperText: form.formState.errors.dob?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Marital Status + Dependents */}
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dependents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Dependents</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next <ArrowRight/></Button>
        </div>
      </form>
    </Form>
  )
}
