import { useParams, Link, Navigate } from "react-router-dom";
import {
  IMG_PROJET_VILLA,
  IMG_PROJET_SMART,
  IMG_PROJET_ROUTE,
  IMG_HERO_CHANTIER,
  IMG_PROJET_IMMEUBLE,
  IMG_TERRAIN_PREP,
  IMG_IRRIGATION,
} from "../lib/images";

const PROJETS = {
  "villa-bacongo": {
    id: "villa-bacongo",
    title: "Villa Nganga R+2",
    category: "Résidentiel",
    year: 2026,
    location: "Bacongo, Brazzaville",
    image: IMG_PROJET_VILLA,
    surface: "320 m²",
    duree: "5 mois",
    statut: "Livré",
    budget: "280 000 €",
    chef: "Parfait Moukassa",
    description:
      "Villa individuelle R+2 sur terrain de 600 m², comprenant 5 chambres, 3 salles de bain, double séjour, cuisine équipée, terrasse couverte et espace parking. Structure béton armé, toiture terrasse avec isolation thermique, menuiseries aluminium double vitrage. Finitions haut de gamme : carrelage grès cérame, faïence murale, peinture texturée.",
    specs: [
      { icon: "square_foot", label: "Surface habitable", value: "320 m²" },
      { icon: "terrain", label: "Surface terrain", value: "600 m²" },
      { icon: "bed", label: "Chambres", value: "5" },
      { icon: "schedule", label: "Durée", value: "5 mois" },
      { icon: "paid", label: "Budget", value: "280 000 €" },
      { icon: "person", label: "Chef de projet", value: "Parfait Moukassa" },
    ],
    certifs: ["ISO 9001", "Garantie décennale"],
    gallery: [IMG_PROJET_VILLA, IMG_HERO_CHANTIER, IMG_PROJET_IMMEUBLE],
    whatsapp_msg:
      "Bonjour Fogatech, je suis intéressé(e) par le projet Villa Nganga R+2 à Bacongo. Pouvez-vous me contacter ?",
  },
  "ecocite-massina": {
    id: "ecocite-massina",
    title: "Éco-Cité Massina F4",
    category: "Smart City",
    year: 2026,
    location: "Massina, Brazzaville",
    image: IMG_PROJET_SMART,
    surface: "20 logements",
    duree: "14 mois",
    statut: "En cours",
    budget: "1 200 000 €",
    chef: "Christelle Nzaba",
    description:
      "Programme de 20 appartements F4 dans un ensemble résidentiel connecté. Chaque logement dispose d'une gestion domotique, de panneaux solaires en toiture, et d'un accès à une plateforme de suivi de consommation énergétique. Espace vert central de 2 000 m², parking souterrain, local vélos. Certification HQE en cours d'obtention.",
    specs: [
      { icon: "apartment", label: "Logements", value: "20 F4" },
      { icon: "square_foot", label: "Surface/logement", value: "130 m²" },
      { icon: "bolt", label: "Énergie", value: "Solaire + réseau" },
      { icon: "schedule", label: "Durée", value: "14 mois" },
      { icon: "paid", label: "Budget", value: "1 200 000 €" },
      { icon: "person", label: "Chef de projet", value: "Christelle Nzaba" },
    ],
    certifs: ["ISO 9001", "ISO 14001", "HQE (en cours)"],
    gallery: [IMG_PROJET_SMART, IMG_HERO_CHANTIER, IMG_PROJET_IMMEUBLE],
    whatsapp_msg:
      "Bonjour Fogatech, je suis intéressé(e) par l'Éco-Cité Massina F4. Pouvez-vous me donner plus d'informations ?",
  },
  "route-pool": {
    id: "route-pool",
    title: "Route rurale Pool",
    category: "Génie Rural",
    year: 2025,
    location: "Département du Pool",
    image: IMG_PROJET_ROUTE,
    surface: "12 km",
    duree: "9 mois",
    statut: "Livré",
    budget: "650 000 €",
    chef: "Emmanuel Koubemba",
    description:
      "Réhabilitation et bitumage de 12 km de route rurale reliant deux localités du département du Pool. Travaux incluant : terrassement général, mise en place d'une couche de base en grave concassée, couche de roulement bitumineuse, fossés d'assainissement et ouvrages hydrauliques (4 dalots). Route aujourd'hui praticable toute l'année, facilitant le transport des productions agricoles.",
    specs: [
      { icon: "straighten", label: "Longueur", value: "12 km" },
      { icon: "width", label: "Largeur chaussée", value: "6 m" },
      { icon: "water", label: "Ouvrages hydrauliques", value: "4 dalots" },
      { icon: "schedule", label: "Durée", value: "9 mois" },
      { icon: "paid", label: "Budget", value: "650 000 €" },
      { icon: "person", label: "Chef de projet", value: "Emmanuel Koubemba" },
    ],
    certifs: ["ISO 9001", "Garantie biennale équipements"],
    gallery: [IMG_PROJET_ROUTE, IMG_TERRAIN_PREP, IMG_IRRIGATION],
    whatsapp_msg:
      "Bonjour Fogatech, je souhaite un projet similaire à la route rurale du Pool. Pouvez-vous me contacter ?",
  },
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const projet = PROJETS[id];

  if (!projet) return <Navigate to="/portfolio" replace />;

  return (
    <main className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img
          src={projet.image}
          alt={projet.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <nav className="flex items-center gap-2 text-on-primary/60 text-xs font-body mb-4">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-on-primary/80">{projet.title}</span>
          </nav>
          <div className="flex flex-wrap items-end gap-4 justify-between">
            <div>
              <p className="text-secondary-container font-label text-xs uppercase tracking-widest mb-2">
                {projet.category} · {projet.year}
              </p>
              <h1 className="font-headline text-4xl md:text-6xl font-black text-white leading-tight">
                {projet.title}
              </h1>
              <p className="text-on-primary/70 font-body mt-2">{projet.location}</p>
            </div>
            <span
              className={`font-label text-xs uppercase tracking-widest px-4 py-1.5 border ${
                projet.statut === "Livré"
                  ? "border-green-400/50 text-green-300"
                  : "border-secondary-container/50 text-secondary-container"
              }`}
            >
              {projet.statut}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Description du projet
            </h2>
            <p className="font-body text-on-surface leading-relaxed">{projet.description}</p>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-6">
              Galerie photos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {projet.gallery.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img}
                    alt={`${projet.title} — vue ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="font-headline text-2xl font-bold text-primary mb-4">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-3">
              {projet.certifs.map((c) => (
                <span
                  key={c}
                  className="border border-outline-variant text-on-surface-variant font-label text-xs uppercase tracking-widest px-4 py-2"
                >
                  {c}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Specs */}
          <div className="bg-surface-container-low border border-outline-variant p-6">
            <h3 className="font-headline font-bold text-lg text-primary mb-6">
              Fiche technique
            </h3>
            <dl className="space-y-4">
              {projet.specs.map((s) => (
                <div key={s.label} className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-secondary-container text-base mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </span>
                  <div>
                    <dt className="text-xs font-label text-on-surface-variant uppercase tracking-widest">
                      {s.label}
                    </dt>
                    <dd className="font-body text-on-surface font-medium">{s.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA */}
          <div className="bg-primary p-6 space-y-4">
            <p className="font-headline font-bold text-white text-lg">
              Projet similaire ?
            </p>
            <p className="text-on-primary/70 font-body text-sm">
              Demandez un devis gratuit. Réponse en moins de 24h.
            </p>
            <Link
              to="/devis"
              className="block text-center bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest text-xs px-6 py-4 hover:shadow-tectonic-orange transition-all duration-200"
            >
              Demander un devis
            </Link>
            <a
              href={`https://wa.me/242069610635?text=${encodeURIComponent(projet.whatsapp_msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-white/30 text-white font-headline font-bold uppercase text-xs tracking-widest px-6 py-3 hover:bg-white/10 transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Back */}
          <Link
            to="/portfolio"
            className="flex items-center gap-2 text-primary font-headline font-bold text-sm uppercase tracking-widest hover:text-secondary-container transition-colors"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">
              arrow_back
            </span>
            Tous les projets
          </Link>
        </aside>
      </div>
    </main>
  );
}
