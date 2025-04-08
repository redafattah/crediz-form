// /lib/sendVerificationCode.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationCode(email: string, code: number) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Verification Code',
    html: `<p>Your verification code is: <strong>${code}</strong>. It expires in 10 minutes.</p>`,
  })
}
