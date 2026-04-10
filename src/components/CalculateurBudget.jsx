import { useState, useMemo } from "react";

// Tarifs de base en €/m² (fourchette bas/haut)
const TYPES_CONSTRUCTION = [
  {
    id: "villa_std",
    label: "Villa standard",
    icon: "🏠",
    basMin: 350,
    basMax: 500,
    desc: "R+0 ou R+1 · Finitions standard",
  },
  {
    id: "villa_prem",
    label: "Villa premium",
    icon: "🏡",
    basMin: 600,
    basMax: 900,
    desc: "R+2 · Piscine possible · Haut de gamme",
  },
  {
    id: "immeuble",
    label: "Immeuble bureaux",
    icon: "🏢",
    basMin: 450,
    basMax: 650,
    desc: "R+2 à R+5 · Climatisation · Fibre",
  },
  {
    id: "commercial",
    label: "Local commercial",
    icon: "🏪",
    basMin: 300,
    basMax: 480,
    desc: "Boutique, entrepôt, marché",
  },
  {
    id: "route",
    label: "Route / Voirie",
    icon: "🛣️",
    basMin: 120,
    basMax: 220,
    desc: "Prix au m² de chaussée bitumée",
  },
  {
    id: "ecole",
    label: "Établissement scolaire",
    icon: "🏫",
    basMin: 280,
    basMax: 420,
    desc: "Salles de classe, administration",
  },
];

const ENGINS_LOCATION = [
  {
    id: "pelleteuse",
    label: "Pelleteuse",
    icon: "🦺",
    prixJour: 350,
    desc: "Terrassement, fouilles",
  },
  {
    id: "bulldozer",
    label: "Bulldozer",
    icon: "🚧",
    prixJour: 420,
    desc: "Décapage, nivellement",
  },
  {
    id: "grue",
    label: "Grue mobile 25T",
    icon: "🏗️",
    prixJour: 580,
    desc: "Levage structure, dalles",
  },
  {
    id: "betonneuse",
    label: "Bétonnière 500L",
    icon: "⚙️",
    prixJour: 95,
    desc: "Fondations, dallage",
  },
  {
    id: "compacteur",
    label: "Compacteur vibrant",
    icon: "🔩",
    prixJour: 180,
    desc: "Routes, remblais",
  },
  {
    id: "camion",
    label: "Camion benne 12T",
    icon: "🚛",
    prixJour: 220,
    desc: "Transport matériaux, évacuation",
  },
];

function formatEur(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M €`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k €`;
  return `${n} €`;
}

export default function CalculateurBudget() {
  const [typeId, setTypeId] = useState("villa_std");
  const [surface, setSurface] = useState(200);
  const [engins, setEngins] = useState({}); // { id: jours }
  const [etage, setEtage] = useState(1);

  const typeConst = TYPES_CONSTRUCTION.find((t) => t.id === typeId);

  const toggleEngin = (id) => {
    setEngins((prev) => {
      if (prev[id] !== undefined) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: 5 };
    });
  };

  const setEnginJours = (id, val) => {
    setEngins((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(180, Number(val))),
    }));
  };

  const budget = useMemo(() => {
    const surfTotal = surface * Math.max(1, etage);
    const constMin = typeConst ? surfTotal * typeConst.basMin : 0;
    const constMax = typeConst ? surfTotal * typeConst.basMax : 0;
    const enginTotal = Object.entries(engins).reduce((sum, [id, jours]) => {
      const e = ENGINS_LOCATION.find((x) => x.id === id);
      return sum + (e ? e.prixJour * jours : 0);
    }, 0);
    return {
      constMin,
      constMax,
      enginTotal,
      total: constMin + enginTotal,
      totalMax: constMax + enginTotal,
    };
  }, [typeConst, surface, etage, engins]);

  const waMsg = encodeURIComponent(
    `Bonjour, j'ai utilisé le calculateur Fogatech BTP.\n` +
      `Type : ${typeConst?.label}\n` +
      `Surface : ${surface}m² × ${etage} niveau(x)\n` +
      `Estimation : ${formatEur(budget.total)} – ${formatEur(budget.totalMax)}\n` +
      `Je voudrais un devis précis.`,
  );

  return (
    <section className="py-16 bg-foga-card border-y border-foga-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stitch-grey mb-2">
            Outil exclusif
          </p>
          <h2 className="text-3xl font-black text-white mb-2">
            Calculateur <span className="text-congo">Budget</span>
          </h2>
          <p className="text-stitch-grey text-sm max-w-md mx-auto">
            Estimez votre projet en 30 secondes. Construction + location engins.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonne gauche — saisie */}
          <div className="space-y-6">
            {/* Type de construction */}
            <div>
              <p className="text-xs uppercase tracking-wider text-stitch-grey mb-3">
                1. Type de construction
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TYPES_CONSTRUCTION.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTypeId(t.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${typeId === t.id ? "border-congo bg-congo/10" : "border-foga-border bg-surface hover:border-stitch-grey"}`}
                  >
                    <span className="text-xl">{t.icon}</span>
                    <div className="text-white text-xs font-semibold mt-1 leading-tight">
                      {t.label}
                    </div>
                    <div className="text-stitch-grey text-[10px] mt-0.5 leading-tight">
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Surface + niveaux */}
            <div>
              <p className="text-xs uppercase tracking-wider text-stitch-grey mb-3">
                2. Surface & niveaux
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-stitch-grey mb-1 block">
                    Surface RDC (m²)
                  </label>
                  <input
                    type="number"
                    min={20}
                    max={10000}
                    step={10}
                    value={surface}
                    onChange={(e) =>
                      setSurface(
                        Math.max(20, Math.min(10000, Number(e.target.value))),
                      )
                    }
                    className="w-full bg-surface border border-foga-border text-white text-sm rounded-lg px-3 py-2.5 focus:border-congo outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-stitch-grey mb-1 block">
                    Niveaux (R+…)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={etage}
                    onChange={(e) =>
                      setEtage(
                        Math.max(1, Math.min(10, Number(e.target.value))),
                      )
                    }
                    className="w-full bg-surface border border-foga-border text-white text-sm rounded-lg px-3 py-2.5 focus:border-congo outline-none"
                  />
                </div>
              </div>
              <p className="text-xs text-stitch-grey mt-2">
                Surface totale :{" "}
                <span className="text-white font-semibold">
                  {surface * Math.max(1, etage)} m²
                </span>
              </p>
            </div>

            {/* Location engins */}
            <div>
              <p className="text-xs uppercase tracking-wider text-stitch-grey mb-3">
                3. Location engins (optionnel)
              </p>
              <div className="space-y-2">
                {ENGINS_LOCATION.map((e) => {
                  const selected = engins[e.id] !== undefined;
                  return (
                    <div
                      key={e.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selected ? "border-savane bg-savane/5" : "border-foga-border bg-surface hover:border-stitch-grey"}`}
                    >
                      <button
                        onClick={() => toggleEngin(e.id)}
                        className="flex-shrink-0 w-6 h-6 rounded-md border border-foga-border flex items-center justify-center transition-colors"
                        style={{
                          background: selected ? "#4A7C59" : "transparent",
                          borderColor: selected ? "#4A7C59" : undefined,
                        }}
                      >
                        {selected && (
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                      <span className="text-lg flex-shrink-0">{e.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-semibold">
                          {e.label}
                        </div>
                        <div className="text-stitch-grey text-[10px]">
                          {e.desc} · {e.prixJour}€/j
                        </div>
                      </div>
                      {selected && (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={1}
                            max={180}
                            value={engins[e.id]}
                            onChange={(ev) =>
                              setEnginJours(e.id, ev.target.value)
                            }
                            className="w-16 bg-surface border border-foga-border text-white text-xs rounded-lg px-2 py-1 focus:border-savane outline-none text-center"
                          />
                          <span className="text-stitch-grey text-[10px]">
                            j
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Colonne droite — résultat */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-surface border border-foga-border rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-congo animate-pulse" />
                <p className="text-xs uppercase tracking-widest text-stitch-grey">
                  Estimation en temps réel
                </p>
              </div>

              {/* Construction */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-stitch-grey text-sm">Construction</span>
                  <span className="text-white font-bold text-sm">
                    {formatEur(budget.constMin)} – {formatEur(budget.constMax)}
                  </span>
                </div>
                <div className="text-xs text-stitch-grey">
                  {surface * etage} m² × {typeConst?.basMin}–{typeConst?.basMax}{" "}
                  €/m²
                </div>
              </div>

              {/* Engins */}
              {Object.keys(engins).length > 0 && (
                <div className="space-y-2 border-t border-foga-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-stitch-grey mb-2">
                    Location engins
                  </p>
                  {Object.entries(engins).map(([id, jours]) => {
                    const e = ENGINS_LOCATION.find((x) => x.id === id);
                    if (!e) return null;
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-baseline text-sm"
                      >
                        <span className="text-stitch-grey text-xs">
                          {e.icon} {e.label} · {jours}j
                        </span>
                        <span className="text-savane font-semibold text-xs">
                          {formatEur(e.prixJour * jours)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-stitch-grey text-xs">
                      Sous-total engins
                    </span>
                    <span className="text-savane font-bold text-sm">
                      {formatEur(budget.enginTotal)}
                    </span>
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-foga-border pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-bold">Total estimé</span>
                  <div className="text-right">
                    <div className="text-congo font-black text-xl">
                      {formatEur(budget.total)}
                    </div>
                    <div className="text-stitch-grey text-xs">
                      jusqu'à {formatEur(budget.totalMax)}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-stitch-grey leading-relaxed">
                * Estimation indicative. Devis précis gratuit sous 24h après
                visite technique. Inclut main-d'œuvre, matériaux locaux et
                direction de travaux.
              </p>

              <a
                href={`https://wa.me/242069610635?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-congo text-white font-bold py-3 rounded-xl hover:bg-congo/80 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Envoyer mon estimation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
