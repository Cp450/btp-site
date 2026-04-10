import { Link } from 'react-router-dom'

export default function GenieRural() {
  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBccuEj_sHSBkiVC3_7UXGpQUYlEpCX9LT8olDgBP2OZWwfRP5K8C1D6DybdefZbURWAgSq76zUMVxqCG8crla-QbEc9Djpc6GEq6HuaEy7kZH6Dv0B5vVQtg9FdEH6Hh1qXxJHfc3OGnfcu-yS3yPwgrgS1tDW2z9I5kAMs59s2UCTHdXRpFRAoGxAHKzZQZDO3UBNVIdD-CFEtEdmjamhl3L4DXt6NoEtVcd7qemL6lX44tbsHsNikfoy7x_6t0iWOFVG6GHjv4cc"
            alt="Génie Rural Congo"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="container mx-auto px-10 relative z-10 py-20">
          <div className="max-w-3xl border-l-4 border-secondary-container pl-10 py-6">
            <span className="font-label text-secondary-container font-bold tracking-[0.3em] uppercase text-sm block mb-4">
              Infrastructure & Agriculture
            </span>
            <h1 className="font-headline text-white text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-8">
              BÂTIR LE FUTUR<br /><span className="text-secondary-container">RURAL.</span>
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
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3 md:sticky top-32">
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
                <div key={s.title} className="bg-surface-container-lowest p-10 hover:shadow-tectonic-lg transition-all duration-500 border-b-4 border-transparent hover:border-secondary-container group">
                  <span className="material-symbols-outlined text-secondary-container text-5xl mb-6 block group-hover:scale-110 transition-transform">{s.icon}</span>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-4">{s.title}</h3>
                  <p className="text-on-surface-variant font-body">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stockage & Transformation */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-container z-0" />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR3JsMtW1bZO0YJri2Vif2mIwcug8QpRO4SoigIbUkGWqD181FNTyLl_gB_Sv-CUK6rg-C1gQIR_PnYy_rUoWnW3NE-Y4VWFle09Hbxq7yUjMMp4PZX20lndzI__aEpcbMSll3YSOJLPGj4PpsGfHcRfmRwAz1N2dc5c7Aqv59g5MOzrUNTmnqhyc4v--iNwquSJDSp9ZQP14YHUaU_bpH7LBJVidqjKHU6GkYesHsBXu1LSQu0SIccbmCnIPhFNxUX4lmhfhpIitd"
                  alt="Silos stockage agricole"
                  className="rounded shadow-tectonic-lg relative z-10 w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="font-headline text-5xl font-black tracking-tighter mb-12">
                STOCKAGE &<br /><span className="text-secondary-container">TRANSFORMATION</span>
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
      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-headline text-5xl font-black text-primary tracking-tighter mb-4">
              ÉLEVAGE & PISCICULTURE
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
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcrvt-ruZC9J_mQ2jiIpv4jv6pQ1EE_ArhXpwEPkLl0ED5lofhbJ04ES6vc2dFy7m3DHPBIi_nbw1-vl6fwpmmQS1heRYua8v25laxInEdYGKgMjT4nLuCnGnS1FC8YbuuBRKSrvPlfRmT1fFTd0_YBh2FUGMWaT_-A8HBB51gKu2NSDeaxE2sDII7d6MYauvP66np-q0_v0trN_ir1CnvOaw_QiD_lFrWL7v9lgY5Nh_HrY13POpsYVvRNgZCHFH_eYUfl0Q4jXgv', cat: 'Aviculture', title: 'Poulet de chair & pondeuses', desc: 'Bâtiments à ventilation régulée et systèmes automatisés.' },
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr6W8znHlfRrUZg1nxsFmw8dkCuuuviWNeQrBOBQMsErhI0p8gRLxrB6sBauoV6_2XO2TX2o_yoatpqtJdMVGftCvL6iwTCuMffc8ij9XTAoErGfIrJzh3KMXQ_PQgge-kvufiw9_XjXGTwnF50Cfb9MQzd_zA10dnzRLYdp3EAQeAM9jD6FkIEsHYG2qY-uMfrc6nlNRxD_3U6Y-j6_bbMpYGTkk9vN2zKrpTC91XYpd0Qjf1cRHj9ZUQqhJWT0x4DgJ4bUhtcaN7', cat: 'Porcherie', title: 'Unités Porcines', desc: 'Conception hygiénique avec gestion optimisée des effluents.' },
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy8p-uEDHj7UoQtg27ura2vC_4ULPDDRQizVJBR6Sz3ycl7DPF9po0pR4-w65EE9VyJ2FObwUr-wCkuY0BLXgw9Kf-uL5TXA3Kuims5E4T2FoEhQAgw5DvEVmf9kl_PWfxIsouYTp0yUK2oqtdn-y1kIJnRm2RB6vtY8bCHLaLU8W0fl6jhwfOyR4fVtA41RsTRozoTYCvnhUFrGEHxoThE3PNYR0N_SqhAPTPRxxAhzA2CyeL6X95imN7qHTOjAnPh74aQBl9WOPW', cat: 'Bovins', title: 'Étables & Stabulations', desc: "Infrastructures pour l'élevage laitier et l'engraissement." },
              { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrt2I4lO97pcK-xB4jmdT6uXBNhyGrS955U33WZ2NZszLflrfqR7kVuSmaDrC2HLn82AtB5DPlit6S_WCYszBweSEEwTWJas9jH4TUcJ5DG9rFQpfY5Gqgz29KWTVMOXkWndMo4aCxFUXyahTbbwNzmR129y155WBJNoQ2yaTqvp1LHBh-Pt8hWHaSBR7CxvSlFQdn0TlrDsooDn8H84JZezr7Ds64uLzBpFJKBGveLw7vmi4SCiUwbSymRPyFLI3sllVcS-lnWSY7', cat: 'Aquaculture', title: "Étangs Piscicoles", desc: "Étangs en béton ou terre battue avec systèmes d'oxygénation." },
            ].map((c) => (
              <div key={c.title} className="bg-surface-container-lowest overflow-hidden group shadow-card hover:shadow-tectonic transition-all">
                <div className="h-48 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <span className="font-label text-xs text-secondary font-bold tracking-widest uppercase mb-2 block">{c.cat}</span>
                  <h4 className="font-headline text-xl font-bold text-primary mb-3">{c.title}</h4>
                  <p className="text-sm text-on-surface-variant font-body">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Durables — bento */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:h-[560px]">
            <div className="lg:col-span-2 lg:row-span-2 bg-primary p-12 flex flex-col justify-end relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD122c_fCGKz4VJr7FiOXl4isUjFr4sn_6T59nk3x7cSdh5cJbILgaxwR6iHVIzHk1ic1xNr6bYqAbrKVf5HBWbyMEFg-039i0nb-aPemy46T5kOCstb84mTevz2AlEW0OBhcl0MO3Gi2yUMmI9SAPkpxIDr1_ct7aSB3P7ziLIDoHfGXSl_Jeroz8m_7-kFrIWnl7Ke5pxhifJMs5BuqTFnB3TrJ4SO4nliDmHtE0ufgU7bat3zWkB9JfSnd7JR1K_5yFtHJdRteAv"
                alt="Irrigation intelligente"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
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
              <div key={b.title} className="bg-surface-container-high p-8 flex flex-col justify-between border-l-4 border-secondary-container">
                <span className="material-symbols-outlined text-primary text-4xl">{b.icon}</span>
                <div>
                  <h4 className="font-headline font-bold text-primary text-xl mb-2">{b.title}</h4>
                  <p className="text-sm text-on-surface-variant font-body leading-tight">{b.desc}</p>
                </div>
              </div>
            ))}
            <div className="lg:col-span-2 bg-secondary-container p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 block">energy_savings_leaf</span>
                <h4 className="font-headline font-bold text-primary text-2xl mb-2">Biogaz & Biofertilisants</h4>
                <p className="text-primary/80 font-body font-medium max-w-sm">
                  Installation de digesteurs anaérobies pour produire votre propre énergie et engrais naturels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary-container">
        <div className="container mx-auto px-10 text-center">
          <h3 className="font-headline text-4xl font-black text-primary mb-8 tracking-tighter">
            PRÊT À TRANSFORMER VOTRE EXPLOITATION ?
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href="https://wa.me/242069610635?text=Bonjour%2C%20je%20veux%20un%20devis%20G%C3%A9nie%20Rural" target="_blank" rel="noreferrer"
              className="bg-primary px-10 py-6 text-white flex flex-col items-center hover:bg-primary-container transition-colors">
              <span className="font-headline font-black text-2xl mb-1">+242 06 961 06 35</span>
              <span className="text-xs uppercase font-label font-bold tracking-widest opacity-70">Directeur Technique</span>
            </a>
            <Link to="/devis"
              className="bg-white px-10 py-6 text-primary flex flex-col items-center shadow-tectonic hover:shadow-tectonic-lg transition-all">
              <span className="font-headline font-black text-2xl mb-1">Demande de Devis</span>
              <span className="text-xs uppercase font-label font-bold tracking-widest opacity-70">Réponse sous 48h</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
