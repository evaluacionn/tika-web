import FAQAccordion from '../../components/ui/FAQAccordion.jsx'

// Merged from the two divergent FAQ sets found in the Stitch exports
// (services_process_tika_english + about_faq_tika_english), de-duplicated.
const FAQ_ITEMS = [
  {
    q: 'Do you need water or electricity connections at my house?',
    a: 'No, our grooming vans are fully equipped and self-sufficient. They feature their own quiet power generator, temperature-controlled fresh water tank, and gray water collection system. We only need a safe place to park in front of your home.',
  },
  {
    q: 'What if my dog is aggressive or very nervous?',
    a: 'Our team is trained in canine behavioral management. If your dog is nervous, we take breaks and use relaxation techniques. In cases of mild aggression, we evaluate the situation prioritizing the safety of the dog and the groomer. We reserve the right to not complete the service if the stress level is detrimental to the animal.',
  },
  {
    q: 'Do I need to be home during the service?',
    a: 'Yes, we require a responsible adult present at the beginning to hand over the pet and at the end to receive them. During the grooming process inside our mobile unit, we prefer the owner not be present, so we can maintain a calm, controlled, and safe environment.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'For your convenience, we accept multiple payment methods: major credit/debit cards (Visa, Mastercard, Amex) via our mobile terminal, direct bank transfers, and cash. All prices are in USD. Payment is made upon satisfactory completion of the service.',
  },
  {
    q: 'Do you groom dogs of all sizes?',
    a: 'Our mobile facilities comfortably accommodate everything from miniature breeds up to large dogs around 75 lbs. For giant breeds, we evaluate viability on a case-by-case basis to ensure the animal’s well-being and the groomer’s ergonomics. Please specify your pet’s approximate weight when booking.',
  },
  {
    q: 'What is the coverage area of the mobile service?',
    a: 'We currently cover major metropolitan areas and select residential zones across Virginia. When you enter your address during booking, we will confirm whether you fall within our service area. An additional travel fee may apply for extended zones.',
  },
]

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <div className="text-center mb-lg">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">
          Frequently Asked Questions
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">We resolve your questions about our premium service.</p>
      </div>
      <FAQAccordion items={FAQ_ITEMS} />
    </section>
  )
}
