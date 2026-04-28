'use client'

import { useState } from 'react'
import { markDayComplete } from '@/lib/actions'
import { useRouter } from 'next/navigation'

interface MarkCompleteButtonProps {
  dayNumber: number
}

export default function MarkCompleteButton({ dayNumber }: MarkCompleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function handleComplete() {
    setLoading(true)
    const result = await markDayComplete(dayNumber)
    if (result.success) {
      setDone(true)
      setTimeout(() => {
        router.refresh()
      }, 1200)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-4 rounded-xl text-base">
        <span>✓</span>
        <span>Day Complete</span>
      </div>
    )
  }

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 disabled:bg-zinc-700 disabled:text-zinc-400 text-white font-semibold py-4 rounded-xl transition-colors text-base"
    >
      {loading ? 'Saving...' : 'Mark Day Complete'}
    </button>
  )
}
