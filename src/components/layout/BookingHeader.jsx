import { Link, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'

/**
 * Simplified header used across the whole booking flow, matching the
 * "TopNavBar Omitted: Linear/Transactional Intent" pattern documented in
 * several Stitch exports — the marketing nav is deliberately hidden so the
 * user stays focused on completing the booking.
 */
export default function BookingHeader({ showBack = false }) {
  const navigate = useNavigate()

  return (
    <header className="w-full sticky top-0 backdrop-blur-md bg-surface/80 border-b border-outline-variant/30 z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto">
        {showBack ? (
          <button
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-surface-container-high"
          >
            <Icon name="arrow_back" />
          </button>
        ) : (
          <span className="w-10" />
        )}
        <div className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight font-bold">TIKA</div>
        <Link
          to="/"
          aria-label="Cancel booking"
          className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high"
        >
          <Icon name="close" />
        </Link>
      </div>
    </header>
  )
}
