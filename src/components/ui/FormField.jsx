import Icon from './Icon.jsx'

const baseInputClasses =
  'w-full bg-surface-container-low border rounded-lg px-sm py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:ring-1 outline-none transition-colors'

function borderClasses(error) {
  return error
    ? 'border-error focus:border-error focus:ring-error'
    : 'border-outline-variant focus:border-primary focus:ring-primary'
}

/**
 * Shared form field used across both Booking Step 2 (Pet & Customer) and
 * Step 3 (Date & Location). Handles text/tel/email/number/textarea/select
 * uniformly, with a leading icon slot and inline error message.
 *
 * Validation is always custom/JS-driven (see utils/validation.js) — fields
 * never rely on the browser's native constraint-validation UI, so error
 * state is exposed to assistive tech via aria-invalid/aria-describedby
 * instead.
 */
export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  icon,
  rows = 3,
  options,
  className = '',
  inputMode,
  maxLength,
  min,
  max,
}) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`
  const describedBy = error ? errorId : undefined

  return (
    <div className={`space-y-xs ${className}`}>
      <label htmlFor={inputId} className="font-body-sm text-body-sm text-on-surface-variant block">
        {label} {required && <span className="text-secondary">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
            <Icon name={icon} />
          </span>
        )}
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            className={`${baseInputClasses} ${borderClasses(error)} resize-none`}
          />
        ) : type === 'select' ? (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            className={`${baseInputClasses} ${borderClasses(error)} appearance-none ${icon ? 'pl-10' : ''}`}
          >
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            inputMode={inputMode}
            maxLength={maxLength}
            min={min}
            max={max}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            className={`${baseInputClasses} ${borderClasses(error)} ${icon ? 'pl-10' : ''}`}
          />
        )}
        {type === 'select' && (
          <Icon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" />
        )}
      </div>
      {error && (
        <p id={errorId} role="alert" className="font-body-sm text-body-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
