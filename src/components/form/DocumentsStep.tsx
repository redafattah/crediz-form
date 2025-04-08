'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'

import { ArrowRight, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface DocumentsStepProps {
  onNext: (data: any) => void
  onBack: () => void
}

export default function DocumentsStep({ onNext, onBack }: DocumentsStepProps) {
  const [files, setFiles] = useState({
    cinFile: null as File | null,
    incomeProof: null as File | null,
    bankStatement: null as File | null,
    salarySlip: null as File | null,
  })

  const [filePaths, setFilePaths] = useState<Record<string, string>>({})
  const [uploadingField, setUploadingField] = useState<keyof typeof files | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [loanId] = useState(() => uuidv4())

  const sanitizeFilename = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9_\-\.]/gi, '-')

  const uploadToSupabase = async (file: File, field: keyof typeof files) => {
    const safeName = sanitizeFilename(file.name)
    const path = `${loanId}/${field}-${Date.now()}-${safeName}`

    setUploadingField(field)
    setUploadError(null)

    const { data, error } = await supabase.storage.from('loan-docs').upload(path, file)

    if (error) {
      setUploadError(`Error uploading ${field}: ${error.message}`)
    } else {
      setFiles((prev) => ({ ...prev, [field]: file }))
      setFilePaths((prev) => ({ ...prev, [field]: data.path }))
    }

    setUploadingField(null)
  }

  const removeFile = (field: keyof typeof files) => {
    setFiles((prev) => ({ ...prev, [field]: null }))
    setFilePaths((prev) => {
      const updated = { ...prev }
      delete updated[field]
      return updated
    })
  }

  const handleDrop = (acceptedFiles: File[], field: keyof typeof files) => {
    if (acceptedFiles.length > 0) {
      uploadToSupabase(acceptedFiles[0], field)
    }
  }

  const createDropzone = (
    label: string,
    field: keyof typeof files,
    required?: boolean
  ) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (files) => handleDrop(files, field),
      accept: {
        'application/pdf': ['.pdf'],
        'image/*': ['.jpg', '.jpeg', '.png'],
      },
      multiple: false,
    })

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition',
              isDragActive ? 'bg-muted/50' : 'bg-background'
            )}
          >
            <input {...getInputProps()} />
            <Upload className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm text-muted-foreground">
              {uploadingField === field
                ? 'Uploading...'
                : files[field]
                ? `📎 ${files[field]?.name}`
                : isDragActive
                ? 'Drop the file here...'
                : 'Drag and drop or click to upload'}
            </p>
            {uploadError && field === uploadingField && (
              <p className="text-xs text-red-500 mt-2">{uploadError}</p>
            )}
          </div>
        </CardContent>
        {files[field] && (
          <CardFooter className="justify-end">
            <Button
              size="icon"
              variant="ghost"
              type="button"
              onClick={() => removeFile(field)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!filePaths.cinFile || !filePaths.incomeProof) {
      alert('CIN and Proof of Income are required.')
      return
    }

    onNext({
      ...filePaths,
      rawFiles: files,
      loanId,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {createDropzone('CIN Copy', 'cinFile', true)}
        {createDropzone('Proof of Income', 'incomeProof', true)}
        {createDropzone('Bank Statement (optional)', 'bankStatement')}
        {createDropzone('Salary Slip (optional)', 'salarySlip')}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Next
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}
