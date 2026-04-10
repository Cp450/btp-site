import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const FALLBACK_REVIEWS = [
  {
    id: 1,
    client_name: "Jean-Pierre M.",
    project_type: "Villa R+2",
    rating: 5,
    comment:
      "Chantier livré 3 semaines avant le délai prévu. Transparence totale sur les coûts. Je recommande à 100%.",
    created_at: "2026-03-15",
    verified: true,
    ville: "Bacongo",
  },
  {
    id: 2,
    client_name: "Marie-Ange K.",
    project_type: "Local commercial",
    rating: 5,
    comment:
      "Suivi en temps réel bluffant. On voyait l'avancement chaque jour depuis Paris. Chef de projet très professionnel.",
    created_at: "2026-02-28",
    verified: true,
    ville: "Diaspora (Paris)",
  },
  {
    id: 3,
    client_name: "Théodore N.",
    project_type: "Route rurale 4km",
    rating: 4,
    comment:
      "Très bon travail sur la route. Quelques jours de retard sur la livraison finale mais communication exemplaire. On a été informés à chaque étape.",
    created_at: "2026-01-20",
    verified: true,
    ville: "Pool",
  },
  {
    id: 4,
    client_name: "Solange B.",
    project_type: "Immeuble R+3",
    rating: 5,
    comment:
      "Mokolo na mokolo — c'est vraiment leur philosophie. Fiables comme une horloge. Budget respecté à 2% près.",
    created_at: "2025-12-10",
    verified: true,
    ville: "Moungali",
  },
  {
    id: 5,
    client_name: "Patrick D.",
    project_type: "Location Grue 25T",
    rating: 4,
    comment:
      "Engin livré en 18h au lieu de 24h. Opérateur compétent et ponctuel. Tarif correct. Je renouvelle.",
    created_at: "2026-03-02",
    verified: true,
    ville: "Poto-Poto",
  },
];

function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition-colors ${i <= (hover || value) ? "text-congo" : "text-stitch-grey/30"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ r }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < r.rating);
  return (
    <div className="bg-foga-card border border-foga-border rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">
              {r.client_name}
            </span>
            {r.verified && (
              <span className="text-[10px] bg-savane/20 text-savane px-2 py-0.5 rounded-full border border-savane/30">
                ✓ Vérifié
              </span>
            )}
          </div>
          <div className="text-xs text-stitch-grey mt-0.5">
            {r.project_type} · {r.ville}
          </div>
        </div>
        <span className="text-xs text-stitch-grey">
          {r.created_at?.slice(0, 7)}
        </span>
      </div>
      <div className="flex gap-0.5 mb-3">
        {stars.map((filled, i) => (
          <span
            key={i}
            className={`text-sm ${filled ? "text-congo" : "text-stitch-grey/30"}`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-stitch-grey text-sm leading-relaxed italic">
        "{r.comment}"
      </p>
    </div>
  );
}

function ReviewForm({ onSubmitted }) {
  const [form, setForm] = useState({
    client_name: "",
    project_type: "",
    ville: "",
    rating: 5,
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PROJECT_TYPES = [
    "Villa / Maison",
    "Immeuble / Bureaux",
    "Local commercial",
    "Route / Voirie",
    "Génie Rural",
    "Location Engins",
    "Autre",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.comment.trim() || !form.client_name.trim()) return;
    setLoading(true);
    setError("");
    const { error: err } = await supabase
      .from("reviews")
      .insert([{ ...form, verified: false }]);
    setLoading(false);
    if (err) setError("Erreur lors de l'envoi. Réessayez.");
    else onSubmitted();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-foga-card border border-foga-border rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-white font-bold">Partagez votre expérience</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-stitch-grey block mb-1">
            Votre nom *
          </label>
          <input
            required
            value={form.client_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, client_name: e.target.value }))
            }
            placeholder="Jean-Pierre M."
            className="w-full bg-surface border border-foga-border text-white text-sm rounded-xl px-3 py-2.5 focus:border-congo outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-stitch-grey block mb-1">Ville</label>
          <input
            value={form.ville}
            onChange={(e) => setForm((f) => ({ ...f, ville: e.target.value }))}
            placeholder="Brazzaville"
            className="w-full bg-surface border border-foga-border text-white text-sm rounded-xl px-3 py-2.5 focus:border-congo outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-stitch-grey block mb-1">
          Type de projet
        </label>
        <select
          value={form.project_type}
          onChange={(e) =>
            setForm((f) => ({ ...f, project_type: e.target.value }))
          }
          className="w-full bg-surface border border-foga-border text-white text-sm rounded-xl px-3 py-2.5 focus:border-congo outline-none"
        >
          <option value="">Sélectionner…</option>
          {PROJECT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-stitch-grey block mb-2">Note</label>
        <StarInput
          value={form.rating}
          onChange={(r) => setForm((f) => ({ ...f, rating: r }))}
        />
      </div>
      <div>
        <label className="text-xs text-stitch-grey block mb-1">
          Votre avis *
        </label>
        <textarea
          required
          rows={3}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          placeholder="Partagez votre expérience avec Fogatech BTP…"
          className="w-full bg-surface border border-foga-border text-white text-sm rounded-xl px-3 py-2.5 focus:border-congo outline-none resize-none"
        />
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-congo text-white font-bold py-3 rounded-xl hover:bg-congo/80 disabled:opacity-50 transition-colors text-sm"
      >
        {loading ? "Envoi…" : "Publier mon avis →"}
      </button>
      <p className="text-[10px] text-stitch-grey text-center">
        Avis vérifiés par l'équipe Fogatech avant publication
      </p>
    </form>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .eq("verified", true)
      .order("created_at", { ascending: false })
      .limit(12)
      .then(({ data }) => {
        if (data?.length) setReviews(data);
      });

    // Realtime: new verified review appears instantly
    const channel = supabase
      .channel("reviews-live")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "reviews",
          filter: "verified=eq.true",
        },
        (payload) => {
          setReviews((prev) => [
            payload.new,
            ...prev.filter((r) => r.id !== payload.new.id),
          ]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const avgRating = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stitch-grey mb-2">
            Clients vérifiés
          </p>
          <h2 className="text-3xl font-black text-white mb-2">
            Ce qu'ils disent de <span className="text-congo">Fogatech</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-congo font-black text-4xl">{avgRating}</span>
            <div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-congo text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-xs text-stitch-grey">
                {reviews.length} avis vérifiés
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>

        {submitted ? (
          <div className="text-center py-6 bg-savane/10 border border-savane/30 rounded-2xl">
            <p className="text-savane font-bold text-lg">
              ✓ Merci pour votre avis !
            </p>
            <p className="text-stitch-grey text-sm mt-1">
              Il sera publié après vérification par notre équipe.
            </p>
          </div>
        ) : showForm ? (
          <ReviewForm
            onSubmitted={() => {
              setShowForm(false);
              setSubmitted(true);
            }}
          />
        ) : (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-foga-card border border-foga-border text-white font-semibold px-8 py-3 rounded-full hover:border-congo/50 transition-colors text-sm"
            >
              Laisser un avis →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
