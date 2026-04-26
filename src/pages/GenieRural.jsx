import { Link } from 'react-router-dom'
import {
  IMG_HERO_GENIE_RURAL, IMG_SILOS_STOCKAGE, IMG_AVICULTURE,
  IMG_PORCHERIE, IMG_BOVINS, IMG_PISCICULTURE, IMG_SOLUTIONS_DURABLES
} from '../lib/images'

export default function GenieRural() {
  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
            src={IMG_HERO_GENIE_RURAL}
            alt="Génie Rural Congo — terrain agricole"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10 py-20">
          <div className="max-w-[90vw] md:max-w-3xl border-l-4 border-secondary-container pl-4 sm:pl-6 md:pl-10 py-4 md:py-6">
            <span className="font-label text-secondary-container font-bold tracking-[0.3em] uppercase text-sm block mb-4">
              Infrastructure &amp; Agriculture
            </span>
            <h1 className="font-headline text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter mb-8">
              BATIR LE FUTUR<br /><span className="text-secondary-container">RURAL.</span>
            </h1>
            <p className="text-on-primary-container text-xl font-body font-medium max-w-xl mb-10 leading-relaxed">
              Ingénierie de précision pour la transformation des espaces agricoles. Nous construisons les fondations de la souveraineté alimentaire.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/242069610635?text=Bonjour%2C%20je%20souhaite%20consulter%20vos%20experts%20en%20G%C3%A9nie%20Rural"
                target="_blank" rel="noreferrer"
                className="bg-secondary-container text-on-secondary-container px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-secondary transition-all">
                Consulter nos experts
              </a>
              <Link to="/devis"
                className="bg-white text-primary px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all">
                Demander un devis
              </Link>
              <a href="/portfolio"
                className="border border-on-primary-container text-white px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                Nos projets
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Préparation des terrains */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="md:w-1/3 md:sticky top-24">
              <h2 className="font-headline text-5xl font-black text-primary tracking-tighter leading-none mb-6">
                PRÉPARATION<br />DES TERRAINS
              </h2>
              <div className="h-1 w-24 bg-secondary-container mb-8" />
              <p className="text-on-surface-variant text-lg leading-relaxed font-body">
                Une exploitation réussie commence par une structure de sol et une accessibilité irréprochables. Nous domptons l'espace pour vos cultures.
              </p>
              <Link
                to="/genie-rural/infrastructures-rurales"
                className="inline-flex items-center gap-2 mt-8 bg-primary text-white px-8 py-4 font-headline font-bold uppercase tracking-widest text-xs hover:bg-secondary-container hover:text-on-secondary-container transition-all"
              >
                En savoir plus
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-1">
              {[
                { icon: 'landscape', title: 'Dessouchage lourd', desc: "Nettoyage complet des parcelles avec engins de haute puissance pour une mise à nu optimale du sol arable." },
                { icon: 'alt_route', title: "Voies d'accès", desc: "Création de pistes rurales robustes et routes de desserte capables de supporter le passage de convois lourds." },
                { icon: 'electric_bolt', title: 'Électrification rurale', desc: "Déploiement de réseaux électriques moyenne tension et solutions hors-réseau pour alimenter vos unités de production." },
                { icon: 'water_drop', title: "Adduction d'eau", desc: "Forages, châteaux d'eau et réseaux de distribution pour sécuriser l'approvisionnement en eau potable." },
              ].map((s) => (
                <div key={s.title} className="bg-surface-container-lowest p-10 border border-outline-variant shadow-tectonic-sm hover:shadow-tectonic transition-shadow duration-200 border-b-4 border-b-transparent hover:border-b-secondary-container group">
                  <span className="material-symbols-outlined text-secondary-container text-5xl mb-6 block group-hover:scale-110 transition-transform">{s.icon}</span>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-4 group-hover:text-secondary-container transition-colors">{s.title}</h3>
                  <p className="text-on-surface-variant font-body">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stockage & Transformation */}
      <section className="py-16 md:py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-container z-0" />
                <img
                  src={IMG_SILOS_STOCKAGE}
                  alt="Silos de stockage agricole"
                  className="rounded shadow-tectonic-lg relative z-10 w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="font-headline text-5xl font-black tracking-tighter mb-12">
                STOCKAGE &amp;<br /><span className="text-secondary-container">TRANSFORMATION</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: 'warehouse', title: 'Hangars grande capacité', desc: 'Conceptions métalliques ou mixtes avec contrôle hygrométrique pour la préservation des récoltes.' },
                  { icon: 'factory', title: 'Unités de transformation', desc: 'Installation de lignes de production industrielles pour valoriser vos produits sur site.' },
                  { icon: 'ac_unit', title: 'Solutions de conservation', desc: "Chambres froides positives et négatives alimentées par des sources d'énergie hybrides." },
                ].map((f) => (
                  <div key={f.title} className="flex gap-6 items-start">
                    <div className="bg-primary-container p-4 rounded-lg flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary-container">{f.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold mb-2">{f.title}</h4>
                      <p className="text-on-primary-container font-body leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Élevage & Pisciculture */}
      <section className="py-16 md:py-24 bg-surface-container-low">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-headline text-5xl font-black text-primary tracking-tighter mb-4">
              ÉLEVAGE &amp; PISCICULTURE
            </h2>
            <p className="text-on-surface-variant font-body mb-8">
              Des structures spécialisées pour optimiser le rendement et le bien-être animal.
            </p>
            <Link
              to="/genie-rural/levage-pisciculture"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 font-headline font-bold uppercase tracking-widest text-xs hover:bg-secondary-container hover:text-on-secondary-container transition-all"
            >
              Explorer nos solutions élevage
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { img: IMG_AVICULTURE,   cat: 'Aviculture', title: 'Poulet de chair et pondeuses', desc: 'Bâtiments à ventilation régulée et systèmes automatisés.' },
              { img: IMG_PORCHERIE,   cat: 'Porcherie',  title: 'Unités Porcines',           desc: 'Conception hygiénique avec gestion optimisée des effluents.' },
              { img: IMG_BOVINS,      cat: 'Bovins',     title: 'Étables et Stabulations',   desc: "Infrastructures pour l'élevage laitier et l'engraissement." },
              { img: IMG_PISCICULTURE,cat: 'Aquaculture',title: 'Étangs Piscicoles',         desc: "Étangs en béton ou terre battue avec systèmes d'oxygénation." },
            ].map((c) => (
              <div key={c.title} className="bg-surface-container-lowest overflow-hidden group border border-outline-variant shadow-tectonic-sm hover:shadow-tectonic transition-shadow duration-200">
                <div className="h-48 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-4 md:p-6 lg:p-8">
                  <span className="font-label text-xs text-secondary font-bold tracking-widest uppercase mb-2 block">{c.cat}</span>
                  <h4 className="font-headline text-xl font-bold text-primary mb-3 group-hover:text-secondary-container transition-colors">{c.title}</h4>
                  <p className="text-sm text-on-surface-variant font-body">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Durables — bento */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 lg:row-span-2 bg-primary p-12 flex flex-col justify-end relative overflow-hidden group min-h-[300px]">
              <img
                src={IMG_SOLUTIONS_DURABLES}
                alt="Irrigation intelligente et solutions durables"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="relative z-10">
                <h2 className="font-headline text-4xl font-black text-white mb-6">SOLUTIONS DURABLES</h2>
                <p className="text-on-primary-container text-lg mb-8 max-w-md font-body">
                  L'innovation écologique au service de la rentabilité agricole.
                </p>
                <div className="flex items-center gap-4 text-secondary-container font-label font-bold uppercase tracking-widest text-xs">
                  <span>Voir nos brevets</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </div>
            {[
              { icon: 'water_drop', title: 'Irrigation Intelligente', desc: "Systèmes goutte-à-goutte et pivot central avec capteurs d'humidité." },
              { icon: 'recycling', title: 'Recyclage Déchets', desc: "Valorisation des résidus organiques pour une économie circulaire." },
            ].map((b) => (
              <div key={b.title} className="bg-surface-container-high p-8 flex flex-col justify-between border border-outline-variant border-l-4 border-l-secondary-container shadow-tectonic-sm hover:shadow-tectonic transition-shadow duration-200 group">
                <span className="material-symbols-outlined text-primary text-4xl">{b.icon}</span>
                <div>
                  <h4 className="font-headline font-bold text-primary text-xl mb-2 group-hover:text-secondary-container transition-colors">{b.title}</h4>
                  <p className="text-sm text-on-surface-variant font-body leading-tight">{b.desc}</p>
                </div>
              </div>
            ))}
            <div className="lg:col-span-2 bg-secondary-container p-8 flex flex-col justify-between relative overflow-hidden border border-outline-variant shadow-tectonic-sm hover:shadow-tectonic transition-shadow duration-200 group">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 block">energy_savings_leaf</span>
                <h4 className="font-headline font-bold text-primary text-2xl mb-2 group-hover:text-primary/80 transition-colors">Biogaz et Biofertilisants</h4>
                <p className="text-primary/80 font-body font-medium max-w-sm">
                  Installation de digesteurs anaérobies pour produire votre propre énergie et engrais naturels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 text-center">
          <h3 className="font-headline text-4xl font-black text-white mb-8 tracking-tighter">
            PRÊT À TRANSFORMER VOTRE EXPLOITATION ?
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="https://wa.me/242069610635?text=Bonjour%2C%20je%20veux%20un%20devis%20G%C3%A9nie%20Rural"
              target="_blank"
              rel="noreferrer"
              className="bg-secondary-container text-on-secondary-container shadow-tectonic-orange px-10 py-6 flex flex-col items-center hover:bg-secondary transition-colors"
            >
              <span className="flex items-center gap-2 font-headline font-black text-2xl mb-1">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#25D366]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-secondary-container">+242 069 610 635</span>
              </span>
              <span className="text-xs uppercase font-label font-bold tracking-widest opacity-70">Directeur Technique</span>
            </a>
            <Link
              to="/devis"
              className="border border-on-primary/30 text-on-primary px-10 py-6 flex flex-col items-center hover:bg-primary-container/30 transition-colors"
            >
              <span className="font-headline font-black text-2xl mb-1">Demande de Devis</span>
              <span className="text-xs uppercase font-label font-bold tracking-widest opacity-70">Réponse sous 48h</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
