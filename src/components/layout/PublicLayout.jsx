import TopNavBar from './TopNavBar.jsx'
import Footer from './Footer.jsx'

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <TopNavBar />
      <main className="flex-grow pt-20 pb-24 md:pb-0">{children}</main>
      <Footer />
    </div>
  )
}
