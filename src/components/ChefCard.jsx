const CHEFS = [
  {
    id: 1,
    nom: "Parfait Moukassa",
    titre: "Ingénieur Génie Civil",
    specialite: "Résidentiel & Smart City",
    experience: 14,
    projets: 34,
    note: 4.9,
    avis: 47,
    certifs: [
      "Ordre des Ingénieurs Congo",
      "ISO 9001 Lead Auditor",
      "HQE Concepteur",
    ],
    bio: "Diplômé de l'ENSP Brazzaville + INSA Lyon. Spécialiste structures R+4 et éco-construction.",
    dispo: true,
    photo: null, // URL photo réelle à brancher
  },
  {
    id: 2,
    nom: "Christelle Nzaba",
    titre: "Architecte DPLG",
    specialite: "Commercial & Bureaux",
    experience: 11,
    projets: 28,
    note: 5.0,
    avis: 31,
    certifs: [
      "Ordre des Architectes Congo",
      "LEED Green Associate",
      "ISO 9001",
    ],
    bio: "Architecte DPLG formée à Yaoundé et Paris La Villette. Signature esthétique contemporaine afro-moderne.",
    dispo: true,
    photo: null,
  },
  {
    id: 3,
    nom: "Jean-Baptiste Okoko",
    titre: "Ingénieur Travaux Publics",
    specialite: "Génie Rural & Infrastructure",
    experience: 17,
    projets: 52,
    note: 4.7,
    avis: 63,
    certifs: ["Ministère BTP Congo", "CFCO Travaux Ferroviaires", "ISO 9001"],
    bio: "Expert routes, ponts et ouvrages d'art. 17 ans sur terrain en zones rurales et périurbaines.",
    dispo: false,
    photo: null,
  },
];

function StarRating({ note }) {
  const full = Math.floor(note);
  const half = note % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-sm ${i <= full ? "text-congo" : i === full + 1 && half ? "text-congo/50" : "text-stitch-grey/30"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ChefCard({ chef }) {
  const initials = chef.nom
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="bg-foga-card border border-foga-border rounded-xl p-5 hover:border-savane/50 transition-colors flex flex-col">
      {/* Avatar + dispo */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-savane/40 flex items-center justify-center text-white text-xl font-black">
            {initials}
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-foga-card ${chef.dispo ? "bg-green-400" : "bg-gray-500"}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-sm leading-tight">
            {chef.nom}
          </h3>
          <p className="text-congo text-xs font-semibold">{chef.titre}</p>
          <p className="text-stitch-grey text-xs mt-0.5 truncate">
            {chef.specialite}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center mb-4 py-3 border-y border-foga-border">
        <div>
          <div className="text-white font-black text-lg">{chef.experience}</div>
          <div className="text-stitch-grey text-[10px]">ans exp.</div>
        </div>
        <div>
          <div className="text-savane font-black text-lg">{chef.projets}</div>
          <div className="text-stitch-grey text-[10px]">projets</div>
        </div>
        <div>
          <div className="text-congo font-black text-lg">{chef.note}</div>
          <div className="text-stitch-grey text-[10px]">/ 5</div>
        </div>
      </div>

      {/* Note étoiles */}
      <div className="flex items-center gap-2 mb-3">
        <StarRating note={chef.note} />
        <span className="text-xs text-stitch-grey">
          {chef.avis} avis vérifiés
        </span>
      </div>

      {/* Bio */}
      <p className="text-stitch-grey text-xs leading-relaxed mb-4 flex-1">
        {chef.bio}
      </p>

      {/* Certifications */}
      <div className="flex flex-wrap gap-1 mb-4">
        {chef.certifs.map((c) => (
          <span
            key={c}
            className="text-[10px] bg-primary/10 border border-primary/30 text-blue-300 px-2 py-0.5 rounded-full"
          >
            ✓ {c}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={`https://wa.me/242069610635?text=Bonjour%2C%20je%20voudrais%20travailler%20avec%20${encodeURIComponent(chef.nom)}%20sur%20mon%20projet`}
        target="_blank"
        rel="noreferrer"
        className={`w-full text-center text-sm py-2 rounded-lg font-semibold transition-colors ${chef.dispo ? "bg-savane text-white hover:bg-savane/80" : "bg-surface text-stitch-grey border border-foga-border cursor-not-allowed"}`}
      >
        {chef.dispo ? "Demander ce chef →" : "Indisponible actuellement"}
      </a>
    </div>
  );
}

export default function ChefsSection() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stitch-grey mb-2">
            Équipe certifiée
          </p>
          <h2 className="text-3xl font-black text-white mb-2">
            Vos Chefs de <span className="text-savane">Projet</span>
          </h2>
          <p className="text-stitch-grey text-sm max-w-md mx-auto">
            Vous choisissez votre chef. Certifications publiques, notes clients
            vérifiées.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHEFS.map((c) => (
            <ChefCard key={c.id} chef={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { CHEFS };
