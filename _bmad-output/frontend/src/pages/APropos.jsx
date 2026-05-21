import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '../lib/motion'
import SEO from '../components/SEO'
import TextReveal from '../components/TextReveal'

/* ── Data ─────────────────────────────────────────────────────── */
const STATS = [
  { val: '12+', label: 'années d\'opérations' },
  { val: '13',  label: 'chantiers livrés' },
  { val: '65',  label: 'engins en parc' },
  { val: '100%', label: 'équipe congolaise' },
]

const TIMELINE = [
  {
    year: '2012',
    titre: 'Fondation',
    client: 'FOBERD CONGO',
    desc: 'Création des Établissements FOGA & Fils. Premier chantier : 2 hangars métalliques à Pointe-Noire et Brazzaville.',
  },
  {
    year: '2013',
    titre: 'Étanchéité universitaire',
    client: 'UNICON DEVELOPPEMENT',
    desc: 'Travaux d\'étanchéité sur le site de l\'Université Denis Sassou N\'Guesso à Kintélé — chantier 3 ans.',
  },
  {
    year: '2016',
    titre: 'Éclairage public',
    client: 'EN CO – ÉNERGIE DU CONGO',
    desc: 'Entretien et modernisation LED des luminaires sur la Corniche de Brazzaville, axe Case de Gaulle-Matour.',
  },
  {
    year: '2017',
    titre: 'Industrie sensible',
    client: 'FAAKI CONGO',
    desc: 'Construction du Centre Emplisseur de Gaz de Mpila — normes ATEX, réseau incendie, aménagements sécurité énergétique.',
  },
  {
    year: '2020',
    titre: 'Foga-Tech International',
    client: 'RAZEL-BEC FAYAT',
    desc: 'Changement de raison sociale. Projet Pep\'s Mayanga (2 hangars + 30 km fouilles) et CHU-B Brazzaville — montée en gamme génie civil.',
    highlight: true,
  },
  {
    year: '2022',
    titre: 'Présence nationale',
    client: 'SINOHYDRO & SGE-C CONGO',
    desc: 'Transport agrégats Boundji-Ewo, pose pavés Owando. Intervention confirmée dans 5 départements du Congo.',
  },
  {
    year: '2023',
    titre: 'Haute tension',
    client: 'VALIANT POWER',
    desc: 'Fouilles, massifs béton et levage à la grue des pylônes HT sur la ligne Mossaka-Oyo.',
  },
  {
    year: '2024',
    titre: 'Génie Rural',
    client: 'SONOCC & OPARH\'S CONGO',
    desc: 'Transport calcaire carrière Loutété, mise à disposition d\'engins pour le Hub agricole Eni à Loudima.',
  },
]

const VALEURS = [
  {
    icon: 'engineering',
    title: 'Expertise terrain',
    desc: '12 ans d\'opérations en milieu congolais. Conditions exigeantes, délais tenus.',
    size: 'large',
  },
  {
    icon: 'handshake',
    title: 'Partenariats durables',
    desc: 'RAZEL, SINOHYDRO, COLAS, FAAKI, VALIANT POWER.',
    size: 'small',
  },
  {
    icon: 'verified',
    title: 'Qualité certifiée',
    desc: 'Agrément Ministère BTP Congo, garanties décennales, contrôle technique systématique.',
    size: 'small',
  },
  {
    icon: 'public',
    title: '100% congolaise',
    desc: 'Équipe locale qualifiée, ancrage territorial fort, contribution à la souveraineté économique nationale.',
    size: 'large',
  },
]

const POLES = [
  { num: '01', title: 'Génie civil & gros œuvre',     to: '/genie-civil' },
  { num: '02', title: 'Génie rural & hydraulique',    to: '/genie-rural' },
  { num: '03', title: 'Infrastructures rurales',      to: '/genie-rural/infrastructures-rurales' },
  { num: '04', title: 'Élevage & pisciculture',       to: '/genie-rural/levage-pisciculture' },
  { num: '05', title: 'Solutions durables',            to: '/genie-rural/solutions-durables' },
  { num: '06', title: 'Location d\'engins BTP',       to: '/location' },
]

const EQUIPE = [
  { initiales: 'FG', role: 'Direction Générale', titre: 'Fondateur & DG', detail: 'Vision stratégique, développement commercial et relations partenaires.' },
  { initiales: 'DT', role: 'Direction Technique', titre: 'Directeur Technique', detail: 'Supervision des chantiers, normes qualité et contrôle d\'exécution.' },
  { initiales: 'OP', role: 'Opérations', titre: 'Chef de Parc Engins', detail: 'Gestion du parc de 65 engins, maintenance préventive et logistique.' },
  { initiales: 'GR', role: 'Génie Rural', titre: 'Responsable Génie Rural', detail: 'Études d\'aménagement, hydraulique agricole et infrastructure rurale.' },
]

/* ── Component ────────────────────────────────────────────────── */
export default function APropos() {
  return (
    <main className="bg-surface text-on-surface font-body">
      <SEO
        title="À propos — Foga-Tech International BTP Congo"
        description="Foga-Tech International : 12 ans d'expertise BTP au Congo-Brazzaville. Génie civil, génie rural, location d'engins. Équipe 100% congolaise, agréé Ministère BTP Congo."
        canonical="https://fogatech.cg/a-propos"
      />

      {/* ── HERO Ken Burns ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#002045] pt-16">
        {/* Layer 1 — Ken Burns 3 images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[
            { src: '/portfolio-chu.webp',     cls: 'hb-1', eager: true },
            { src: '/portfolio-mayanga.webp', cls: 'hb-2', eager: false },
            { src: '/gc-hero-1.webp',         cls: 'hb-3', eager: false },
          ].map(({ src, cls, eager }) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              loading={eager ? 'eager' : 'lazy'}
              fetchPriority={eager ? 'high' : 'auto'}
              className={`hero-bg-img ${cls} absolute inset-0 w-full h-full object-cover opacity-0 contrast-110 saturate-110`}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,32,69,0.92) 0%, rgba(0,32,69,0.45) 50%, rgba(0,13,26,0.50) 100%)',
            }}
          />
        </div>

        {/* Layer 2 — radial glow */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(254,147,44,0.10), transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(37,99,235,0.08), transparent 60%)
            `,
          }}
        />

        {/* Layer 3 — content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 font-body text-xs mb-10">
            <Link to="/" className="hover:text-secondary-container transition-colors">Accueil</Link>
            <span aria-hidden="true">›</span>
            <span className="text-secondary-container">À propos</span>
          </div>

          <motion.div
            className="max-w-[720px]"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="w-4 h-px bg-secondary-container" />
              <span className="font-headline font-black text-[10px] uppercase tracking-[0.25em] text-secondary-container">
                Foga-Tech International · Congo-Brazzaville
              </span>
            </motion.div>

            <div style={{ fontSize: 'clamp(48px, 7vw, 92px)' }}>
              <TextReveal
                text="Bâtir le Congo"
                as="h1"
                className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em]"
                animate
                delay={0.1}
              />
              <TextReveal
                text="de demain."
                as="div"
                className="font-headline font-black text-secondary-container leading-[0.92] tracking-[-0.03em] mb-6"
                animate
                delay={0.3}
              />
            </div>

            <motion.p
              variants={fadeUp}
              className="font-body text-white/70 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Entreprise congolaise de BTP fondée en 2012. Expertise terrain, partenariats
              durables, équipe 100% locale. De FOGA & Fils à Foga-Tech International.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/portfolio"
                className="flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-black text-[13px] uppercase tracking-[0.18em] px-8 py-4 rounded-full hover:shadow-tectonic-orange hover:-translate-y-px transition-all"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                Voir nos références
              </Link>
              <Link
                to="/devis"
                className="flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 px-8 py-4 font-headline font-bold uppercase text-[13px] tracking-[0.18em] rounded-full transition-all"
              >
                Demander un devis
                <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────────────── */}
      <section className="relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-primary rounded-2xl shadow-tectonic-lg overflow-hidden">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-8 py-8 ${i < 3 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
              >
                <p
                  className="font-headline font-black text-secondary-container leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
                >
                  {s.val}
                </p>
                <p className="font-body text-on-primary/50 text-[11px] uppercase tracking-widest mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTRE HISTOIRE — texte intro ─────────────────────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-6 h-px bg-secondary-container/60" />
            <span className="font-label font-bold text-[11px] uppercase tracking-[0.25em] text-secondary-container">
              Notre histoire
            </span>
          </div>
          <h2
            className="font-headline font-black text-primary leading-[0.95] tracking-[-0.02em] mb-8"
            style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }}
          >
            De FOGA &amp; Fils à<br />Foga-Tech International.
          </h2>
          <div className="space-y-5 text-on-surface-variant text-base md:text-lg leading-relaxed max-w-3xl">
            <p>
              Fondés en 2012 sous l&apos;enseigne{' '}
              <strong className="text-primary">Établissements FOGA & Fils</strong>, nous
              accompagnons les grands acteurs du BTP congolais dès les premiers chantiers : hangars
              métalliques FOBERD CONGO, étanchéité de l&apos;Université Denis Sassou N&apos;Guesso,
              VRD COLAS sur l&apos;axe Petit-Chose-Manianga.
            </p>
            <p>
              En 2020, nous devenons{' '}
              <strong className="text-primary">Foga-Tech International</strong> et montons en gamme :
              génie civil lourde avec RAZEL sur le CHU-B et le Projet Pep&apos;s Mayanga, bâtiment
              industriel sensible avec FAAKI, levage de pylônes haute tension avec VALIANT POWER.
            </p>
            <p>
              Aujourd&apos;hui, nous opérons sur l&apos;ensemble du territoire — Brazzaville,
              Pointe-Noire, Pool, Cuvette, Niari — avec un parc de{' '}
              <strong className="text-primary">65 engins</strong> et une équipe{' '}
              <strong className="text-primary">100% congolaise certifiée</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section className="py-24 bg-[#001022]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-6 h-px bg-secondary-container/60" />
            <span className="font-label font-bold text-[11px] uppercase tracking-[0.25em] text-secondary-container">
              Chronologie
            </span>
          </div>
          <h2
            className="font-headline font-black text-white leading-[0.95] tracking-[-0.02em] mb-16"
            style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
          >
            12 ans de chantiers.
          </h2>

          <div className="relative">
            {/* Ligne verticale centrale */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => {
                const isRight = i % 2 === 0
                return (
                  <div key={item.year} className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
                    {/* Contenu gauche (desktop) */}
                    <div className={`hidden md:flex md:w-1/2 ${isRight ? 'justify-end pr-12' : 'justify-start pl-12 order-last'}`}>
                      {isRight && (
                        <div className={`max-w-sm p-6 rounded-2xl ${item.highlight ? 'bg-secondary-container text-on-secondary-container' : 'bg-white/5 border border-white/10'}`}>
                          <p className={`font-label font-bold text-[10px] uppercase tracking-widest mb-1 ${item.highlight ? 'text-on-secondary-container/70' : 'text-secondary-container'}`}>
                            {item.client}
                          </p>
                          <h3 className={`font-headline font-bold text-lg mb-2 ${item.highlight ? 'text-on-secondary-container' : 'text-white'}`}>
                            {item.titre}
                          </h3>
                          <p className={`text-sm leading-relaxed ${item.highlight ? 'text-on-secondary-container/80' : 'text-white/55'}`}>
                            {item.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Année — centre desktop */}
                    <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-3 md:block md:text-center z-10">
                      <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${item.highlight ? 'bg-secondary-container border-secondary-container' : 'bg-[#001022] border-white/30'}`} />
                      <span className={`font-headline font-black text-sm md:block ${item.highlight ? 'text-secondary-container' : 'text-white/40'}`}>
                        {item.year}
                      </span>
                    </div>

                    {/* Contenu droite (desktop) / full (mobile) */}
                    <div className={`md:w-1/2 ${isRight ? 'md:pl-12 md:invisible md:pointer-events-none' : 'md:pl-12'}`}>
                      <div className={`max-w-sm p-5 rounded-2xl md:hidden ${item.highlight ? 'bg-secondary-container text-on-secondary-container' : 'bg-white/5 border border-white/10'}`}>
                        <p className={`font-label font-bold text-[10px] uppercase tracking-widest mb-1 ${item.highlight ? 'text-on-secondary-container/70' : 'text-secondary-container'}`}>
                          {item.client}
                        </p>
                        <h3 className={`font-headline font-bold text-base mb-2 ${item.highlight ? 'text-on-secondary-container' : 'text-white'}`}>
                          {item.titre}
                        </h3>
                        <p className={`text-sm leading-relaxed ${item.highlight ? 'text-on-secondary-container/80' : 'text-white/55'}`}>
                          {item.desc}
                        </p>
                      </div>
                      {/* Desktop — côté droit pour les impairs */}
                      {!isRight && (
                        <div className={`hidden md:block max-w-sm p-6 rounded-2xl ${item.highlight ? 'bg-secondary-container text-on-secondary-container' : 'bg-white/5 border border-white/10'}`}>
                          <p className={`font-label font-bold text-[10px] uppercase tracking-widest mb-1 ${item.highlight ? 'text-on-secondary-container/70' : 'text-secondary-container'}`}>
                            {item.client}
                          </p>
                          <h3 className={`font-headline font-bold text-lg mb-2 ${item.highlight ? 'text-on-secondary-container' : 'text-white'}`}>
                            {item.titre}
                          </h3>
                          <p className={`text-sm leading-relaxed ${item.highlight ? 'text-on-secondary-container/80' : 'text-white/55'}`}>
                            {item.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS — bento dark ─────────────────────────────────── */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-6 h-px bg-secondary-container/60" />
              <span className="font-label font-bold text-[11px] uppercase tracking-[0.25em] text-secondary-container">
                Nos valeurs
              </span>
              <span className="w-6 h-px bg-secondary-container/60" />
            </div>
            <h2
              className="font-headline font-black text-primary leading-[0.95] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px, 4.5vw, 48px)' }}
            >
              Ce qui nous tient debout.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Grande gauche */}
            <div className="md:col-span-6 bg-primary rounded-2xl p-10 flex flex-col justify-between min-h-[260px]">
              <div className="w-14 h-14 rounded-xl bg-secondary-container/20 flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-secondary-container text-3xl" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>
                  engineering
                </span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-white text-2xl mb-3">Expertise terrain</h3>
                <p className="text-on-primary/60 text-sm leading-relaxed">
                  12 ans d&apos;opérations en milieu congolais. Conditions exigeantes, livraisons tenues.
                  Chaque chantier renforce notre savoir-faire de terrain.
                </p>
              </div>
            </div>

            {/* Petites droite */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white border border-outline-variant rounded-2xl p-7 flex flex-col justify-between hover:border-secondary-container/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-secondary-container/15 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary-container text-xl" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary text-base mb-2">Partenariats durables</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">RAZEL, SINOHYDRO, COLAS, FAAKI, VALIANT POWER.</p>
                </div>
              </div>
              <div className="bg-white border border-outline-variant rounded-2xl p-7 flex flex-col justify-between hover:border-secondary-container/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-secondary-container/15 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary-container text-xl" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-primary text-base mb-2">Qualité certifiée</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed">Agrément Ministère BTP Congo, garanties décennales, contrôle technique systématique.</p>
                </div>
              </div>
            </div>

            {/* Grande bas */}
            <div className="md:col-span-12 bg-secondary-container rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-xl bg-on-secondary-container/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container text-3xl" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-secondary-container text-xl mb-1">100% congolaise</h3>
                  <p className="text-on-secondary-container/75 text-sm max-w-lg leading-relaxed">
                    Équipe locale qualifiée, ancrage territorial fort, contribution directe à la souveraineté économique nationale.
                  </p>
                </div>
              </div>
              <div className="text-5xl font-headline font-black text-on-secondary-container/15 hidden md:block select-none">
                🇨🇬
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-6 h-px bg-secondary-container/60" />
                <span className="font-label font-bold text-[11px] uppercase tracking-[0.25em] text-secondary-container">
                  L&apos;équipe
                </span>
              </div>
              <h2
                className="font-headline font-black text-primary leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
              >
                Des profils terrain,<br />pas des théoriciens.
              </h2>
            </div>
            <p className="text-on-surface-variant text-sm font-body max-w-xs leading-relaxed">
              Ingénieurs, chefs de chantier et opérateurs formés sur les projets
              les plus exigeants du Congo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EQUIPE.map((m) => (
              <div
                key={m.role}
                className="group bg-surface-container-lowest border border-outline-variant rounded-2xl p-7 hover:border-secondary-container/40 hover:bg-white transition-all"
              >
                {/* Avatar initiales */}
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-6 font-headline font-black text-on-primary text-xl group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                  {m.initiales}
                </div>
                <span className="font-label font-bold text-[9px] uppercase tracking-widest text-secondary-container block mb-1">
                  {m.role}
                </span>
                <h3 className="font-headline font-bold text-primary text-base mb-3 leading-tight">
                  {m.titre}
                </h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOS PÔLES ────────────────────────────────────────────── */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-6 h-px bg-secondary-container/60" />
                <span className="font-label font-bold text-[11px] uppercase tracking-[0.25em] text-secondary-container">
                  Nos pôles
                </span>
              </div>
              <h2
                className="font-headline font-black text-primary leading-[0.95] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(26px, 4vw, 44px)' }}
              >
                Six expertises.<br />Un seul interlocuteur.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-widest text-primary hover:text-secondary-container transition-colors whitespace-nowrap"
            >
              Voir nos références
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {POLES.map((p) => (
              <Link
                key={p.num}
                to={p.to}
                className="group bg-white border border-outline-variant rounded-2xl p-6 hover:border-secondary-container/40 hover:shadow-md transition-all flex items-start justify-between gap-4"
              >
                <div>
                  <span className="font-headline font-black text-on-surface/15 text-3xl block leading-none mb-4">
                    {p.num}
                  </span>
                  <h3 className="font-headline font-bold text-primary text-base leading-tight group-hover:text-secondary-container transition-colors">
                    {p.title}
                  </h3>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:text-secondary-container group-hover:translate-x-1 transition-all flex-shrink-0" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
