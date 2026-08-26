import { useState } from 'react'
import StaffTopBar from '../../components/layout/StaffTopBar.jsx'
import Icon from '../../components/ui/Icon.jsx'
import { IMAGES } from '../../data/images.js'

/**
 * Mock data only, per Phase 1 scope — no backend, no persistence.
 * This is an interactive visual prototype of the internal staff tool,
 * built from the single staff_dashboard_tika Stitch export.
 */
const APPOINTMENTS = [
  {
    id: 1,
    time: '09:00 AM',
    status: 'in_progress',
    pet: { name: 'Bella', breed: 'Golden Retriever', size: 'Large (65 lbs)', gender: 'Female', photo: IMAGES.petLuna },
    customer: { name: 'Eleanor Vance', phone: '+1 (555) 123-4567' },
    service: 'VIP Treatment',
    address: '123 Wellness Blvd, Suite 4A',
    city: 'Richmond, VA 23219',
    allergies: 'Sensitive skin. Use hypoallergenic oatmeal shampoo only. No lavender scent.',
    temperament: 'Very sweet but gets anxious during nail clipping. Requires gentle handling and treats for distraction.',
  },
  {
    id: 2,
    time: '11:30 AM',
    status: 'confirmed',
    pet: { name: 'Snowball', breed: 'Bichon Frise', size: 'Small (12 lbs)', gender: 'Male', photo: null },
    customer: { name: 'Mark Theroux', phone: '+1 (555) 987-6543' },
    service: 'Essential Bath',
    address: '48 Dogwood Lane',
    city: 'Alexandria, VA 22301',
    allergies: 'None reported.',
    temperament: 'Friendly and calm, no special handling needed.',
  },
  {
    id: 3,
    time: '02:00 PM',
    status: 'on_the_way',
    pet: { name: 'Max', breed: 'German Shepherd', size: 'Large (80 lbs)', gender: 'Male', photo: null },
    customer: { name: 'Sarah Jenkins', phone: '+1 (555) 456-7890' },
    service: 'Full Grooming',
    address: '910 Wellness Way',
    city: 'Arlington, VA 22201',
    allergies: 'None reported.',
    temperament: 'High energy, protective. Owner present recommended during arrival.',
  },
]

const STATUS_META = {
  in_progress: { label: 'In Progress', icon: 'sync', className: 'bg-tertiary-container text-on-tertiary-container' },
  confirmed: { label: 'Confirmed', icon: 'check_circle', className: 'bg-primary-container text-on-primary-container' },
  on_the_way: { label: 'On the way', icon: 'local_shipping', className: 'bg-secondary-container text-on-secondary-container' },
  completed: { label: 'Completed', icon: 'task_alt', className: 'bg-surface-variant text-on-surface-variant' },
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status]
  return (
    <span className={`font-label-bold text-label-bold px-sm py-xs rounded-full flex items-center gap-xs ${meta.className}`}>
      <Icon name={meta.icon} className="text-[14px]" />
      {meta.label}
    </span>
  )
}

export default function StaffDashboard() {
  const [selectedId, setSelectedId] = useState(APPOINTMENTS[0].id)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'detail'
  const [statusOverride, setStatusOverride] = useState({})

  const selected = APPOINTMENTS.find((a) => a.id === selectedId)
  const selectedStatus = statusOverride[selected.id] ?? selected.status

  const handleSelect = (id) => {
    setSelectedId(id)
    setMobileView('detail')
  }

  const handleCompleteService = () => {
    setStatusOverride((prev) => ({ ...prev, [selected.id]: 'completed' }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <StaffTopBar />
      <div className="max-w-[1400px] w-full mx-auto pt-24 flex-1 flex gap-gutter px-margin-mobile md:px-margin-desktop pb-xl">
        <main className="flex-1 flex flex-col lg:flex-row gap-gutter w-full">
          {/* Appointment list */}
          <section className={`flex-1 min-w-0 lg:min-w-[350px] ${mobileView === 'detail' ? 'hidden lg:block' : 'block'}`}>
            <header className="mb-md flex justify-between items-end border-b border-surface-variant pb-sm">
              <h1 className="font-headline-md text-headline-md text-primary">Today&apos;s Appointments</h1>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Prototype data</span>
            </header>
            <div className="flex flex-col gap-base">
              {APPOINTMENTS.map((appt) => {
                const status = statusOverride[appt.id] ?? appt.status
                const isSelected = appt.id === selectedId
                return (
                  <button
                    type="button"
                    key={appt.id}
                    onClick={() => handleSelect(appt.id)}
                    className={`text-left bg-surface-container-lowest rounded-xl shadow-soft p-md transition-all relative overflow-hidden border ${
                      isSelected ? 'border-primary' : 'border-transparent hover:border-surface-variant'
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                    <div className="flex justify-between items-start mb-sm">
                      <span className="font-headline-sm text-headline-sm text-on-surface">{appt.time}</span>
                      <StatusBadge status={status} />
                    </div>
                    <div className="flex items-center gap-md mb-sm">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-surface-variant bg-surface-variant flex items-center justify-center flex-shrink-0">
                        {appt.pet.photo ? (
                          <img className="w-full h-full object-cover" src={appt.pet.photo} alt={appt.pet.name} />
                        ) : (
                          <Icon name="pets" className="text-outline" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{appt.pet.name}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {appt.pet.breed} &middot; {appt.pet.size.split(' ')[0]}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-sm pt-sm border-t border-surface-variant">
                      <div>
                        <p className="font-label-bold text-label-bold text-on-surface-variant mb-xs">CUSTOMER</p>
                        <p className="font-body-md text-body-md text-on-surface">{appt.customer.name}</p>
                      </div>
                      <div>
                        <p className="font-label-bold text-label-bold text-on-surface-variant mb-xs">SERVICE</p>
                        <p className="font-body-md text-body-md text-on-surface truncate">{appt.service}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Detail panel */}
          <section className={`flex-1 lg:max-w-[450px] ${mobileView === 'list' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-surface-container-lowest rounded-xl shadow-soft p-md lg:sticky lg:top-28 flex flex-col gap-md">
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className="lg:hidden flex items-center gap-xs text-on-surface-variant font-label-bold text-label-bold mb-xs"
              >
                <Icon name="arrow_back" className="text-[18px]" /> Back to list
              </button>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-md">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm bg-surface-variant flex items-center justify-center flex-shrink-0">
                    {selected.pet.photo ? (
                      <img className="w-full h-full object-cover" src={selected.pet.photo} alt={selected.pet.name} />
                    ) : (
                      <Icon name="pets" className="text-outline text-[32px]" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-xs">{selected.pet.name}</h2>
                    <StatusBadge status={selectedStatus} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div className="col-span-2 bg-surface-container p-sm rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-label-bold text-label-bold text-primary mb-xs">SCHEDULED FOR</p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{selected.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-bold text-label-bold text-primary mb-xs">SERVICE</p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{selected.service}</p>
                  </div>
                </div>

                <div className="col-span-2 bg-surface p-sm rounded-lg border border-surface-variant flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm">
                      {selected.customer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-body-md text-body-md font-bold text-on-surface">{selected.customer.name}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{selected.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-xs">
                    <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors">
                      <Icon name="call" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors">
                      <Icon name="chat" />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 bg-surface p-sm rounded-lg border border-surface-variant">
                  <div className="flex items-start gap-sm">
                    <Icon name="location_on" className="text-outline mt-xs" />
                    <div>
                      <p className="font-body-md text-body-md text-on-surface">{selected.address}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{selected.city}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 mt-sm">
                  <h3 className="font-headline-sm text-headline-sm text-primary border-b border-surface-variant pb-xs mb-sm">
                    Pet Profile &amp; Notes
                  </h3>
                  <div className="flex flex-wrap gap-xs mb-sm">
                    <span className="bg-surface-variant text-on-surface-variant font-label-bold text-label-bold px-sm py-xs rounded-md">
                      {selected.pet.breed}
                    </span>
                    <span className="bg-surface-variant text-on-surface-variant font-label-bold text-label-bold px-sm py-xs rounded-md">
                      {selected.pet.size}
                    </span>
                    <span className="bg-surface-variant text-on-surface-variant font-label-bold text-label-bold px-sm py-xs rounded-md">
                      {selected.pet.gender}
                    </span>
                  </div>
                  <div className="bg-error-container/30 border border-error-container rounded-lg p-sm mb-sm flex items-start gap-sm">
                    <Icon name="warning" className="text-error" />
                    <div>
                      <p className="font-label-bold text-label-bold text-error mb-xs">ALLERGIES</p>
                      <p className="font-body-sm text-body-sm text-on-surface">{selected.allergies}</p>
                    </div>
                  </div>
                  <div className="bg-surface p-sm rounded-lg border border-surface-variant flex items-start gap-sm">
                    <Icon name="psychology" className="text-secondary" />
                    <div>
                      <p className="font-label-bold text-label-bold text-secondary mb-xs">TEMPERAMENT</p>
                      <p className="font-body-sm text-body-sm text-on-surface">{selected.temperament}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-md flex gap-sm">
                <button className="flex-1 bg-surface-container-high text-primary font-body-md text-body-md py-sm rounded-lg hover:bg-surface-variant transition-colors">
                  Reschedule
                </button>
                <button
                  onClick={handleCompleteService}
                  disabled={selectedStatus === 'completed'}
                  className="flex-1 bg-primary text-on-primary font-body-md text-body-md py-sm rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm disabled:opacity-50"
                >
                  {selectedStatus === 'completed' ? 'Completed' : 'Complete Service'}
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
