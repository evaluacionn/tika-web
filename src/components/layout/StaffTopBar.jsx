import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'

/**
 * Staff-area header. Deliberately does NOT reuse the public TopNavBar —
 * the original staff_dashboard_tika export incorrectly carried the public
 * marketing nav ("Servicios", "Agendar Cita") into the internal tool. This
 * is a plain internal-tool header instead.
 */
export default function StaffTopBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-base h-20">
        <div className="flex items-center gap-sm">
          <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary">TIKA</span>
          <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider border-l border-outline-variant pl-sm ml-1">
            Staff Portal
          </span>
        </div>
        <Link to="/" className="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-body-sm text-body-sm">
          <Icon name="logout" className="text-[20px]" />
          <span className="hidden sm:inline">Exit to public site</span>
        </Link>
      </div>
    </header>
  )
}
