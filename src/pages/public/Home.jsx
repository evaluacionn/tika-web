import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import ServiceCard from '../../components/ui/ServiceCard.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { SERVICES } from '../../data/services.js'
import { IMAGES } from '../../data/images.js'

const BENEFITS = [
  {
    icon: 'home_work',
    title: 'Convenience',
    text: 'We come to you. Save time and eliminate the stress of car rides for your pet.',
  },
  {
    icon: 'health_and_safety',
    title: 'Expert Care',
    text: 'Certified professionals using premium, pet-safe products for optimal wellness.',
  },
  {
    icon: 'self_improvement',
    title: 'Stress-Free',
    text: 'A calm, one-on-one environment ensures a relaxing experience for your companion.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-lg pb-xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-surface-container-high opacity-50 rounded-br-[120px] rounded-bl-[40px]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-0 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
          <div className="space-y-md">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              Professional dog grooming at your doorstep
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Care, love, and cleanliness for your best friend without leaving home. A premium mobile spa experience
              serving Virginia.
            </p>
            <div className="pt-sm flex flex-col sm:flex-row gap-sm">
              <Button as={Link} to="/booking/service" variant="primary" className="w-full sm:w-auto">
                Book an Appointment
              </Button>
              <Button as={Link} to="/services" variant="outline" className="w-full sm:w-auto">
                View Services
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[500px] rounded-tr-[80px] rounded-bl-[80px] overflow-hidden shadow-soft">
            <img className="w-full h-full object-cover" alt="Golden retriever being gently washed by a professional groomer" src={IMAGES.heroBath} />
          </div>
        </div>
      </section>

      {/* Why choose TIKA */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-0 py-lg">
        <h2 className="font-headline-md text-headline-md text-primary text-center mb-md">Why Choose TIKA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-surface-container-lowest p-md rounded-xl ambient-shadow flex flex-col items-center text-center gap-sm">
              <Icon name={b.icon} className="text-secondary text-[40px]" />
              <h3 className="font-headline-sm text-headline-sm text-primary">{b.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-0 py-lg">
        <div className="flex justify-between items-end mb-md">
          <h2 className="font-headline-md text-headline-md text-primary">Our Services</h2>
          <Link to="/services" className="font-label-bold text-label-bold text-secondary hover:underline">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* How it works preview */}
      <section className="bg-surface-container-low rounded-xl p-md md:p-xl mx-margin-mobile md:mx-auto md:max-w-[1200px] flex flex-col gap-lg mb-xl">
        <h2 className="font-headline-md text-headline-md text-primary text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-lg justify-between items-center md:items-start relative">
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-outline-variant/50 z-0" />
          {[
            { n: 1, title: 'Book Online', text: 'Select your service and choose a convenient time.' },
            { n: 2, title: 'We Arrive', text: 'Our fully equipped mobile spa comes right to your door.' },
            { n: 3, title: 'Relax', text: 'Your pet enjoys a premium spa experience, steps from home.' },
          ].map((step) => (
            <div key={step.n} className="flex flex-col items-center text-center gap-sm z-10 w-full md:w-1/3">
              <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-headline-sm shadow-md">
                {step.n}
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/how-it-works" className="font-label-bold text-label-bold text-secondary hover:underline">
            See the full process
          </Link>
        </div>
      </section>
    </>
  )
}
