import { Link } from "react-router-dom";
import {
  IMG_PROJET_VILLA,
  IMG_PROJET_SMART,
  IMG_PROJET_ROUTE,
} from "../lib/images";

const PROJETS = [
  {
    id: "villa-bacongo",
    title: "Villa Nganga R+2",
    category: "Résidentiel",
    year: 2026,
    location: "Bacongo, Brazzaville",
    image: IMG_PROJET_VILLA,
    surface: "320 m²",
    duree: "5 mois",
  },
  {
    id: "ecocite-massina",
    title: "Éco-Cité Massina F4",
    category: "Smart City",
    year: 2026,
    location: "Massina, Brazzaville",
    image: IMG_PROJET_SMART,
    surface: "20 logements",
    duree: "14 mois",
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
  },
];

export default function ProjetsPhares() {
  return (
    <section className="py-20 md:py-28 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
              Portfolio sélection
            </p>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-primary">
              Réalisations récentes.
            </h2>
            <p className="text-on-surface-variant mt-3 max-w-md">
              Budgets réels, délais respectés, certifications vérifiées.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="font-headline font-bold text-sm uppercase tracking-widest text-primary hover:text-secondary-container border-b-2 border-primary hover:border-secondary-container transition-colors self-end hidden md:block whitespace-nowrap"
          >
            Voir tous les projets →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJETS.map((p) => (
            <Link
              key={p.id}
              to={`/portfolio/${p.id}`}
              className="group block"
            >
              <div className="h-[280px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-6 bg-surface-container-lowest border-x border-b border-outline-variant">
                <p className="text-xs font-label uppercase tracking-widest text-secondary-container">
                  {p.category} · {p.year}
                </p>
                <h3 className="font-headline font-bold text-xl text-primary mt-1">
                  {p.title}
                </h3>
                <p className="text-sm text-on-surface-variant mt-1">{p.location}</p>
                <div className="flex gap-6 border-t border-outline-variant pt-4 mt-4">
                  <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">straighten</span>
                    {p.surface}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">schedule</span>
                    {p.duree}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/portfolio"
            className="font-headline font-bold text-sm uppercase tracking-widest text-primary hover:text-secondary-container border-b-2 border-primary hover:border-secondary-container transition-colors"
          >
            Voir tous les projets →
          </Link>
        </div>
      </div>
    </section>
  );
}
