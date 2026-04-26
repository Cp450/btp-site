import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IMG_PROJET_VILLA,
  IMG_PROJET_COMMERCIAL,
  IMG_PROJET_ROUTE,
  IMG_PROJET_IMMEUBLE,
  IMG_PROJET_SMART,
  IMG_HERO_CHANTIER,
  IMG_TERRAIN_PREP,
  IMG_HERO_GENIE_RURAL,
} from "../lib/images";

const PROJETS = [
  {
    slug: "villa-bacongo",
    nom: "Villa Nganga R+2",
    segment: "Résidentiel",
    lieu: "Bacongo, Brazzaville",
    budget: 280000,
    duree: 5,
    surface: "320 m²",
    annee: 2026,
    note: 4.9,
    avis: 12,
    statut: "Livré",
    desc: "Villa individuelle R+2 · 5 chambres · Terrasse · Finitions haut de gamme",
    certifs: ["ISO 9001", "Garantie décennale"],
    chef: "Parfait Moukassa",
    image: IMG_PROJET_VILLA,
  },
  {
    slug: null,
    nom: "Centre Commercial Poto-Poto",
    segment: "Commercial",
    lieu: "Poto-Poto, Brazzaville",
    budget: 1200000,
    duree: 18,
    surface: "2 800 m²",
    annee: 2025,
    note: 4.8,
    avis: 8,
    statut: "Livré",
    desc: "3 niveaux · 42 boutiques · Parking 80 places · Climatisation centrale",
    certifs: ["ISO 9001", "HQE"],
    chef: "Christelle Nzaba",
    image: IMG_PROJET_COMMERCIAL,
  },
  {
    slug: "route-pool",
    nom: "Route rurale Pool",
    segment: "Génie Rural",
    lieu: "Département du Pool",
    budget: 650000,
    duree: 9,
    surface: "12 km",
    annee: 2025,
    note: 4.7,
    avis: 5,
    statut: "Livré",
    desc: "Bitumage 12 km · 4 dalots · Assainissement · Praticable toute l'année",
    certifs: ["ISO 9001", "Ministère BTP"],
    chef: "Emmanuel Koubemba",
    image: IMG_PROJET_ROUTE,
  },
  {
    slug: "ecocite-massina",
    nom: "Éco-Cité Massina F4",
    segment: "Smart City",
    lieu: "Massina, Brazzaville",
    budget: 1200000,
    duree: 14,
    surface: "20 logements",
    annee: 2026,
    note: null,
    avis: 0,
    statut: "En cours",
    desc: "20 appartements F4 · Solaire · Domotique · Espace vert 2 000 m²",
    certifs: ["ISO 14001", "HQE (en cours)"],
    chef: "Christelle Nzaba",
    image: IMG_PROJET_SMART,
  },
  {
    slug: null,
    nom: "Immeuble Bureaux Moungali",
    segment: "Commercial",
    lieu: "Moungali, Brazzaville",
    budget: 480000,
    duree: 10,
    surface: "960 m²",
    annee: 2025,
    note: 5.0,
    avis: 6,
    statut: "Livré",
    desc: "R+4 · Open-space climatisé · Salle de conférence · Fibre optique",
    certifs: ["ISO 9001"],
    chef: "Christelle Nzaba",
    image: IMG_PROJET_IMMEUBLE,
  },
  {
    slug: null,
    nom: "Complexe Sportif Talangaï",
    segment: "Infrastructure",
    lieu: "Talangaï, Brazzaville",
    budget: 920000,
    duree: 14,
    surface: "3 200 m²",
    annee: 2024,
    note: 4.6,
    avis: 9,
    statut: "Livré",
    desc: "Terrain synthétique FIFA · Tribune 500 places · Vestiaires · Éclairage LED",
    certifs: ["FIFA Quality", "ISO 9001"],
    chef: "Jean-Baptiste Okoko",
    image: IMG_HERO_CHANTIER,
  },
  {
    slug: null,
    nom: "Villa Duplex Ouenzé",
    segment: "Résidentiel",
    lieu: "Ouenzé, Brazzaville",
    budget: 145000,
    duree: 5,
    surface: "210 m²",
    annee: 2026,
    note: null,
    avis: 0,
    statut: "En cours",
    desc: "R+1 · 4 chambres · Terrasse · Finitions standard+",
    certifs: ["ONIMOB"],
    chef: "Parfait Moukassa",
    image: IMG_TERRAIN_PREP,
  },
  {
    slug: null,
    nom: "École Primaire Nganga Lingolo",
    segment: "Infrastructure",
    lieu: "Nganga Lingolo, Pool",
    budget: 320000,
    duree: 9,
    surface: "1 100 m²",
    annee: 2025,
    note: 4.9,
    avis: 4,
    statut: "Livré",
    desc: "12 salles de classe · Bibliothèque · Sanitaires · Panneau solaire",
    certifs: ["Ministère Éducation", "ISO 9001"],
    chef: "Christelle Nzaba",
    image: IMG_HERO_GENIE_RURAL,
  },
];

const SEGMENTS = ["Tous", "Résidentiel", "Commercial", "Génie Rural", "Smart City", "Infrastructure"];
const STATUTS = ["Tous", "Livré", "En cours"];
const BUDGETS = [
  { label: "Tous budgets", min: 0, max: Infinity },
  { label: "< 200 000 €", min: 0, max: 200000 },
  { label: "200k – 600k €", min: 200000, max: 600000 },
  { label: "600k – 1,5M €", min: 600000, max: 1500000 },
  { label: "> 1,5M €", min: 1500000, max: Infinity },
];

function formatBudget(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M €`;
  return `${Math.round(n / 1000)}k €`;
}

function ProjetCard({ p }) {
  const inner = (
    <>
      <div className="h-52 overflow-hidden relative">
        <img
          src={p.image}
          alt={p.nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="font-label text-[10px] uppercase tracking-widest bg-primary/80 text-on-primary border border-white/20 px-2 py-1">
            {p.segment}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`font-label text-[10px] uppercase tracking-widest px-2 py-1 border ${
              p.statut === "Livré"
                ? "border-green-400/50 text-green-300 bg-black/40"
                : "border-secondary-container/50 text-secondary-container bg-black/40"
            }`}
          >
            {p.statut}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="font-headline font-black text-xl text-white drop-shadow">
            {formatBudget(p.budget)}
          </span>
        </div>
      </div>

      <div className="p-5 bg-surface-container-lowest border-x border-b border-outline-variant group-hover:border-secondary-container/40 transition-colors">
        <p className="text-xs font-label text-secondary-container uppercase tracking-widest mb-1">
          {p.annee} · {p.lieu}
        </p>
        <h3 className="font-headline font-bold text-lg text-primary leading-tight">{p.nom}</h3>
        <p className="text-sm text-on-surface-variant font-body mt-1 leading-snug">{p.desc}</p>

        <div className="flex gap-4 mt-4 pt-4 border-t border-outline-variant">
          <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">straighten</span>
            {p.surface}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">schedule</span>
            {p.duree} mois
          </div>
          {p.note && (
            <div className="flex items-center gap-1.5 text-sm text-secondary-container ml-auto">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">star</span>
              {p.note.toFixed(1)}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.certifs.map((c) => (
            <span
              key={c}
              className="text-[10px] font-label uppercase tracking-widest border border-outline-variant text-on-surface-variant px-2 py-0.5"
            >
              {c}
            </span>
          ))}
        </div>

        {p.slug && (
          <div className="flex items-center gap-1.5 text-primary font-headline font-bold text-xs uppercase tracking-widest mt-4">
            Voir le projet
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">
              arrow_forward
            </span>
          </div>
        )}
      </div>
    </>
  );

  if (p.slug) {
    return (
      <Link to={`/portfolio/${p.slug}`} className="group block">
        {inner}
      </Link>
    );
  }

  return <div className="group">{inner}</div>;
}

export default function Portfolio() {
  const [segment, setSegment] = useState("Tous");
  const [statut, setStatut] = useState("Tous");
  const [budgetIdx, setBudgetIdx] = useState(0);

  const budgetFilter = BUDGETS[budgetIdx];

  const filtered = PROJETS.filter((p) => {
    if (segment !== "Tous" && p.segment !== segment) return false;
    if (statut !== "Tous" && p.statut !== statut) return false;
    if (p.budget < budgetFilter.min || p.budget > budgetFilter.max) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-surface pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="py-16 md:py-20">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            Nos réalisations
          </p>
          <h1 className="font-headline text-4xl md:text-6xl font-black text-primary leading-tight">
            Portfolio transparent.
          </h1>
          <p className="text-on-surface-variant font-body max-w-xl mt-4 text-lg">
            Budgets réels, délais respectés, certifications vérifiées. Aucun secret.
          </p>
          <div className="flex gap-8 mt-8">
            <div>
              <div className="font-headline font-black text-3xl text-secondary-container">50+</div>
              <div className="text-xs font-label text-on-surface-variant uppercase tracking-widest">chantiers</div>
            </div>
            <div>
              <div className="font-headline font-black text-3xl text-secondary-container">98%</div>
              <div className="text-xs font-label text-on-surface-variant uppercase tracking-widest">dans les délais</div>
            </div>
            <div>
              <div className="font-headline font-black text-3xl text-secondary-container">10+</div>
              <div className="text-xs font-label text-on-surface-variant uppercase tracking-widest">ans d'expérience</div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="border border-outline-variant p-6 mb-8 bg-surface-container-low">
          {/* Segments */}
          <div className="flex flex-wrap gap-2 mb-6">
            {SEGMENTS.map((s) => (
              <button
                key={s}
                onClick={() => setSegment(s)}
                className={`font-label text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                  segment === s
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Budget</p>
              <select
                value={budgetIdx}
                onChange={(e) => setBudgetIdx(Number(e.target.value))}
                className="w-full bg-surface border border-outline-variant text-on-surface font-body text-sm px-3 py-2 focus:border-primary outline-none"
              >
                {BUDGETS.map((b, i) => (
                  <option key={i} value={i}>{b.label}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-2">Statut</p>
              <div className="flex gap-2">
                {STATUTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatut(s)}
                    className={`flex-1 font-label text-xs uppercase tracking-widest px-3 py-2 border transition-colors ${
                      statut === s
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="text-on-surface-variant font-body text-sm mb-6">
          <span className="text-primary font-bold">{filtered.length}</span> projet{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>

        {/* Grille */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-5xl text-outline-variant block mb-4" aria-hidden="true">search_off</span>
            <p className="text-on-surface-variant font-body mb-4">Aucun projet ne correspond à ces filtres.</p>
            <button
              onClick={() => { setSegment("Tous"); setBudgetIdx(0); setStatut("Tous"); }}
              className="text-primary font-headline font-bold text-sm uppercase tracking-widest hover:text-secondary-container transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProjetCard key={p.nom} p={p} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 bg-primary p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-headline text-3xl font-black text-white">
              Votre projet, notre transparence.
            </h2>
            <p className="text-on-primary/70 font-body mt-2 max-w-md">
              Devis détaillé avec budget, planning et chef de projet assigné — sous 24h.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/devis"
              className="bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest text-xs px-8 py-4 hover:shadow-tectonic-orange transition-all duration-200 whitespace-nowrap"
            >
              Demander un devis
            </Link>
            <a
              href="https://wa.me/242069610635"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white font-headline font-bold uppercase text-xs tracking-widest px-6 py-4 hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
