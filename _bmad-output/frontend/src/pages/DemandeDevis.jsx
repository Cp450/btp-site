import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const API_URL = import.meta.env.VITE_API_URL || "";

/* ── Data ──────────────────────────────────────────────────────────────────── */

const PROFILES = [
  {
    id: "Un particulier",
    key: "A",
    icon: "person",
    label: "Un particulier",
    desc: "Villa, rénovation, aménagement privé",
  },
  {
    id: "Une entreprise",
    key: "B",
    icon: "corporate_fare",
    label: "Une entreprise",
    desc: "Entrepôt, siège, infrastructure logistique",
  },
  {
    id: "Une institution",
    key: "C",
    icon: "account_balance",
    label: "Une institution",
    desc: "Marché public, école, route, génie rural",
  },
];

const TRAVAUX = [
  { id: "BTP / Gros oeuvre", icon: "construction", label: "BTP / Gros oeuvre" },
  { id: "Voirie & VRD", icon: "route", label: "Voirie & VRD" },
  { id: "Genie Rural", icon: "agriculture", label: "Génie Rural" },
  { id: "Location d'engins", icon: "local_shipping", label: "Location d'engins" },
  { id: "Energie & Industrie", icon: "bolt", label: "Énergie & Industrie" },
  { id: "Hydraulique", icon: "water_drop", label: "Hydraulique" },
];

const VILLES = [
  "Brazzaville",
  "Pointe-Noire",
  "Dolisie",
  "Ouésso",
  "Impfondo",
  "Madingou",
  "Autre",
];

/* ── Styles helpers ────────────────────────────────────────────────────────── */

const INPUT_DARK =
  "bg-white/5 border border-white/15 text-white rounded-xl px-5 py-4 w-full focus:border-secondary-container focus:outline-none font-body text-lg placeholder:text-white/30 transition-colors";

/* ── WhatsApp message builder ──────────────────────────────────────────────── */

function buildWaMsg(form) {
  const sep = "━━━━━━━━━━━━━━━━━━━";
  const lieu = [form.zone, form.ville].filter(Boolean).join(", ") || "—";
  return encodeURIComponent(
    "📋 *DEMANDE DE DEVIS*\n" +
    "_Foga-Tech International · Congo-Brazzaville_\n" +
    sep + "\n\n" +
    "👤 *DEMANDEUR*\n" +
    "Prénom · " + (form.prenom || "—") + "\n" +
    "Tél · " + (form.tel || "—") + "\n\n" +
    "🏗️ *PROJET*\n" +
    "Profil · " + (form.profile || "—") + "\n" +
    "Travaux · " + (form.categorie || "—") + "\n\n" +
    "📍 *LOCALISATION*\n" +
    "Lieu · " + lieu + "\n\n" +
    (form.description
      ? "💬 *DESCRIPTION*\n" + form.description + "\n\n"
      : "") +
    sep + "\n" +
    "_Envoyé via fogatech.cg/devis_"
  );
}

/* ── Tile component ────────────────────────────────────────────────────────── */

function Tile({ selected, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border-2 p-8 text-left cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-container/50",
        selected
          ? "border-secondary-container ring-2 ring-secondary-container/30 bg-secondary-container/10"
          : "border-white/10 bg-white/5 hover:border-secondary-container hover:bg-white/10",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ── Main component ────────────────────────────────────────────────────────── */

export default function DemandeDevis() {
  const [question, setQuestion] = useState(0); // 0..5
  const [form, setForm] = useState({
    profile: "",
    categorie: "",
    ville: "",
    zone: "",
    prenom: "",
    tel: "",
    description: "",
  });
  const [direction, setDirection] = useState("forward");
  const [animating, setAnimating] = useState(false);

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const goTo = useCallback(
    (next) => {
      if (animating) return;
      setDirection(next > question ? "forward" : "back");
      setAnimating(true);
      setTimeout(() => {
        setQuestion(next);
        setAnimating(false);
      }, 400);
    },
    [animating, question]
  );

  function advance() {
    if (question < 5) goTo(question + 1);
  }

  function goBack() {
    if (question > 0) goTo(question - 1);
  }

  /* Keyboard shortcuts */
  useEffect(() => {
    function handleKey(e) {
      /* Q1 — A/B/C to select profile */
      if (question === 0) {
        const map = { a: "Un particulier", b: "Une entreprise", c: "Une institution" };
        const val = map[e.key.toLowerCase()];
        if (val) {
          setField("profile", val);
          setTimeout(() => goTo(1), 400);
          return;
        }
      }
      /* Q2 — A-F to select travaux */
      if (question === 1) {
        const keys = ["a", "b", "c", "d", "e", "f"];
        const idx = keys.indexOf(e.key.toLowerCase());
        if (idx !== -1 && TRAVAUX[idx]) {
          setField("categorie", TRAVAUX[idx].id);
          setTimeout(() => goTo(2), 400);
          return;
        }
      }
      if (e.key === "Enter") advance();
      if (e.key === "Backspace" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        goBack();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, form]);

  /* Submit logic */
  async function handleSubmit() {
    const waMsg = buildWaMsg(form);
    const waUrl = "https://wa.me/242069610635?text=" + waMsg;

    /* Silently attempt API save */
    if (API_URL) {
      try {
        await fetch(API_URL + "/api/devis_requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } catch {
        /* silent */
      }
    }

    goTo(6);
    setTimeout(() => window.open(waUrl, "_blank"), 300);
  }

  /* Progress bar width — 6 écrans au total (Q0→Q5 recap→Q6 confirmation) */
  const progress = (question / 6) * 100;

  /* Animation classes */
  const slideClass = animating
    ? direction === "forward"
      ? "-translate-x-8 opacity-0"
      : "translate-x-8 opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className="relative min-h-screen bg-[#001022] text-white overflow-hidden">
      <SEO
        title="Demander un devis BTP — Foga-Tech International"
        description="Obtenez un devis gratuit sous 24h pour votre projet BTP au Congo. Construction, génie rural, location d'engins — réponse WhatsApp garantie."
        canonical="https://fogatech.cg/devis"
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/10">
        <div
          className="h-full bg-secondary-container transition-all duration-500 ease-out"
          style={{ width: progress + "%" }}
          role="progressbar"
          aria-valuenow={question}
          aria-valuemax={5}
          aria-label="Progression du formulaire"
        />
      </div>

      {/* Questions container */}
      <div
        className={"flex flex-col items-center justify-center min-h-screen px-6 py-24 transition-all duration-400 ease-out " + slideClass}
      >

        {/* ── Q0 — Profil ──────────────────────────────────────────────────── */}
        {question === 0 && (
          <section className="w-full max-w-4xl">
            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] text-center mb-12"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Votre projet, c&apos;est pour...
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PROFILES.map((p) => (
                <Tile
                  key={p.id}
                  selected={form.profile === p.id}
                  onClick={() => {
                    setField("profile", p.id);
                    setTimeout(() => goTo(1), 400);
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="material-symbols-outlined text-4xl text-secondary-container">
                      {p.icon}
                    </span>
                    <span className="text-xs font-headline font-black text-white/30 border border-white/20 rounded-md px-2 py-0.5">
                      {p.key}
                    </span>
                  </div>
                  <p className="font-headline font-black text-xl text-white mb-2">
                    {p.label}
                  </p>
                  <p className="font-body text-sm text-white/50 leading-relaxed">
                    {p.desc}
                  </p>
                </Tile>
              ))}
            </div>
          </section>
        )}

        {/* ── Q1 — Type de travaux ─────────────────────────────────────────── */}
        {question === 1 && (
          <section className="w-full max-w-3xl">
            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] text-center mb-12"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Quel type de travaux&nbsp;?
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TRAVAUX.map((t, i) => {
                const keys = ["A", "B", "C", "D", "E", "F"];
                return (
                  <Tile
                    key={t.id}
                    selected={form.categorie === t.id}
                    onClick={() => {
                      setField("categorie", t.id);
                      setTimeout(() => goTo(2), 400);
                    }}
                    className="flex flex-col items-center text-center py-8 px-4"
                  >
                    <div className="flex items-start justify-end w-full mb-2">
                      <span className="text-xs font-headline font-black text-white/30 border border-white/20 rounded-md px-1.5 py-0.5">
                        {keys[i]}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-3xl text-secondary-container mb-3">
                      {t.icon}
                    </span>
                    <p className="font-body text-sm text-white/80 leading-snug">
                      {t.label}
                    </p>
                  </Tile>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Q2 — Localisation ────────────────────────────────────────────── */}
        {question === 2 && (
          <section className="w-full max-w-lg">
            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] text-center mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Votre chantier est...
            </h1>
            <p className="font-body text-white/50 text-center text-lg mb-10">
              où exactement&nbsp;?
            </p>
            <div className="flex flex-col gap-4">
              <select
                value={form.ville}
                onChange={(e) => setField("ville", e.target.value)}
                className={INPUT_DARK + " appearance-none"}
                aria-label="Ville du chantier"
              >
                <option value="">Sélectionnez une ville…</option>
                {VILLES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={form.zone}
                onChange={(e) => setField("zone", e.target.value)}
                placeholder="Quartier, zone ou commune..."
                className={INPUT_DARK}
                aria-label="Quartier ou zone"
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={advance}
                className="bg-secondary-container text-on-secondary-container font-headline font-black px-8 py-4 rounded-2xl hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest"
              >
                Continuer →
              </button>
            </div>
          </section>
        )}

        {/* ── Q3 — Contact ─────────────────────────────────────────────────── */}
        {question === 3 && (
          <section className="w-full max-w-lg">
            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] text-center mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              On se rappelle comment&nbsp;?
            </h1>
            <p className="font-body text-white/50 text-center text-lg mb-10">
              Juste l&apos;essentiel — on n&apos;envoie pas de spam.
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={form.prenom}
                onChange={(e) => setField("prenom", e.target.value)}
                placeholder="Votre prénom"
                required
                className={INPUT_DARK}
                aria-label="Prénom"
              />
              <input
                type="tel"
                inputMode="tel"
                value={form.tel}
                onChange={(e) => setField("tel", e.target.value)}
                placeholder="+242 0X XX XX XX"
                required
                className={INPUT_DARK}
                aria-label="Téléphone"
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => {
                  if (!form.prenom || !form.tel) return;
                  advance();
                }}
                className="bg-secondary-container text-on-secondary-container font-headline font-black px-8 py-4 rounded-2xl hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest"
              >
                Continuer →
              </button>
            </div>
          </section>
        )}

        {/* ── Q4 — Description (optionnel) ─────────────────────────────────── */}
        {question === 4 && (
          <section className="w-full max-w-lg">
            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] text-center mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Un mot sur votre projet&nbsp;?
            </h1>
            <p className="font-body text-white/50 text-center text-lg mb-10">
              Optionnel — décrivez en quelques mots votre besoin.
            </p>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Ex: Construction d'un hangar de 1500 m² à Brazzaville, livraison avant juillet..."
              className={INPUT_DARK + " resize-none"}
              aria-label="Description du projet"
            />
            <div className="flex justify-between mt-8 gap-4">
              <button
                type="button"
                onClick={() => goTo(5)}
                className="font-headline font-bold text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest px-6 py-4"
              >
                Passer →
              </button>
              <button
                type="button"
                onClick={() => goTo(5)}
                className="bg-secondary-container text-on-secondary-container font-headline font-black px-8 py-4 rounded-2xl hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest"
              >
                Vérifier →
              </button>
            </div>
          </section>
        )}

        {/* ── Q5 — Récapitulatif ───────────────────────────────────────────── */}
        {question === 5 && (
          <section className="w-full max-w-lg">
            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] text-center mb-3"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Voici votre demande.
            </h1>
            <p className="font-body text-white/50 text-center text-base mb-10">
              Vérifiez avant d&apos;envoyer — vous pouvez modifier chaque section.
            </p>

            {/* Document card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
              {[
                {
                  icon: "person",
                  label: "Profil",
                  value: form.profile || "—",
                  goTo: 0,
                },
                {
                  icon: "construction",
                  label: "Travaux",
                  value: form.categorie || "—",
                  goTo: 1,
                },
                {
                  icon: "location_on",
                  label: "Chantier",
                  value: [form.zone, form.ville].filter(Boolean).join(", ") || "—",
                  goTo: 2,
                },
                {
                  icon: "phone",
                  label: "Contact",
                  value: form.prenom
                    ? form.prenom + " · " + form.tel
                    : form.tel || "—",
                  goTo: 3,
                },
                {
                  icon: "notes",
                  label: "Description",
                  value: form.description || "Non précisé",
                  goTo: 4,
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex items-start justify-between gap-4 px-6 py-4 ${
                    i < arr.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span
                      className="material-symbols-outlined text-secondary-container text-base mt-0.5 shrink-0"
                      aria-hidden="true"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {row.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-label font-bold text-[10px] uppercase tracking-widest text-white/30 mb-0.5">
                        {row.label}
                      </p>
                      <p className="font-body text-white/85 text-sm leading-snug break-words">
                        {row.value}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => goTo(row.goTo)}
                    className="font-label font-bold text-[10px] uppercase tracking-widest text-secondary-container hover:text-white transition-colors shrink-0 mt-1"
                  >
                    Modifier
                  </button>
                </div>
              ))}
            </div>

            {/* Send CTA */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-headline font-black px-8 py-5 rounded-2xl hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Envoyer sur WhatsApp
            </button>
          </section>
        )}

        {/* ── Q6 — Confirmation ────────────────────────────────────────────── */}
        {question === 6 && (
          <section className="w-full max-w-md flex flex-col items-center text-center">
            {/* WhatsApp icon — animated pulse */}
            <div className="w-20 h-20 rounded-full bg-[#25D366] flex items-center justify-center mb-8 animate-pulse">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 fill-white"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>

            <h1
              className="font-headline font-black text-white leading-[0.92] tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Parfait{form.prenom ? " " + form.prenom : ""}&nbsp;!
            </h1>
            <p className="font-body text-white/60 text-lg mb-10 leading-relaxed">
              Votre demande part directement à notre équipe sur WhatsApp.
            </p>

            <a
              href={"https://wa.me/242069610635?text=" + buildWaMsg(form)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-headline font-black px-10 py-5 rounded-2xl hover:brightness-110 active:scale-95 transition-all text-base uppercase tracking-widest mb-6"
            >
              Ouvrir WhatsApp →
            </a>

            <Link
              to="/"
              className="font-body text-sm text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
            >
              Retour à l&apos;accueil
            </Link>
          </section>
        )}
      </div>

      {/* Back button — visible Q1→Q5 (récap), masqué sur Q0 et Q6 confirmation */}
      {question > 0 && question < 6 && (
        <button
          type="button"
          onClick={goBack}
          className="fixed bottom-8 left-6 text-white/30 hover:text-white transition-colors text-xs uppercase tracking-widest font-body"
          aria-label="Question précédente"
        >
          ← Retour
        </button>
      )}

      {/* Keyboard hint — Q0 et Q1 seulement */}
      {(question === 0 || question === 1) && (
        <p className="fixed bottom-8 right-6 text-white/20 text-xs font-body">
          A / B / C pour sélectionner
        </p>
      )}
    </div>
  );
}
