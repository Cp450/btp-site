import { Link } from "react-router-dom";
import { IMG_HERO_CHANTIER } from "../lib/images";

const TRUST_ITEMS = [
  { icon: "verified_user", label: "Agréé Ministère Congo" },
  { icon: "workspace_premium", label: "ISO 9001 Qualité" },
  { icon: "groups", label: "50+ Chantiers Livrés" },
  { icon: "schedule", label: "Livraison Dans Les Délais" },
];

const STATS = [
  { val: "15M€", label: "chantiers" },
  { val: "50+", label: "clients" },
  { val: "98%", label: "satisfaction" },
];

export default function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen pt-20 flex flex-col justify-center bg-primary relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 flex-1">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary-container/40 border border-primary-container/60 rounded-full px-4 py-1.5 text-sm text-on-primary-container/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Basé Brazzaville depuis 2015
          </div>

          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-on-primary leading-[0.9] tracking-tighter mt-6">
            L&apos;ingénierie<br/>
            du <span className="text-secondary-container">Congo qui bâtit</span>.
          </h1>

          <p className="text-on-primary/80 font-body text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
            Génie civil, Smart City, Génie Rural, location d&apos;engins. 50+ chantiers livrés, 10 ans d&apos;ancrage local.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/devis"
              className="bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest text-xs px-8 py-4 hover:shadow-tectonic-orange transition-all duration-200"
            >
              Demander un devis
            </Link>
            <Link
              to="/portfolio"
              className="border-2 border-on-primary/40 text-on-primary hover:bg-on-primary/10 px-6 py-3 font-headline font-bold uppercase text-xs tracking-widest transition"
            >
              Voir nos réalisations
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-0">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && (
                  <span className="text-on-primary/30 mx-6 text-xl font-thin select-none">|</span>
                )}
                <div>
                  <div className="text-2xl font-black text-secondary-container font-headline">{s.val}</div>
                  <div className="text-xs text-on-primary/60 font-body">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[480px] lg:h-full min-h-[480px] overflow-hidden">
          <img
            src={IMG_HERO_CHANTIER}
            alt="Chantier Fogatech BTP Congo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
