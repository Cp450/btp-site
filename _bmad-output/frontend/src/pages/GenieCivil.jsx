import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import TextReveal from "../components/TextReveal";
import { fadeUp, fadeLeft, stagger, viewport } from "../lib/motion";

const IMG_HERO_CHANTIER = "/gc-hero-1.webp";
const IMG_DEVIS_SIDEBAR = "/bureau-etude.webp";
const IMG_PONT_OUVRAGE  = "/btp-ouvrages-art.webp";

const DISCIPLINES = [
  {
    id: "bureau-etude",
    icon: "architecture",
    title: "Bureau d'Étude & Ingénierie",
    tag: "Études & Plans",
    image: IMG_DEVIS_SIDEBAR,
    imageAlt: "Plans et études techniques Fogatech",
    items: [
      "Études de faisabilité et diagnostic",
      "Calculs de structure béton armé & charpente",
      "Plans d'exécution DWG & BIM",
      "Études de sol et topographie",
      "Devis quantitatif estimatif (DQE)",
      "Dossiers de permis de construire",
    ],
  },
  {
    id: "travaux-publics",
    icon: "bridge",
    title: "BTP & Ouvrages d'Art",
    tag: "BTP & Ouvrages",
    image: IMG_PONT_OUVRAGE,
    imageAlt: "BTP & ouvrages d'art Fogatech Congo",
    items: [
      "Routes en terre et latérite stabilisée",
      "Voiries urbaines, terrassements & VRD",
      "Ponts, passerelles & dalots en béton armé",
      "Murs de soutènement & ouvrages hydrauliques",
      "Fondations spéciales sur terrain difficile",
      "Inspection et diagnostic structurel",
    ],
    cta: { label: "Demander un devis →", to: "/devis" },
  },
];

const NORMES = [
  { code: "Eurocode 2", label: "Béton armé & précontraint" },
  { code: "LCPC/SETRA", label: "Chaussées & ouvrages d'art" },
  { code: "DTU Congo", label: "Normes locales applicables" },
  { code: "BIM Level 2", label: "Maquette numérique 3D" },
];

export default function GenieCivil() {
  return (
    <main className="bg-surface text-on-surface">
      <SEO
        title="Génie Civil & BTP — Bureau d'Étude, Construction, Travaux Publics"
        description="Fogatech BTP Congo : bureau d'étude, ingénierie structurelle, architecture, construction bâtiment et travaux publics. Expertise locale, normes internationales."
        canonical="https://fogatech.cg/genie-civil"
      />

      {/* ── Hero split-screen ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[55%_45%] overflow-hidden bg-primary">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Left — text */}
        <motion.div
          className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-24 lg:py-32"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.nav variants={fadeLeft} aria-label="Fil d'Ariane" className="flex items-center gap-2 mb-8">
            <Link
              to="/"
              className="text-on-primary/50 text-xs font-label font-bold uppercase tracking-widest hover:text-on-primary transition-colors"
            >
              Accueil
            </Link>
            <span className="text-secondary-container/60 text-xs" aria-hidden="true">/</span>
            <span className="text-secondary-container text-xs font-label font-bold uppercase tracking-widest">
              Génie Civil
            </span>
          </motion.nav>

          {/* Tag */}
          <motion.span
            variants={fadeUp}
            className="inline-block self-start px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-label font-bold tracking-[0.2em] uppercase mb-6"
          >
            BTP · Études · Construction
          </motion.span>

          {/* Headline — text reveal */}
          <TextReveal
            text="GÉNIE CIVIL"
            as="div"
            className="font-headline text-5xl md:text-6xl lg:text-7xl text-white font-black tracking-tighter leading-none mb-2"
            animate
            delay={0.15}
          />
          <TextReveal
            text="& BTP CONGO."
            as="div"
            className="font-headline text-5xl md:text-6xl lg:text-7xl text-secondary-container font-black tracking-tighter leading-none mb-6"
            animate
            delay={0.3}
          />

          <motion.p
            variants={fadeUp}
            className="text-on-primary/70 font-body text-base mb-10 max-w-sm leading-relaxed"
          >
            De l&apos;étude de sol au bâtiment livré — ingénierie structurelle,
            architecture, construction bâtiment et travaux publics aux normes
            internationales.
          </motion.p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mb-12">
            {[
              { val: "150+", label: "Projets construits" },
              { val: "12 ans", label: "Expérience terrain" },
              { val: "BIM", label: "Modélisation 3D" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-secondary-container/40 pl-4">
                <span className="font-headline font-black text-2xl text-white">{s.val}</span>
                <p className="text-on-primary/50 font-body text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div variants={stagger} className="flex flex-wrap gap-4">
            <motion.div variants={fadeUp}>
              <Link
                to="/devis"
                className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-bold px-8 py-4 uppercase tracking-widest text-xs shadow-tectonic-orange hover:brightness-105 active:scale-95 transition-all rounded-full"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">description</span>
                Demander un devis
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <a
                href="#bureau-etude"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-headline font-bold px-8 py-4 uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-full"
              >
                Nos disciplines
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_downward</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — image */}
        <div className="relative hidden lg:block">
          {/* Vertical orange accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container z-10" aria-hidden="true" />
          <img
            src={IMG_HERO_CHANTIER}
            alt="Chantier de construction Fogatech BTP Congo"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            style={{ clipPath: "polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          />
          <div className="absolute inset-0 bg-primary/20" />

          {/* Floating badge */}
          <div className="absolute bottom-12 right-10 bg-primary-container border border-secondary-container/30 px-5 py-4 shadow-tectonic-lg z-10 max-w-[200px]">
            <p className="text-secondary-container font-headline font-black text-2xl leading-none">98%</p>
            <p className="text-on-primary-container font-body text-xs mt-1">
              Projets livrés dans les délais au Congo
            </p>
          </div>
        </div>
      </section>

      {/* ── Normes & référentiels ─────────────────────────────────────────── */}
      <section className="bg-primary-container border-b border-secondary-container/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-secondary-container/20">
            {NORMES.map((n) => (
              <div key={n.code} className="px-6 py-4 first:pl-0 last:pr-0">
                <span className="font-headline font-black text-secondary-container text-lg block">
                  {n.code}
                </span>
                <span className="text-on-primary-container font-body text-xs mt-0.5 block">
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 Disciplines ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <span className="text-[10px] font-label font-bold uppercase tracking-[0.25em] text-secondary-container">
              Nos Disciplines
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-black text-primary tracking-tighter mt-2">
              QUATRE EXPERTISES,
              <br />
              UN SEUL INTERLOCUTEUR.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-outline-variant">
            {DISCIPLINES.map((d, idx) => (
              <div
                key={d.id}
                id={d.id}
                className={[
                  "group flex flex-col border-outline-variant scroll-mt-20",
                  idx % 2 === 0 ? "border-r" : "",
                  idx < 2 ? "border-b" : "",
                ].join(" ")}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-primary">
                  <img
                    src={d.image}
                    alt={d.imageAlt}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  {/* Tag */}
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-secondary-container text-on-secondary-container text-[9px] font-label font-bold uppercase tracking-widest">
                    {d.tag}
                  </span>
                  {/* Icon */}
                  <span
                    className="material-symbols-outlined text-4xl text-white absolute bottom-4 left-4"
                    aria-hidden="true"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {d.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-headline font-black text-xl text-primary mb-6 tracking-tight">
                    {d.title}
                  </h3>
                  <ul className="space-y-2.5 flex-1">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-secondary-container text-base flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-sm text-on-surface-variant font-body leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {d.cta && (
                    <Link
                      to={d.cta.to}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-label font-bold uppercase tracking-widest text-secondary-container hover:text-primary border-b border-secondary-container/40 hover:border-primary pb-0.5 transition-all self-start"
                    >
                      {d.cta.label}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Routes & Ponts cross-link ─────────────────────────────────────── */}
      <section className="bg-primary-container py-20 border-t border-secondary-container/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <span className="text-[10px] font-label font-bold uppercase tracking-[0.25em] text-secondary-container">
                Page dédiée
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-black text-on-primary-container tracking-tighter mt-2 mb-4">
                ROUTES, PONTS &amp; OUVRAGES D&apos;ART
              </h2>
              <p className="text-on-primary-container/70 font-body text-sm leading-relaxed max-w-lg mb-6">
                Notre pôle Travaux Publics dispose d&apos;une page complète détaillant
                nos prestations routes &amp; ponts : normes Eurocode, références
                chantiers, processus de construction et devis.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  "200+ km construits",
                  "15+ ouvrages d'art",
                  "Charge P400 certifiée",
                  "Crue Q100 ans",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 border border-secondary-container/30 text-secondary-container text-xs font-label font-bold uppercase tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/devis"
              className="inline-flex items-center gap-3 bg-secondary-container text-on-secondary-container font-headline font-bold px-10 py-5 uppercase tracking-widest text-xs shadow-tectonic-orange hover:brightness-105 active:scale-95 transition-all shrink-0 rounded-full"
            >
              <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process simplifié ─────────────────────────────────────────────── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="text-[10px] font-label font-bold uppercase tracking-[0.25em] text-secondary-container">
              Notre Méthode
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-black text-primary tracking-tighter mt-2">
              DE LA CONCEPTION À LA LIVRAISON.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-outline-variant">
            {[
              { num: "01", title: "Étude & Devis", desc: "Analyse du site, étude de faisabilité, devis quantitatif estimatif sous 24–48h." },
              { num: "02", title: "Conception", desc: "Plans architecturaux, calculs structures, BIM, dossier permis de construire." },
              { num: "03", title: "Terrassement", desc: "Préparation terrain, fondations, réseaux enterrés (VRD)." },
              { num: "04", title: "Construction", desc: "Gros œuvre, second œuvre, suivi de chantier hebdomadaire client." },
              { num: "05", title: "Livraison", desc: "Réception contradictoire, DOE, garantie décennale Fogatech." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={["p-6 border-outline-variant", i < 4 ? "border-r" : ""].join(" ")}
              >
                <span className="font-headline font-black text-4xl text-secondary-container/20 block mb-3 leading-none">
                  {step.num}
                </span>
                <h4 className="font-headline font-black text-sm text-primary uppercase tracking-wide mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-on-surface-variant font-body leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary py-24 overflow-hidden">
        {/* Dot texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
        {/* GC watermark */}
        <span
          className="absolute right-8 top-1/2 -translate-y-1/2 font-headline font-black text-[140px] text-white/[0.03] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          GC
        </span>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 bg-secondary-container/20 text-secondary-container text-[10px] font-label font-bold tracking-[0.2em] uppercase mb-6">
            Réponse sous 24h
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            VOTRE PROJET BTP,
            <br />
            <span className="text-secondary-container">NOTRE EXPERTISE.</span>
          </h2>
          <p className="text-on-primary/70 font-body mb-10 max-w-md mx-auto text-sm leading-relaxed">
            Devis gratuit et sans engagement. Notre ingénieur terrain vous
            répond sous 24h pour tout projet au Congo-Brazzaville.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-bold px-10 py-5 uppercase tracking-widest text-xs shadow-tectonic-orange hover:brightness-105 active:scale-95 transition-all rounded-full"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              Demander un devis gratuit
            </Link>
            <a
              href="https://wa.me/242069610635?text=Bonjour%20Fogatech%2C%20j%27ai%20un%20projet%20de%20g%C3%A9nie%20civil."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-headline font-bold px-10 py-5 uppercase tracking-widest text-xs hover:bg-white/10 transition-colors rounded-full"
            >
              WhatsApp direct
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
