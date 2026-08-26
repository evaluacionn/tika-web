/**
 * Canonical service catalog for the prototype.
 * These are temporary placeholder values (per Phase 1 direction) and will be
 * replaced with real pricing/durations in a later phase. Every page that
 * references services (Home, Services, Booking Step 1) must import from here
 * instead of hardcoding values, so the catalog only ever needs to change in
 * one place.
 */
export const SERVICES = [
  {
    id: 'essential-bath',
    name: 'Essential Bath',
    tagline: 'A refreshing cleanse to maintain hygiene and a healthy coat.',
    price: 50,
    priceLabel: 'Starting at $50',
    duration: 'Approx. 1 hour',
    durationShort: '1h',
    badge: null,
    features: [
      'Hypoallergenic shampoo bath',
      'Blow dry and brushing',
      'Ear and tear-stain cleaning',
      'Nail trimming',
    ],
  },
  {
    id: 'full-grooming',
    name: 'Full Grooming',
    tagline: 'Complete styling and pampering for a flawless look.',
    price: 85,
    priceLabel: 'Starting at $85',
    duration: 'Approx. 1.5-2 hours',
    durationShort: '1.5 - 2h',
    badge: 'Most Popular',
    features: [
      'Everything in Essential Bath',
      'Breed-specific or custom haircut',
      'Deep deshedding (if applicable)',
      'Sanitary trim and paw pad shaving',
    ],
  },
  {
    id: 'vip-treatment',
    name: 'VIP Treatment',
    tagline: 'The ultimate luxury spa experience with premium products.',
    price: 130,
    priceLabel: 'Starting at $130',
    duration: 'Approx. 2.5 hours',
    durationShort: '2.5h',
    badge: 'Luxury',
    features: [
      'Everything in Full Grooming',
      'Blueberry facial scrub',
      'Relaxing massage and paw balm',
      'Basic cosmetic teeth cleaning',
    ],
  },
]

export function getServiceById(id) {
  return SERVICES.find((s) => s.id === id) || null
}
