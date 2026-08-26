import { Routes, Route, Navigate } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext.jsx'

import PublicLayout from './components/layout/PublicLayout.jsx'
import Home from './pages/public/Home.jsx'
import Services from './pages/public/Services.jsx'
import HowItWorks from './pages/public/HowItWorks.jsx'
import About from './pages/public/About.jsx'
import FAQ from './pages/public/FAQ.jsx'

import SelectService from './pages/booking/SelectService.jsx'
import PetCustomerInfo from './pages/booking/PetCustomerInfo.jsx'
import DateLocation from './pages/booking/DateLocation.jsx'
import ReviewConfirm from './pages/booking/ReviewConfirm.jsx'
import Confirmation from './pages/booking/Confirmation.jsx'

import StaffDashboard from './pages/staff/StaffDashboard.jsx'

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
        <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />

        <Route path="/booking/service" element={<SelectService />} />
        <Route path="/booking/pet-info" element={<PetCustomerInfo />} />
        <Route path="/booking/schedule" element={<DateLocation />} />
        <Route path="/booking/review" element={<ReviewConfirm />} />
        <Route path="/booking/confirmation" element={<Confirmation />} />

        <Route path="/staff" element={<StaffDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BookingProvider>
  )
}
