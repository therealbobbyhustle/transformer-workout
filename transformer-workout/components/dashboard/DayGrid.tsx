import { CHALLENGE_DAYS } from '@/lib/challenge-data'
import Link from 'next/link'

interface DayGridProps {
  completedDays: number[]
  currentDayNumber: number
}

const weekLabels = ['Week 1 — Reset', 'Week 2 — Build', 'Week 3 — Lock In']

export default function DayGrid({ completedDays, currentDayNumber }: DayGridProps) {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((week) => {
        const days = CHALLENGE_DAYS.filter((d) => d.weekNumber === week)
        return (
          <div key={week}>
            <p className="text-xs text-zinc-500 font-medium mb-2">{weekLabels[week - 1]}</p>
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((day) => {
                const isCompleted = completedDays.includes(day.dayNumber)
                const isCurrent = day.dayNumber === currentDayNumber
                const isUpcoming = !isCompleted && !isCurrent

                return (
                  <Link
                    key={day.dayNumber}
                    href={`/workout/${day.dayNumber}`}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all
                      ${isCompleted
                        ? 'bg-green-600 text-white'
                        : isCurrent
                        ? 'bg-zinc-700 border-2 border-green-500 text-white'
                        : 'bg-zinc-900 text-zinc-600 hover:bg-zinc-800'
                      }
                    `}
                  >
                    <span>{isCompleted ? '✓' : day.dayNumber}</span>
                    <span className="text-[9px] opacity-60 mt-0.5">{day.calendarLabel.slice(0, 3)}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
