import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingHeader from '../../components/layout/BookingHeader.jsx'
import ProgressSteps from '../../components/ui/ProgressSteps.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useBooking } from '../../context/BookingContext.jsx'

function SummaryCard({ icon, title, editTo, children }) {
  const navigate = useNavigate()
  return (
    <div className="bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant/30 flex flex-col h-full">
      <div className="flex justify-between items-start mb-sm">
        <div className="flex items-center gap-sm text-primary">
          <Icon name={icon} filled />
          <h2 className="font-headline-sm text-headline-sm">{title}</h2>
        </div>
        <button
          type="button"
          aria-label={`Edit ${title}`}
          className="text-secondary hover:text-secondary-container transition-colors p-xs"
          onClick={() => navigate(editTo)}
        >
          <Icon name="edit" className="text-[20px]" />
        </button>
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  )
}

export default function ReviewConfirm() {
  const { booking, hasService, hasPetAndCustomer, hasSchedule, confirmBooking } = useBooking()
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasService) navigate('/booking/service', { replace: true })
    else if (!hasPetAndCustomer) navigate('/booking/pet-info', { replace: true })
    else if (!hasSchedule) navigate('/booking/schedule', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasService, hasPetAndCustomer, hasSchedule])

  if (!hasService || !hasPetAndCustomer || !hasSchedule) return null

  const { service, pet, customer, location, schedule } = booking

  const handleConfirm = () => {
    confirmBooking()
    navigate('/booking/confirmation')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <BookingHeader showBack />
      <main className="flex-grow flex items-start justify-center py-lg px-margin-mobile md:px-margin-desktop">
        <div className="w-full max-w-3xl">
          <div className="mb-lg">
            <h1 className="font-headline-md text-headline-md md:font-display-lg md:text-display-lg text-primary mb-md">Review &amp; Confirm</h1>
            <ProgressSteps currentStep={4} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-lg">
            <SummaryCard icon="cut" title="Service" editTo="/booking/service">
              <p className="font-body-lg text-body-lg font-semibold text-on-surface">{service.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">{service.tagline}</p>
              <p className="font-body-md text-body-md text-primary font-semibold mt-sm">{service.priceLabel}</p>
            </SummaryCard>

            <SummaryCard icon="calendar_month" title="Appointment" editTo="/booking/schedule">
              <p className="font-body-lg text-body-lg font-semibold text-on-surface">{schedule.date}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">{schedule.time} &middot; {service.duration}</p>
            </SummaryCard>

            <SummaryCard icon="pets" title="Pet" editTo="/booking/pet-info">
              <p className="font-body-lg text-body-lg font-semibold text-on-surface">{pet.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                {[pet.breed, pet.size].filter(Boolean).join(' · ') || 'No additional details'}
              </p>
              {pet.notes && <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Notes: {pet.notes}</p>}
            </SummaryCard>

            <SummaryCard icon="location_on" title="Customer & Location" editTo="/booking/pet-info">
              <p className="font-body-sm text-body-sm text-on-surface-variant">Customer</p>
              <p className="font-body-md text-body-md text-on-surface">{customer.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-sm">{customer.email} &middot; {customer.phone}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Address</p>
              <p className="font-body-md text-body-md text-on-surface">
                {location.address}
                {location.apt ? `, ${location.apt}` : ''}, VA {location.zip}
              </p>
            </SummaryCard>
          </div>

          <div className="bg-surface-container rounded-xl p-md mb-xl flex justify-between items-center shadow-sm">
            <span className="font-headline-md text-headline-md text-on-surface">Total Due</span>
            <span className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary">
              ${service.price}.00 USD
            </span>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-gutter justify-end">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm Appointment
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
