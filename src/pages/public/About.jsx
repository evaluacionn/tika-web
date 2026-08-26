import Icon from '../../components/ui/Icon.jsx'
import { IMAGES } from '../../data/images.js'

const VALUES = [
  {
    icon: 'health_and_safety',
    filled: false,
    title: 'Clinical Hygiene',
    text: 'Rigorous sterilization protocols for every tool, ensuring a safe and risk-free environment for your pet.',
    style: 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface',
  },
  {
    icon: 'favorite',
    filled: true,
    title: 'Genuine Love',
    text: 'We treat every dog as if they were our own. Patience and affection are fundamental to our grooming process.',
    style: 'bg-primary-container text-on-primary-container',
  },
  {
    icon: 'spa',
    filled: false,
    title: 'Zen Environment',
    text: 'Our state-of-the-art mobile units are designed to minimize anxiety, using calming aromatherapy and music.',
    style: 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface',
  },
]

export default function About() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
          <div className="space-y-md">
            <span className="text-secondary font-label-bold text-label-bold uppercase tracking-wider">Our Story &amp; Values</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              Premium, stress-free grooming.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              At TIKA, we believe canine hygiene shouldn't be a stressful chore. We were founded on the need to
              provide a service combining clinical cleanliness with the comfort of home. Our certified professionals
              deliver a complete wellness experience, prioritizing trust, personalized care, and ultimate convenience
              for dogs across Virginia.
            </p>
            <div className="flex items-center space-x-sm pt-sm">
              <Icon name="verified" filled className="text-primary" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">Certified Professionals</span>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[480px] rounded-xl overflow-hidden shadow-soft">
            <img className="w-full h-full object-cover" alt="TIKA grooming team with a golden retriever inside a mobile spa van" src={IMAGES.aboutTeam} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {VALUES.map((v) => (
            <div key={v.title} className={`p-md rounded-xl shadow-soft flex flex-col justify-between ${v.style}`}>
              <Icon name={v.icon} filled={v.filled} className="text-[40px] mb-sm" />
              <h3 className="font-headline-sm text-headline-sm mb-xs">{v.title}</h3>
              <p className="font-body-sm text-body-sm opacity-90">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
