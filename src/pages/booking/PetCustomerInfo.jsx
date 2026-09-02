import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingHeader from '../../components/layout/BookingHeader.jsx'
import ProgressSteps from '../../components/ui/ProgressSteps.jsx'
import FormField from '../../components/ui/FormField.jsx'
import SizeChipGroup from '../../components/ui/SizeChipGroup.jsx'
import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { useBooking } from '../../context/BookingContext.jsx'
import { validatePetCustomerForm, isValid, PHONE_MAX_LENGTH } from '../../utils/validation.js'

const TEMPERAMENT_OPTIONS = [
  { value: 'calm', label: 'Calm / Docile' },
  { value: 'nervous', label: 'Nervous / Anxious' },
  { value: 'active', label: 'Very Active / Playful' },
  { value: 'reactive', label: 'Reactive / Cautious' },
]

export default function PetCustomerInfo() {
  const { booking, hasService, setPet, setCustomer } = useBooking()
  const navigate = useNavigate()

  const [pet, setPetLocal] = useState(booking.pet)
  const [customer, setCustomerLocal] = useState(booking.customer)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!hasService) navigate('/booking/service', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasService])

  const updatePet = (field) => (e) => setPetLocal((p) => ({ ...p, [field]: e.target.value }))
  const updateCustomer = (field) => (e) => setCustomerLocal((c) => ({ ...c, [field]: e.target.value }))

  const handleContinue = () => {
    const validationErrors = validatePetCustomerForm({ pet, customer })
    setErrors(validationErrors)
    if (!isValid(validationErrors)) return

    setPet(pet)
    setCustomer(customer)
    navigate('/booking/schedule')
  }

  if (!hasService) return null

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <BookingHeader showBack />
      <main className="flex-grow w-full max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <ProgressSteps currentStep={2} />

        <form
          noValidate
          className="space-y-xl bg-surface-container-lowest ambient-shadow rounded-xl p-md md:p-lg border border-surface-variant"
          onSubmit={(e) => {
            e.preventDefault()
            handleContinue()
          }}
        >
          <section className="space-y-md">
            <div className="flex items-center gap-sm border-b border-surface-variant pb-xs">
              <Icon name="pets" filled className="text-primary text-[28px]" />
              <h2 className="font-headline-md text-headline-md text-primary">Pet Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <FormField
                label="Pet Name"
                name="petName"
                required
                placeholder="e.g. Max"
                value={pet.name}
                onChange={updatePet('name')}
                error={errors.petName}
              />
              <FormField label="Breed" name="petBreed" placeholder="e.g. Golden Retriever" value={pet.breed} onChange={updatePet('breed')} />
              <FormField label="Age (Years)" name="petAge" type="number" placeholder="e.g. 3" value={pet.age} onChange={updatePet('age')} />
              <FormField
                label="Temperament"
                name="petTemperament"
                type="select"
                placeholder="Select temperament"
                options={TEMPERAMENT_OPTIONS}
                value={pet.temperament}
                onChange={updatePet('temperament')}
              />
              <div className="md:col-span-2">
                <SizeChipGroup value={pet.size} onChange={(size) => setPetLocal((p) => ({ ...p, size }))} error={errors.petSize} />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Allergies / Special Needs (Optional)"
                  name="petNotes"
                  type="textarea"
                  placeholder="Indicate any skin conditions, product allergies, or sensitive areas..."
                  value={pet.notes}
                  onChange={updatePet('notes')}
                />
              </div>
            </div>
          </section>

          <section className="space-y-md">
            <div className="flex items-center gap-sm border-b border-surface-variant pb-xs">
              <Icon name="person" filled className="text-primary text-[28px]" />
              <h2 className="font-headline-md text-headline-md text-primary">Customer Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="md:col-span-2">
                <FormField
                  label="Full Name"
                  name="ownerName"
                  required
                  placeholder="Your first and last name"
                  value={customer.name}
                  onChange={updateCustomer('name')}
                  error={errors.customerName}
                />
              </div>
              <FormField
                label="Phone"
                name="ownerPhone"
                type="tel"
                inputMode="tel"
                maxLength={PHONE_MAX_LENGTH}
                required
                icon="call"
                placeholder="+1 123 456 7890"
                value={customer.phone}
                onChange={updateCustomer('phone')}
                error={errors.customerPhone}
              />
              <FormField
                label="Email"
                name="ownerEmail"
                type="email"
                required
                icon="mail"
                placeholder="email@example.com"
                value={customer.email}
                onChange={updateCustomer('email')}
                error={errors.customerEmail}
              />
            </div>
          </section>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-md pt-lg border-t border-surface-variant">
            <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => navigate(-1)}>
              <Icon name="arrow_back" />
              Back
            </Button>
            <Button type="submit" variant="primary" className="w-full md:w-auto">
              Next: Date &amp; Location
              <Icon name="arrow_forward" />
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
