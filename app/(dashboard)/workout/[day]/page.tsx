import { getDay } from '@/lib/challenge-data'
import { getCompletedDays } from '@/lib/actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MarkCompleteButton from '@/components/dashboard/MarkCompleteButton'
import WorkoutSequencePlayer from '@/components/dashboard/WorkoutSequencePlayer'

interface WorkoutPageProps {
  params: Promise<{ day: string }>
}

const categoryLabel: Record<string, string> = {
  workout: 'Strength',
  recovery: 'Recovery',
  mobility: 'Mobility',
  rest: 'Rest Day',
}

const categoryColor: Record<string, string> = {
  workout: 'text-green-400 bg-green-900/30 border-green-800',
  recovery: 'text-blue-400 bg-blue-900/30 border-blue-800',
  mobility: 'text-purple-400 bg-purple-900/30 border-purple-800',
  rest: 'text-zinc-400 bg-zinc-800 border-zinc-700',
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { day } = await params
  const dayNumber = parseInt(day)

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 21) notFound()

  const challengeDay = getDay(dayNumber)
  if (!challengeDay) notFound()

  const completedDays = await getCompletedDays()
  const isCompleted = completedDays.includes(dayNumber)

  const nextDay = dayNumber < 21 ? getDay(dayNumber + 1) : null
  const prevDay = dayNumber > 1 ? getDay(dayNumber - 1) : null

  return (
    <div className="space-y-6 pb-8">

      {/* Back nav */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="text-zinc-500 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
          ← Dashboard
        </Link>
        {prevDay && (
          <Link href={`/workout/${prevDay.dayNumber}`} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
            ← Day {prevDay.dayNumber}
          </Link>
        )}
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColor[challengeDay.category]}`}>
            {categoryLabel[challengeDay.category]}
          </span>
          <span className="text-zinc-600 text-xs">
            Week {challengeDay.weekNumber} — {challengeDay.weekLabel}
          </span>
          <span className="text-zinc-700 text-xs">{challengeDay.calendarLabel}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-zinc-500 text-sm mb-0.5">Day {challengeDay.dayNumber} of 21</p>
            <h1 className="text-2xl font-bold text-white leading-tight">{challengeDay.title}</h1>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-800 rounded-full px-3 py-1.5 flex-shrink-0">
              <span className="text-green-400 text-sm">✓</span>
              <span className="text-green-400 text-xs font-medium">Complete</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
          <span>{challengeDay.duration}</span>
          <span className="text-zinc-700">·</span>
          <span>{challengeDay.focus}</span>
        </div>
      </div>

      {/* Description */}
      <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
        <p className="text-zinc-300 text-sm leading-relaxed">{challengeDay.description}</p>
      </div>

      {/* Workout sequence */}
      {challengeDay.exerciseGroups.length > 0 && challengeDay.category !== 'rest' && (
        <WorkoutSequencePlayer
          dayNumber={challengeDay.dayNumber}
          dayTitle={challengeDay.title}
          categoryLabel={
            challengeDay.category === 'workout'
              ? "Today's Workout"
              : challengeDay.category === 'recovery'
              ? "Today's Session"
              : "Today's Mobility Work"
          }
          exerciseGroups={challengeDay.exerciseGroups}
        />
      )}

      {/* Beginner / stronger options — workout days only */}
      {challengeDay.category === 'workout' && (
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">Your Options</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-full">Beginner friendly — reduce weight</span>
            <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-full">Stronger option — increase weight</span>
          </div>
        </div>
      )}

      {/* Rest day — link to check-in */}
      {challengeDay.category === 'rest' && (
        <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 text-center space-y-3">
          <p className="text-zinc-400 text-sm">Today is your rest and reflection day.</p>
          <Link
            href="/check-in"
            className="inline-block bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors"
          >
            Complete Week {challengeDay.weekNumber} Check-In →
          </Link>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3 pt-2">
        {isCompleted ? (
          <div className="w-full bg-green-900/30 border border-green-700 text-green-400 font-semibold py-4 rounded-xl text-center text-sm">
            ✓ Day {dayNumber} Complete — Great job.
          </div>
        ) : (
          <MarkCompleteButton dayNumber={dayNumber} />
        )}

        {nextDay && (
          <Link
            href={`/workout/${nextDay.dayNumber}`}
            className="block w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-medium py-3 rounded-xl text-center text-sm transition-colors"
          >
            Next: Day {nextDay.dayNumber} — {nextDay.title} →
          </Link>
        )}

        {dayNumber === 21 && isCompleted && (
          <Link
            href="/complete"
            className="block w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 rounded-xl text-center transition-colors"
          >
            View Your Results →
          </Link>
        )}
      </div>

    </div>
  )
}
