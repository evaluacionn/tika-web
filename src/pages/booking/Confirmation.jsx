import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../components/ui/Icon.jsx'
import Button from '../../components/ui/Button.jsx'
import { useBooking } from '../../context/BookingContext.jsx'

export default function Confirmation() {
  const { booking, resetBooking } = useBooking()
  const navigate = useNavigate()

  useEffect(() => {
    if (!booking.bookingId) navigate('/', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.bookingId])

  if (!booking.bookingId) return null

  const { service, pet, location, schedule, bookingId } = booking

  const handleBackToHome = () => {
    resetBooking()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <main className="flex-grow flex items-center justify-center py-xl px-margin-mobile md:px-margin-desktop">
        <div className="max-w-3xl w-full mx-auto relative">
          <div className="bg-surface-container-lowest/95 rounded-xl p-lg md:p-xl relative overflow-hidden z-10 text-center shadow-soft border border-outline-variant/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-container rounded-full mb-md shadow-sm">
              <Icon name="check_circle" filled className="text-on-primary-container" style={{ fontSize: 40 }} />
            </div>

            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">
              Appointment Confirmed!
            </h1>
            <p className="font-headline-sm text-headline-sm text-on-surface-variant mb-xl">
              {pet.name ? `${pet.name} is in good hands.` : 'Your pet is in good hands.'}
            </p>

            <div className="inline-block bg-surface-container px-md py-sm rounded-full mb-lg border border-outline-variant">
              <span className="font-label-bold text-label-bold text-primary uppercase tracking-wider">Booking ID:</span>
              <span className="font-body-md text-body-md text-on-surface ml-2 font-semibold">#{bookingId}</span>
            </div>

            <div className="bg-surface rounded-lg p-md mb-xl text-left border border-surface-container-high shadow-sm max-w-xl mx-auto">
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-md border-b border-surface-container-highest pb-sm">
                Service Details
              </h2>
              <div className="space-y-sm">
                <div className="flex items-start">
                  <Icon name="spa" className="text-secondary mr-sm mt-xs" />
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface-variant uppercase">Service</p>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{service.name}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="calendar_month" className="text-secondary mr-sm mt-xs" />
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface-variant uppercase">Date</p>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{schedule.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="schedule" className="text-secondary mr-sm mt-xs" />
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface-variant uppercase">Time</p>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{schedule.time}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Icon name="location_on" className="text-secondary mr-sm mt-xs" />
                  <div>
                    <p className="font-label-bold text-label-bold text-on-surface-variant uppercase">Address</p>
                    <p className="font-body-md text-body-md text-on-surface font-medium">
                      {location.address}
                      {location.apt ? `, ${location.apt}` : ''}, VA {location.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-lg p-sm mb-xl inline-flex items-center">
              <Icon name="notifications_active" className="text-primary mr-sm" />
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                You will receive a reminder 24 hours before your appointment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
              <Button variant="outline" onClick={handleBackToHome}>
                Back to Home
              </Button>
              <Button variant="primary" as={Link} to="/faq">
                <Icon name="chat" />
                Contact TIKA
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
