import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-3xl font-headline font-black text-white mb-4 block">Fogatech</span>
          <p className="text-on-primary-container text-sm leading-relaxed font-body mb-6">
            Leader congolais en ingénierie BTP et solutions technologiques durables pour l'Afrique centrale.
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/242069610635" target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-secondary-container hover:text-on-secondary-container text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="mailto:contact@fogatech.cg"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-secondary-container hover:text-on-secondary-container text-white transition-colors">
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
            <a href="tel:+242069610635"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-secondary-container hover:text-on-secondary-container text-white transition-colors">
              <span className="material-symbols-outlined text-sm">phone_in_talk</span>
            </a>
          </div>
        </div>

        {/* Nos Métiers */}
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-widest mb-8 text-secondary-container">Nos Métiers</h4>
          <ul className="space-y-4">
            {[
              { label: 'Génie Civil & BTP', to: '/#services' },
              { label: 'Routes & Ponts', to: '/genie-rural' },
              { label: 'Smart City', to: '/smart-city' },
              { label: 'Génie Rural', to: '/genie-rural' },
              { label: 'Solutions Durables', to: '/genie-rural/solutions-durables' },
              { label: 'Location Engins', to: '/location' },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-on-primary-container hover:text-white hover:translate-x-1 inline-block transition-all font-body text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Entreprise */}
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-widest mb-8 text-secondary-container">Entreprise</h4>
          <ul className="space-y-4">
            {[
              { label: 'Portfolio', to: '/portfolio' },
              { label: 'Nos Chefs de Projet', to: '/#chefs' },
              { label: 'Demande de Devis', to: '/devis' },
              { label: 'Espace Client', to: '/client' },
              { label: 'Avis Clients', to: '/#reviews' },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-on-primary-container hover:text-white hover:translate-x-1 inline-block transition-all font-body text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-label text-xs font-bold uppercase tracking-widest mb-8 text-secondary-container">Siège Social</h4>
          <p className="text-on-primary-container text-sm font-body leading-relaxed mb-6">
            Avenue de l'Indépendance,<br />
            Immeuble Fogatech, Brazzaville<br />
            République du Congo
          </p>
          <p className="text-secondary-container font-label font-bold text-sm mb-1">+242 06 961 06 35</p>
          <p className="text-on-primary-container font-body text-xs">contact@fogatech.cg</p>
          <div className="mt-6">
            <p className="text-xs font-label text-on-primary-container/60 mb-3 uppercase tracking-widest">Slogan</p>
            <p className="text-secondary-container font-headline font-bold italic">"Mokolo na mokolo"</p>
            <p className="text-on-primary-container/60 text-xs font-body">Fiable, jour après jour</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-primary-container/60 text-xs font-body">
            © 2026 Fogatech Congo-Brazzaville. Excellence en Infrastructure & Génie Rural.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-on-primary-container/60 hover:text-white text-xs font-body transition-colors">Politique de Confidentialité</a>
            <a href="#" className="text-on-primary-container/60 hover:text-white text-xs font-body transition-colors">Mentions Légales</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
