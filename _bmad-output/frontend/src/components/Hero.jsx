import { Link } from "react-router-dom";
import { IMG_HERO_CHANTIER } from "../lib/images";

const STATS = [
  { val: "10", suffix: "ans", label: "d'expérience locale" },
  { val: "50", suffix: "+", label: "chantiers livrés" },
  { val: "98", suffix: "%", label: "satisfaction client" },
  { val: "65", suffix: "", label: "engins disponibles" },
];

export default function Hero() {
  return (
    <section id="accueil" className="min-h-screen bg-primary flex flex-col">
      {/* Grid: clears full navbar (top-bar ~26px + nav 64px = ~90px on desktop, 64px mobile) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55%_45%] pt-16">

        {/* ── Left panel ───────────────────────────────────────── */}
        <div className="relative flex flex-col justify-between px-8 sm:px-14 xl:px-20 py-12 lg:py-16 overflow-hidden">

          {/* Subtle dot texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />

          {/* Vertical orange accent bar */}
          <div
            className="absolute left-0 top-20 bottom-20 w-[3px] bg-secondary-container"
            aria-hidden="true"
          />

          {/* Top: overline */}
          <div className="relative z-10 flex items-center gap-3">
            <span className="w-6 h-px bg-secondary-container/60 block flex-shrink-0" />
            <span className="text-secondary-container font-headline font-bold text-[11px] uppercase tracking-[0.25em]">
              Brazzaville · Congo · depuis 2015
            </span>
          </div>

          {/* Middle: headline + description + CTAs */}
          <div className="relative z-10 animate-fade-slide-up">
            <h1
              className="font-headline font-black text-white leading-[0.85] tracking-tight"
            >
              <span
                className="block"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 7rem)" }}
              >
                Bâtisseurs
              </span>
              <span
                className="block"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 7rem)" }}
              >
                du
              </span>
              <span
                className="block text-secondary-container"
                style={{ fontSize: "clamp(3.5rem, 7.5vw, 7rem)" }}
              >
                Congo.
              </span>
            </h1>

            <p className="text-on-primary/60 font-body text-base md:text-lg mt-8 max-w-sm leading-relaxed">
              Génie civil, Smart City, Génie Rural, location d&apos;engins.
              L&apos;ingénierie au service du développement congolais depuis 10 ans.
            </p>

            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest text-xs px-8 py-4 hover:shadow-tectonic-orange transition-all duration-200 rounded-full"
              >
                <span
                  className="material-symbols-outlined text-base"
                  aria-hidden="true"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
                Demander un devis
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 border border-on-primary/25 text-on-primary hover:bg-on-primary/10 px-6 py-4 font-headline font-bold uppercase text-xs tracking-widest transition rounded-full"
              >
                Nos réalisations
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom: stats row */}
          <div className="relative z-10 grid grid-cols-4 border-t border-white/10 pt-8 mt-auto">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={i < 3 ? "border-r border-white/10 pr-4 mr-4" : ""}
              >
                <p
                  className="font-headline font-black text-white leading-none"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)" }}
                >
                  {s.val}
                  <span className="text-secondary-container">{s.suffix}</span>
                </p>
                <p className="text-on-primary/40 font-body text-[10px] mt-2 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: image with diagonal cut ─────────────── */}
        <div className="hidden lg:block relative overflow-hidden">
          <img
            src={IMG_HERO_CHANTIER}
            alt="Ouvriers Fogatech BTP sur chantier au Congo"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />

          {/* Diagonal left-edge cut — navy wedge over image */}
          <div
            className="absolute inset-0 bg-primary pointer-events-none"
            style={{ clipPath: "polygon(0 0, 22% 0, 0 100%)" }}
            aria-hidden="true"
          />
          {/* Soft gradient blend after the diagonal */}
          <div
            className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary/60 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          {/* Darkening veil */}
          <div
            className="absolute inset-0 bg-primary/25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Floating project card */}
          <div className="absolute bottom-10 right-8 bg-white/97 backdrop-blur-sm p-5 w-[17rem] shadow-tectonic-lg border-l-4 border-secondary-container rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full bg-green-500 animate-pulse block flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">
                Chantier en cours
              </span>
            </div>
            <p className="font-headline font-black text-primary text-sm leading-tight">
              Éco-Cité Massina F4
            </p>
            <p className="text-xs text-on-surface-variant font-body mt-0.5">
              Brazzaville · Smart City · 20 logements
            </p>
            <div className="mt-3">
              <div className="flex justify-between text-xs font-label font-bold mb-1.5">
                <span className="text-on-surface-variant">Avancement</span>
                <span className="text-secondary-container">68%</span>
              </div>
              <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary-container rounded-full"
                  style={{ width: "68%" }}
                />
              </div>
            </div>
          </div>

          {/* Top-right orange badge */}
          <div className="absolute top-8 right-8 bg-secondary-container text-on-secondary-container font-headline font-black text-[10px] uppercase tracking-[0.2em] px-3 py-2">
            Congo · Afrique Centrale
          </div>
        </div>
      </div>
    </section>
  );
}
