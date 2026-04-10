import { useState } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'

const PROJETS = [
  {
    id: 1,
    nom: 'Résidence Les Jacarandas',
    segment: 'Résidentiel',
    lieu: 'Bacongo, Brazzaville',
    budget: 280000,
    duree: 8,
    surface: 420,
    annee: 2025,
    note: 4.9,
    avis: 12,
    statut: 'Livré',
    desc: 'Villa R+2 · 6 chambres · Piscine · Finitions haut de gamme',
    certifs: ['ISO 9001', 'ONIMOB'],
    chef: 'Parfait Moukassa',
  },
  {
    id: 2,
    nom: 'Centre Commercial Poto-Poto',
    segment: 'Commercial',
    lieu: 'Poto-Poto, Brazzaville',
    budget: 1200000,
    duree: 18,
    surface: 2800,
    annee: 2025,
    note: 4.8,
    avis: 8,
    statut: 'Livré',
    desc: '3 niveaux · 42 boutiques · Parking 80 places · Climatisation centrale',
    certifs: ['ISO 9001', 'HQE'],
    chef: 'Christelle Nzaba',
  },
  {
    id: 3,
    nom: 'Route Rurale Kinkala–Kindamba',
    segment: 'Génie Rural',
    lieu: 'Pool, Congo',
    budget: 650000,
    duree: 12,
    surface: null,
    annee: 2024,
    note: 4.7,
    avis: 5,
    statut: 'Livré',
    desc: '14 km · Bitumage · 3 ponts · Signalisation complète',
    certifs: ['CFCO', 'Ministère BTP'],
    chef: 'Jean-Baptiste Okoko',
  },
  {
    id: 4,
    nom: 'Eco-Cité Massina F4 Bloc A',
    segment: 'Smart City',
    lieu: 'Massina, Brazzaville',
    budget: 3400000,
    duree: 36,
    surface: 8500,
    annee: 2026,
    note: null,
    avis: 0,
    statut: 'En cours',
    desc: '20 appartements F4 · Panneaux solaires · Domotique · Eau pluviale recyclée',
    certifs: ['ISO 14001', 'HQE'],
    chef: 'Parfait Moukassa',
  },
  {
    id: 5,
    nom: 'Immeuble Bureaux Moungali',
    segment: 'Commercial',
    lieu: 'Moungali, Brazzaville',
    budget: 480000,
    duree: 10,
    surface: 960,
    annee: 2025,
    note: 5.0,
    avis: 6,
    statut: 'Livré',
    desc: 'R+4 · Open-space climatisé · Salle conférence · Fibre optique',
    certifs: ['ISO 9001'],
    chef: 'Christelle Nzaba',
  },
  {
    id: 6,
    nom: 'Complexe Sportif Talangaï',
    segment: 'Infrastructure',
    lieu: 'Talangaï, Brazzaville',
    budget: 920000,
    duree: 14,
    surface: 3200,
    annee: 2024,
    note: 4.6,
    avis: 9,
    statut: 'Livré',
    desc: 'Terrain synthétique FIFA · Tribune 500 places · Vestiaires · Éclairage LED',
    certifs: ['FIFA Quality', 'ISO 9001'],
    chef: 'Jean-Baptiste Okoko',
  },
  {
    id: 7,
    nom: 'Villa Duplex Ouenzé',
    segment: 'Résidentiel',
    lieu: 'Ouenzé, Brazzaville',
    budget: 145000,
    duree: 5,
    surface: 210,
    annee: 2026,
    note: null,
    avis: 0,
    statut: 'En cours',
    desc: 'R+1 · 4 chambres · Terrasse · Finitions standard+',
    certifs: ['ONIMOB'],
    chef: 'Parfait Moukassa',
  },
  {
    id: 8,
    nom: 'École Primaire Nganga Lingolo',
    segment: 'Infrastructure',
    lieu: 'Nganga Lingolo, Pool',
    budget: 320000,
    duree: 9,
    surface: 1100,
    annee: 2025,
    note: 4.9,
    avis: 4,
    statut: 'Livré',
    desc: '12 salles de classe · Bibliothèque · Toilettes · Panneau solaire',
    certifs: ['Ministère Éducation', 'ISO 9001'],
    chef: 'Christelle Nzaba',
  },
]

const SEGMENTS = ['Tous', 'Résidentiel', 'Commercial', 'Génie Rural', 'Smart City', 'Infrastructure']
const BUDGETS = [
  { label: 'Tous budgets', min: 0, max: Infinity },
  { label: '< 200 000 €', min: 0, max: 200000 },
  { label: '200k – 600k €', min: 200000, max: 600000 },
  { label: '600k – 1,5M €', min: 600000, max: 1500000 },
  { label: '> 1,5M €', min: 1500000, max: Infinity },
]
const DELAIS = [
  { label: 'Tous délais', max: Infinity },
  { label: '≤ 6 mois', max: 6 },
  { label: '6 – 12 mois', min: 6, max: 12 },
  { label: '> 12 mois', min: 12, max: Infinity },
]

const SEGMENT_COLORS = {
  Résidentiel: 'bg-blue-900 text-blue-200',
  Commercial: 'bg-purple-900 text-purple-200',
  'Génie Rural': 'bg-savane/20 text-savane',
  'Smart City': 'bg-cyan-900 text-cyan-200',
  Infrastructure: 'bg-orange-900 text-orange-200',
}

function Stars({ note }) {
  if (!note) return <span className="text-xs text-stitch-grey italic">En cours</span>
  return (
    <span className="flex items-center gap-1">
      <span className="text-congo font-bold text-sm">{note.toFixed(1)}</span>
      <span className="text-congo text-xs">★★★★★</span>
    </span>
  )
}

function ProjetCard({ p }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-foga-card border border-foga-border rounded-xl overflow-hidden hover:border-congo/50 transition-colors group">
      {/* Pseudo-image placeholder avec initiales colorées */}
      <div className="h-40 bg-gradient-to-br from-stitch-dark to-foga-bg flex items-center justify-center relative">
        <span className="text-5xl font-black text-white/10 select-none">{p.nom.slice(0, 2).toUpperCase()}</span>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${SEGMENT_COLORS[p.segment] ?? 'bg-gray-800 text-gray-300'}`}>
            {p.segment}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.statut === 'Livré' ? 'bg-savane/20 text-savane' : 'bg-congo/20 text-congo'}`}>
            {p.statut === 'Livré' ? '✓ Livré' : '⏳ En cours'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex flex-wrap gap-1">
            {p.certifs.map((c) => (
              <span key={c} className="text-[10px] bg-black/50 text-stitch-grey px-1.5 py-0.5 rounded border border-foga-border">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-sm leading-tight mb-1">{p.nom}</h3>
        <p className="text-stitch-grey text-xs mb-3">📍 {p.lieu}</p>

        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div>
            <div className="text-congo font-black text-sm">{(p.budget / 1000).toFixed(0)}k€</div>
            <div className="text-stitch-grey text-[10px]">Budget</div>
          </div>
          <div>
            <div className="text-savane font-black text-sm">{p.duree}m</div>
            <div className="text-stitch-grey text-[10px]">Délai</div>
          </div>
          <div>
            <div className="text-blue-400 font-black text-sm">{p.surface ? `${p.surface}m²` : '14 km'}</div>
            <div className="text-stitch-grey text-[10px]">Surface</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Stars note={p.note} />
          {p.avis > 0 && <span className="text-xs text-stitch-grey">{p.avis} avis clients</span>}
        </div>

        {expanded && (
          <div className="border-t border-foga-border pt-3 mt-3">
            <p className="text-stitch-grey text-xs mb-2">{p.desc}</p>
            <p className="text-xs text-white/60">Chef de projet : <span className="text-savane font-semibold">{p.chef}</span></p>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex-1 text-xs py-1.5 rounded border border-foga-border text-stitch-grey hover:border-savane hover:text-savane transition-colors"
          >
            {expanded ? 'Réduire ▲' : 'Détails ▼'}
          </button>
          <a
            href={`https://wa.me/242069610635?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20un%20projet%20similaire%20%C3%A0%20%22${encodeURIComponent(p.nom)}%22`}
            target="_blank"
            rel="noreferrer"
            className="px-3 text-xs py-1.5 rounded bg-congo text-white font-semibold hover:bg-congo/80 transition-colors"
          >
            Projet similaire
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [segment, setSegment] = useState('Tous')
  const [budgetIdx, setBudgetIdx] = useState(0)
  const [delaiIdx, setDelaiIdx] = useState(0)
  const [statut, setStatut] = useState('Tous')

  const budgetFilter = BUDGETS[budgetIdx]
  const delaiFilter = DELAIS[delaiIdx]

  const filtered = PROJETS.filter((p) => {
    if (segment !== 'Tous' && p.segment !== segment) return false
    if (p.budget < budgetFilter.min || p.budget > budgetFilter.max) return false
    const dMin = delaiFilter.min ?? 0
    const dMax = delaiFilter.max
    if (p.duree < dMin || p.duree > dMax) return false
    if (statut !== 'Tous' && p.statut !== statut) return false
    return true
  })

  return (
    <main className="min-h-screen bg-foga-bg pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Portfolio <span className="text-congo">Transparent</span>
          </h1>
          <p className="text-stitch-grey max-w-xl mx-auto text-sm">
            Budgets réels, délais respectés, certifications vérifiées. Aucun secret.
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-foga-card border border-foga-border rounded-xl p-4 mb-8 space-y-4">
          {/* Segment */}
          <div>
            <p className="text-xs uppercase tracking-wider text-stitch-grey mb-2">Segment</p>
            <div className="flex flex-wrap gap-2">
              {SEGMENTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSegment(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${segment === s ? 'bg-stitch-blue border-stitch-blue text-white' : 'border-foga-border text-stitch-grey hover:border-savane hover:text-savane'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Budget */}
            <div>
              <p className="text-xs uppercase tracking-wider text-stitch-grey mb-2">Budget</p>
              <select
                value={budgetIdx}
                onChange={(e) => setBudgetIdx(Number(e.target.value))}
                className="w-full bg-foga-bg border border-foga-border text-white text-sm rounded-lg px-3 py-2 focus:border-congo outline-none"
              >
                {BUDGETS.map((b, i) => <option key={i} value={i}>{b.label}</option>)}
              </select>
            </div>

            {/* Délai */}
            <div>
              <p className="text-xs uppercase tracking-wider text-stitch-grey mb-2">Délai réalisation</p>
              <select
                value={delaiIdx}
                onChange={(e) => setDelaiIdx(Number(e.target.value))}
                className="w-full bg-foga-bg border border-foga-border text-white text-sm rounded-lg px-3 py-2 focus:border-congo outline-none"
              >
                {DELAIS.map((d, i) => <option key={i} value={i}>{d.label}</option>)}
              </select>
            </div>

            {/* Statut */}
            <div>
              <p className="text-xs uppercase tracking-wider text-stitch-grey mb-2">Statut</p>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="w-full bg-foga-bg border border-foga-border text-white text-sm rounded-lg px-3 py-2 focus:border-congo outline-none"
              >
                <option>Tous</option>
                <option>Livré</option>
                <option>En cours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <p className="text-stitch-grey text-sm mb-5">
          <span className="text-white font-bold">{filtered.length}</span> projet{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stitch-grey">
            <p className="text-4xl mb-4">🔍</p>
            <p>Aucun projet ne correspond à ces critères.</p>
            <button onClick={() => { setSegment('Tous'); setBudgetIdx(0); setDelaiIdx(0); setStatut('Tous') }}
              className="mt-4 text-congo underline text-sm">Réinitialiser les filtres</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => <ProjetCard key={p.id} p={p} />)}
          </div>
        )}

        {/* CTA devis */}
        <div className="mt-14 bg-gradient-to-r from-stitch-blue/20 to-savane/10 border border-stitch-blue/30 rounded-2xl p-8 text-center">
          <h2 className="text-white text-2xl font-black mb-2">Votre projet, notre transparence</h2>
          <p className="text-stitch-grey text-sm mb-6 max-w-md mx-auto">
            Recevez un devis détaillé avec budget, planning et chef de projet assigné sous 24h.
          </p>
          <a
            href="https://wa.me/242069610635?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20mon%20projet%20BTP"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-congo text-white font-bold px-8 py-3 rounded-full hover:bg-congo/80 transition-colors"
          >
            Obtenir un devis gratuit →
          </a>
        </div>
      </div>

      <WhatsAppButton context="Portfolio" />
    </main>
  )
}
