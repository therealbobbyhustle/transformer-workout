import { getCompletedDays } from '@/lib/actions'
import Link from 'next/link'

export default async function CompletePage() {
  const completedDays = await getCompletedDays()
  const completedCount = completedDays.length

  return (
    <div className="space-y-8 text-center py-6">
      {/* Trophy */}
      <div className="space-y-4">
        <div className="text-6xl">🏆</div>
        <div>
          <h1 className="text-3xl font-bold text-white leading-tight">
            You Completed the<br />21-Day Challenge.
          </h1>
          <p className="text-zinc-400 mt-2 text-base">
            {completedCount} of 21 days finished.
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left space-y-3">
        <p className="text-white font-semibold text-base">You showed up.</p>
        <p className="text-zinc-300 text-sm leading-relaxed">
          You stayed consistent through work, family, and everything else life threw at you. That is not small. That is exactly what this challenge was about.
        </p>
        <p className="text-zinc-300 text-sm leading-relaxed">
          Strong households start with strong habits — and you just built one.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-400">{completedCount}</p>
          <p className="text-zinc-500 text-xs mt-1">Days Done</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-400">21</p>
          <p className="text-zinc-500 text-xs mt-1">Day Challenge</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-400">3</p>
          <p className="text-zinc-500 text-xs mt-1">Weeks Strong</p>
        </div>
      </div>

      {/* Upsell */}
      <div className="bg-green-900/20 border border-green-700 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Don&apos;t Lose Your Momentum</h2>
        <p className="text-zinc-300 text-sm leading-relaxed">
          You have already built the habit. The hardest part is done. Keep going with the full membership program and lock in your results.
        </p>
        <p className="text-zinc-400 text-sm italic">
          &ldquo;You&apos;ve already built momentum. Don&apos;t lose it now.&rdquo;
        </p>
        <a
          href="#"
          className="block w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl transition-colors text-base"
        >
          Keep My Momentum Going
        </a>
        <p className="text-zinc-600 text-xs">Full membership · Ongoing programming · Community support</p>
      </div>

      {/* Back to dashboard */}
      <Link
        href="/dashboard"
        className="block text-zinc-500 hover:text-white text-sm transition-colors"
      >
        ← Back to Dashboard
      </Link>
    </div>
  )
}
