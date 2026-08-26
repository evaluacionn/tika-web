import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'

const NAV_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About Us' },
  { to: '/faq', label: 'FAQ' },
]

const MOBILE_TABS = [
  { to: '/', label: 'Home', icon: 'home', end: true },
  { to: '/services', label: 'Services', icon: 'pets' },
  { to: '/faq', label: 'FAQ', icon: 'help' },
  { to: '/booking/service', label: 'Book', icon: 'calendar_month' },
]

export default function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop / tablet top bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-base h-20">
          <Link to="/" className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary">
            TIKA
          </Link>

          <nav className="hidden md:flex space-x-md items-center">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-body-md text-body-md transition-colors duration-300 ${
                    isActive ? 'text-secondary font-bold border-b-2 border-secondary pb-1' : 'text-on-surface-variant hover:text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Button as={Link} to="/booking/service" variant="primary" className="hidden md:inline-flex py-3">
            Book an Appointment
          </Button>

          <button
            aria-label="Toggle menu"
            className="md:hidden text-primary"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="text-[32px]" />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-md flex flex-col gap-sm">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-body-md text-body-md py-2 ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 shadow-lg bg-surface/95 backdrop-blur-lg z-50">
        {MOBILE_TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all ${
                isActive ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={tab.icon} filled={isActive} />
                <span className="font-label-bold text-label-bold mt-1">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
