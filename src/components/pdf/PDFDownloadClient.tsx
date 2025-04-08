'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download } from 'lucide-react'
import { SimulationPDF } from './SimulationPDF'

export default function PDFDownloadClient({ formData }: { formData: any }) {
  return (
    <PDFDownloadLink
      document={<SimulationPDF formData={formData} />}
      fileName="simulation.pdf"
    >
      {({ loading }) => (
        <button className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline">
          <Download className="w-4 h-4" />
          {loading ? 'Préparation...' : 'Télécharger votre simulation'}
        </button>
      )}
    </PDFDownloadLink>
  )
}
