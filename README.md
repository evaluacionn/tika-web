# tika-web — Phase 1 Frontend Prototype

A single, responsive React implementation of the TIKA mobile dog grooming site,
built from the Google Stitch exports in the parent folder (kept untouched as
visual references) and the design tokens in `../premium_canine_wellness/DESIGN.md`.

This is a **frontend-only prototype** for a university UX/UI submission. There is
no backend, database, authentication, or payment processing — see "Not included"
below.

## Running it

Requires Node.js 18+ and npm (neither was available in the sandbox this project
was generated in, so the build has not been run/verified yet).

```bash
cd tika-web
npm install
npm run dev      # starts Vite dev server, prints a local URL
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## What's implemented

**Public site** — `/`, `/services`, `/how-it-works`, `/about`, `/faq`, responsive
from mobile to desktop, shared `TopNavBar` (desktop links + mobile bottom tab bar)
and `Footer`.

**Booking flow** — `/booking/service` → `/booking/pet-info` → `/booking/schedule`
→ `/booking/review` → `/booking/confirmation`. State is held in `BookingContext`
(React Context, mirrored to `sessionStorage` so a refresh mid-flow doesn't lose
data) and flows forward through every step — Review & Confirm and the
Confirmation screen render the actual service, pet, customer, address, date, and
time the user entered, not hardcoded mock data. Required fields are validated
client-side (`src/utils/validation.js`); a step can't be reached before its
prerequisites are filled in (e.g. visiting `/booking/review` directly redirects
back to whichever earlier step is incomplete).

**Staff prototype** — `/staff`, a responsive master-detail view (appointment list
+ detail panel) using in-memory mock data only, per the Phase 1 spec. "Complete
Service" updates status in local component state; nothing persists.

**Service catalog** — `src/data/services.js` is the single source of truth
(Essential Bath $50 / Full Grooming $85 / VIP Treatment $130), imported by Home,
Services, and Booking Step 1 so the numbers can never drift apart again the way
they did across the original Stitch exports.

## Content cleanup applied

All copy is in English; every address references Virginia; all pricing is in
USD; the leftover Spanish nav labels and California/Texas placeholder addresses
found in several Stitch exports were replaced. See the workspace-level analysis
for the full list of inconsistencies this resolves.

## Deliberately NOT included in Phase 1

Backend/API, database, Supabase/Firebase, authentication, payments, email/SMS
notifications, real availability logic, address validation, production
deployment, and final licensed photography (still using the original Stitch
placeholder image URLs, centralized in `src/data/images.js` for an easy later
swap).

## Project structure

```
src/
├─ data/            # services.js (catalog), images.js (placeholder photo URLs)
├─ context/          # BookingContext.jsx — the client-side booking state
├─ utils/            # validation.js
├─ components/
│  ├─ layout/         # TopNavBar, Footer, PublicLayout, BookingHeader, StaffTopBar
│  └─ ui/              # Button, ServiceCard, FAQAccordion, ProgressSteps, FormField, SizeChipGroup, Icon
└─ pages/
   ├─ public/          # Home, Services, HowItWorks, About, FAQ
   ├─ booking/         # SelectService, PetCustomerInfo, DateLocation, ReviewConfirm, Confirmation
   └─ staff/           # StaffDashboard
```
