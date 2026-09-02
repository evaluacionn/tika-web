/**
 * Small dependency-free frontend validation helpers for the booking forms.
 * Each validate* function returns an { fieldName: 'error message' } object —
 * empty object means the step is valid.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Only digits plus common formatting characters are allowed at all
// (this alone rejects letters, e.g. "abc").
const PHONE_ALLOWED_CHARS_RE = /^[\d\s()+.-]+$/
// Reasonable US/Virginia prototype rule: a 10-digit US number, optionally
// prefixed with the "+1" / "1" country code.
export const PHONE_MAX_LENGTH = 20

export function isValidUSPhone(rawPhone) {
  const phone = (rawPhone ?? '').trim()
  if (!phone) return false
  if (!PHONE_ALLOWED_CHARS_RE.test(phone)) return false

  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return true
  if (digits.length === 11 && digits.startsWith('1')) return true
  return false
}

/**
 * Dynamic min/max bounds for the booking date picker: no dates before
 * today, and no more than `windowDays` days in the future.
 */
export function getBookingDateBounds(referenceDate = new Date(), windowDays = 90) {
  const toISODate = (d) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const min = toISODate(referenceDate)
  const maxDate = new Date(referenceDate)
  maxDate.setDate(maxDate.getDate() + windowDays)
  const max = toISODate(maxDate)

  return { min, max }
}

export function validatePetCustomerForm({ pet, customer }) {
  const errors = {}

  if (!pet.name?.trim()) errors.petName = 'Pet name is required.'
  if (!pet.size) errors.petSize = 'Please select a size.'

  if (!customer.name?.trim()) errors.customerName = 'Full name is required.'

  if (!customer.phone?.trim()) {
    errors.customerPhone = 'Phone number is required.'
  } else if (!isValidUSPhone(customer.phone)) {
    errors.customerPhone = 'Enter a valid 10-digit US phone number, e.g. (555) 123-4567.'
  }

  if (!customer.email?.trim()) {
    errors.customerEmail = 'Email is required.'
  } else if (!EMAIL_RE.test(customer.email.trim())) {
    errors.customerEmail = 'Enter a valid email address.'
  }

  return errors
}

export function validateDateLocationForm({ location, schedule }) {
  const errors = {}

  if (!location.address?.trim()) errors.address = 'Street address is required.'
  if (!location.zip?.trim()) {
    errors.zip = 'ZIP code is required.'
  } else if (!/^\d{5}(-\d{4})?$/.test(location.zip.trim())) {
    errors.zip = 'Enter a valid ZIP code.'
  }

  if (!schedule.isoDate) {
    errors.date = 'Please select a date.'
  } else {
    const { min, max } = getBookingDateBounds()
    if (schedule.isoDate < min) {
      errors.date = 'Please choose a date that is today or later.'
    } else if (schedule.isoDate > max) {
      errors.date = 'Please choose a date within the next 90 days.'
    }
  }

  if (!schedule.time) errors.time = 'Please select a time slot.'

  return errors
}

export const isValid = (errors) => Object.keys(errors).length === 0
