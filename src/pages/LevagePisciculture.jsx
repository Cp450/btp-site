import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const standards = [
  {
    icon: 'security',
    title: "Hygiène & Biosécurité",
    desc: "Conception de zones de sas sanitaires, gestion des flux air/eau et surfaces faciles à décontaminer pour prévenir les épidémies.",
  },
  {
    icon: 'settings_input_component',
    title: "Automatisation Intégrée",
    desc: "Monitoring à distance via IoT pour la distribution d'aliments, le contrôle climatique et la surveillance de la croissance.",
  },
  {
    icon: 'construction',
    title: "Durabilité Structurale",
    desc: "Matériaux résistants à l'ammoniac et aux environnements corrosifs. Fondations calculées pour les charges lourdes agricoles.",
  },
]

export default function LevagePisciculture() {
  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">

      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-primary/60" />
        <div className="relative z-10 container mx-auto px-10 py-20">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container font-label text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Génie Rural &amp; Innovation
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white tracking-tighter leading-none mb-8">
              ÉLEVAGE<br />
              <span className="text-secondary-container">MODERNE.</span>
            </h1>
            <p className="text-xl text-on-primary-container max-w-2xl font-body leading-relaxed">
              {"Conception et construction d'infrastructures agro-industrielles de haute précision."
                + " Durabilité structurelle, automatisation avancée et conformité aux standards d'hygiène"
                + " internationaux."}
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-10">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-headline font-bold text-primary tracking-tight mb-4">
                Infrastructures Spécialisées
              </h2>
              <p className="text-on-surface-variant font-body">
                Une ingénierie robuste pour optimiser vos rendements et garantir le bien-être animal
                grâce à des environnements contrôlés.
              </p>
            </div>
            <span className="text-primary font-label font-bold text-5xl opacity-10 hidden md:block">01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

            {/* Aviculture */}
            <div className="md:col-span-7 bg-surface-container-lowest p-10 flex flex-col justify-between min-h-[420px] shadow-sm">
              <div>
                <span className="material-symbols-outlined text-secondary text-5xl mb-6 block">egg_alt</span>
                <h3 className="text-3xl font-headline font-bold text-primary mb-4">
                  Aviculture Industrielle
                </h3>
                <p className="text-on-surface-variant max-w-md mb-8">
                  Bâtiments climatisés pour poulets de chair et pondeuses. Isolation thermique haute
                  performance et systèmes de ramassage automatisés.
                </p>
                <ul className="space-y-3">
                  {[
                    "Ventilation Dynamique",
                    "Silos de stockage intégrés",
                    "Biopsie d'ambiance automatisée",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-primary">
                      <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Porcheries */}
            <div className="md:col-span-5 bg-primary text-white p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-headline font-bold mb-4">Porcheries Modernes</h3>
              <p className="text-on-primary-container mb-6 leading-relaxed">
                {"Unités de naissage et d'engraissement avec gestion automatisée des effluents et sols"
                  + " en caillebotis haute résistance."}
              </p>
              <span className="border-b-2 border-secondary-container text-secondary-container font-label font-bold text-xs uppercase tracking-widest py-2 inline-block">
                Consulter les plans
              </span>
            </div>

            {/* Bovins */}
            <div className="md:col-span-5 bg-surface-container-highest p-10 flex flex-col">
              <span className="material-symbols-outlined text-primary text-4xl mb-6">
                precision_manufacturing
              </span>
              <h3 className="text-2xl font-headline font-bold text-primary mb-3">Bovins &amp; Laiterie</h3>
              <p className="text-on-surface-variant font-body mb-6">
                Stabulation libre, salles de traite robotisées et hangars de stockage fourrager à
                structure métallique traitée anti-corrosion.
              </p>
              <div className="mt-auto w-full aspect-video bg-surface-container flex items-center justify-center text-on-surface-variant text-sm">
                [Photo — Laiterie industrielle]
              </div>
            </div>

            {/* Pisciculture */}
            <div className="md:col-span-7 bg-surface-container-lowest p-10 border-l-8 border-secondary-container shadow-sm flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-headline font-bold text-primary mb-4">Étangs Piscicoles</h3>
                <p className="text-on-surface-variant font-body mb-6 leading-relaxed">
                  {"Systèmes de recirculation (RAS) hors-sol et étangs en terre avec étanchéité par"
                    + " géomembrane HDPE. Contrôle de l'oxygénation en temps réel."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container-low">
                    <span className="block text-primary font-bold text-sm">Sur Terre</span>
                    <span className="text-xs text-on-surface-variant">Bassins excavés &amp; maçonnés</span>
                  </div>
                  <div className="p-4 bg-surface-container-low">
                    <span className="block text-primary font-bold text-sm">Hors-Sol</span>
                    <span className="text-xs text-on-surface-variant">Cuves circulaires &amp; rectangulaires</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 bg-surface-container-high flex items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-secondary text-6xl">water_drop</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-8">
                CONSTRUIT POUR DURER.<br />
                PENSÉ POUR <span className="text-secondary-container">PRODUIRE.</span>
              </h2>
              <div className="space-y-10">
                {standards.map((s) => (
                  <div key={s.title} className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 bg-secondary-container/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary-container">{s.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-headline">{s.title}</h4>
                      <p className="text-on-primary-container leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full aspect-[3/4] bg-primary-container flex items-center justify-center text-on-primary-container text-sm">
                [Photo — Ingénieur sur site]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-10">
          <div className="bg-secondary-container p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-on-secondary-container">
              <h2 className="text-3xl md:text-5xl font-headline font-extrabold mb-4 leading-tight">
                Prêt à moderniser votre exploitation ?
              </h2>
              <p className="text-lg opacity-80 font-medium">
                {"Nos experts en ingénierie rurale vous accompagnent de l'étude de faisabilité à la mise en service."}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/devis"
                className="bg-primary text-white px-10 py-5 font-headline font-bold text-lg hover:bg-primary-container transition-colors flex items-center gap-4"
              >
                Démarrer mon Projet
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
