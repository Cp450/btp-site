import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../lib/cn";
import { IMG_HERO_CHANTIER } from "../lib/images";

// Trust signal data — H-3
const TRUST_ITEMS = [
  { icon: "verified_user", label: "Agréé Ministère Congo" },
  { icon: "workspace_premium", label: "ISO 9001 Qualité" },
  { icon: "groups", label: "50+ Chantiers Livrés" },
  { icon: "schedule", label: "Livraison Dans Les Délais" },
];

// Stats data
const STATS = [
  { val: "15M€", label: "chantiers" },
  { val: "50+", label: "clients" },
  { val: "98%", label: "satisfaction" },
];

/**
 * BeforeAfterSlider — H-4
 * Drag/touch divider to compare AVANT vs APRÈS panels.
 * No emoji. Material Symbols swap_horiz handle icon.
 * Fades in on mount with animate-fade-slide-up (200ms delay).
 */
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const move = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    setPos(pct);
  }, []);

  const onMouseMove = (e) => {
    if (dragging.current) move(e.clientX);
  };
  const onTouchMove = (e) => {
    e.preventDefault();
    move(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-64 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none",
        visible && "animate-fade-slide-up",
      )}
      onMouseMove={onMouseMove}
      onMouseUp={() => {
        dragging.current = false;
      }}
      onMouseLeave={() => {
        dragging.current = false;
      }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => {
        dragging.current = false;
      }}
    >
      {/* APRÈS panel — full background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-headline font-bold text-sm uppercase tracking-widest">
            LIVRAISON FOGATECH
          </p>
          <p className="text-secondary-container text-xs mt-1">
            Chantier Brazzaville 2024
          </p>
        </div>
      </div>

      {/* AVANT panel — clipped overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-outline/40 via-surface-container-high to-outline/20 flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center">
          <p className="text-on-surface-variant font-headline font-bold text-sm uppercase tracking-widest">
            ÉTAT INITIAL
          </p>
        </div>
      </div>

      {/* Drag divider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        onMouseDown={() => {
          dragging.current = true;
        }}
        onTouchStart={() => {
          dragging.current = true;
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-ew-resize">
          <span className="material-symbols-outlined text-primary text-sm select-none">
            swap_horiz
          </span>
        </div>
      </div>

      {/* Corner labels */}
      <span className="absolute top-3 left-3 bg-primary text-on-primary text-xs px-2 py-1 rounded">
        AVANT
      </span>
      <span className="absolute top-3 right-3 bg-secondary-container text-on-secondary-container text-xs px-2 py-1 rounded">
        APRÈS
      </span>
    </div>
  );
}

/**
 * Hero — main landing section.
 * bg-primary (navy) background, trust strip, left copy column, right slider.
 */
export default function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen pt-20 flex flex-col justify-center bg-primary relative overflow-hidden"
    >
      {/* Background grid — subtle white lines */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* H-3 — Trust signal strip */}
      <div className="relative z-10 bg-primary-container/40 border-b border-primary-container/60 py-2">
        <ul className="flex items-center justify-center gap-6 md:gap-10 text-xs text-on-primary-container/80 overflow-x-auto px-4 list-none m-0 flex-wrap">
          {TRUST_ITEMS.map((item) => (
            <li key={item.icon} className="flex items-center whitespace-nowrap">
              <span className="material-symbols-outlined text-secondary-container text-base align-middle mr-1">
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left — copy, animate-fade-slide-up */}
        <div className="animate-fade-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary-container/40 border border-primary-container/60 rounded-full px-4 py-1.5 text-sm text-on-primary-container/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Basé Brazzaville depuis 2015
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-on-primary leading-tight mb-2">
            Fogatech <span className="text-secondary-container">BTP</span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-savane mb-2">
            Mokolo na mokolo
          </p>
          <p className="text-base sm:text-lg text-on-primary-container/80 mb-6">
            Fiable, jour après jour · Congo
          </p>

          <p className="text-on-surface-variant text-base mb-8 max-w-md">
            50+ chantiers livrés au Congo · Génie Civil · Gros Oeuvre · Second
            Oeuvre · Location Engins
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-primary-container border border-primary-container/60 rounded-xl p-3 text-center"
              >
                <div className="text-2xl font-black text-secondary-container">
                  {s.val}
                </div>
                <div className="text-xs text-on-primary-container/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#configurateur"
              className={cn(
                "bg-secondary-container hover:bg-secondary text-on-secondary-container",
                "font-headline font-bold uppercase tracking-widest text-sm px-6 py-3",
                "transition-colors shadow-tectonic-orange rounded-xl",
                "active:scale-95 transition-transform",
              )}
            >
              Devis gratuit en 3 étapes
            </a>
            <a
              href={`https://wa.me/242069610635?text=${encodeURIComponent("Mbote! Je souhaite un devis Fogatech BTP.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "bg-[#25D366] hover:bg-green-600 text-white",
                "font-headline font-bold px-6 py-3 rounded-xl",
                "transition-colors text-sm",
                "active:scale-95 transition-transform",
              )}
            >
              WhatsApp maintenant
            </a>
          </div>
        </div>

        {/* Right — before/after slider */}
        <div>
          <p className="text-xs text-on-primary-container/80 uppercase tracking-widest mb-3 text-center">
            Glissez pour voir la transformation
          </p>
          <BeforeAfterSlider />
          <p className="text-xs text-on-primary-container/80 text-center mt-2">
            Chantier réel Fogatech BTP · Brazzaville 2024
          </p>
        </div>
      </div>
    </section>
  );
}
