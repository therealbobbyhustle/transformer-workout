import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Nav */}
      <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-base font-bold text-white tracking-tight">
            Transformer Workout
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/nutrition" className="text-zinc-400 hover:text-white text-sm transition-colors">
              Nutrition
            </Link>
            <Link href="/check-in" className="text-zinc-400 hover:text-white text-sm transition-colors">
              Check-In
            </Link>
            <form action={signOut}>
              <button type="submit" className="text-zinc-500 hover:text-white text-sm transition-colors">
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
