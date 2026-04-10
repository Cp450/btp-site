import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Smart City', to: '/smart-city' },
  { label: 'Génie Rural', to: '/genie-rural' },
  { label: 'Immobilier', to: '/#immobilier' },
  { label: "Location d'Engins", to: '/location' },
  { label: 'Portfolio', to: '/portfolio' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  function isActive(to) {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to.split('#')[0]) && to !== '/'
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#002045]/95 shadow-tectonic-lg' : 'bg-[#002045]'} backdrop-blur-md`}>
      {/* Top bar */}
      <div className="hidden md:block bg-secondary-container/10 border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-8 py-1 flex justify-between items-center">
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-label">
            Brazzaville, Congo · Excellence Industrielle depuis 2009
          </p>
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-label">
            +242 06 961 06 35 · Réponse &lt; 15min
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-2xl font-headline font-black tracking-tighter text-white uppercase">Fogatech</span>
          <span className="hidden sm:block text-xs font-label font-bold text-secondary-container uppercase tracking-widest border border-secondary-container/40 px-2 py-0.5">BTP</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`font-headline font-bold text-xs uppercase tracking-widest transition-colors duration-200 pb-1 ${
                isActive(l.to)
                  ? 'text-secondary-container border-b-2 border-secondary-container'
                  : 'text-white/70 hover:text-white border-b-2 border-transparent'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/client"
            className="text-white/70 hover:text-white text-xs font-label font-bold uppercase tracking-widest px-4 py-2 border border-white/20 hover:border-white/40 transition-colors rounded"
          >
            Espace Client
          </Link>
          <Link
            to="/devis"
            className="bg-secondary-container text-on-secondary-container px-6 py-2.5 font-headline font-bold uppercase tracking-widest text-xs hover:scale-95 active:scale-90 transition-all duration-200 rounded"
          >
            Demander un Devis
          </Link>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen((o) => !o)} className="lg:hidden text-white p-2" aria-label="Menu">
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#001530] border-t border-white/10 px-8 py-6 space-y-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`block font-headline font-bold text-xs uppercase tracking-widest py-2 border-b border-white/5 transition-colors ${
                isActive(l.to) ? 'text-secondary-container' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/client" className="block text-center text-white text-xs font-bold uppercase tracking-widest py-3 border border-white/20 rounded">
              Espace Client
            </Link>
            <Link to="/devis" className="block text-center bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-widest py-3 rounded">
              Demander un Devis
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
