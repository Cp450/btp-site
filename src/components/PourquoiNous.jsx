const PILIERS = [
  {
    icon: "verified",
    title: "Certifié & agréé",
    body: "ISO 9001, ISO 14001, agrément Ministère BTP du Congo. Tous nos chefs sont membres de l'Ordre des Ingénieurs.",
  },
  {
    icon: "schedule",
    title: "Délais respectés",
    body: "98% de nos chantiers sont livrés dans les délais contractuels. Pénalité automatique de 0,5%/semaine en cas de retard imputable à Fogatech.",
  },
  {
    icon: "account_tree",
    title: "Transparence totale",
    body: "Suivi de chantier en temps réel via l'espace client. Photos, avancement, dépenses : tout est documenté.",
  },
  {
    icon: "groups",
    title: "Équipe locale",
    body: "100% de nos chefs et ouvriers sont congolais. Ancrage territorial, connaissance du terrain, soutien à l'économie locale.",
  },
];

const CERTIFS = [
  "ISO 9001",
  "ISO 14001",
  "HQE",
  "Ordre des Ingénieurs Congo",
  "Ministère BTP",
];

export default function PourquoiNous() {
  return (
    <section className="bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-secondary-container font-label text-xs uppercase tracking-widest mb-3">
            Notre engagement
          </p>
          <h2 className="font-headline text-3xl md:text-5xl font-black text-white">
            Pourquoi nous choisir.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILIERS.map((p) => (
            <div key={p.icon}>
              <span
                className="material-symbols-outlined text-5xl text-secondary-container"
                aria-hidden="true"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {p.icon}
              </span>
              <h3 className="font-headline font-bold text-xl text-white mt-6">
                {p.title}
              </h3>
              <p className="text-on-primary/80 font-body text-sm leading-relaxed mt-3">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {CERTIFS.map((c) => (
            <span
              key={c}
              className="text-on-primary/60 font-headline font-bold text-sm uppercase tracking-widest"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
