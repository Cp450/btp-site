import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/cn";

/**
 * Services dropdown items shown on desktop.
 * On mobile these are rendered flat (no nested dropdown).
 */
const SERVICE_ITEMS = [
  { label: "Génie Rural", to: "/genie-rural" },
  { label: "Smart City", to: "/smart-city" },
  { label: "Location Engins", to: "/location" },
  {
    label: "Infrastructures Rurales",
    to: "/genie-rural/infrastructures-rurales",
  },
  { label: "Élevage & Pisciculture", to: "/genie-rural/levage-pisciculture" },
];

const MOBILE_ITEMS = [
  { label: "Accueil", to: "/" },
  { label: "Génie Rural", to: "/genie-rural" },
  { label: "Smart City", to: "/smart-city" },
  { label: "Location Engins", to: "/location" },
  {
    label: "Infrastructures Rurales",
    to: "/genie-rural/infrastructures-rurales",
  },
  { label: "Élevage & Pisciculture", to: "/genie-rural/levage-pisciculture" },
  { label: "Portfolio", to: "/portfolio" },
];

const WHATSAPP_URL = "https://wa.me/242069610635";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const hamburgerRef = useRef(null);

  function closeMenus() {
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  /** Escape key closes mobile menu and dropdown */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false);
          hamburgerRef.current?.focus();
        }
        if (dropdownOpen) {
          setDropdownOpen(false);
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, dropdownOpen]);

  /** Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function isActive(to) {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  }

  function isServicesActive() {
    return SERVICE_ITEMS.some((item) => isActive(item.to));
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-primary shadow-tectonic-inset">
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-1.5 border-b border-primary-container/30 text-[10px] font-label font-bold uppercase tracking-widest text-on-primary/60">
        <span>Excellence Industrielle depuis 2009</span>
        <a
          href="tel:+242069610635"
          className="hover:text-secondary-container transition-colors flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-[#25D366]" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          +242 06 961 06 35
        </a>
      </div>
      <nav aria-label="Main navigation" className="h-16">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-headline font-black text-on-primary uppercase tracking-tight text-xl">
              FOGATECH
            </span>
            <span className="text-secondary-container font-headline font-black text-xl uppercase tracking-tight">
              BTP
            </span>
          </Link>

          {/* Desktop nav links — hidden below md */}
          <div className="hidden md:flex items-center gap-6">
            {/* Accueil */}
            <Link
              to="/"
              className={cn(
                "font-headline font-bold text-xs uppercase tracking-widest pb-1 transition-colors duration-200 border-b-2",
                isActive("/")
                  ? "text-on-primary border-secondary-container"
                  : "text-on-primary/70 border-transparent hover:text-on-primary",
              )}
            >
              Accueil
            </Link>

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 font-headline font-bold text-xs uppercase tracking-widest pb-1 transition-colors duration-200 border-b-2 cursor-pointer",
                  isServicesActive()
                    ? "text-on-primary border-secondary-container"
                    : "text-on-primary/70 border-transparent hover:text-on-primary",
                )}
              >
                Services
                <span
                  className="material-symbols-outlined text-base leading-none"
                  aria-hidden="true"
                  style={{ fontSize: "16px" }}
                >
                  {dropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-primary-container shadow-tectonic rounded-sm py-1 z-50">
                  {SERVICE_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className={cn(
                        "block px-4 py-3 text-xs font-headline font-bold uppercase tracking-widest transition-colors duration-150",
                        isActive(item.to)
                          ? "text-secondary-container bg-primary/40"
                          : "text-on-primary-container hover:text-on-primary hover:bg-primary/40",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio */}
            <Link
              to="/portfolio"
              className={cn(
                "font-headline font-bold text-xs uppercase tracking-widest pb-1 transition-colors duration-200 border-b-2",
                isActive("/portfolio")
                  ? "text-on-primary border-secondary-container"
                  : "text-on-primary/70 border-transparent hover:text-on-primary",
              )}
            >
              Portfolio
            </Link>

            {/* Contact WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline font-bold text-xs uppercase tracking-widest pb-1 text-on-primary/70 border-b-2 border-transparent hover:text-on-primary transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Desktop CTA — always visible */}
          <Link
            to="/devis"
            className="hidden md:inline-flex items-center bg-secondary-container text-on-secondary-container px-5 py-2 font-headline font-bold uppercase tracking-widest text-xs shadow-tectonic-orange hover:brightness-105 active:scale-95 transition-all duration-200 rounded-sm shrink-0"
          >
            Demander un devis
          </Link>

          {/* Hamburger — visible below md */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Menu principal"
            aria-controls="mobile-menu"
            className="md:hidden flex items-center justify-center w-11 h-11 text-on-primary"
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
              style={{ fontSize: "24px" }}
            >
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn('md:hidden bg-primary border-t border-primary-container/30 nav-mobile-menu', mobileOpen && 'open')}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
            <ul className="flex flex-col" role="list">
              {MOBILE_ITEMS.map((item) => (
                <li key={item.to} role="listitem">
                  <Link
                    to={item.to}
                    onClick={closeMenus}
                    className={cn(
                      "flex items-center min-h-[48px] px-6 font-headline font-bold text-xs uppercase tracking-widest border-b border-primary-container/30 transition-colors duration-150",
                      isActive(item.to)
                        ? "text-secondary-container"
                        : "text-on-primary/75 hover:text-on-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li role="listitem">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenus}
                  className="flex items-center min-h-[48px] px-6 font-headline font-bold text-xs uppercase tracking-widest border-b border-primary-container/30 text-on-primary/75 hover:text-on-primary transition-colors duration-150"
                >
                  Contact WhatsApp
                </a>
              </li>
            </ul>

            {/* Full-width CTA at bottom */}
            <div className="px-6 py-4">
              <Link
                to="/devis"
                onClick={closeMenus}
                className="flex items-center justify-center w-full min-h-[48px] bg-secondary-container text-on-secondary-container font-headline font-bold uppercase tracking-widest text-xs shadow-tectonic-orange rounded-sm"
              >
                Demander un devis
              </Link>
            </div>
        </div>
      </nav>
    </header>
  );
}
