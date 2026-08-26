import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingHeader from '../../components/layout/BookingHeader.jsx'
import ProgressSteps from '../../components/ui/ProgressSteps.jsx'
import ServiceCard from '../../components/ui/ServiceCard.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { SERVICES } from '../../data/services.js'
import { useBooking } from '../../context/BookingContext.jsx'

export default function SelectService() {
  const { booking, setService } = useBooking()
  const [selectedId, setSelectedId] = useState(booking.service?.id ?? null)
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const selected = SERVICES.find((s) => s.id === selectedId) ?? null

  const handleContinue = () => {
    if (!selected) {
      setShowError(true)
      return
    }
    setService(selected)
    navigate('/booking/pet-info')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <BookingHeader />
      <main className="flex-grow max-w-max-width mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl">
        <ProgressSteps currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-8 space-y-lg">
            <div className="space-y-sm">
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md text-primary">
                Select Service
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Choose the perfect spa package for your companion's needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {SERVICES.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selectable
                  selected={selectedId === service.id}
                  onSelect={() => {
                    setSelectedId(service.id)
                    setShowError(false)
                  }}
                />
              ))}
            </div>
            {showError && (
              <p className="font-body-sm text-body-sm text-error flex items-center gap-1">
                <Icon name="error" className="text-[18px]" /> Please select a service to continue.
              </p>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-surface-container-low rounded-xl ambient-shadow p-md lg:sticky lg:top-32">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md">Booking Summary</h2>
              <div className="space-y-sm mb-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">Service</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {selected ? selected.name : 'None selected yet'}
                    </p>
                  </div>
                  <p className="font-body-md text-body-md text-primary font-semibold">
                    {selected ? selected.priceLabel : '—'}
                  </p>
                </div>
                <div className="h-px bg-surface-variant w-full my-sm" />
                <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-xs">
                  <Icon name="info" className="text-[18px]" />
                  Final price depends on pet size and coat condition.
                </p>
              </div>
              <Button variant="primary" className="w-full rounded-lg py-4" onClick={handleContinue}>
                Continue to Pet &amp; Customer Info
                <Icon name="arrow_forward" className="text-[20px]" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
