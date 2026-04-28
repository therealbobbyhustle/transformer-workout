'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markDayComplete(dayNumber: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Upsert the day completion
  const { error: completionError } = await supabase
    .from('day_completions')
    .upsert(
      {
        user_id: user.id,
        day_number: dayNumber,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,day_number' }
    )

  if (completionError) return { error: completionError.message }

  // Recalculate progress
  const { data: completions } = await supabase
    .from('day_completions')
    .select('day_number')
    .eq('user_id', user.id)
    .eq('completed', true)

  const completedCount = completions?.length ?? 0
  const percentComplete = Math.round((completedCount / 21) * 100)
  const nextDay = Math.min(dayNumber + 1, 21)

  const { error: progressError } = await supabase
    .from('user_progress')
    .upsert(
      {
        user_id: user.id,
        completed_days_count: completedCount,
        percent_complete: percentComplete,
        current_day_number: nextDay,
        completed_at: completedCount === 21 ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id' }
    )

  if (progressError) return { error: progressError.message }

  revalidatePath('/dashboard')
  revalidatePath('/workout')

  return { success: true, completedCount, percentComplete, nextDay }
}

export async function getUserProgress() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!progress) {
    // First time — initialize progress
    const { data: newProgress } = await supabase
      .from('user_progress')
      .insert({
        user_id: user.id,
        completed_days_count: 0,
        percent_complete: 0,
        current_day_number: 1,
      })
      .select()
      .single()

    return newProgress
  }

  return progress
}

export async function getCompletedDays(): Promise<number[]> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from('day_completions')
    .select('day_number')
    .eq('user_id', user.id)
    .eq('completed', true)

  return data?.map((d) => d.day_number) ?? []
}

export async function submitWeeklyCheckIn(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const weekNumber = Number(formData.get('week_number'))

  const { error } = await supabase.from('weekly_check_ins').upsert(
    {
      user_id: user.id,
      week_number: weekNumber,
      workouts_completed: Number(formData.get('workouts_completed')),
      energy_rating: Number(formData.get('energy_rating')),
      consistency_rating: Number(formData.get('consistency_rating')),
      biggest_win: formData.get('biggest_win') as string,
      biggest_struggle: formData.get('biggest_struggle') as string,
    },
    { onConflict: 'user_id,week_number' }
  )

  if (error) return { error: error.message }

  revalidatePath('/check-in')
  return { success: true }
}

export async function logNutrition(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('nutrition_logs').upsert(
    {
      user_id: user.id,
      date: today,
      water_complete: formData.get('water_complete') === 'true',
      protein_complete: formData.get('protein_complete') === 'true',
      on_plan_complete: formData.get('on_plan_complete') === 'true',
      better_choices_complete: formData.get('better_choices_complete') === 'true',
    },
    { onConflict: 'user_id,date' }
  )

  if (error) return { error: error.message }

  revalidatePath('/nutrition')
  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/')
}
