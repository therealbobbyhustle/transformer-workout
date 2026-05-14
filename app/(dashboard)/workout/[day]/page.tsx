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

type DailyMealPlan = {
  title: string
  items: string[]
  note: string
}

const dailyMealPlans: Record<number, DailyMealPlan> = {
  1: {
    title: 'Chicken rice bowl day',
    items: ['Breakfast: eggs with spinach and fruit', 'Lunch: grilled chicken rice bowl with peppers', 'Dinner: salmon, sweet potato, and broccoli', 'Snack: Greek yogurt with berries'],
    note: 'Start simple: protein at every meal, one easy carb, and vegetables twice today.',
  },
  2: {
    title: 'Recovery fuel day',
    items: ['Breakfast: Greek yogurt, berries, and granola', 'Lunch: turkey wrap with salad greens', 'Dinner: chicken soup or chili with rice', 'Snack: apple with peanut butter'],
    note: 'Keep calories steady on recovery days so your body has what it needs to rebuild.',
  },
  3: {
    title: 'Turkey taco bowls',
    items: ['Breakfast: egg scramble with potatoes', 'Lunch: lean turkey taco bowl with rice and beans', 'Dinner: chicken fajita plate with vegetables', 'Snack: cottage cheese and pineapple'],
    note: 'Keep toppings separate so the bowl stays fresh after training.',
  },
  4: {
    title: 'Mobility and hydration day',
    items: ['Breakfast: protein smoothie with banana', 'Lunch: tuna or chicken salad bowl', 'Dinner: turkey burger plate with roasted vegetables', 'Snack: carrots, hummus, and string cheese'],
    note: 'Prioritize water and lighter meals that leave you feeling mobile, not sluggish.',
  },
  5: {
    title: 'Salmon or chicken power plates',
    items: ['Breakfast: oatmeal with protein and berries', 'Lunch: chicken, sweet potato, and green beans', 'Dinner: salmon or chicken with rice and asparagus', 'Snack: protein shake or yogurt'],
    note: 'This is a good lower-body day meal: protein, carbs, and color on the plate.',
  },
  6: {
    title: 'Egg bake and snack boxes',
    items: ['Breakfast: egg bake with spinach and peppers', 'Lunch: turkey sandwich with fruit', 'Dinner: lean beef or turkey pasta bowl', 'Snack: Greek yogurt, fruit, and mixed nuts'],
    note: 'Use this lighter prep to cover breakfast and a grab-and-go snack.',
  },
  7: {
    title: 'Reset and prep day',
    items: ['Breakfast: veggie omelet and fruit', 'Lunch: chicken salad with rice or crackers', 'Dinner: slow-cooker chicken, potatoes, and vegetables', 'Snack: protein smoothie'],
    note: 'Use today to prep two proteins and one carb source for the week ahead.',
  },
  8: {
    title: 'Chicken burrito bowls',
    items: ['Breakfast: eggs, toast, and berries', 'Lunch: shredded chicken burrito bowl', 'Dinner: turkey meatballs with rice and vegetables', 'Snack: cottage cheese and fruit'],
    note: 'Make enough for two lunches as the training volume starts to climb.',
  },
  9: {
    title: 'Core recovery plate',
    items: ['Breakfast: Greek yogurt parfait', 'Lunch: grilled chicken wrap with vegetables', 'Dinner: shrimp or chicken stir-fry with rice', 'Snack: boiled eggs and fruit'],
    note: 'Keep meals balanced and easy so recovery does not turn into under-eating.',
  },
  10: {
    title: 'Beef and vegetable stir-fry',
    items: ['Breakfast: oatmeal with protein powder', 'Lunch: lean beef or chicken stir-fry', 'Dinner: turkey chili with rice', 'Snack: protein bar and fruit'],
    note: 'Cook the protein and vegetables together, then portion carbs based on hunger.',
  },
  11: {
    title: 'Mobility meal balance',
    items: ['Breakfast: smoothie with protein, spinach, and banana', 'Lunch: tuna rice bowl with cucumber', 'Dinner: chicken tacos with vegetables', 'Snack: hummus, vegetables, and cheese'],
    note: 'Keep digestion easy today and hit your water target before dinner.',
  },
  12: {
    title: 'Turkey meatballs and potatoes',
    items: ['Breakfast: eggs and potatoes', 'Lunch: turkey meatballs, roasted potatoes, and salad', 'Dinner: chicken bowl with rice and vegetables', 'Snack: Greek yogurt and berries'],
    note: 'A simple batch meal that reheats well after a leg and core session.',
  },
  13: {
    title: 'Protein snack kit',
    items: ['Breakfast: egg bake or breakfast wrap', 'Lunch: chicken Caesar-style salad with rice on the side', 'Dinner: salmon, quinoa, and greens', 'Snack: hard-boiled eggs, yogurt, fruit, and hummus'],
    note: 'Build a snack kit so the weekend does not turn into random grazing.',
  },
  14: {
    title: 'Week 2 reset plate',
    items: ['Breakfast: protein pancakes or oatmeal', 'Lunch: turkey burger bowl', 'Dinner: roasted chicken with vegetables', 'Snack: fruit and cottage cheese'],
    note: 'Rest days still count. Eat like someone who is preparing for Week 3.',
  },
  15: {
    title: 'High-protein pasta bake',
    items: ['Breakfast: eggs, toast, and fruit', 'Lunch: high-protein pasta bake with chicken or turkey', 'Dinner: chicken rice bowl with greens', 'Snack: protein shake and banana'],
    note: 'Portion it before the week gets busy so dinner is already handled.',
  },
  16: {
    title: 'Active burn support',
    items: ['Breakfast: Greek yogurt with berries and granola', 'Lunch: turkey and avocado wrap', 'Dinner: lean beef bowl with rice and vegetables', 'Snack: apple with peanut butter'],
    note: 'Fuel the walk and core work without making the day feel heavy.',
  },
  17: {
    title: 'Sheet-pan chicken fajitas',
    items: ['Breakfast: protein oatmeal', 'Lunch: sheet-pan chicken fajitas with rice or tortillas', 'Dinner: turkey chili or chicken soup', 'Snack: cottage cheese and pineapple'],
    note: 'One pan, multiple meals, and easy portions for the final push.',
  },
  18: {
    title: 'Mobility recovery meals',
    items: ['Breakfast: smoothie with protein and fruit', 'Lunch: chicken salad bowl with sweet potato', 'Dinner: fish or chicken with rice and vegetables', 'Snack: veggies, hummus, and cheese'],
    note: 'Keep inflammation low with water, protein, and colorful produce.',
  },
  19: {
    title: 'Steak or chicken meal boxes',
    items: ['Breakfast: egg scramble with potatoes', 'Lunch: steak or chicken meal box with rice and broccoli', 'Dinner: salmon, potatoes, and greens', 'Snack: Greek yogurt and berries'],
    note: 'Keep this steady and familiar so nutrition supports the final lower-body day.',
  },
  20: {
    title: 'Recovery-ready protein prep',
    items: ['Breakfast: oatmeal with protein and banana', 'Lunch: chicken, salmon, or tofu with quinoa and greens', 'Dinner: turkey burger bowl with vegetables', 'Snack: protein shake or cottage cheese'],
    note: 'Set up tomorrow with protein and easy carbs so finishing strong does not become guesswork.',
  },
  21: {
    title: 'Finish-line reset',
    items: ['Breakfast: eggs or Greek yogurt with fruit', 'Lunch: chicken rice bowl or turkey wrap', 'Dinner: your best balanced plate from the challenge', 'Snack: fruit, nuts, or a protein smoothie'],
    note: 'Choose the meal pattern you can repeat after the challenge ends. That is the real win.',
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
  const mealPlan = dailyMealPlans[challengeDay.dayNumber]

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

      {/* Intensity modifiers — workout days only */}
      {challengeDay.category === 'workout' && (
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">Intensity Modifiers</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-full">Lower intensity — reduce weight</span>
            <span className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-full">Higher intensity — increase weight</span>
          </div>
        </div>
      )}

      {mealPlan && (
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">Daily Meal Plan</p>
          <h2 className="text-lg font-semibold text-white">{mealPlan.title}</h2>
          <div className="mt-3 grid gap-2">
            {mealPlan.items.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{mealPlan.note}</p>
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
