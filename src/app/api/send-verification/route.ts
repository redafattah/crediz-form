import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, code } = await req.json()

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Votre code de vérification',
      html: `<p>Votre code de vérification est : <strong>${code}</strong></p>`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
