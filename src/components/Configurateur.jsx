import { useState } from "react";

const TYPES = [
  {
    id: "villa",
    label: "Villa / Maison",
    icon: "🏠",
    sub: "Clé en main Brazzaville",
  },
  { id: "immeuble", label: "Immeuble", icon: "🏢", sub: "R+2 à R+10" },
  { id: "route", label: "Route / VRD", icon: "🛣️", sub: "Génie civil" },
  { id: "renovation", label: "Rénovation", icon: "🔨", sub: "Second œuvre" },
  {
    id: "engin",
    label: "Location Engin",
    icon: "🚜",
    sub: "Bulldozer · Grue · Pelle",
  },
  {
    id: "public",
    label: "Marché Public",
    icon: "🏛️",
    sub: "Hôpital · École · Admin",
  },
];

const BUDGETS = [
  { id: "b1", label: "< 50M FCFA", en: "Small" },
  { id: "b2", label: "50–120M FCFA", en: "Medium" },
  { id: "b3", label: "120–500M FCFA", en: "Large" },
  { id: "b4", label: "> 500M FCFA", en: "Enterprise" },
  { id: "b5", label: "Sur devis", en: "Quote" },
];

const ZONES = [
  "Brazzaville",
  "Pointe-Noire",
  "Dolisie",
  "Ouesso",
  "Autre Congo",
  "Hors Congo (Diaspora)",
];
const DELAIS = [
  "Urgent (< 1 mois)",
  "1–3 mois",
  "3–6 mois",
  "6–12 mois",
  "> 1 an / À planifier",
];

function Step1({ data, setData, onNext }) {
  return (
    <div>
      <h3 className="text-white font-bold text-lg mb-4">
        Étape 1 — Type de projet
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setData({ ...data, type: t.id })}
            className={`p-4 rounded-xl border text-left transition-all ${
              data.type === t.id
                ? "border-congo bg-congo/10 text-white"
                : "border-foga-border bg-foga-card text-stitch-grey hover:border-primary"
            }`}
          >
            <div className="text-2xl mb-1">{t.icon}</div>
            <div className="text-sm font-semibold">{t.label}</div>
            <div className="text-xs opacity-60">{t.sub}</div>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!data.type}
        className="w-full bg-primary disabled:opacity-40 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
      >
        Continuer →
      </button>
    </div>
  );
}

function Step2({ data, setData, onNext, onBack }) {
  return (
    <div>
      <h3 className="text-white font-bold text-lg mb-4">
        Étape 2 — Surface & Budget
      </h3>

      <div className="mb-4">
        <label className="text-sm text-stitch-grey mb-2 block">
          {data.type === "engin" ? "Durée de location" : "Surface estimée (m²)"}
        </label>
        <input
          type={data.type === "engin" ? "text" : "number"}
          placeholder={
            data.type === "engin" ? "ex: 5 jours, 2 semaines" : "ex: 200"
          }
          value={data.surface || ""}
          onChange={(e) => setData({ ...data, surface: e.target.value })}
          className="w-full bg-surface border border-foga-border rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="text-sm text-stitch-grey mb-2 block">Budget</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b.id}
              onClick={() => setData({ ...data, budget: b.id })}
              className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                data.budget === b.id
                  ? "border-congo bg-congo/10 text-white font-semibold"
                  : "border-foga-border text-stitch-grey hover:border-primary"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-foga-border text-stitch-grey hover:text-white py-3 rounded-xl text-sm transition-colors"
        >
          ← Retour
        </button>
        <button
          onClick={onNext}
          disabled={!data.budget}
          className="flex-1 bg-primary disabled:opacity-40 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}

function Step3({ data, setData, onSubmit, onBack }) {
  const typeLabel = TYPES.find((t) => t.id === data.type)?.label ?? data.type;
  const budgetLabel =
    BUDGETS.find((b) => b.id === data.budget)?.label ?? data.budget;

  const whatsappMsg = `Mbote! Je souhaite un devis Fogatech BTP.\n\n📋 Type: ${typeLabel}\n📐 Surface/Durée: ${data.surface || "À préciser"}\n💰 Budget: ${budgetLabel}\n📍 Zone: ${data.zone || "À préciser"}\n⏱ Délai: ${data.delai || "À préciser"}`;

  return (
    <div>
      <h3 className="text-white font-bold text-lg mb-4">
        Étape 3 — Zone & Délai
      </h3>

      <div className="mb-4">
        <label className="text-sm text-stitch-grey mb-2 block">
          Zone géographique
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ZONES.map((z) => (
            <button
              key={z}
              onClick={() => setData({ ...data, zone: z })}
              className={`py-2 px-3 rounded-lg border text-sm text-left transition-all ${
                data.zone === z
                  ? "border-savane bg-savane/10 text-white font-semibold"
                  : "border-foga-border text-stitch-grey hover:border-primary"
              }`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm text-stitch-grey mb-2 block">
          Délai souhaité
        </label>
        <div className="grid grid-cols-1 gap-2">
          {DELAIS.map((d) => (
            <button
              key={d}
              onClick={() => setData({ ...data, delai: d })}
              className={`py-2 px-4 rounded-lg border text-sm text-left transition-all ${
                data.delai === d
                  ? "border-congo bg-congo/10 text-white font-semibold"
                  : "border-foga-border text-stitch-grey hover:border-primary"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="border border-foga-border text-stitch-grey hover:text-white px-4 py-3 rounded-xl text-sm transition-colors"
        >
          ← Retour
        </button>
        <a
          href={`https://wa.me/242069610635?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-green-500 text-white font-bold py-3 rounded-xl text-center text-sm transition-colors"
        >
          Envoyer sur WhatsApp →
        </a>
      </div>
      <p className="text-xs text-stitch-grey text-center mt-3">
        Réponse garantie sous 15 minutes · Lun–Sam 7h–19h
      </p>
    </div>
  );
}

function StepDone() {
  return (
    <div className="text-center py-8">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-white font-bold text-xl mb-2">Demande envoyée!</h3>
      <p className="text-stitch-grey text-sm">
        Notre équipe vous répond sous 15 minutes.
      </p>
      <p className="text-savane text-sm mt-1 font-semibold">
        Mokolo na mokolo — Fogatech BTP
      </p>
    </div>
  );
}

export default function Configurateur() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    type: "",
    surface: "",
    budget: "",
    zone: "",
    delai: "",
  });

  return (
    <section id="configurateur" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Votre projet en <span className="text-congo">3 étapes</span>
          </h2>
          <p className="text-stitch-grey">
            Configurez votre projet et recevez un devis personnalisé sous 15
            minutes
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          {step <= 3 && (
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      step > n
                        ? "bg-savane text-white"
                        : step === n
                          ? "bg-congo text-white"
                          : "bg-foga-card border border-foga-border text-stitch-grey"
                    }`}
                  >
                    {step > n ? "✓" : n}
                  </div>
                  {n < 3 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors ${step > n ? "bg-savane" : "bg-foga-border"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="bg-foga-card border border-foga-border rounded-2xl p-6 md:p-8">
            {step === 1 && (
              <Step1 data={data} setData={setData} onNext={() => setStep(2)} />
            )}
            {step === 2 && (
              <Step2
                data={data}
                setData={setData}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3
                data={data}
                setData={setData}
                onSubmit={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && <StepDone />}
          </div>
        </div>
      </div>
    </section>
  );
}
