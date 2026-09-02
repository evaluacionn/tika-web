import Icon from './Icon.jsx'

/**
 * Displays one service tier. Used both as a read-only marketing card
 * (Home/Services pages) and as a selectable option (Booking Step 1) via the
 * `selectable` / `selected` / `onSelect` props.
 */
export default function ServiceCard({ service, selectable = false, selected = false, onSelect, ctaLabel, onCtaClick }) {
  return (
    <div
      role={selectable ? 'radio' : undefined}
      aria-checked={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : undefined}
      onClick={selectable ? onSelect : undefined}
      onKeyDown={
        selectable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect()
              }
            }
          : undefined
      }
      className={`group relative bg-surface-container-lowest rounded-xl ambient-shadow p-md border-2 transition-all duration-300 flex flex-col h-full ${
        selectable ? 'cursor-pointer' : ''
      } ${selected ? 'border-primary-container ring-2 ring-primary-container/20' : 'border-transparent hover:border-primary-container'}`}
    >
      {service.badge && (
        <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-2 py-1 rounded-sm font-label-bold text-[10px] uppercase tracking-wider">
          {service.badge}
        </div>
      )}
      {selectable && (
        <div className="absolute top-4 right-4">
          <Icon
            name={selected ? 'check_circle' : 'radio_button_unchecked'}
            filled={selected}
            className={selected ? 'text-primary' : 'text-outline-variant group-hover:text-primary'}
          />
        </div>
      )}
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs mt-lg">{service.name}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-md flex-grow">{service.tagline}</p>
      <div className="space-y-xs mb-lg">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-center gap-xs font-body-sm text-body-sm text-on-surface-variant">
            <Icon name="check" className="text-[16px] text-primary" />
            {feature}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-sm border-t border-surface-variant flex justify-between items-center">
        <span className="font-headline-sm text-headline-sm text-primary">{service.priceLabel}</span>
        <span className="font-label-bold text-label-bold text-on-surface-variant bg-surface px-2 py-1 rounded-sm">
          {service.durationShort}
        </span>
      </div>
      {ctaLabel && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onCtaClick?.()
          }}
          className="w-full mt-md py-3 border-2 border-primary text-primary rounded-full font-label-bold text-label-bold hover:bg-primary hover:text-on-primary transition-colors duration-200"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
