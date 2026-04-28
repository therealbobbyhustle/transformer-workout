'use client'

import { useState } from 'react'

const mealIdeas = [
  { meal: 'Breakfast', options: ['Eggs + fruit', 'Greek yogurt + berries', 'Oatmeal + protein shake'] },
  { meal: 'Lunch', options: ['Grilled chicken salad', 'Turkey wrap + fruit', 'Rice bowl with lean protein'] },
  { meal: 'Dinner', options: ['Salmon + roasted vegetables', 'Ground turkey + rice + veggies', 'Chicken stir-fry'] },
  { meal: 'Snacks', options: ['Protein shake + banana', 'Apple + almond butter', 'Hard-boiled eggs + fruit'] },
]

const groceryItems = [
  'Chicken breast or thighs',
  'Ground turkey or beef (lean)',
  'Eggs',
  'Greek yogurt',
  'Salmon or tilapia',
  'Brown rice or white rice',
  'Oats',
  'Sweet potatoes',
  'Broccoli, spinach, mixed greens',
  'Bananas, apples, berries',
  'Almonds or peanut butter',
  'Protein powder',
  'Olive oil',
]

const dailyWins = [
  { key: 'water', label: 'Drank my water today' },
  { key: 'protein', label: 'Ate protein with my meals' },
  { key: 'better', label: 'Made better food choices' },
  { key: 'plan', label: 'Stayed mostly on plan' },
]

export default function NutritionPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Nutrition</h1>
        <p className="text-zinc-400 text-sm mt-0.5">Simple guidance to fuel your 21-day challenge.</p>
      </div>

      {/* Game plan */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-3">The Game Plan</h2>
        <div className="space-y-2 text-zinc-300 text-sm leading-relaxed">
          <p>This is not about being perfect. It is about being consistent.</p>
          <p>Focus on eating more whole foods, getting protein in your meals, and staying hydrated. That is it.</p>
          <p>You do not need to count calories. You need to make better choices more often than not.</p>
        </div>
      </div>

      {/* Daily wins */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Today&apos;s Nutrition Wins</h2>
          <span className="text-green-400 text-sm font-semibold">{checkedCount}/{dailyWins.length}</span>
        </div>
        <div className="space-y-3">
          {dailyWins.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                checked[key]
                  ? 'border-green-600 bg-green-900/20 text-white'
                  : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                checked[key] ? 'border-green-500 bg-green-500' : 'border-zinc-500'
              }`}>
                {checked[key] && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meal ideas */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-4">Simple Meal Ideas</h2>
        <div className="space-y-4">
          {mealIdeas.map(({ meal, options }) => (
            <div key={meal}>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">{meal}</p>
              <div className="flex flex-wrap gap-1.5">
                {options.map((option) => (
                  <span key={option} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full">
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real life guidance */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-3">Real Life Food Guidance</h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <div>
            <p className="font-medium text-white mb-1">Busy workday?</p>
            <p>Prep meals on Sunday. Even a simple rice bowl or grilled chicken in containers changes everything.</p>
          </div>
          <div>
            <p className="font-medium text-white mb-1">Fast food happens?</p>
            <p>Choose grilled over fried. Skip the fries or go small. Add a water. That is a win.</p>
          </div>
          <div>
            <p className="font-medium text-white mb-1">No time to cook?</p>
            <p>Rotisserie chicken + bagged salad + fruit. Done in 3 minutes. Solid meal.</p>
          </div>
        </div>
      </div>

      {/* Grocery list */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h2 className="text-base font-semibold text-white mb-3">Grocery Staples</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {groceryItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-zinc-300 text-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
