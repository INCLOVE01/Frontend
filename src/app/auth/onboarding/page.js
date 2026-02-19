import OnboardingForm from '@/components/forms/onboarding-form'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'


export default async function OnboardingPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if they already finished onboarding
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', user.id)
    .single()

  if (profile?.onboarding_completed) {
    redirect('/home')


  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border">
        <OnboardingForm user={user} />
      </div>
    </div>
  )
}