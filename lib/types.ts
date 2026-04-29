export type DayCategory = 'workout' | 'recovery' | 'mobility' | 'rest'

export interface Exercise {
  name: string
  sets?: number
  reps?: string
  note?: string
}

export interface ExerciseGroup {
  label?: string
  exercises: Exercise[]
}

export interface ChallengeDay {
  dayNumber: number
  weekNumber: number
  weekLabel: string
  calendarLabel: string
  title: string
  duration: string
  category: DayCategory
  description: string
  focus: string
  videoUrl: string | null
  exerciseGroups: ExerciseGroup[]
}

export interface UserProgress {
  id: string
  user_id: string
  challenge_id: string
  completed_days_count: number
  percent_complete: number
  current_day_number: number
  started_at: string
  completed_at: string | null
}

export interface DayCompletion {
  id: string
  user_id: string
  day_number: number
  completed: boolean
  completed_at: string
}

export interface WeeklyCheckIn {
  id: string
  user_id: string
  week_number: number
  workouts_completed: number
  energy_rating: number
  consistency_rating: number
  biggest_win: string
  biggest_struggle: string
  created_at: string
}

export interface NutritionLog {
  id: string
  user_id: string
  date: string
  water_complete: boolean
  protein_complete: boolean
  on_plan_complete: boolean
  better_choices_complete: boolean
}
