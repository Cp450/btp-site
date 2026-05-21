import { Link } from "react-router-dom";
import {
  IMG_PROJET_VILLA,
  IMG_PROJET_SMART,
  IMG_PROJET_ROUTE,
} from "../lib/images";

const PROJETS = [
  {
    id: "ecocite-massina",
    title: "Éco-Cité Massina F4",
    category: "Smart City",
    year: 2026,
    location: "Massina, Brazzaville",
    image: IMG_PROJET_SMART,
    surface: "20 logements",
    duree: "14 mois",
    budget: "2,4M€",
    featured: true,
  },
  {
    id: "villa-bacongo",
    title: "Villa Nganga R+2",
    category: "Résidentiel",
    year: 2026,
    location: "Bacongo, Brazzaville",
    image: IMG_PROJET_VILLA,
    surface: "320 m²",
    duree: "5 mois",
    budget: "180k€",
  },
  {
    id: "route-pool",
    title: "Route rurale Pool",
    category: "Génie Rural",
    year: 2025,
    location: "Département du Pool",
    image: IMG_PROJET_ROUTE,
    surface: "12 km",
    duree: "9 mois",
    budget: "650k€",
  },
];

export default function ProjetsPhares() {
  const featured = PROJETS[0];
  const secondary = PROJETS.slice(1);

  return (
    <section className="py-20 md:py-28 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
              Portfolio sélection
            </p>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-primary leading-none">
              Réalisations récentes.
            </h2>
            <p className="text-on-surface-variant mt-3 text-sm max-w-sm">
              Budgets réels, délais respectés, certifications vérifiées.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="hidden md:flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-widest text-primary hover:text-secondary-container transition-colors whitespace-nowrap"
          >
            Voir tous les projets
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Editorial grid: featured left (3/5) + 2 stacked right (2/5) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 border border-outline-variant">

          {/* Featured project */}
          <Link
            to={`/portfolio/${featured.id}`}
            className="group lg:col-span-3 block relative overflow-hidden"
          >
            <div className="h-72 lg:h-full min-h-[520px] relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />

              {/* Top badge */}
              <div className="absolute top-5 left-5">
                <span className="bg-secondary-container text-on-secondary-container font-headline font-black text-xs uppercase tracking-widest px-3 py-1.5">
                  {featured.category}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-on-primary/60 font-body text-xs mb-2">
                  {featured.year} · {featured.location}
                </p>
                <h3 className="font-headline font-black text-white text-2xl md:text-3xl leading-tight">
                  {featured.title}
                </h3>

                <div className="mt-5 flex gap-6">
                  <div>
                    <p className="text-secondary-container font-headline font-black text-lg">
                      {featured.surface}
                    </p>
                    <p className="text-on-primary/50 text-xs font-body">surface</p>
                  </div>
                  <div>
                    <p className="text-secondary-container font-headline font-black text-lg">
                      {featured.duree}
                    </p>
                    <p className="text-on-primary/50 text-xs font-body">durée</p>
                  </div>
                  <div>
                    <p className="text-secondary-container font-headline font-black text-lg">
                      {featured.budget}
                    </p>
                    <p className="text-on-primary/50 text-xs font-body">budget</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-5 text-on-primary/60 font-headline font-bold text-xs uppercase tracking-widest group-hover:text-secondary-container transition-colors">
                  Voir le projet
                  <span
                    className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary projects stacked */}
          <div className="lg:col-span-2 flex flex-col border-t lg:border-t-0 lg:border-l border-outline-variant">
            {secondary.map((p, i) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.id}`}
                className={`group block flex-1 ${i < secondary.length - 1 ? "border-b border-outline-variant" : ""}`}
              >
                <div className="h-52 lg:h-64 relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-container/80 text-on-primary-container font-headline font-bold text-[10px] uppercase tracking-widest px-2.5 py-1">
                      {p.category}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl">
                  <p className="text-xs font-label uppercase tracking-widest text-secondary-container mb-1">
                    {p.year} · {p.location}
                  </p>
                  <h3 className="font-headline font-bold text-primary text-lg leading-tight">
                    {p.title}
                  </h3>
                  <div className="flex gap-5 border-t border-outline-variant pt-3 mt-3">
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-body">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">
                        straighten
                      </span>
                      {p.surface}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-body">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">
                        schedule
                      </span>
                      {p.duree}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-body">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">
                        payments
                      </span>
                      {p.budget}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-headline font-bold text-sm uppercase tracking-widest text-primary hover:text-secondary-container transition-colors border-b-2 border-primary hover:border-secondary-container"
          >
            Voir tous les projets
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
