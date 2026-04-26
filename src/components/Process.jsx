import { Link } from "react-router-dom";

const ETAPES = [
  {
    num: "01",
    title: "Devis & cadrage",
    body: "Visite technique gratuite sous 48h. Devis détaillé sous 24h. Aucun engagement.",
  },
  {
    num: "02",
    title: "Conception",
    body: "Plans, modélisation 3D BIM, choix des matériaux et planning détaillé. Validation client.",
  },
  {
    num: "03",
    title: "Réalisation",
    body: "Démarrage chantier, suivi quotidien, photos hebdomadaires sur l'espace client. Réunions de chantier toutes les 2 semaines.",
  },
  {
    num: "04",
    title: "Livraison & garantie",
    body: "Réception en présence du client, levée des réserves, garantie décennale sur le gros oeuvre, biennale sur les équipements.",
  },
];

export default function Process() {
  return (
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            Notre méthode
          </p>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-primary">
            De l&apos;idée à la livraison.
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mt-4 text-center">
            Un processus éprouvé sur 50+ chantiers, documenté à chaque étape, validé par nos clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {ETAPES.map((e) => (
            <div key={e.num}>
              <div className="font-headline font-black text-6xl text-secondary-container/30 leading-none">
                {e.num}
              </div>
              <h3 className="font-headline font-bold text-xl text-primary mt-2">
                {e.title}
              </h3>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed mt-3">
                {e.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-headline font-bold text-2xl text-primary">
            Prêt à démarrer votre projet ?
          </p>
          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest text-xs px-8 py-4 mt-6 hover:shadow-tectonic-orange transition-all duration-200"
          >
            Demander un devis
            <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
