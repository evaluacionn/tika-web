import { useState } from 'react'
import Icon from './Icon.jsx'

/**
 * Shared FAQ accordion. Replaces the two divergent, hand-rolled
 * implementations found in services_process_tika_english and
 * about_faq_tika_english.
 */
export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.q}
            className="bg-surface-container-lowest rounded-lg border border-outline-variant overflow-hidden"
          >
            <button
              type="button"
              className="w-full text-left px-md py-md flex justify-between items-center gap-md focus:outline-none hover:bg-surface-container-low transition-colors duration-200"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-headline-sm text-headline-sm text-on-surface">{item.q}</span>
              <Icon
                name="expand_more"
                className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-md pb-md">
                <p className="font-body-md text-body-md text-on-surface-variant">{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
