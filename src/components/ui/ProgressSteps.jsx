import Icon from './Icon.jsx'

/**
 * Single shared step indicator for the 4-step booking form (the "Appointment
 * Confirmation" screen that follows is a splash screen, not part of this
 * indicator). The Stitch exports drew this four different ways across the
 * five booking screens — this is the one implementation used everywhere.
 */
const STEP_LABELS = ['Select Service', 'Pet & Customer', 'Date & Location', 'Review & Confirm']

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="mb-lg">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-4 w-full h-[2px] bg-surface-variant -z-0" />
        <div
          className="absolute left-0 top-4 h-[2px] bg-primary -z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (STEP_LABELS.length - 1)) * 100}%` }}
        />
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1
          const isComplete = stepNum < currentStep
          const isActive = stepNum === currentStep
          return (
            <div key={label} className="flex flex-col items-center gap-2 bg-background px-1 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-label-bold text-label-bold ${
                  isComplete
                    ? 'bg-primary text-on-primary'
                    : isActive
                    ? 'bg-secondary text-on-secondary ring-4 ring-secondary/20'
                    : 'bg-surface-variant text-on-surface-variant'
                }`}
              >
                {isComplete ? <Icon name="check" className="text-[16px]" /> : stepNum}
              </div>
              <span
                className={`font-body-sm text-body-sm text-center hidden sm:block ${
                  isActive ? 'text-secondary font-bold' : isComplete ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant text-center sm:hidden mt-sm">
        Step {currentStep} of {STEP_LABELS.length}: {STEP_LABELS[currentStep - 1]}
      </p>
    </div>
  )
}
