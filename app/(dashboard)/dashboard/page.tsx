import { createClient } from '@/lib/supabase/server'
import { getUserProgress, getCompletedDays } from '@/lib/actions'
import { CHALLENGE_DAYS, getMotivationalLine } from '@/lib/challenge-data'
import Link from 'next/link'
import DayGrid from '@/components/dashboard/DayGrid'
import DashboardWorkoutPreview from '@/components/dashboard/DashboardWorkoutPreview'
import MarkCompleteButton from '@/components/dashboard/MarkCompleteButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there'

  const [progress, completedDays] = await Promise.all([
    getUserProgress(),
    getCompletedDays(),
  ])

  const currentDayNumber = progress?.current_day_number ?? 1
  const completedCount = progress?.completed_days_count ?? 0
  const percentComplete = progress?.percent_complete ?? 0
  const isComplete = completedCount === 21

  const currentDay = CHALLENGE_DAYS.find((d) => d.dayNumber === currentDayNumber)
  const motivationalLine = getMotivationalLine(completedCount)

  const categoryColor: Record<string, string> = {
    workout: 'text-green-400',
    recovery: 'text-blue-400',
    mobility: 'text-purple-400',
    rest: 'text-zinc-400',
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {firstName}</h1>
        <p className="text-zinc-400 mt-0.5 text-sm">{motivationalLine}</p>
      </div>

      {/* Progress summary */}
      <div className="bg-zinc-900 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Progress</p>
          <p className="text-white font-semibold text-lg">{completedCount} of 21 days</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-green-400">{percentComplete}%</p>
          <p className="text-zinc-500 text-xs">complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-zinc-800 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Main action card */}
      {isComplete ? (
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-6 text-center space-y-3">
          <div className="text-4xl">🏆</div>
          <h2 className="text-xl font-bold text-white">Challenge Complete!</h2>
          <p className="text-zinc-300 text-sm">You finished all 21 days. That is something to be proud of.</p>
          <Link
            href="/complete"
            className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            See Your Results
          </Link>
        </div>
      ) : currentDay ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                Day {currentDay.dayNumber} · Week {currentDay.weekNumber} — {currentDay.weekLabel}
              </p>
              <h2 className="text-xl font-bold text-white">{currentDay.title}</h2>
              <p className={`text-sm font-medium mt-0.5 ${categoryColor[currentDay.category]}`}>
                {currentDay.duration} · {currentDay.category.charAt(0).toUpperCase() + currentDay.category.slice(1)}
              </p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">{currentDay.description}</p>

          {currentDay.exerciseGroups.length > 0 && currentDay.category !== 'rest' && (
            <DashboardWorkoutPreview day={currentDay} />
          )}

          <div className="flex flex-col gap-2">
            {!completedDays.includes(currentDay.dayNumber) && (
              <MarkCompleteButton dayNumber={currentDay.dayNumber} />
            )}
            <Link
              href={`/workout/${currentDay.dayNumber}`}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-center font-medium py-3.5 rounded-xl transition-colors text-sm"
            >
              View Full Plan
            </Link>
          </div>

          {completedDays.includes(currentDay.dayNumber) && (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <span>✓</span>
              <span>Day {currentDay.dayNumber} complete — great job.</span>
            </div>
          )}
        </div>
      ) : null}

      {/* 21-day grid */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">Challenge Map</h3>
        <DayGrid completedDays={completedDays} currentDayNumber={currentDayNumber} />
      </div>
    </div>
  )
}
