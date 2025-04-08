// app/components/pdf/SimulationPDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer'

export const SimulationPDF = ({ formData }: { formData: any }) => {
  const apport = formData.apport || (formData.loanType === 'automobile' ? Math.round(formData.amount * 0.1) : 0)
  const principal = formData.amount - apport
  const mensualite = Math.round((principal * 0.007) / (1 - Math.pow(1 + 0.007, -formData.duration)))

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <Image
          src="/logo.png" // make sure this exists in /public
          style={styles.logo}
        />
        <Text style={styles.title}>Loan Simulation Summary</Text>

        {/* Personal Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <Text>Name: {formData.fullName}</Text>
          <Text>Email: {formData.email}</Text>
          <Text>Phone: {formData.phone}</Text>
        </View>

        {/* Loan Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loan Details</Text>
          <Text>Type: {formData.loanType}</Text>
          <Text>Amount: {formData.amount} MAD</Text>
          <Text>Duration: {formData.duration} months</Text>
          <Text>Downpayment: {apport} MAD</Text>
          <Text>Mensualité: {mensualite.toLocaleString()} MAD</Text>
        </View>

        <Text style={styles.footer}>Thank you for using our service!</Text>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  logo: {
    width: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey'
  }
})
