import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="hidden md:block w-full mt-xl bg-surface-container-highest">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary block mb-sm">
            TIKA
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mb-sm">
            Premium Canine Wellness. We bring the spa to your doorstep, serving Virginia.
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">hello@tikawellness.com</p>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-primary mb-sm">Legal</h4>
          <ul className="space-y-xs">
            <li>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-primary mb-sm">Connect</h4>
          <ul className="space-y-xs">
            <li>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                Contact
              </a>
            </li>
            <li>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                Instagram
              </a>
            </li>
            <li>
              <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200" href="#">
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-4 mt-lg pt-md border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 TIKA Premium Canine Wellness. All rights reserved.</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">(555) 123-4567 &middot; Serving Virginia, USA</p>
        </div>
      </div>
    </footer>
  )
}
