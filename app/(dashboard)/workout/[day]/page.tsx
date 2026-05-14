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

type MealPrepSuggestion = {
  title: string
  items: string[]
  note: string
}

const workoutMealPrep: Record<number, MealPrepSuggestion> = {
  1: {
    title: 'Chicken rice bowls',
    items: ['Grilled chicken breast or thighs', 'Brown rice or jasmine rice', 'Roasted broccoli and peppers'],
    note: 'Prep two bowls so tomorrow has one easy, high-protein meal ready.',
  },
  3: {
    title: 'Turkey taco bowls',
    items: ['Lean ground turkey', 'Rice, beans, or sweet potato', 'Salsa, lettuce, and Greek-yogurt crema'],
    note: 'Keep toppings separate so the bowl stays fresh after training.',
  },
  5: {
    title: 'Salmon or chicken power plates',
    items: ['Salmon or chicken', 'Sweet potatoes', 'Green beans or asparagus'],
    note: 'This is a good lower-body day meal: protein, carbs, and color on the plate.',
  },
  6: {
    title: 'Egg bake and snack boxes',
    items: ['Egg bake with spinach and peppers', 'Greek yogurt or cottage cheese', 'Fruit and mixed nuts'],
    note: 'Use this lighter prep to cover breakfast and a grab-and-go snack.',
  },
  8: {
    title: 'Chicken burrito bowls',
    items: ['Shredded chicken', 'Rice and black beans', 'Fajita vegetables and pico'],
    note: 'Make enough for two lunches as the training volume starts to climb.',
  },
  10: {
    title: 'Beef and vegetable stir-fry',
    items: ['Lean beef or chicken', 'Frozen stir-fry vegetables', 'Rice or noodles'],
    note: 'Cook the protein and vegetables together, then portion carbs based on hunger.',
  },
  12: {
    title: 'Turkey meatballs and potatoes',
    items: ['Turkey meatballs', 'Roasted potatoes', 'Side salad or steamed vegetables'],
    note: 'A simple batch meal that reheats well after a leg and core session.',
  },
  13: {
    title: 'Protein snack kit',
    items: ['Hard-boiled eggs', 'Greek yogurt', 'Fruit, veggies, and hummus'],
    note: 'Build a snack kit so the weekend does not turn into random grazing.',
  },
  15: {
    title: 'High-protein pasta bake',
    items: ['Chicken or turkey', 'Protein pasta or whole-grain pasta', 'Marinara and spinach'],
    note: 'Portion it before the week gets busy so dinner is already handled.',
  },
  17: {
    title: 'Sheet-pan chicken fajitas',
    items: ['Chicken strips', 'Peppers and onions', 'Tortillas, rice, or lettuce cups'],
    note: 'One pan, multiple meals, and easy portions for the final push.',
  },
  19: {
    title: 'Steak or chicken meal boxes',
    items: ['Lean steak or chicken', 'Rice or roasted potatoes', 'Broccoli or mixed vegetables'],
    note: 'Keep this steady and familiar so nutrition supports the final lower-body day.',
  },
  20: {
    title: 'Recovery-ready protein prep',
    items: ['Chicken, salmon, or tofu', 'Quinoa or rice', 'Greens plus a fruit option'],
    note: 'Set up tomorrow with protein and easy carbs so finishing strong does not become guesswork.',
  },
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
  const mealPrep = workoutMealPrep[challengeDay.dayNumber]

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

      {/* Intensity modifiers and meal prep — workout days only */}
      {challengeDay.category === 'workout' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">Intensity Modifiers</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-full">Lower intensity — reduce weight</span>
              <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-full">Higher intensity — increase weight</span>
            </div>
          </div>

          {mealPrep && (
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">Suggested Meal Prep</p>
              <h2 className="text-lg font-semibold text-white">{mealPrep.title}</h2>
              <div className="mt-3 grid gap-2">
                {mealPrep.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{mealPrep.note}</p>
            </div>
          )}
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
