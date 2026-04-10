import { useState, useRef, useCallback } from "react";

// Before/After drag slider
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

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
  const onTouchMove = (e) => move(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none"
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
      {/* AFTER (background) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-surface flex items-center justify-center">
        <div className="text-center text-white/60 text-sm">
          <div className="text-4xl mb-2">🏗️</div>
          <div>APRÈS — Livraison Fogatech</div>
          <div className="text-xs mt-1 text-green-400">
            Photo réelle chantier Brazzaville
          </div>
        </div>
      </div>

      {/* BEFORE (clipped overlay) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-primary flex items-center justify-center"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="text-center text-white/60 text-sm">
          <div className="text-4xl mb-2">🏚️</div>
          <div>AVANT — Terrain initial</div>
        </div>
      </div>

      {/* Divider */}
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
          <span className="text-primary text-xs font-bold select-none">↔</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
        AVANT
      </span>
      <span className="absolute top-3 right-3 bg-savane text-white text-xs px-2 py-1 rounded">
        APRÈS
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen pt-20 flex flex-col justify-center bg-surface relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,58,138,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Basé Brazzaville depuis 2015
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-2">
            Fogatech <span className="text-congo">BTP</span>
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-savane mb-2">
            Mokolo na mokolo
          </p>
          <p className="text-lg text-blue-200 mb-6">
            Fiable, jour après jour · Congo
          </p>

          <p className="text-stitch-grey text-base mb-8 max-w-md">
            50+ chantiers livrés au Congo · Génie Civil · Gros Œuvre · Second
            Œuvre · Location Engins
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { val: "15M€", label: "chantiers" },
              { val: "50+", label: "clients" },
              { val: "98%", label: "satisfaction" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-foga-card border border-foga-border rounded-xl p-3 text-center"
              >
                <div className="text-2xl font-black text-congo">{s.val}</div>
                <div className="text-xs text-stitch-grey">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#configurateur"
              className="bg-congo hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Devis gratuit en 3 étapes →
            </a>
            <a
              href={`https://wa.me/242069610635?text=${encodeURIComponent("Mbote! Je souhaite un devis Fogatech BTP.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              WhatsApp maintenant
            </a>
          </div>
        </div>

        {/* Right — before/after slider */}
        <div>
          <p className="text-xs text-stitch-grey uppercase tracking-widest mb-3 text-center">
            Glissez pour voir la transformation ↔
          </p>
          <BeforeAfterSlider />
          <p className="text-xs text-stitch-grey text-center mt-2">
            Chantier réel Fogatech BTP · Brazzaville 2024
          </p>
        </div>
      </div>
    </section>
  );
}
