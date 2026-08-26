import { Link } from 'react-router-dom'
import Icon from '../../components/ui/Icon.jsx'
import Button from '../../components/ui/Button.jsx'

const STEPS = [
  { n: 1, icon: 'touch_app', title: 'Choose your service', text: "Select the package that best suits your pet's needs." },
  { n: 2, icon: 'calendar_month', title: 'Book date and time', text: 'Pick a convenient time on our online calendar.' },
  { n: 3, icon: 'pets', title: 'Register your dog', text: 'Tell us about their breed, size, and special needs.' },
  { n: 4, icon: 'local_shipping', title: 'We come to your home', text: 'Our fully equipped van will arrive punctually at your door.' },
  { n: 5, icon: 'content_cut', title: 'Grooming session', text: 'Personalized, stress-free care in our climate-controlled van.' },
  { n: 6, icon: 'verified', title: 'Ready to shine!', text: 'Your pet returns happy, clean, and relaxed, right to your living room.' },
]

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
      <div className="text-center mb-lg">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">
          Detailed Process
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          A seamless and stress-free experience, designed for both you and your best friend.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-xl gap-x-gutter relative">
        <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-outline-variant z-0" />
        {STEPS.map((step) => (
          <div key={step.n} className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-md mb-md border-4 border-surface-container-low group-hover:border-primary-fixed transition-colors duration-300">
              <Icon name={step.icon} className="text-primary text-[40px]" />
            </div>
            <h4 className="font-headline-sm text-headline-sm text-primary mb-xs">
              <span className="text-primary font-bold mr-xs">{step.n}.</span>
              {step.title}
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[250px]">{step.text}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-xl">
        <Button as={Link} to="/booking/service" variant="primary">
          Book an Appointment
        </Button>
      </div>
    </section>
  )
}
