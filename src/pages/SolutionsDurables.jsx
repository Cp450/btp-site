import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function SolutionsDurables() {
  const whatsapp = (msg = '') => {
    const text = encodeURIComponent(msg || 'Bonjour Fogatech, je souhaite un audit de solutions durables pour mon site agricole.')
    window.open(`https://wa.me/242069610635?text=${text}`, '_blank')
  }

  return (
    <>
      <main className="pt-20 bg-background min-h-screen">
        {/* Hero */}
        <section className="relative h-[700px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhzeEW7Rgw4dqwEuFEcxE4_Bl6SF18eXWu4CXvm4Lg55ZJ6PAdjmRUgBH-M-5VWiABqntoSrf3RWEBdiKJWyr4Dzuf_BeGt8sCqNy7ONGtdxhNcoUl9aoJyyHEWDnJjjuW9kb3aXnSJE7JWq2PcqEfeaQQgslK9in0VpKH2dPH3dBz0ndqWYFGScUA0qIZ-gHHkV6Op0EepqM_hdcIePk2bzKgbwBkeMfwxQVhlPjdVRHPPBCjWI_taIDGBnwH8baqxYTn-7jxe4eQ"
              alt="Domaine agricole au crépuscule"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          </div>
          <div className="relative z-10 w-full px-8 lg:px-16 pb-20 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block bg-secondary-container text-on-secondary-container font-label text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-6">
                Génie Rural Éco-Responsable
              </span>
              <h1 className="font-headline text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8">
                SOLUTIONS DURABLES<br />& VIE SUR SITE.
              </h1>
              <p className="text-white/80 text-xl font-body max-w-2xl leading-relaxed">
                Autonomie énergétique, gestion circulaire des ressources et cadre de vie exemplaire pour les équipes sur le terrain.
              </p>
            </div>
          </div>
        </section>

        {/* Bento grid */}
        <div className="relative z-20 -mt-12 pb-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Irrigation card */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-10 shadow-tectonic group">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">water_drop</span>
                <h2 className="font-headline text-3xl font-bold text-primary mb-4">Irrigation Intégrée Haute Précision</h2>
                <p className="text-on-surface-variant font-body leading-relaxed mb-6">
                  Systèmes de pompage solaire et micro-irrigation automatisés. Rendement maximal, consommation d&apos;eau réduite de 40%.
                </p>
                <div className="flex gap-3 flex-wrap">
                  {['Solaire', 'Micro-Drip', 'Eco-Control'].map(tag => (
                    <span key={tag} className="bg-surface-container text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-label">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZNLLQhLOEGvNhS-_n1Bkb4VwHMkPVbY4uUx0qfFJDBphQb-e7btCSqsnCcFLf-FWLP6R_3tIwT8R90eBLTc1eZHaQXicVJ0RsRd0QLUgc1CNIJDS3sIt3BxrOOJPZr0MkA8tFbT8sC9IEdBCndMRpetu6RNN9Qvfwu3ARadIp_njN-qs-Xg_irPJhKetYE_Pmx0TvOh3igl-rdEfVfXHIwXTwrb11-8xoYahXpK_A3SzGH1uEPtCEzjWl9vg__kkuUseLbGOTO3P0"
                  alt="Système d'irrigation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="md:col-span-4 bg-primary rounded-xl p-10 flex flex-col justify-center text-white">
            {[
              { val: '100%', label: 'Autonomie Énergétique' },
              { val: '-40%', label: "Consommation d'Eau" },
              { val: '+65%', label: 'Rétention des Talents' },
            ].map(stat => (
              <div key={stat.label} className="mb-8 last:mb-0">
                <div className="text-5xl font-black font-headline text-secondary-container">{stat.val}</div>
                <div className="font-label text-xs uppercase tracking-widest text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Économie circulaire */}
          <div className="md:col-span-4 bg-surface-container-low rounded-xl p-10 flex flex-col group">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">recycling</span>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Économie Circulaire</h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed flex-grow">
              Transformation des déchets agricoles en biofertilisants et production de biogaz pour une autosuffisance énergétique totale du site.
            </p>
            <div className="mt-6 pt-6 border-t border-outline-variant/20 flex items-center justify-between text-xs font-bold uppercase tracking-tighter text-primary font-label">
              <span>Production Méthanisation</span>
              <span className="material-symbols-outlined">bolt</span>
            </div>
          </div>

          {/* Logements du personnel */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden shadow-tectonic flex flex-col md:flex-row group">
            <div className="md:w-1/2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjHathPIGv6HYVi6ATRZewtbqMbUu2pwahcvHIqkg5TKHnQ3JRENfpkjFLuoD4Oi9ofKhLrdDlv_5MJLhn90XCe0tXB4rHLvfP1V2ExL_VZJ8zOVhpkD3Ykf8urVbr-4mBB3L7QiOL23Iu3fwIOXeJ4Lu_dj1yQ56p4jxzx-QDKX09TeWeg0EzmeCLvZF1Q6NjkSc4f8rZJv8fAxzDv3PU65jr33i0_rfESRedXfT6SMnILs5NsWQth8nrBvc_u93DSeGvTXQh3Mak"
                alt="Logements du personnel"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-10">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">home_work</span>
              <h3 className="font-headline text-2xl font-bold text-primary mb-4">Logements du Personnel</h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
                Espaces de vie bioclimatiques conçus pour le confort thermique et social. Des environnements où les équipes s&apos;épanouissent durablement.
              </p>
              <ul className="space-y-3">
                {['Conception Bioclimatique', 'Espaces Communautaires', 'Connectivité Smart-Site'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs font-bold text-primary uppercase font-label">
                    <span className="material-symbols-outlined text-sm text-secondary-container">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Architecture section */}
        <section className="bg-surface-container-low py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-outline-variant/30 pb-8">
              <div>
                <h2 className="font-headline text-4xl font-black text-primary uppercase tracking-tighter">Architecture du Projet</h2>
                <p className="text-on-surface-variant mt-2 font-body">La précision industrielle au service de la nature.</p>
              </div>
              <button
                onClick={() => whatsapp()}
                className="hidden md:block bg-primary text-white font-label font-bold text-xs uppercase tracking-widest px-8 py-4 rounded hover:bg-secondary transition-colors mt-4 md:mt-0"
              >
                Demander un Audit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: 'energy_savings_leaf',
                  titre: 'Indépendance Énergétique',
                  desc: 'Hybridation solaire et biomasse pour une continuité opérationnelle sans dépendance au réseau national.',
                },
                {
                  icon: 'sanitizer',
                  titre: 'Gestion des Effluents',
                  desc: 'Traitement écologique des eaux usées par phyto-épuration, réutilisables pour les zones de verdure ornementales.',
                },
                {
                  icon: 'groups_3',
                  titre: 'Bien-être & Performance',
                  desc: 'Infrastructures sportives et sanitaires intégrées pour maintenir un moral d\'équipe élevé et une productivité stable.',
                },
              ].map(item => (
                <div key={item.titre} className="space-y-6">
                  <div className="text-on-secondary-container bg-secondary-container w-12 h-12 flex items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h4 className="font-headline text-xl font-bold text-primary">{item.titre}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-8">
          <div className="max-w-5xl mx-auto bg-primary rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <span className="material-symbols-outlined text-[10rem] text-white">construction</span>
            </div>
            <h2 className="relative z-10 font-headline text-4xl md:text-5xl font-black text-white mb-8">
              PRÊT À TRANSFORMER VOTRE SITE ?
            </h2>
            <p className="relative z-10 text-white/70 text-lg mb-10 max-w-2xl mx-auto font-body">
              Nos experts en génie rural conçoivent des solutions sur mesure alliant rentabilité et respect de l&apos;environnement.
            </p>
            <div className="relative z-10 flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => whatsapp()}
                className="bg-secondary-container text-on-secondary-container font-headline font-black text-sm uppercase tracking-widest px-10 py-5 rounded-lg hover:scale-105 transition-transform"
              >
                Demander un Audit
              </button>
              <Link
                to="/genie-rural"
                className="bg-white/10 text-white border border-white/20 font-headline font-black text-sm uppercase tracking-widest px-10 py-5 rounded-lg hover:bg-white/20 transition-colors"
              >
                Voir nos Réalisations
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
