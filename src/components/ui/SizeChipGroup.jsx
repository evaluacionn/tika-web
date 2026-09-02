const SIZES = [
  { value: 'small', label: 'Small', hint: '< 20 lbs' },
  { value: 'medium', label: 'Medium', hint: '21-50 lbs' },
  { value: 'large', label: 'Large', hint: '51-90 lbs' },
  { value: 'giant', label: 'Giant', hint: '90+ lbs' },
]

export default function SizeChipGroup({ value, onChange, error }) {
  const errorId = 'petSize-error'

  return (
    <div>
      <span className="block font-body-sm text-body-sm text-on-surface-variant mb-2" id="petSize-label">
        Pet Size <span className="text-secondary">*</span>
      </span>
      <div
        role="radiogroup"
        aria-labelledby="petSize-label"
        aria-required="true"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className="grid grid-cols-2 gap-3"
      >
        {SIZES.map((size) => {
          const selected = value === size.value
          return (
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              key={size.value}
              onClick={() => onChange(size.value)}
              className={`rounded-lg py-3 px-4 text-center transition-colors font-body-md text-body-md border ${
                selected
                  ? 'bg-tertiary text-on-tertiary border-tertiary'
                  : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-variant'
              }`}
            >
              {size.label} <span className="opacity-80">({size.hint})</span>
            </button>
          )
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="font-body-sm text-body-sm text-error mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
