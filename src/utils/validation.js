/**
 * Small dependency-free frontend validation helpers for the booking forms.
 * Each validate* function returns an { fieldName: 'error message' } object —
 * empty object means the step is valid.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Accepts formats like +1 123 456 7890, (123) 456-7890, 123-456-7890, etc.
const PHONE_RE = /^[\d\s()+-]{7,20}$/

export function validatePetCustomerForm({ pet, customer }) {
  const errors = {}

  if (!pet.name?.trim()) errors.petName = 'Pet name is required.'
  if (!pet.size) errors.petSize = 'Please select a size.'

  if (!customer.name?.trim()) errors.customerName = 'Full name is required.'

  if (!customer.phone?.trim()) {
    errors.customerPhone = 'Phone number is required.'
  } else if (!PHONE_RE.test(customer.phone.trim())) {
    errors.customerPhone = 'Enter a valid phone number.'
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

  if (!schedule.date) errors.date = 'Please select a date.'
  if (!schedule.time) errors.time = 'Please select a time slot.'

  return errors
}

export const isValid = (errors) => Object.keys(errors).length === 0
