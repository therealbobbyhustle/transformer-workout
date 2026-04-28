import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/lib/actions'
import { AppBottomNav, AppNav } from '@/components/dashboard/AppNav'

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
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4">
          <Link href="/dashboard" prefetch className="min-w-0">
            <div className="font-[family-name:var(--font-barlow-condensed)] text-[1.35rem] font-black uppercase leading-none tracking-wide text-white">
              Transformer <span className="text-orange-500">Workout</span>
            </div>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              Strong for the House
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <AppNav />
            <form action={signOut}>
              <button
                type="submit"
                className="min-h-11 rounded-xl border border-white/10 bg-zinc-900 px-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="app-page-enter mx-auto max-w-3xl px-4 pb-28 pt-5 md:px-5 md:pb-8 md:pt-6">
        {children}
      </main>

      <AppBottomNav />
    </div>
  )
}
