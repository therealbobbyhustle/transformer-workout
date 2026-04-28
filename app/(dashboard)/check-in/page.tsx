'use client'

import { useState } from 'react'
import { submitWeeklyCheckIn } from '@/lib/actions'

function RatingButtons({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
            value === n
              ? 'bg-green-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

export default function CheckInPage() {
  const [weekNumber, setWeekNumber] = useState(1)
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0)
  const [energyRating, setEnergyRating] = useState(0)
  const [consistencyRating, setConsistencyRating] = useState(0)
  const [biggestWin, setBiggestWin] = useState('')
  const [biggestStruggle, setBiggestStruggle] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.set('week_number', String(weekNumber))
    formData.set('workouts_completed', String(workoutsCompleted))
    formData.set('energy_rating', String(energyRating))
    formData.set('consistency_rating', String(consistencyRating))
    formData.set('biggest_win', biggestWin)
    formData.set('biggest_struggle', biggestStruggle)

    const result = await submitWeeklyCheckIn(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSubmitted(true)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Weekly Check-In</h1>
        </div>
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-8 text-center space-y-3">
          <div className="text-4xl">✓</div>
          <h2 className="text-xl font-bold text-white">Week {weekNumber} Check-In Complete</h2>
          <p className="text-zinc-300 text-sm">Reflecting on your progress is part of the work. Keep going.</p>
          <button
            onClick={() => { setSubmitted(false); setWeekNumber((w) => Math.min(w + 1, 3)) }}
            className="mt-2 text-green-400 text-sm hover:text-green-300 transition-colors"
          >
            Submit another week →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Weekly Check-In</h1>
        <p className="text-zinc-400 text-sm mt-0.5">Take 2 minutes to reflect on your week.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Week selector */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-semibold text-zinc-300 mb-3">Which week?</label>
          <div className="flex gap-2">
            {[1, 2, 3].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWeekNumber(w)}
                className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  weekNumber === w
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                Week {w}
              </button>
            ))}
          </div>
        </div>

        {/* Workouts completed */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-semibold text-zinc-300 mb-3">
            How many workouts did you complete this week?
          </label>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setWorkoutsCompleted(n)}
                className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                  workoutsCompleted === n
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-semibold text-zinc-300 mb-1">
            Energy this week
          </label>
          <p className="text-zinc-500 text-xs mb-3">1 = exhausted · 5 = felt great</p>
          <RatingButtons value={energyRating} onChange={setEnergyRating} />
        </div>

        {/* Consistency */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-semibold text-zinc-300 mb-1">
            How consistent were you?
          </label>
          <p className="text-zinc-500 text-xs mb-3">1 = struggled · 5 = locked in</p>
          <RatingButtons value={consistencyRating} onChange={setConsistencyRating} />
        </div>

        {/* Biggest win */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Biggest win this week
          </label>
          <textarea
            value={biggestWin}
            onChange={(e) => setBiggestWin(e.target.value)}
            rows={2}
            placeholder="I showed up even when I didn't feel like it..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
          />
        </div>

        {/* Biggest struggle */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <label className="block text-sm font-semibold text-zinc-300 mb-2">
            Biggest struggle this week
          </label>
          <textarea
            value={biggestStruggle}
            onChange={(e) => setBiggestStruggle(e.target.value)}
            rows={2}
            placeholder="Nutrition was tough, sleep was short..."
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading || energyRating === 0 || consistencyRating === 0}
          className="w-full bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-400 text-white font-semibold py-3.5 rounded-xl transition-colors"
        >
          {loading ? 'Saving...' : 'Submit Week ' + weekNumber + ' Check-In'}
        </button>
      </form>
    </div>
  )
}
