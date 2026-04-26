import { Link } from "react-router-dom";
import {
  IMG_HERO_CHANTIER,
  IMG_HERO_SMART_CITY,
  IMG_HERO_GENIE_RURAL,
  IMG_EXCAVATRICE,
} from "../lib/images";

const SERVICES = [
  {
    label: "Génie Civil & BTP",
    to: "/portfolio",
    image: IMG_HERO_CHANTIER,
    description:
      "Villas, immeubles, bureaux. De la conception à la livraison clé en main, en respect des délais.",
  },
  {
    label: "Smart City",
    to: "/smart-city",
    image: IMG_HERO_SMART_CITY,
    description:
      "Éco-cités intelligentes, infrastructures connectées, solutions urbaines durables.",
  },
  {
    label: "Génie Rural",
    to: "/genie-rural",
    image: IMG_HERO_GENIE_RURAL,
    description:
      "Routes, ponts, irrigation, infrastructures agricoles dans tout le Congo.",
  },
  {
    label: "Location Engins",
    to: "/location",
    image: IMG_EXCAVATRICE,
    description:
      "65 engins disponibles, livraison sous 24h, opérateurs certifiés inclus.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            Nos expertises
          </p>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-primary">
            Quatre métiers, une exigence.
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 text-center">
            De la villa individuelle à la route rurale, en passant par la Smart City
            et la location d&apos;engins — Fogatech couvre l&apos;intégralité du cycle BTP.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {SERVICES.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="group border border-outline-variant hover:border-secondary-container hover:shadow-tectonic transition-all duration-300 block"
            >
              <div className="h-60 overflow-hidden relative">
                <img
                  src={s.image}
                  alt={s.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="font-headline font-black text-xl text-white">
                    {s.label}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="font-body text-sm text-on-surface-variant">
                  {s.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-headline font-bold text-xs uppercase tracking-widest mt-4">
                  Découvrir
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
