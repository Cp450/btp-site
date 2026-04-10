import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const STEPS = ["Profil Client", "Détails Projet", "Localisation", "Validation"];

const PROFILES = [
  {
    id: "particulier",
    icon: "person",
    title: "Particulier",
    desc: "Résidences privées, rénovations, petits aménagements et immobiliers individuels.",
  },
  {
    id: "entreprise",
    icon: "corporate_fare",
    title: "Entreprise",
    desc: "Infrastructures logistiques, sièges sociaux, entrepôts et complexes industriels.",
  },
  {
    id: "gouvernement",
    icon: "account_balance",
    title: "Gouvernement",
    desc: "Marchés publics, génie rural, routes et développement de villes intelligentes.",
  },
];

const PROJECT_CATS = [
  "BTP (Construction)",
  "Smart City",
  "Génie Rural",
  "Location Engins",
  "Immobilier",
  "Infrastructure",
];

export default function DemandeDevis() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    profile: "",
    nom: "",
    email: "",
    tel: "",
    categorie: "",
    budget: "",
    description: "",
    ville: "",
    quartier: "",
    surface: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(`${API_URL}/api/devis_requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: form.profile,
          nom: form.nom,
          email: form.email,
          tel: form.tel,
          categorie: form.categorie,
          budget: form.budget,
          description: form.description,
          ville: form.ville,
          quartier: form.quartier,
          surface: form.surface,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        console.error("API error:", error);
        setSubmitError(
          "Erreur lors de l'enregistrement. Votre message WhatsApp sera quand même envoyé.",
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      setSubmitError(
        "Erreur réseau. Votre message WhatsApp sera quand même envoyé.",
      );
    }

    const waMsg = encodeURIComponent(
      `*DEMANDE DE DEVIS — Fogatech BTP*\n\n` +
        `👤 Profil: ${form.profile}\n` +
        `📛 Nom: ${form.nom}\n` +
        `📞 Tél: ${form.tel}\n` +
        `📧 Email: ${form.email}\n\n` +
        `🏗️ Catégorie: ${form.categorie}\n` +
        `💰 Budget: ${form.budget} FCFA\n` +
        `📍 Lieu: ${form.quartier}, ${form.ville}\n` +
        `📐 Surface: ${form.surface} m²\n\n` +
        `📝 Besoin: ${form.description}`,
    );
    window.open(`https://wa.me/242069610635?text=${waMsg}`, "_blank");
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <main className="pt-[72px] min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-[#4CAF50] block mb-6">
            check_circle
          </span>
          <h1 className="font-headline text-3xl font-black text-primary mb-4">
            Devis envoyé !
          </h1>
          <p className="text-on-surface-variant font-body mb-8">
            Votre demande a été transmise. Un expert Fogatech vous contacte sous{" "}
            <strong>48h</strong>.
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-10 py-4 font-headline font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">
      {/* Hero */}
      <section className="relative h-80 flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkl3uhveXBxrUDN578k6kJyfFBVthPRacGDzmQWgN-QkZ_FKFQw1eG2LMEYjk9-HX25l7qK9YKdZvlLdcHt1kJ81JmLFQy7E4mofyvy5H3_i0DBPERtiIh_0w1o9VdTE4EK-_EwWnUoBtFkRIBU90Xi6G7lhmLg5NihwK6wLrXktM-3pba1lHJPUS_JJDGx-1H8DCvb00IQkuEQ1_pgFrOKOKLYtSRgcEnLyYcsRu5Qp2W7XmPwGGbghw7HF-PO83Zt0kkgRnPDn0u"
            alt="Chantier Fogatech"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-container/40" />
        <div className="relative w-full max-w-screen-2xl mx-auto px-8 z-10">
          <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-label font-bold tracking-[0.2em] uppercase mb-4">
            Construction Excellence
          </span>
          <h1 className="font-headline text-5xl md:text-6xl text-white font-black tracking-tighter max-w-3xl leading-none">
            VOTRE PROJET,
            <br />
            NOTRE RIGUEUR.
          </h1>
        </div>
      </section>

      {/* Form area */}
      <section className="relative z-20 pb-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
            {/* Sidebar steps */}
            <aside className="lg:col-span-3">
              <div className="bg-surface-container-low p-8 shadow-card sticky top-28">
                <h3 className="font-label text-xs font-bold tracking-widest text-primary mb-8 uppercase">
                  Étapes de Demande
                </h3>
                <ul className="space-y-6">
                  {STEPS.map((s, i) => (
                    <li
                      key={s}
                      className={`flex items-center gap-4 ${i > step ? "opacity-40" : ""}`}
                    >
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full font-headline font-bold text-sm ${i <= step ? "bg-secondary-container text-on-secondary-container" : "bg-outline-variant text-on-surface"}`}
                      >
                        {i < step ? "✓" : i + 1}
                      </span>
                      <span
                        className={`font-body ${i === step ? "font-bold text-primary" : "font-medium text-on-surface-variant"}`}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Trust block */}
                <div className="mt-10 pt-8 border-t border-outline-variant/30">
                  {[
                    {
                      icon: "lock",
                      text: "Données protégées & confidentielles",
                    },
                    { icon: "schedule", text: "Réponse sous 48h garantie" },
                    {
                      icon: "verified",
                      text: "Devis détaillé sans engagement",
                    },
                  ].map((t) => (
                    <div key={t.text} className="flex items-start gap-3 mb-4">
                      <span className="material-symbols-outlined text-secondary-container text-lg mt-0.5">
                        {t.icon}
                      </span>
                      <p className="text-xs text-on-surface-variant font-body">
                        {t.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main form */}
            <div className="lg:col-span-9 bg-surface-container-lowest p-8 md:p-12 shadow-tectonic">
              {/* Step 0: Profil */}
              {step === 0 && (
                <div>
                  <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                    Choisissez votre profil
                  </h2>
                  <p className="text-on-surface-variant mb-10 font-body">
                    Nous adaptons nos solutions à la nature de votre structure.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {PROFILES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => set("profile", p.id)}
                        className={`group relative flex flex-col p-8 border-2 transition-all text-left h-full ${
                          form.profile === p.id
                            ? "border-secondary-container bg-secondary-container/5"
                            : "border-surface-container hover:border-secondary-container/50 bg-surface-bright"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-4xl mb-6 ${form.profile === p.id ? "text-secondary-container" : "text-primary group-hover:text-secondary-container"} transition-colors`}
                        >
                          {p.icon}
                        </span>
                        <h3 className="font-headline font-bold text-xl text-primary mb-3">
                          {p.title}
                        </h3>
                        <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                          {p.desc}
                        </p>
                        <div
                          className={`mt-8 flex items-center text-xs font-label font-bold uppercase tracking-widest ${form.profile === p.id ? "text-secondary-container" : "text-secondary opacity-0 group-hover:opacity-100"} transition-all`}
                        >
                          {form.profile === p.id
                            ? "Sélectionné ✓"
                            : "Sélectionner →"}
                        </div>
                      </button>
                    ))}
                  </div>

                  <hr className="border-surface-container my-8" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    {[
                      {
                        k: "nom",
                        label: "Nom complet *",
                        placeholder: "Jean Dupont",
                        type: "text",
                      },
                      {
                        k: "tel",
                        label: "Téléphone *",
                        placeholder: "+242 06 --- ---",
                        type: "tel",
                      },
                      {
                        k: "email",
                        label: "Email",
                        placeholder: "vous@exemple.com",
                        type: "email",
                      },
                    ].map((f) => (
                      <div key={f.k} className="flex flex-col gap-2">
                        <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          value={form[f.k]}
                          onChange={(e) => set(f.k, e.target.value)}
                          placeholder={f.placeholder}
                          className="bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary px-4 py-4 text-sm outline-none transition-all font-body rounded-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Détails Projet */}
              {step === 1 && (
                <div>
                  <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                    Détails du projet
                  </h2>
                  <p className="text-on-surface-variant mb-10 font-body">
                    Décrivez votre besoin pour recevoir un devis précis.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="md:col-span-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-3">
                        Catégorie de Projet
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {PROJECT_CATS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => set("categorie", c)}
                            className={`px-4 py-2 text-xs font-label font-bold rounded-full transition-colors ${form.categorie === c ? "bg-primary text-white" : "bg-surface-container-high text-primary hover:bg-outline-variant"}`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Budget Estimé (FCFA)
                      </label>
                      <input
                        type="number"
                        value={form.budget}
                        onChange={(e) => set("budget", e.target.value)}
                        placeholder="Ex: 50 000 000"
                        className="bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary px-4 py-4 text-sm outline-none transition-all font-body rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Surface (m²)
                      </label>
                      <input
                        type="number"
                        value={form.surface}
                        onChange={(e) => set("surface", e.target.value)}
                        placeholder="Ex: 500"
                        className="bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary px-4 py-4 text-sm outline-none transition-all font-body rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Description du besoin *
                      </label>
                      <textarea
                        rows={4}
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        placeholder="Décrivez les objectifs et contraintes de votre projet..."
                        className="bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary px-4 py-4 text-sm outline-none transition-all font-body resize-none rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Localisation */}
              {step === 2 && (
                <div>
                  <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                    Localisation du projet
                  </h2>
                  <p className="text-on-surface-variant mb-10 font-body">
                    Précisez où se déroulera votre projet au Congo-Brazzaville.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="flex flex-col gap-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Ville *
                      </label>
                      <select
                        value={form.ville}
                        onChange={(e) => set("ville", e.target.value)}
                        className="bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary px-4 py-4 text-sm outline-none font-body rounded-sm"
                      >
                        <option value="">Sélectionner…</option>
                        {[
                          "Brazzaville",
                          "Pointe-Noire",
                          "Dolisie",
                          "Ouésso",
                          "Impfondo",
                          "Madingou",
                          "Autres",
                        ].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Quartier / Zone
                      </label>
                      <input
                        value={form.quartier}
                        onChange={(e) => set("quartier", e.target.value)}
                        placeholder="Ex: Bacongo, Moungali, Massina…"
                        className="bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary px-4 py-4 text-sm outline-none transition-all font-body rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Validation */}
              {step === 3 && (
                <div>
                  <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                    Validation
                  </h2>
                  <p className="text-on-surface-variant mb-10 font-body">
                    Vérifiez vos informations avant d'envoyer.
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Profil", val: form.profile },
                      { label: "Nom", val: form.nom },
                      { label: "Téléphone", val: form.tel },
                      { label: "Email", val: form.email },
                      { label: "Catégorie", val: form.categorie },
                      {
                        label: "Budget",
                        val: form.budget ? `${form.budget} FCFA` : "—",
                      },
                      {
                        label: "Localisation",
                        val:
                          [form.quartier, form.ville]
                            .filter(Boolean)
                            .join(", ") || "—",
                      },
                      {
                        label: "Surface",
                        val: form.surface ? `${form.surface} m²` : "—",
                      },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex items-baseline justify-between py-3 border-b border-surface-container"
                      >
                        <span className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                          {r.label}
                        </span>
                        <span className="font-body font-semibold text-primary text-sm">
                          {r.val || "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                  {form.description && (
                    <div className="mt-6 p-4 bg-surface-container-low rounded">
                      <p className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                        Description
                      </p>
                      <p className="text-sm text-on-surface font-body leading-relaxed">
                        {form.description}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Submit error feedback */}
              {submitError && (
                <div className="mt-8 p-4 bg-error-container border border-error/30 rounded flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-lg mt-0.5 flex-shrink-0">
                    error
                  </span>
                  <p className="text-sm text-on-error-container font-body">
                    {submitError}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container">
                    lock
                  </span>
                  <p className="text-xs text-on-surface-variant font-body max-w-xs">
                    Données protégées par notre politique de confidentialité.
                  </p>
                </div>
                <div className="flex gap-4">
                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="px-8 py-4 border border-outline-variant text-primary font-headline font-bold uppercase tracking-widest text-xs hover:bg-surface-container transition-colors"
                    >
                      Retour
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={
                        (step === 0 &&
                          (!form.profile || !form.nom || !form.tel)) ||
                        (step === 1 && !form.categorie) ||
                        (step === 2 && !form.ville)
                      }
                      className="bg-primary disabled:opacity-40 text-white font-headline font-black px-12 py-4 group flex items-center gap-4 hover:bg-secondary-container hover:text-on-secondary-container transition-all uppercase tracking-widest text-xs"
                    >
                      Étape suivante
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-secondary-container text-on-secondary-container font-headline font-black px-12 py-4 flex items-center gap-4 hover:bg-secondary hover:text-white transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                      {submitting ? "Envoi…" : "Envoyer mon devis"}
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "98%", label: "Projets livrés dans les délais" },
            { val: "15+", label: "Départements couverts au Congo" },
            { val: "BIM", label: "Modélisation 3D avancée" },
            { val: "ISO", label: "Normes qualité internationales" },
          ].map((s) => (
            <div
              key={s.label}
              className="border-l-4 border-secondary-container pl-6"
            >
              <h4 className="font-headline font-black text-3xl mb-1">
                {s.val}
              </h4>
              <p className="text-on-primary-container font-body text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
