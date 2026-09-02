import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingHeader from '../../components/layout/BookingHeader.jsx'
import ProgressSteps from '../../components/ui/ProgressSteps.jsx'
import FormField from '../../components/ui/FormField.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useBooking } from '../../context/BookingContext.jsx'
import { validateDateLocationForm, isValid, getBookingDateBounds } from '../../utils/validation.js'

const TIME_SLOTS = [
  { value: '09:00 AM', icon: 'partly_cloudy_day', available: true },
  { value: '10:30 AM', icon: 'partly_cloudy_day', available: false },
  { value: '01:00 PM', icon: 'sunny', available: true },
  { value: '03:30 PM', icon: 'sunny', available: true },
]

function formatDateLabel(isoDate) {
  if (!isoDate) return null
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function DateLocation() {
  const { booking, hasService, hasPetAndCustomer, setLocation, setSchedule } = useBooking()
  const navigate = useNavigate()

  const [location, setLocationLocal] = useState(booking.location)
  const [isoDate, setIsoDate] = useState(booking.schedule.isoDate || '')
  const [time, setTime] = useState(booking.schedule.time)
  const [errors, setErrors] = useState({})

  // Recomputed on every mount so "today" stays accurate for long-lived sessions.
  const { min: minDate, max: maxDate } = getBookingDateBounds()

  useEffect(() => {
    if (!hasService) navigate('/booking/service', { replace: true })
    else if (!hasPetAndCustomer) navigate('/booking/pet-info', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasService, hasPetAndCustomer])

  const updateLocation = (field) => (e) => setLocationLocal((l) => ({ ...l, [field]: e.target.value }))

  const handleContinue = () => {
    const validationErrors = validateDateLocationForm({ location, schedule: { isoDate, time } })
    setErrors(validationErrors)
    if (!isValid(validationErrors)) return

    setLocation(location)
    setSchedule({ date: formatDateLabel(isoDate), isoDate, time })
    navigate('/booking/review')
  }

  if (!hasService || !hasPetAndCustomer) return null

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <BookingHeader showBack />
      <main className="flex-grow w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <ProgressSteps currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <section className="lg:col-span-7 space-y-lg">
            <div>
              <h1 className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-xs">Where are we going?</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Indicate where and when we will visit {booking.pet.name || 'your pet'}.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-md rounded-xl ambient-shadow space-y-4">
              <FormField
                label="Full Street Address"
                name="address"
                required
                icon="location_on"
                placeholder="123 Main St, Richmond, VA"
                value={location.address}
                onChange={updateLocation('address')}
                error={errors.address}
              />
              <div className="grid grid-cols-2 gap-gutter">
                <FormField label="Apt / Suite (Optional)" name="apt" placeholder="Apt 4B" value={location.apt} onChange={updateLocation('apt')} />
                <FormField
                  label="ZIP Code"
                  name="zip"
                  required
                  placeholder="23219"
                  value={location.zip}
                  onChange={updateLocation('zip')}
                  error={errors.zip}
                />
              </div>
            </div>

            <div className="space-y-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Select Date</h2>
              <FormField
                label="Appointment date"
                name="date"
                type="date"
                required
                min={minDate}
                max={maxDate}
                value={isoDate}
                onChange={(e) => setIsoDate(e.target.value)}
                error={errors.date}
              />
            </div>

            <div className="space-y-md">
              <h2 className="font-headline-sm text-headline-sm text-on-surface" id="timeSlots-label">
                Available Times
              </h2>
              <div
                role="radiogroup"
                aria-labelledby="timeSlots-label"
                aria-required="true"
                aria-invalid={errors.time ? 'true' : undefined}
                aria-describedby={errors.time ? 'timeSlots-error' : undefined}
                className="grid grid-cols-2 gap-sm"
              >
                {TIME_SLOTS.map((slot) => {
                  const selected = time === slot.value
                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-disabled={!slot.available || undefined}
                      key={slot.value}
                      disabled={!slot.available}
                      onClick={() => setTime(slot.value)}
                      className={`py-3 px-4 rounded-lg font-body-md text-body-md flex items-center justify-center gap-2 transition-colors ${
                        !slot.available
                          ? 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant opacity-50 cursor-not-allowed line-through'
                          : selected
                          ? 'border-2 border-primary bg-primary-container text-on-primary-container font-bold'
                          : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface hover:border-primary'
                      }`}
                    >
                      <Icon name={slot.icon} className="text-[20px]" />
                      {slot.value}
                      {!slot.available && <span className="sr-only"> (unavailable)</span>}
                    </button>
                  )
                })}
              </div>
              {errors.time && (
                <p id="timeSlots-error" role="alert" className="font-body-sm text-body-sm text-error">
                  {errors.time}
                </p>
              )}
            </div>
          </section>

          <aside className="lg:col-span-5">
            <div className="bg-surface-container-highest rounded-2xl p-lg lg:sticky lg:top-32 flex flex-col gap-md">
              <h2 className="font-headline-sm text-headline-sm text-on-background border-b border-outline-variant pb-4">Booking Summary</h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-background">
                    {booking.service?.name ?? 'No service selected'}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    For {booking.pet.name || '—'} {booking.pet.breed ? `(${booking.pet.breed})` : ''}
                  </p>
                </div>
                <span className="font-body-md text-body-md font-bold text-on-background">{booking.service?.priceLabel ?? '—'}</span>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
                  <Icon name="person" />
                </div>
                <div>
                  <h3 className="font-body-md text-body-md font-semibold text-on-background">{booking.customer.name || '—'}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{booking.customer.email || '—'}</p>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-4 mt-2 flex justify-between items-center" aria-live="polite">
                <span className="font-body-lg text-body-lg font-semibold text-on-background">Total Estimated Price</span>
                <span className="font-headline-md text-headline-md font-bold text-primary">
                  {booking.service ? `$${booking.service.price}.00 USD` : '—'}
                </span>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-md pt-xl mt-xl border-t border-surface-variant">
          <Button variant="outline" className="w-full md:w-auto" onClick={() => navigate(-1)}>
            <Icon name="arrow_back" />
            Back
          </Button>
          <Button variant="primary" className="w-full md:w-auto" onClick={handleContinue}>
            Review &amp; Confirm
            <Icon name="arrow_forward" />
          </Button>
        </div>
      </main>
    </div>
  )
}
