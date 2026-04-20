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
    <header className="fixed top-0 w-full z-50 h-16 bg-primary shadow-tectonic-inset">
      <nav aria-label="Main navigation" className="h-full">
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
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-primary animate-nav-mobile-in border-t border-primary-container/30"
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
        )}
      </nav>
    </header>
  );
}
