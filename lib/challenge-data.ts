import type { ChallengeDay } from '@/lib/types'

export const CHALLENGE_DAYS: ChallengeDay[] = [

  // ─────────────────────────────────────────
  // WEEK 1 — Reset (Foundation & Form)
  // ─────────────────────────────────────────
  {
    dayNumber: 1,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Monday',
    title: 'Full Body Strength A',
    duration: '35–45 min',
    category: 'workout',
    focus: 'Learning movements, control, breathing',
    description: 'Your first session of the challenge. Focus on form over speed. Control every rep and learn the movements before you push the weight.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Dumbbell Squat → Overhead Press', sets: 3, reps: '12 reps' },
          { name: 'Reverse Lunges', sets: 3, reps: '10 each leg' },
          { name: 'Bent Over Rows', sets: 3, reps: '12 reps' },
          { name: 'Push-Ups', sets: 3, reps: '10 reps' },
          { name: 'Plank Hold', sets: 3, reps: '30 sec' },
        ],
      },
    ],
  },

  {
    dayNumber: 2,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Tuesday',
    title: 'Walk + Core',
    duration: '30–40 min',
    category: 'recovery',
    focus: 'Active recovery, core activation',
    description: 'Keep your body moving without beating it up. The walk clears your head and the core work builds your foundation.',
    videoUrl: null,
    exerciseGroups: [
      {
        label: 'Cardio',
        exercises: [
          { name: 'Brisk Walk', reps: '20–30 min' },
        ],
      },
      {
        label: 'Core',
        exercises: [
          { name: 'Knee Raises', sets: 3, reps: '15 reps' },
          { name: 'Russian Twists', sets: 3, reps: '20 reps' },
          { name: 'Toe Touches', sets: 3, reps: '15 reps' },
        ],
      },
    ],
  },

  {
    dayNumber: 3,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Wednesday',
    title: 'Full Body Strength B',
    duration: '35–45 min',
    category: 'workout',
    focus: 'Posterior chain, shoulders, arms',
    description: 'The second strength pattern of the week. Different movements, same intention — build full body strength with control.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Deadlift (DB or BB)', sets: 3, reps: '12 reps' },
          { name: 'Step-Ups', sets: 3, reps: '10 each leg' },
          { name: 'Shoulder Press', sets: 3, reps: '12 reps' },
          { name: 'Hammer Curls', sets: 3, reps: '12 reps' },
          { name: 'Bicycle Crunch', sets: 3, reps: '20 reps' },
        ],
      },
    ],
  },

  {
    dayNumber: 4,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Thursday',
    title: 'Mobility Reset',
    duration: '15–20 min',
    category: 'mobility',
    focus: 'Flexibility, recovery, joint health',
    description: 'Mobility is not optional — it is part of the work. Keep your body loose and ready for the second half of the week.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Hip Openers', note: 'Each side' },
          { name: 'Arm Circles', note: 'Forward and back' },
          { name: 'Hamstring Stretch', note: 'Hold 30 sec each side' },
          { name: 'Light Yoga Flow', reps: '15–20 min' },
        ],
      },
    ],
  },

  {
    dayNumber: 5,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Friday',
    title: 'Lower Body + Core',
    duration: '35–45 min',
    category: 'workout',
    focus: 'Legs, glutes, core stability',
    description: 'End the workweek strong. Lower body and core work that builds real functional strength for everyday life.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Goblet Squats', sets: 3, reps: '12 reps' },
          { name: 'Glute Bridges', sets: 3, reps: '15 reps' },
          { name: 'Walking Lunges', sets: 3, reps: '10 each leg' },
          { name: 'Leg Raises', sets: 3, reps: '15 reps' },
          { name: 'Plank', sets: 3, reps: '30 sec' },
        ],
      },
    ],
  },

  {
    dayNumber: 6,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Saturday',
    title: 'Upper Body + Light Burn',
    duration: '30–40 min',
    category: 'workout',
    focus: 'Upper body strength, light cardio finisher',
    description: 'Upper body focus with a light cardio burn at the end. Finish Week 1 feeling strong and accomplished.',
    videoUrl: null,
    exerciseGroups: [
      {
        label: 'Strength',
        exercises: [
          { name: 'Push-Ups', sets: 3, reps: '10 reps' },
          { name: 'Rows', sets: 3, reps: '12 reps' },
          { name: 'Lateral Raises', sets: 3, reps: '12 reps' },
        ],
      },
      {
        label: 'Cardio Finisher',
        exercises: [
          { name: 'Light Jog or Bike', reps: '15 min' },
        ],
      },
    ],
  },

  {
    dayNumber: 7,
    weekNumber: 1,
    weekLabel: 'Reset',
    calendarLabel: 'Sunday',
    title: 'Weekly Check-In + Rest',
    duration: '5–10 min',
    category: 'rest',
    focus: 'Reflect, recover, reload',
    description: 'You made it through Week 1. Rest, reflect, and complete your check-in. Celebrate what you showed up for.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Complete your Week 1 Check-In', note: 'Head to the Check-In section' },
          { name: 'Full rest — no training today', note: 'Recovery is part of the plan' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // WEEK 2 — Build (Volume + Intensity)
  // ─────────────────────────────────────────
  {
    dayNumber: 8,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Monday',
    title: 'Full Body Strength A Plus',
    duration: '45–55 min',
    category: 'workout',
    focus: 'More reps, more rounds, less rest',
    description: 'You know the movements now. Turn it up. More volume, tighter rest periods, same solid foundation.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Squat → Press', sets: 4, reps: '12 reps' },
          { name: 'Reverse Lunges', sets: 4, reps: '12 each leg' },
          { name: 'Bent Rows', sets: 4, reps: '12 reps' },
          { name: 'Push-Ups', sets: 4, reps: '12 reps' },
          { name: 'Plank', sets: 4, reps: '40 sec' },
        ],
      },
    ],
  },

  {
    dayNumber: 9,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Tuesday',
    title: 'Walk + Core Plus',
    duration: '40–50 min',
    category: 'recovery',
    focus: 'Extended cardio, core circuit',
    description: 'Longer walk with jog intervals added. Four rounds of core. You are building endurance alongside strength.',
    videoUrl: null,
    exerciseGroups: [
      {
        label: 'Cardio',
        exercises: [
          { name: 'Walk with Light Jog Intervals', reps: '30–40 min' },
        ],
      },
      {
        label: 'Core Circuit — 4 Rounds',
        exercises: [
          { name: 'Core Circuit', sets: 4, note: 'Same exercises as Week 1, 4 rounds' },
        ],
      },
    ],
  },

  {
    dayNumber: 10,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Wednesday',
    title: 'Full Body Strength B Plus',
    duration: '45–55 min',
    category: 'workout',
    focus: 'Volume increase, same movements',
    description: 'Midweek strength session with added volume. You have been building — now start to feel the difference.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '12 reps' },
          { name: 'Step-Ups', sets: 4, reps: '12 each leg' },
          { name: 'Shoulder Press', sets: 4, reps: '12 reps' },
          { name: 'Hammer Curls', sets: 4, reps: '12 reps' },
          { name: 'Bicycle Crunch', sets: 4, reps: '25 reps' },
        ],
      },
    ],
  },

  {
    dayNumber: 11,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Thursday',
    title: 'Mobility Reset',
    duration: '20–25 min',
    category: 'mobility',
    focus: 'Deeper stretching with resistance',
    description: 'Added resistance band stretching and longer holds. Notice how your range of motion has improved from Week 1.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Resistance Band Stretching', note: 'Added this week' },
          { name: 'Deep Stretch Holds', reps: '30–45 sec each' },
          { name: 'Hip Openers + Hamstring Stretch', note: 'Longer holds than Week 1' },
        ],
      },
    ],
  },

  {
    dayNumber: 12,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Friday',
    title: 'Lower Body + Core Plus',
    duration: '45–55 min',
    category: 'workout',
    focus: 'Increased volume, glutes and legs',
    description: 'Four rounds on everything. Your legs should be talking to you by the end. That is the work paying off.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Goblet Squats', sets: 4, reps: '12 reps' },
          { name: 'Glute Bridges', sets: 4, reps: '20 reps' },
          { name: 'Walking Lunges', sets: 4, reps: '12 each leg' },
          { name: 'Leg Raises', sets: 4, reps: '15 reps' },
          { name: 'Plank', sets: 4, reps: '40 sec' },
        ],
      },
    ],
  },

  {
    dayNumber: 13,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Saturday',
    title: 'Upper Body + Conditioning',
    duration: '45–55 min',
    category: 'workout',
    focus: 'Strength + HIIT conditioning',
    description: 'Upper body strength followed by a real conditioning finisher. HIIT intervals to close out Week 2 strong.',
    videoUrl: null,
    exerciseGroups: [
      {
        label: 'Strength',
        exercises: [
          { name: 'Push-Ups', sets: 4, reps: '12 reps' },
          { name: 'Rows', sets: 4, reps: '12 reps' },
          { name: 'Shoulder Burnout Circuit', note: '4 rounds' },
        ],
      },
      {
        label: 'HIIT Finisher',
        exercises: [
          { name: 'HIIT Intervals', reps: '20 min', note: '40 sec work / 20 sec rest' },
        ],
      },
    ],
  },

  {
    dayNumber: 14,
    weekNumber: 2,
    weekLabel: 'Build',
    calendarLabel: 'Sunday',
    title: 'Weekly Check-In + Rest',
    duration: '5–10 min',
    category: 'rest',
    focus: 'Reflect, recover, reload',
    description: 'Two weeks in. That is 14 days of showing up. Rest, complete your check-in, and get ready to lock it in.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Complete your Week 2 Check-In', note: 'Head to the Check-In section' },
          { name: 'Full rest — no training today', note: 'Your body needs this' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // WEEK 3 — Lock In (Transformer Mode)
  // ─────────────────────────────────────────
  {
    dayNumber: 15,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Monday',
    title: 'Full Body Strength A Challenge',
    duration: '55–65 min',
    category: 'workout',
    focus: 'Power, endurance, mental toughness',
    description: 'Five rounds. Fifteen reps. One minute planks. This is Transformer Mode. Everything you built leads to this.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Squat → Press', sets: 5, reps: '15 reps' },
          { name: 'Reverse Lunges', sets: 5, reps: '15 each leg' },
          { name: 'Bent Rows', sets: 5, reps: '15 reps' },
          { name: 'Push-Ups', sets: 5, reps: '15 reps' },
          { name: 'Plank', sets: 5, reps: '60 sec' },
        ],
      },
    ],
  },

  {
    dayNumber: 16,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Tuesday',
    title: 'Walk + Core (Active Burn)',
    duration: '50–60 min',
    category: 'recovery',
    focus: 'Endurance cardio, 5-round core circuit',
    description: 'Walk and jog mix for almost an hour. Five rounds of core with mountain climbers added. You are in a different place than Week 1.',
    videoUrl: null,
    exerciseGroups: [
      {
        label: 'Cardio',
        exercises: [
          { name: 'Walk / Jog Mix', reps: '40–45 min' },
        ],
      },
      {
        label: 'Core Circuit — 5 Rounds',
        exercises: [
          { name: 'Core Circuit', sets: 5, note: '5 full rounds' },
          { name: 'Mountain Climbers', note: 'Added this week' },
        ],
      },
    ],
  },

  {
    dayNumber: 17,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Wednesday',
    title: 'Full Body Strength B Challenge',
    duration: '55–65 min',
    category: 'workout',
    focus: 'Maximum output, full body',
    description: 'Final Strength B session of the challenge. Five sets of everything. Everything you have built is on display today.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Deadlifts', sets: 5, reps: '15 reps' },
          { name: 'Step-Ups', sets: 5, reps: '15 each leg' },
          { name: 'Shoulder Press', sets: 5, reps: '15 reps' },
          { name: 'Hammer Curls', sets: 5, reps: '15 reps' },
          { name: 'Bicycle Crunch', sets: 5, reps: '30 reps' },
        ],
      },
    ],
  },

  {
    dayNumber: 18,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Thursday',
    title: 'Mobility Reset (Recovery = Growth)',
    duration: '20–25 min',
    category: 'mobility',
    focus: 'Full body stretch, foam rolling',
    description: 'Three sessions left. Take care of your body. Mobility is not a rest day cop-out — it is how you come back stronger.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Full Body Stretch Flow', reps: '15–20 min' },
          { name: 'Foam Roll (if available)', note: 'Focus on quads, hamstrings, upper back' },
        ],
      },
    ],
  },

  {
    dayNumber: 19,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Friday',
    title: 'Lower Body + Core Challenge',
    duration: '55–65 min',
    category: 'workout',
    focus: 'Maximum leg and core output',
    description: 'The hardest lower body session of the challenge. Five rounds, twenty rep glute bridges, sixty second planks. You are almost there.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Goblet Squats', sets: 5, reps: '15 reps' },
          { name: 'Glute Bridges', sets: 5, reps: '20 reps' },
          { name: 'Walking Lunges', sets: 5, reps: '15 each leg' },
          { name: 'Leg Raises', sets: 5, reps: '20 reps' },
          { name: 'Plank', sets: 5, reps: '60 sec' },
        ],
      },
    ],
  },

  {
    dayNumber: 20,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Saturday',
    title: 'Upper Body + Final Burn',
    duration: '55–65 min',
    category: 'workout',
    focus: 'NO EXCUSES — max upper body + HIIT',
    description: 'Second to last session. Leave everything on the floor. The HIIT finisher runs 25 minutes. You have earned this.',
    videoUrl: null,
    exerciseGroups: [
      {
        label: 'Strength',
        exercises: [
          { name: 'Push-Ups', sets: 5, reps: '15 reps' },
          { name: 'Rows', sets: 5, reps: '15 reps' },
          { name: 'Shoulder Circuit', note: 'No rest between exercises' },
        ],
      },
      {
        label: 'HIIT Finisher — No Excuses',
        exercises: [
          { name: 'HIIT Finisher', reps: '25 min', note: 'Maximum effort' },
        ],
      },
    ],
  },

  {
    dayNumber: 21,
    weekNumber: 3,
    weekLabel: 'Lock In',
    calendarLabel: 'Sunday',
    title: 'Final Check-In + Rest',
    duration: '10 min',
    category: 'rest',
    focus: 'Celebrate, reflect, complete',
    description: 'Day 21. You did it. Complete your final check-in and head to your results page. This is something to be proud of.',
    videoUrl: null,
    exerciseGroups: [
      {
        exercises: [
          { name: 'Complete your Final Check-In', note: 'Head to the Check-In section' },
          { name: 'View your Challenge Results', note: 'Head to the Completion page' },
          { name: 'Full rest — you earned it', note: 'Day 21 complete' },
        ],
      },
    ],
  },
]

export const MOTIVATIONAL_LINES = [
  'Keep stacking wins.',
  'You are building momentum.',
  'One day at a time.',
  'Strong households start with strong habits.',
  'Show up today. Future you will thank you.',
  'Consistency beats perfection every time.',
  'You are not behind — just keep going.',
]

export function getMotivationalLine(seed: number): string {
  return MOTIVATIONAL_LINES[seed % MOTIVATIONAL_LINES.length]
}

export function getDaysByWeek(weekNumber: number): ChallengeDay[] {
  return CHALLENGE_DAYS.filter((d) => d.weekNumber === weekNumber)
}

export function getDay(dayNumber: number): ChallengeDay | undefined {
  return CHALLENGE_DAYS.find((d) => d.dayNumber === dayNumber)
}
