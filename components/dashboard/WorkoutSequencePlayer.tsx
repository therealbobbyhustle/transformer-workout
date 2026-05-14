'use client'

import { useEffect, useRef, useState } from 'react'
import type { ExerciseGroup } from '@/lib/types'

interface WorkoutSequencePlayerProps {
  dayNumber: number
  dayTitle: string
  categoryLabel: string
  exerciseGroups: ExerciseGroup[]
}

function getExerciseDetail(sets?: number, reps?: string) {
  if (sets && reps) return `${sets} × ${reps}`
  if (reps) return reps
  return 'Follow along'
}

export default function WorkoutSequencePlayer({
  dayNumber,
  dayTitle,
  categoryLabel,
  exerciseGroups,
}: WorkoutSequencePlayerProps) {
  const steps = exerciseGroups.flatMap((group, groupIndex) =>
    group.exercises.map((exercise, exerciseIndex) => ({
      id: `${groupIndex}-${exerciseIndex}`,
      groupLabel: group.label,
      name: exercise.name,
      detail: getExerciseDetail(exercise.sets, exercise.reps),
      note: exercise.note,
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

  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === steps.length - 1
  const goToPreviousStep = () => setActiveStep((step) => Math.max(step - 1, 0))
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
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
            {categoryLabel}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Step {activeStep + 1} of {steps.length}
          </p>
        </div>
        <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300">
          Day {dayNumber}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="absolute left-0 right-0 top-0 h-1 bg-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="relative aspect-video bg-black">
          {currentStep.videoUrl ? (
            <video
              key={currentStep.videoUrl}
              ref={videoRef}
              className="h-full w-full object-cover"
              src={currentStep.videoUrl}
              poster={currentStep.posterUrl}
              playsInline
              controls
              preload={hasStartedWorkout ? 'metadata' : 'none'}
              onPlay={() => setHasStartedWorkout(true)}
              onEnded={handleVideoEnded}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-5 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800/80">
                <svg className="ml-1 h-6 w-6 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
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
              <span className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/55 shadow-2xl backdrop-blur-sm transition-transform hover:scale-105">
                <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <div className="relative space-y-4 p-4 sm:p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {currentStep.groupLabel ?? dayTitle}
            </p>
            <h3 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">
              {currentStep.name}
            </h3>
            <p className="mt-2 text-base font-medium text-orange-300">{currentStep.detail}</p>
            {currentStep.note && (
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
                {currentStep.note}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={isFirstStep}
              className="min-h-12 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              {currentStep.videoUrl
                ? hasStartedWorkout
                  ? 'Next video auto-plays'
                  : 'Press play to start'
                : 'Video pending'}
            </p>

            <button
              type="button"
              onClick={goToNextStep}
              disabled={isLastStep}
              className="min-h-12 rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="border-b border-zinc-800 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Workout Steps
          </p>
        </div>
        <div className="divide-y divide-zinc-800">
          {steps.map((step, index) => {
            const isActive = index === activeStep

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                  isActive ? 'bg-orange-500/10' : 'hover:bg-zinc-800/60'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        isActive
                          ? 'bg-orange-500 text-white'
                          : index < activeStep
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {index < activeStep ? '✓' : index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className={`truncate text-sm font-medium ${isActive ? 'text-white' : 'text-zinc-200'}`}>
                        {step.name}
                      </p>
                      {step.groupLabel && (
                        <p className="mt-0.5 text-xs text-zinc-500">{step.groupLabel}</p>
                      )}
                    </div>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${isActive ? 'text-orange-300' : 'text-zinc-400'}`}>
                  {step.detail}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
