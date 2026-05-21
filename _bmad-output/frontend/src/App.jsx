import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyMobileBar from './components/StickyMobileBar'
import WhatsAppButton from './components/WhatsAppButton'
import ChatbotFoga from './components/ChatbotFoga'
import ScrollToTop from './components/ScrollToTop'

// Code splitting — pages loaded on demand
const Home                 = lazy(() => import('./pages/Home'))
const Portfolio            = lazy(() => import('./pages/Portfolio'))
const GenieRural           = lazy(() => import('./pages/GenieRural'))
const GenieCivil           = lazy(() => import('./pages/GenieCivil'))
const DemandeDevis         = lazy(() => import('./pages/DemandeDevis'))
const ClientPortal         = lazy(() => import('./pages/ClientPortal'))
const Location             = lazy(() => import('./pages/Location'))
const SolutionsDurables    = lazy(() => import('./pages/SolutionsDurables'))
const InfrastructuresRurales = lazy(() => import('./pages/InfrastructuresRurales'))
const LevagePisciculture   = lazy(() => import('./pages/LevagePisciculture'))
const PortfolioDetail      = lazy(() => import('./pages/PortfolioDetail'))
const DevisParticulier     = lazy(() => import('./pages/DevisParticulier'))
const PartenairesPage      = lazy(() => import('./pages/PartenairesPage'))
const MentionsLegales      = lazy(() => import('./pages/MentionsLegales'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))
const CGU                  = lazy(() => import('./pages/CGU'))
const Contact              = lazy(() => import('./pages/Contact'))
const APropos              = lazy(() => import('./pages/APropos'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <span className="inline-block w-8 h-8 border-2 border-outline-variant border-t-secondary-container rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"                                    element={<Home />} />
          <Route path="/portfolio"                           element={<Portfolio />} />
          <Route path="/portfolio/:id"                       element={<PortfolioDetail />} />
          <Route path="/genie-civil"                         element={<GenieCivil />} />
          <Route path="/genie-rural"                         element={<GenieRural />} />
          <Route path="/genie-rural/solutions-durables"      element={<SolutionsDurables />} />
          <Route path="/genie-rural/infrastructures-rurales" element={<InfrastructuresRurales />} />
          <Route path="/genie-rural/levage-pisciculture"     element={<LevagePisciculture />} />
          <Route path="/devis-particulier"                   element={<DevisParticulier />} />
          <Route path="/devis"                               element={<DemandeDevis />} />
          <Route path="/location"                            element={<Location />} />
          <Route path="/client/*"                            element={<ClientPortal />} />
          <Route path="/partenaires"                         element={<PartenairesPage />} />
          <Route path="/mentions-legales"                    element={<MentionsLegales />} />
          <Route path="/confidentialite"                     element={<PolitiqueConfidentialite />} />
          <Route path="/cgu"                                 element={<CGU />} />
          <Route path="/contact"                             element={<Contact />} />
          <Route path="/a-propos"                            element={<APropos />} />
          <Route path="*"                                    element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <StickyMobileBar />
      <WhatsAppButton />
      <ChatbotFoga />
    </>
  )
}

function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center animate-fade-slide-up">
        <span className="material-symbols-outlined text-6xl text-outline-variant block mb-6">construction</span>
        <h1 className="font-headline text-4xl font-black text-primary mb-4">Page introuvable</h1>
        <p className="text-on-surface-variant font-body mb-8">Cette page n'existe pas ou a été déplacée.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-bold px-8 py-4 uppercase tracking-widest text-xs hover:bg-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-base">home</span>
          Retour à l'accueil
        </a>
      </div>
    </main>
  )
}
