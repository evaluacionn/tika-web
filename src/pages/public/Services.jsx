import { Link, useNavigate } from 'react-router-dom'
import ServiceCard from '../../components/ui/ServiceCard.jsx'
import { SERVICES } from '../../data/services.js'
import { useBooking } from '../../context/BookingContext.jsx'

export default function Services() {
  const { setService } = useBooking()
  const navigate = useNavigate()

  const handleBook = (service) => {
    setService(service)
    navigate('/booking/service')
  }

  return (
    <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
      <div className="text-center mb-lg">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">
          Our Premium Services
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Mobile spa experiences designed for the well-being and peace of mind of your pet, right at your doorstep.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} ctaLabel="Book This Service" onCtaClick={() => handleBook(service)} />
        ))}
      </div>
      <div className="text-center mt-lg">
        <Link to="/how-it-works" className="font-label-bold text-label-bold text-secondary hover:underline">
          Curious how a visit works? See the full process &rarr;
        </Link>
      </div>
    </section>
  )
}
