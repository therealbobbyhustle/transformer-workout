'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type NavItem = {
  href: string
  label: string
  match: (pathname: string) => boolean
  icon: (active: boolean) => React.ReactNode
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Today',
    match: (pathname) => pathname === '/dashboard' || pathname.startsWith('/workout/'),
    icon: (active) => (
      <svg className={`h-5 w-5 ${active ? 'scale-105' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18" />
        <path d="M12 3v18" />
      </svg>
    ),
  },
  {
    href: '/nutrition',
    label: 'Nutrition',
    match: (pathname) => pathname === '/nutrition',
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 4c3 0 6 2.5 6 7 0 5-3 9-6 9s-4-4-4-7 1-9 4-9Z" />
        <path d="M14 4c2 1 4 3.5 4 7.5S16 20 13 20" />
      </svg>
    ),
  },
  {
    href: '/check-in',
    label: 'Check-In',
    match: (pathname) => pathname === '/check-in',
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    href: '/complete',
    label: 'Results',
    match: (pathname) => pathname === '/complete',
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 20h12" />
        <path d="M8 20V10" />
        <path d="M12 20V4" />
        <path d="M16 20v-7" />
      </svg>
    ),
  },
]

export function AppNav() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href))
  }, [router])

  return (
    <nav className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/90 p-1.5 backdrop-blur">
      {navItems.map((item) => {
        const isActive = item.match(pathname)

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className={`rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-orange-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function AppBottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    navItems.forEach((item) => router.prefetch(item.href))
  }, [router])

  return (
    <nav className="app-bottom-nav md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-1 rounded-[26px] border border-white/10 bg-zinc-950/95 px-2 py-2 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = item.match(pathname)

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={`flex min-h-14 min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-all duration-150 active:scale-[0.98] ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              {item.icon(isActive)}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
