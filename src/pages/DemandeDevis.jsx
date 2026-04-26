import { useState } from "react";
import { cn } from "../lib/cn";
import { IMG_HERO_DEVIS } from "../lib/images";
import SEO from "../components/SEO";

const API_URL = import.meta.env.VITE_API_URL || "";

const STEPS = ["Profil", "Contact", "Projet", "Localisation", "Confirmation"];

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

const BUDGET_OPTIONS = [
  { value: "", label: "Sélectionner un budget…" },
  { value: "< 5M CFA", label: "Moins de 5 millions CFA" },
  { value: "5-20M CFA", label: "5 à 20 millions CFA" },
  { value: "20-100M CFA", label: "20 à 100 millions CFA" },
  { value: "> 100M CFA", label: "Plus de 100 millions CFA" },
];

// Shared input class base — apply focus ring via cn()
const INPUT_BASE =
  "bg-surface-container-high border-b-2 border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary px-4 py-4 text-sm transition-all font-body rounded-sm w-full";

export default function DemandeDevis() {
  const [step, setStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});
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
  const [redirecting, setRedirecting] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    if (fieldErrors[k]) {
      setFieldErrors((e) => ({ ...e, [k]: false }));
    }
  }

  function validateStep(s) {
    const errors = {};
    if (s === 0) {
      if (!form.profile) errors.profile = true;
    }
    if (s === 1) {
      if (!form.nom) errors.nom = true;
      if (!form.tel) errors.tel = true;
    }
    if (s === 2) {
      if (!form.categorie) errors.categorie = true;
    }
    if (s === 3) {
      if (!form.ville) errors.ville = true;
    }
    return errors;
  }

  function advance() {
    const errors = validateStep(step);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");

    if (!API_URL) {
      console.warn("VITE_API_URL non défini — envoi direct WhatsApp sans appel API.");
    } else {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      try {
        const res = await fetch(`${API_URL}/api/devis_requests`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
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
          setSubmitError("Erreur serveur. Demande envoyée sur WhatsApp.");
        }
      } catch (err) {
        if (err.name === "AbortError") {
          setSubmitError("Le serveur met trop de temps à répondre. Votre demande a été envoyée sur WhatsApp.");
        } else {
          console.error("Network error:", err);
          setSubmitError("Connexion impossible. Demande envoyée sur WhatsApp.");
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    const waMsg = encodeURIComponent(
      `*DEMANDE DE DEVIS — Fogatech BTP*\n\n` +
        `Profil: ${form.profile}\n` +
        `Nom: ${form.nom}\n` +
        `Tel: ${form.tel}\n` +
        `Email: ${form.email}\n\n` +
        `Categorie: ${form.categorie}\n` +
        `Budget: ${form.budget}\n` +
        `Lieu: ${form.quartier}, ${form.ville}\n` +
        `Surface: ${form.surface} m2\n\n` +
        `Besoin: ${form.description}`,
    );
    const url = `https://wa.me/242069610635?text=${waMsg}`;
    setWaUrl(url);
    setSubmitting(false);
    setRedirecting(true);
    setTimeout(() => window.open(url, "_blank"), 300);
  }

  // ── D-4: WhatsApp redirect transition screen ─────────────────────────────
  if (redirecting) {
    return (
      <main className="pt-[72px] min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h1 className="font-headline text-2xl font-black text-primary mb-3">Ouverture de WhatsApp…</h1>
          <p className="text-on-surface-variant font-body text-sm">
            Votre navigateur va ouvrir WhatsApp avec votre demande pré-remplie.{" "}
            Si l'application ne s'ouvre pas,{" "}
            <a href={waUrl} className="text-primary underline">cliquez ici</a>.
          </p>
        </div>
      </main>
    );
  }

  // ── D-5: Success screen ───────────────────────────────────────────────────
  if (done) {
    const waMsg = encodeURIComponent(
      `*DEMANDE DE DEVIS — Fogatech BTP*\n\n` +
        `Profil: ${form.profile}\n` +
        `Nom: ${form.nom}\n` +
        `Tel: ${form.tel}\n` +
        `Email: ${form.email}\n\n` +
        `Categorie: ${form.categorie}\n` +
        `Budget: ${form.budget}\n` +
        `Lieu: ${form.quartier}, ${form.ville}\n` +
        `Surface: ${form.surface} m2\n\n` +
        `Besoin: ${form.description}`,
    );
    return (
      <main className="pt-[72px] min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="bg-surface-container-low rounded-xl p-8 text-center max-w-md w-full animate-fade-slide-up">
          <span className="material-symbols-outlined text-5xl text-success block mb-6">
            check_circle
          </span>
          <h2 className="font-headline text-3xl font-black text-primary mb-4">
            Demande envoyée !
          </h2>
          <p className="text-on-surface-variant font-body mb-8">
            Notre équipe vous contacte dans les 24h.
          </p>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/242069610635?text=${waMsg}`,
                "_blank",
              )
            }
            className="inline-flex items-center gap-3 bg-secondary-container text-on-secondary-container font-headline font-bold px-8 py-4 uppercase tracking-widest text-xs hover:bg-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            Parler à un expert maintenant
          </button>
          <div className="mt-6">
            <a
              href="/"
              className="text-sm text-primary underline hover:text-secondary transition-colors"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">
      <SEO
        title="Demande de devis BTP"
        description="Recevez un devis personnalisé sous 24h pour votre projet BTP au Congo. Villa, immeuble, route, location d'engins — Fogatech BTP répond en moins de 24h."
        canonical="https://fogatech.cg/devis"
      />
      {/* Hero */}
      <section className="relative h-80 flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-40">
          <img
            src={IMG_HERO_DEVIS}
            alt="Chantier Fogatech BTP en construction"
            className="w-full h-full object-cover"
            loading="eager"
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
            {/* Sidebar trust block */}
            <aside className="lg:col-span-3">
              <div className="bg-surface-container-low p-8 shadow-card sticky top-28">
                <h3 className="font-label text-xs font-bold tracking-widest text-primary mb-8 uppercase">
                  Pourquoi Fogatech
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: "lock",
                      text: "Données protégées et confidentielles",
                    },
                    { icon: "schedule", text: "Réponse sous 24h garantie" },
                    {
                      icon: "verified",
                      text: "Devis détaillé sans engagement",
                    },
                  ].map((t) => (
                    <div key={t.text} className="flex items-start gap-3">
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
            <div className="lg:col-span-9">
              {/* D-1: Horizontal progress stepper */}
              <nav
                aria-label="Étapes du formulaire"
                className="mb-10 bg-surface-container-low p-6"
              >
                <ol className="flex items-center">
                  {STEPS.map((label, i) => {
                    const isCompleted = i < step;
                    const isCurrent = i === step;
                    return (
                      <li
                        key={label}
                        className="flex items-center flex-1 last:flex-none"
                      >
                        {/* Step circle + label */}
                        <div className="flex flex-col items-center gap-2 min-w-0">
                          <span
                            aria-current={isCurrent ? "step" : undefined}
                            className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full font-headline font-bold text-sm flex-shrink-0 transition-colors",
                              isCompleted &&
                                "bg-secondary-container text-on-secondary-container",
                              isCurrent && "bg-primary text-on-primary",
                              !isCompleted &&
                                !isCurrent &&
                                "bg-outline-variant text-on-surface-variant",
                            )}
                          >
                            {isCompleted ? (
                              <span className="material-symbols-outlined text-sm">
                                check
                              </span>
                            ) : (
                              i + 1
                            )}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-label font-medium text-center transition-colors",
                              /* Mobile: hide non-current labels */
                              !isCurrent && "hidden sm:block",
                              isCompleted &&
                                "text-on-surface line-through opacity-60",
                              isCurrent && "text-primary font-bold",
                              !isCompleted &&
                                !isCurrent &&
                                "text-on-surface-variant",
                            )}
                          >
                            {label}
                          </span>
                        </div>
                        {/* Connector line — not after last step */}
                        {i < STEPS.length - 1 && (
                          <div className="flex-1 mx-3 mb-5">
                            <div
                              className={cn(
                                "h-px transition-colors",
                                isCompleted
                                  ? "bg-secondary-container"
                                  : "bg-outline-variant",
                              )}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <div className="bg-surface-container-lowest p-8 md:p-12 shadow-tectonic">
                {/* Step 0 — Profile selection only */}
                {step === 0 && (
                  <div>
                    <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                      Choisissez votre profil
                    </h2>
                    <p className="text-on-surface-variant mb-10 font-body">
                      Nous adaptons nos solutions à la nature de votre
                      structure.
                    </p>
                    <div
                      role="radiogroup"
                      aria-label="Type de profil client"
                      className={cn(
                        "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12",
                        fieldErrors.profile &&
                          "ring-2 ring-error/30 rounded-sm p-1",
                      )}
                    >
                      {PROFILES.map((p) => {
                        const isSelected = form.profile === p.id;
                        return (
                          <button
                            key={p.id}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            onClick={() => set("profile", p.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                set("profile", p.id);
                              }
                            }}
                            className={cn(
                              "group relative flex flex-col p-8 border-2 transition-all text-left h-full focus:outline-none focus:ring-2 focus:ring-primary",
                              isSelected
                                ? "border-secondary-container bg-primary-container/20"
                                : "border-outline-variant hover:border-primary bg-surface-bright",
                            )}
                          >
                            <span
                              className={cn(
                                "material-symbols-outlined text-3xl mb-6 transition-colors",
                                isSelected
                                  ? "text-secondary-container"
                                  : "text-primary group-hover:text-secondary-container",
                              )}
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
                              className={cn(
                                "mt-8 flex items-center text-xs font-label font-bold uppercase tracking-widest transition-all",
                                isSelected
                                  ? "text-secondary-container"
                                  : "text-secondary opacity-0 group-hover:opacity-100",
                              )}
                            >
                              {isSelected ? "Selectionne" : "Selectionner"}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {fieldErrors.profile && (
                      <p className="text-xs text-error font-body">
                        Veuillez sélectionner un profil.
                      </p>
                    )}
                  </div>
                )}

                {/* Step 1 — Contact fields */}
                {step === 1 && (
                  <div>
                    <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                      Vos coordonnées
                    </h2>
                    <p className="text-on-surface-variant mb-10 font-body">
                      Comment pouvons-nous vous joindre pour votre devis ?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="nom"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Nom complet *
                        </label>
                        <input
                          id="nom"
                          type="text"
                          value={form.nom}
                          onChange={(e) => set("nom", e.target.value)}
                          placeholder="Jean Dupont"
                          className={cn(
                            INPUT_BASE,
                            fieldErrors.nom && "border-error ring-2 ring-error/30",
                          )}
                        />
                        {fieldErrors.nom && (
                          <p className="text-xs text-error font-body">
                            Ce champ est requis.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="tel"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Téléphone *
                        </label>
                        <input
                          id="tel"
                          type="tel"
                          inputMode="tel"
                          value={form.tel}
                          onChange={(e) => set("tel", e.target.value)}
                          placeholder="+242 0X XX XX XX"
                          className={cn(
                            INPUT_BASE,
                            fieldErrors.tel && "border-error ring-2 ring-error/30",
                          )}
                        />
                        {fieldErrors.tel && (
                          <p className="text-xs text-error font-body">
                            Ce champ est requis.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="vous@exemple.com"
                          className={INPUT_BASE}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 — Détails Projet */}
                {step === 2 && (
                  <div>
                    <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                      Détails du projet
                    </h2>
                    <p className="text-on-surface-variant mb-10 font-body">
                      Décrivez votre besoin pour recevoir un devis précis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                      {/* D-3: Category group with error state */}
                      <div className="md:col-span-2">
                        <label
                          id="categorie-label"
                          className={cn(
                            "font-label text-xs font-bold uppercase tracking-wider block mb-3",
                            fieldErrors.categorie
                              ? "text-error"
                              : "text-on-surface-variant",
                          )}
                        >
                          Catégorie de Projet *
                        </label>
                        <div
                          role="group"
                          aria-labelledby="categorie-label"
                          className="flex flex-wrap gap-3"
                        >
                          {PROJECT_CATS.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => set("categorie", c)}
                              className={cn(
                                "px-4 py-2 text-xs font-label font-bold rounded-full transition-colors",
                                form.categorie === c
                                  ? "bg-primary text-white"
                                  : "bg-surface-container-high text-primary hover:bg-outline-variant",
                              )}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                        {fieldErrors.categorie && (
                          <p className="mt-2 text-xs text-error font-body">
                            Veuillez sélectionner une catégorie.
                          </p>
                        )}
                      </div>

                      {/* D-3: Budget as select with CFA options */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="budget"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Budget Estimé
                        </label>
                        <select
                          id="budget"
                          value={form.budget}
                          onChange={(e) => set("budget", e.target.value)}
                          className={INPUT_BASE}
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="surface"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Surface (m²)
                        </label>
                        <input
                          id="surface"
                          type="number"
                          value={form.surface}
                          onChange={(e) => set("surface", e.target.value)}
                          placeholder="Ex: 500"
                          className={INPUT_BASE}
                        />
                      </div>

                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label
                          htmlFor="description"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Description du besoin *
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          value={form.description}
                          onChange={(e) => set("description", e.target.value)}
                          placeholder="Décrivez les objectifs et contraintes de votre projet..."
                          className={cn(INPUT_BASE, "resize-none")}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Localisation */}
                {step === 3 && (
                  <div>
                    <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                      Localisation du projet
                    </h2>
                    <p className="text-on-surface-variant mb-10 font-body">
                      Précisez où se déroulera votre projet au Congo-Brazzaville.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="ville"
                          className={cn(
                            "font-label text-xs font-bold uppercase tracking-wider",
                            fieldErrors.ville
                              ? "text-error"
                              : "text-on-surface-variant",
                          )}
                        >
                          Ville *
                        </label>
                        <select
                          id="ville"
                          value={form.ville}
                          onChange={(e) => set("ville", e.target.value)}
                          className={cn(
                            INPUT_BASE,
                            fieldErrors.ville &&
                              "border-error ring-2 ring-error/30",
                          )}
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
                        {fieldErrors.ville && (
                          <p className="text-xs text-error font-body">
                            Veuillez sélectionner une ville.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="quartier"
                          className="font-label text-xs font-bold uppercase tracking-wider text-on-surface-variant"
                        >
                          Quartier / Zone
                        </label>
                        <input
                          id="quartier"
                          value={form.quartier}
                          onChange={(e) => set("quartier", e.target.value)}
                          placeholder="Ex: Bacongo, Moungali, Massina…"
                          className={INPUT_BASE}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4 — Confirmation/Validation with Modifier buttons */}
                {step === 4 && (
                  <div>
                    <h2 className="font-headline text-3xl font-black text-primary mb-2 tracking-tight">
                      Validation
                    </h2>
                    <p className="text-on-surface-variant mb-10 font-body">
                      Vérifiez vos informations avant d'envoyer.
                    </p>

                    {/* Section: Profil Client */}
                    <div className="bg-surface-container rounded-lg p-4 space-y-3 mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                          Profil Client
                        </h3>
                        <button
                          onClick={() => setStep(0)}
                          className="text-sm text-primary underline hover:text-secondary transition-colors"
                        >
                          Modifier
                        </button>
                      </div>
                      {[
                        { label: "Profil", val: form.profile },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">
                            {r.label}
                          </span>
                          <span className="text-on-surface font-medium">
                            {r.val || "—"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Section: Contact */}
                    <div className="bg-surface-container rounded-lg p-4 space-y-3 mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                          Contact
                        </h3>
                        <button
                          onClick={() => setStep(1)}
                          className="text-sm text-primary underline hover:text-secondary transition-colors"
                        >
                          Modifier
                        </button>
                      </div>
                      {[
                        { label: "Nom", val: form.nom },
                        { label: "Téléphone", val: form.tel },
                        { label: "Email", val: form.email || "—" },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">
                            {r.label}
                          </span>
                          <span className="text-on-surface font-medium">
                            {r.val || "—"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Section: Détails Projet */}
                    <div className="bg-surface-container rounded-lg p-4 space-y-3 mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                          Détails Projet
                        </h3>
                        <button
                          onClick={() => setStep(2)}
                          className="text-sm text-primary underline hover:text-secondary transition-colors"
                        >
                          Modifier
                        </button>
                      </div>
                      {[
                        { label: "Catégorie", val: form.categorie },
                        { label: "Budget", val: form.budget || "—" },
                        {
                          label: "Surface",
                          val: form.surface ? `${form.surface} m²` : "—",
                        },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">
                            {r.label}
                          </span>
                          <span className="text-on-surface font-medium">
                            {r.val || "—"}
                          </span>
                        </div>
                      ))}
                      {form.description && (
                        <div className="pt-2 border-t border-surface-container-high">
                          <p className="text-xs text-on-surface-variant mb-1">
                            Description
                          </p>
                          <p className="text-sm text-on-surface font-body leading-relaxed">
                            {form.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Section: Localisation */}
                    <div className="bg-surface-container rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                          Localisation
                        </h3>
                        <button
                          onClick={() => setStep(3)}
                          className="text-sm text-primary underline hover:text-secondary transition-colors"
                        >
                          Modifier
                        </button>
                      </div>
                      {[
                        { label: "Ville", val: form.ville },
                        { label: "Quartier", val: form.quartier || "—" },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between text-sm">
                          <span className="text-on-surface-variant">
                            {r.label}
                          </span>
                          <span className="text-on-surface font-medium">
                            {r.val || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* D-5: Submit error with retry */}
                {submitError && (
                  <div className="mt-8 bg-error-container text-on-error-container rounded-lg p-3 flex items-start gap-3">
                    <span className="material-symbols-outlined text-lg mt-0.5 flex-shrink-0">
                      error
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-body">{submitError}</p>
                      <button
                        onClick={handleSubmit}
                        className="mt-2 text-xs font-label font-bold underline hover:no-underline transition-all"
                      >
                        Réessayer
                      </button>
                    </div>
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
                    {step < 4 ? (
                      <button
                        onClick={advance}
                        className="bg-primary text-white font-headline font-black px-12 py-4 group flex items-center gap-4 hover:bg-secondary-container hover:text-on-secondary-container transition-all uppercase tracking-widest text-xs"
                      >
                        Étape suivante
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </button>
                    ) : (
                      // D-5: Submit with spinner
                      <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="bg-secondary-container text-on-secondary-container font-headline font-black px-12 py-4 flex items-center gap-3 hover:bg-secondary hover:text-white transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <span className="inline-block w-4 h-4 border-2 border-on-secondary-container/30 border-t-on-secondary-container rounded-full animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            Envoyer mon devis
                            <span className="material-symbols-outlined text-base">
                              send
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
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
