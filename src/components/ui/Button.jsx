const VARIANTS = {
  // Solid orange CTA — the "Book an Appointment" style used everywhere in the Stitch exports
  primary:
    'bg-secondary text-on-secondary hover:bg-on-secondary-container shadow-sm active:scale-[0.98]',
  // Teal outline — the secondary "View Services" / "Back" style
  outline:
    'border-2 border-primary text-primary hover:bg-primary/5 active:scale-[0.98]',
  // Low-emphasis text-only action
  ghost: 'text-on-surface-variant hover:text-primary',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-label-bold text-label-bold px-lg py-4 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none'
  return (
    <Component className={`${base} ${VARIANTS[variant]} ${className}`.trim()} {...props}>
      {children}
    </Component>
  )
}
