import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function FormLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({
    cookies: () => cookies(), // ✅ fix applied here
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return <>{children}</>
}
