import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Client-side booking state shared across the 5-step booking flow.
 * No backend in this phase — state lives in memory and is mirrored to
 * sessionStorage so an accidental refresh mid-flow doesn't lose it.
 */
const STORAGE_KEY = 'tika-booking-draft'

const EMPTY_BOOKING = {
  service: null, // { id, name, price, priceLabel, duration }
  pet: { name: '', breed: '', age: '', size: '', temperament: '', notes: '' },
  customer: { name: '', phone: '', email: '' },
  location: { address: '', apt: '', zip: '' },
  schedule: { date: null, time: null }, // date: 'Thu, Oct 22', time: '01:00 PM'
  bookingId: null,
}

function loadInitialState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_BOOKING
    const parsed = JSON.parse(raw)
    return { ...EMPTY_BOOKING, ...parsed }
  } catch {
    return EMPTY_BOOKING
  }
}

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(loadInitialState)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking))
    } catch {
      // sessionStorage unavailable (e.g. private mode) — fail silently, state still works in-memory
    }
  }, [booking])

  const api = useMemo(
    () => ({
      booking,
      setService: (service) => setBooking((b) => ({ ...b, service })),
      setPet: (pet) => setBooking((b) => ({ ...b, pet: { ...b.pet, ...pet } })),
      setCustomer: (customer) => setBooking((b) => ({ ...b, customer: { ...b.customer, ...customer } })),
      setLocation: (location) => setBooking((b) => ({ ...b, location: { ...b.location, ...location } })),
      setSchedule: (schedule) => setBooking((b) => ({ ...b, schedule: { ...b.schedule, ...schedule } })),
      confirmBooking: () => {
        const id = `TK-${Math.floor(10000 + Math.random() * 89999)}`
        setBooking((b) => ({ ...b, bookingId: id }))
        return id
      },
      resetBooking: () => {
        setBooking(EMPTY_BOOKING)
        try {
          sessionStorage.removeItem(STORAGE_KEY)
        } catch {
          /* noop */
        }
      },
      // Step-completion guards, used to keep users from skipping ahead via the URL bar
      hasService: Boolean(booking.service),
      hasPetAndCustomer: Boolean(
        booking.pet.name && booking.pet.size && booking.customer.name && booking.customer.phone && booking.customer.email
      ),
      hasSchedule: Boolean(booking.location.address && booking.schedule.date && booking.schedule.time),
    }),
    [booking]
  )

  return <BookingContext.Provider value={api}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
