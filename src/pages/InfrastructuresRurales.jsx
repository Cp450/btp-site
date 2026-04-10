import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const specs = [
  {
    title: 'Topographie',
    desc: "Levés GNSS et par drone pour une précision centimétrique de l'aménagement foncier.",
  },
  {
    title: 'Hydrologie',
    desc: "Études d'écoulement et drainage pour la pérennité des accès et des sols.",
  },
  {
    title: 'Logistique',
    desc: "Chaîne d'approvisionnement optimisée pour les sites enclavés.",
  },
  {
    title: 'Sécurité',
    desc: 'Protocoles stricts de sécurisation de périmètre et des infrastructures.',
  },
]

export default function InfrastructuresRurales() {
  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">

      {/* Hero */}
      <section className="relative h-[560px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
        </div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Pôle Génie Rural
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-8">
              PRÉPARATION &amp;<br />INFRASTRUCTURES
            </h1>
            <p className="text-on-primary-container text-lg md:text-xl max-w-xl font-light leading-relaxed">
              Maîtrise technologique et puissance industrielle pour transformer les terrains bruts en
              pôles de production agricole performants.
            </p>
          </div>
        </div>
      </section>

      {/* Specs grid */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <h2 className="font-headline text-3xl font-bold text-primary mb-8 leading-tight">
                {"L'expertise technique au service de la souveraineté alimentaire."}
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                {"FOGATECH déploie des solutions d'ingénierie lourde pour l'aménagement rural. Nous"
                  + " intervenons sur les environnements les plus complexes pour garantir une base structurelle"
                  + " inébranlable à vos projets agro-industriels."}
              </p>
              <div className="flex items-center gap-4 border-l-4 border-secondary p-6 bg-surface-container-low">
                <span className="material-symbols-outlined text-secondary text-4xl">engineering</span>
                <div>
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Normes ISO 9001</p>
                  <p className="text-xs text-on-surface-variant">
                    Qualité de construction certifiée et gestion des risques.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((s) => (
                <div
                  key={s.title}
                  className="bg-surface-container-lowest p-8 shadow-sm border-b-2 border-transparent hover:border-secondary transition-all"
                >
                  <h3 className="font-headline text-primary font-bold text-xl mb-4">{s.title}</h3>
                  <p className="text-sm text-on-surface-variant">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-10">

          {/* Section 1 — Dessouchage & Accès */}
          <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-container/10 -z-0" />
              <div className="w-full aspect-video bg-surface-container-high flex items-center justify-center text-on-surface-variant text-sm relative z-10 shadow-2xl">
                [Photo terrain]
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">
                Étape 01
              </span>
              <h2 className="font-headline text-4xl font-extrabold text-primary mb-6">
                Dessouchage &amp; Voies de Désenclavement
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                {"Nous transformons les zones sauvages en plateaux exploitables. Nos brigades mécanisées"
                  + " assurent un dessouchage intégral respectant la structure du sol, suivi de la création de"
                  + " pistes rurales stabilisées en latérite ou matériaux compactés."}
              </p>
              <ul className="space-y-4">
                {[
                  "Ouverture de pistes 4x4 et accès poids lourds",
                  "Nettoyage complet et évacuation des résidus",
                  "Ouvrages de franchissement (ponceaux et dalots)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-xl">check_circle</span>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2 — Électrification */}
          <div className="flex flex-col md:flex-row-reverse gap-16 items-center mb-32">
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-[4/3] bg-surface-container-high flex items-center justify-center text-on-surface-variant text-sm shadow-2xl">
                [Photo terrain — Électrification]
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">
                Étape 02
              </span>
              <h2 className="font-headline text-4xl font-extrabold text-primary mb-6">
                Électrification de Site &amp; Énergies
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                {"L'autonomie énergétique est la clé du succès. FOGATECH installe des réseaux mixtes"
                  + " (Photovoltaïque / Groupe Électrogène / Réseau National) pour alimenter vos unités de"
                  + " pompage, de transformation et de vie."}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-primary p-6">
                  <h4 className="text-white font-bold text-3xl mb-1">500kVA</h4>
                  <p className="text-on-primary-container text-[10px] uppercase font-bold tracking-tighter">
                    Capacité Standalone
                  </p>
                </div>
                <div className="bg-secondary-container p-6">
                  <h4 className="text-on-secondary-container font-bold text-3xl mb-1">Hybrid</h4>
                  <p className="text-on-secondary-container text-[10px] uppercase font-bold tracking-tighter">
                    Solaire &amp; Diesel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 — Hangars */}
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-video bg-surface-container-high flex items-center justify-center text-on-surface-variant text-sm shadow-2xl">
                [Photo terrain — Hangar]
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-4 block">
                Étape 03
              </span>
              <h2 className="font-headline text-4xl font-extrabold text-primary mb-6">
                Hangars de Stockage &amp; Conservation
              </h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Infrastructures métalliques à grande portée pour le stockage des récoltes et le
                conditionnement. Nos hangars sont conçus pour une régulation thermique optimale et une
                protection maximale contre les nuisibles.
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Structure Métallique', detail: 'Acier Galvanisé S355' },
                  { label: 'Toiture', detail: 'Bac Acier Isolé (Sandwich)' },
                  { label: 'Sols', detail: 'Béton Industriel Quartzé' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between p-4 bg-surface-container-highest"
                  >
                    <span className="text-sm font-bold text-primary">{row.label}</span>
                    <span className="text-xs font-label text-on-surface-variant">{row.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-secondary-container/10 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">
              {"Confiez votre aménagement à l'expert BTP."}
            </h2>
            <p className="text-on-primary-container text-lg mb-12 max-w-2xl mx-auto">
              {"De l'étude de faisabilité à la remise des clés, nous gérons l'intégralité du chantier"
                + " avec une rigueur industrielle."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/devis"
                className="bg-secondary-container text-on-secondary-container px-10 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-all"
              >
                Demander un Devis Technique
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-on-primary-container text-white px-10 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all"
              >
                Voir nos Réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
