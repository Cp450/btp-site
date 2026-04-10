import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const FALLBACK_STOCK = [
  {
    id: "bull",
    icon: "🚜",
    name: "Bulldozers",
    available: 12,
    total: 15,
    price: "250K FCFA/j",
    tag: "Disponible",
  },
  {
    id: "grue",
    icon: "🏗️",
    name: "Grues mobiles",
    available: 8,
    total: 10,
    price: "400K FCFA/j",
    tag: "Disponible",
  },
  {
    id: "pelle",
    icon: "⛏️",
    name: "Pelles hydrauliques",
    available: 15,
    total: 18,
    price: "200K FCFA/j",
    tag: "Disponible",
  },
  {
    id: "compac",
    icon: "🛞",
    name: "Compacteurs",
    available: 6,
    total: 8,
    price: "150K FCFA/j",
    tag: "Disponible",
  },
  {
    id: "beton",
    icon: "🔩",
    name: "Bétonnières",
    available: 20,
    total: 20,
    price: "80K FCFA/j",
    tag: "Stock complet",
  },
  {
    id: "camion",
    icon: "🚛",
    name: "Camions benne",
    available: 4,
    total: 12,
    price: "180K FCFA/j",
    tag: "Limité",
  },
];

function StockBar({ available, total }) {
  const pct = (available / total) * 100;
  const color =
    pct > 60 ? "bg-savane" : pct > 30 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="w-full bg-surface rounded-full h-1.5 mt-2">
      <div
        className={`h-1.5 rounded-full transition-all ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function EnginsStock() {
  const [stock, setStock] = useState(FALLBACK_STOCK);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Fetch live stock from Supabase
    supabase
      .from("engins")
      .select("id, icon, name, available, total, price, tag")
      .then(({ data }) => {
        if (data?.length) setStock(data);
      });

    // Realtime subscription — any UPDATE on engins table
    const channel = supabase
      .channel("engins-stock")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "engins" },
        (payload) => {
          setStock((prev) =>
            prev.map((e) =>
              e.id === payload.new.id ? { ...e, ...payload.new } : e,
            ),
          );
          setPulse(true);
          setTimeout(() => setPulse(false), 800);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const waMsg = (name, price) =>
    `Bonjour Fogatech, je voudrais réserver un(e) ${name} (${price}) - disponibilité immédiate?`;

  return (
    <section id="engins" className="py-20 bg-foga-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full bg-green-400 ${pulse ? "scale-150" : "scale-100"} transition-transform`}
              />
              <span className="text-xs uppercase tracking-widest text-stitch-grey">
                Stock en temps réel
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Location <span className="text-congo">Engins BTP</span>
            </h2>
            <p className="text-stitch-grey mt-1">
              Confirmation sous 2h · Livraison chantier sous 24h · Maintenance
              incluse
            </p>
          </div>
          <div className="flex gap-4 text-center">
            <div className="bg-surface rounded-xl px-4 py-3 border border-foga-border">
              <div className="text-2xl font-black text-congo">
                {stock.reduce((s, e) => s + e.available, 0)}
              </div>
              <div className="text-xs text-stitch-grey">Engins dispo</div>
            </div>
            <div className="bg-surface rounded-xl px-4 py-3 border border-foga-border">
              <div className="text-2xl font-black text-savane">24h</div>
              <div className="text-xs text-stitch-grey">Livraison max</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stock.map((e) => (
            <div
              key={e.id}
              className="bg-surface border border-foga-border rounded-2xl p-5 hover:border-congo/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{e.icon}</div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    e.available > 0
                      ? "bg-savane/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {e.tag}
                </span>
              </div>
              <h3 className="text-white font-bold mb-1">{e.name}</h3>
              <p className="text-congo font-bold text-sm mb-2">{e.price}</p>
              <div className="flex justify-between text-xs text-stitch-grey mb-1">
                <span>{e.available} disponibles</span>
                <span>/{e.total} total</span>
              </div>
              <StockBar available={e.available} total={e.total} />
              <a
                href={`https://wa.me/242069610635?text=${encodeURIComponent(waMsg(e.name, e.price))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-congo/10 border border-congo/30 hover:bg-congo text-congo hover:text-white text-sm font-semibold py-2 rounded-lg transition-all"
              >
                Réserver maintenant
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-surface border border-foga-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold">
              Engin URGENCE — Modèle Uber
            </h3>
            <p className="text-sm text-stitch-grey">
              Besoin d'un engin maintenant? Confirmation sous 2h · Tarif urgence
              +15%
            </p>
          </div>
          <a
            href={`https://wa.me/242069610635?text=${encodeURIComponent("URGENT - J'ai besoin d'un engin BTP immédiatement pour mon chantier.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            🚨 Engin MAINTENANT
          </a>
        </div>
      </div>
    </section>
  );
}
