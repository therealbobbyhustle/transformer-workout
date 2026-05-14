'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChallengeDay } from '@/lib/types'

interface DashboardWorkoutPreviewProps {
  day: ChallengeDay
}

function getExerciseDetail(sets?: number, reps?: string) {
  if (sets && reps) return `${sets}×${reps}`
  if (reps) return reps
  return 'Follow along'
}

export default function DashboardWorkoutPreview({ day }: DashboardWorkoutPreviewProps) {
  const steps = day.exerciseGroups.flatMap((group, groupIndex) =>
    group.exercises.map((exercise, exerciseIndex) => ({
      id: `${groupIndex}-${exerciseIndex}`,
      name: exercise.name,
      detail: getExerciseDetail(exercise.sets, exercise.reps),
      videoUrl: exercise.videoUrl,
      posterUrl: exercise.posterUrl,
    }))
  )

  const [activeStep, setActiveStep] = useState(0)
  const [hasStartedWorkout, setHasStartedWorkout] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentStep = steps[activeStep]
  const shouldShowStartPoster = Boolean(currentStep?.posterUrl && !hasStartedWorkout)

  useEffect(() => {
    const video = videoRef.current

    if (!video || !currentStep?.videoUrl) return
    if (!hasStartedWorkout) return

    video.currentTime = 0
    video.muted = false

    void video.play().catch(() => {
      // Some browsers still require another user gesture after changing videos.
    })
  }, [currentStep?.videoUrl, hasStartedWorkout])

  if (steps.length === 0 || !currentStep) return null

  const isLastStep = activeStep === steps.length - 1
  const goToNextStep = () => setActiveStep((step) => Math.min(step + 1, steps.length - 1))
  const handleVideoEnded = () => {
    if (!isLastStep) goToNextStep()
  }
  const startWorkout = () => {
    const video = videoRef.current

    if (!video) return

    video.muted = false
    setHasStartedWorkout(true)
    void video.play().catch(() => {
      setHasStartedWorkout(false)
    })
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg bg-zinc-800/50">
        {steps.map((step, index) => {
          const isActive = index === activeStep

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                isActive ? 'bg-orange-500/15' : 'hover:bg-zinc-800'
              }`}
            >
              <span className={`min-w-0 truncate ${isActive ? 'font-semibold text-white' : 'text-zinc-300'}`}>
                {step.name}
              </span>
              <span className={`flex-shrink-0 text-xs font-medium ${isActive ? 'text-orange-300' : 'text-zinc-500'}`}>
                {step.detail}
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-black">
        {currentStep.videoUrl ? (
          <video
            key={currentStep.videoUrl}
            ref={videoRef}
            className="aspect-video w-full object-cover"
            src={currentStep.videoUrl}
            poster={currentStep.posterUrl}
            playsInline
            controls
            preload={hasStartedWorkout ? 'metadata' : 'none'}
            onPlay={() => setHasStartedWorkout(true)}
            onEnded={handleVideoEnded}
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-zinc-800">
            <p className="text-sm font-medium text-zinc-500">Video coming soon</p>
          </div>
        )}

        {shouldShowStartPoster && currentStep.posterUrl && (
          <button
            type="button"
            onClick={startWorkout}
            className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-black text-white"
            style={{
              backgroundImage: `url(${currentStep.posterUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            aria-label={`Play ${currentStep.name}`}
          >
            <span className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/55 shadow-2xl backdrop-blur-sm transition-transform hover:scale-105">
              <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
