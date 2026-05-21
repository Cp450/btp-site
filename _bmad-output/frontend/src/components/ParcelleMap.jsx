import { useState, useMemo } from 'react'
import { cn } from '../lib/cn'
import { supabase } from '../lib/supabase'

/* ── Parcel data generator ─────────────────────────────────────── */
const ZONES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
const LOTS_PER_ZONE = 10

// Deterministic status (not random — stable across renders)
function getStatut(zone, lot) {
  const seed = (ZONES.indexOf(zone) * LOTS_PER_ZONE + lot) % 20
  if (seed < 11) return 'disponible'   // ~55%
  if (seed < 16) return 'occupe'       // ~25%
  return 'reserve'                      // ~20%
}

function getSurface(zone, lot) {
  const seed = (ZONES.indexOf(zone) * 7 + lot * 3) % 8
  return [250, 280, 300, 320, 350, 400, 450, 500][seed]
}

function getPrix(surface) {
  return Math.round(surface * 15000) // 15 000 FCFA/m²
}

const PARCELS = ZONES.flatMap((zone) =>
  Array.from({ length: LOTS_PER_ZONE }, (_, i) => {
    const lot = i + 1
    const ref = `${zone}-${String(lot).padStart(2, '0')}`
    const surface = getSurface(zone, lot)
    const statut = getStatut(zone, lot)
    return { ref, zone, lot, surface, statut, prix: getPrix(surface) }
  })
)

const STATUS_CONFIG = {
  disponible: { label: 'Disponible', color: '#16a34a', bg: 'bg-green-600', text: 'text-green-700', border: 'border-green-600', icon: 'check_circle' },
  reserve:    { label: 'Réservé',    color: '#ea580c', bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-500', icon: 'hourglass_empty' },
  occupe:     { label: 'Occupé',     color: '#dc2626', bg: 'bg-red-600',    text: 'text-red-600',    border: 'border-red-500',    icon: 'cancel' },
}

const COUNTS = {
  disponible: PARCELS.filter((p) => p.statut === 'disponible').length,
  reserve:    PARCELS.filter((p) => p.statut === 'reserve').length,
  occupe:     PARCELS.filter((p) => p.statut === 'occupe').length,
}

/* ── SVG Map ───────────────────────────────────────────────────── */
const COL_W = 44
const ROW_H = 36
const PAD = 4
const LABEL_W = 20
const HEADER_H = 20

function LotissementSVG({ selected, onSelect }) {
  const W = LABEL_W + LOTS_PER_ZONE * (COL_W + PAD) + PAD
  const H = HEADER_H + ZONES.length * (ROW_H + PAD) + PAD

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      className="block"
      role="img"
      aria-label="Plan de lotissement Écocité Alpha"
    >
      {/* Column headers (lot numbers) */}
      {Array.from({ length: LOTS_PER_ZONE }, (_, i) => (
        <text
          key={i}
          x={LABEL_W + PAD + i * (COL_W + PAD) + COL_W / 2}
          y={HEADER_H - 4}
          textAnchor="middle"
          fontSize="6"
          fill="#94a3b8"
          fontFamily="monospace"
        >
          {String(i + 1).padStart(2, '0')}
        </text>
      ))}

      {/* Zones (rows) */}
      {ZONES.map((zone, zi) => (
        <g key={zone}>
          {/* Zone label */}
          <text
            x={LABEL_W - 4}
            y={HEADER_H + zi * (ROW_H + PAD) + ROW_H / 2 + 2.5}
            textAnchor="end"
            fontSize="7"
            fontWeight="bold"
            fill="#64748b"
            fontFamily="monospace"
          >
            {zone}
          </text>

          {/* Lots */}
          {Array.from({ length: LOTS_PER_ZONE }, (_, li) => {
            const parcel = PARCELS[zi * LOTS_PER_ZONE + li]
            const x = LABEL_W + PAD + li * (COL_W + PAD)
            const y = HEADER_H + zi * (ROW_H + PAD)
            const isSelected = selected?.ref === parcel.ref
            const cfg = STATUS_CONFIG[parcel.statut]

            return (
              <g key={parcel.ref}>
                <rect
                  x={x}
                  y={y}
                  width={COL_W}
                  height={ROW_H}
                  fill={isSelected ? '#f97316' : cfg.color}
                  opacity={isSelected ? 1 : parcel.statut === 'disponible' ? 0.85 : 0.6}
                  rx={0}
                  stroke={isSelected ? '#fff' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isSelected ? 1.5 : 0.5}
                  style={{ cursor: parcel.statut === 'occupe' ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}
                  onClick={() => parcel.statut !== 'occupe' && onSelect(parcel)}
                  role="button"
                  aria-label={`Parcelle ${parcel.ref} — ${cfg.label}`}
                  tabIndex={parcel.statut !== 'occupe' ? 0 : -1}
                  onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && parcel.statut !== 'occupe') onSelect(parcel) }}
                />
                <text
                  x={x + COL_W / 2}
                  y={y + ROW_H / 2 - 2}
                  textAnchor="middle"
                  fontSize="5.5"
                  fontWeight="bold"
                  fill="white"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {parcel.ref}
                </text>
                <text
                  x={x + COL_W / 2}
                  y={y + ROW_H / 2 + 6}
                  textAnchor="middle"
                  fontSize="4.5"
                  fill="rgba(255,255,255,0.75)"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {parcel.surface}m²
                </text>
              </g>
            )
          })}
        </g>
      ))}
    </svg>
  )
}

/* ── Reservation Form ──────────────────────────────────────────── */
const INPUT = 'bg-surface border border-outline-variant text-on-surface text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-body w-full'

function ReservationForm({ parcel, programme = 'Écocité Alpha', onSuccess, onCancel }) {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', message: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')

    const payload = {
      parcelle_ref: parcel.ref,
      zone: parcel.zone,
      superficie: parcel.surface,
      programme,
      prenom: form.prenom,
      nom: form.nom,
      email: form.email,
      tel: form.tel,
      message: form.message,
      statut_demande: 'en_attente',
    }

    // Try Supabase first
    let savedToDb = false
    try {
      const { error: dbErr } = await supabase.from('parcelle_reservations').insert([payload])
      if (!dbErr) savedToDb = true
    } catch (_) {
      // graceful fallback
    }

    // Always send WhatsApp as backup / primary notification
    const waMsg = encodeURIComponent(
      `🏠 *RÉSERVATION PARCELLE — Fogatech BTP*\n\n` +
      `Programme: ${programme}\n` +
      `Parcelle: ${parcel.ref}\n` +
      `Superficie: ${parcel.surface} m²\n\n` +
      `Nom: ${form.prenom} ${form.nom}\n` +
      `Tél: ${form.tel}\n` +
      `Email: ${form.email}\n` +
      (form.message ? `\nMessage: ${form.message}` : '')
    )
    const waUrl = `https://wa.me/242069610635?text=${waMsg}`

    setSending(false)
    onSuccess({ savedToDb, waUrl })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Prénom *</label>
          <input required value={form.prenom} onChange={(e) => setF('prenom', e.target.value)} placeholder="Jean" className={INPUT} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Nom *</label>
          <input required value={form.nom} onChange={(e) => setF('nom', e.target.value)} placeholder="Dupont" className={INPUT} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Email *</label>
        <input required type="email" value={form.email} onChange={(e) => setF('email', e.target.value)} placeholder="vous@exemple.com" className={INPUT} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Téléphone *</label>
        <input required type="tel" inputMode="tel" value={form.tel} onChange={(e) => setF('tel', e.target.value)} placeholder="+242 0X XX XX XX" className={INPUT} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Message (optionnel)</label>
        <textarea rows={2} value={form.message} onChange={(e) => setF('message', e.target.value)} placeholder="Précisez votre besoin…" className={cn(INPUT, 'resize-none')} />
      </div>

      {error && <p className="text-xs text-red-600 font-body">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-outline-variant text-on-surface-variant font-headline font-bold text-xs uppercase tracking-widest hover:bg-surface-container transition-colors rounded-full"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={sending}
          className="flex-1 bg-secondary-container text-on-secondary-container font-headline font-black text-xs uppercase tracking-widest px-4 py-3 hover:brightness-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded-full"
        >
          {sending ? (
            <span className="inline-block w-4 h-4 border-2 border-on-secondary-container/30 border-t-on-secondary-container rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              Réserver
            </>
          )}
        </button>
      </div>
    </form>
  )
}

/* ── Main ParcelleMap component ────────────────────────────────── */
export default function ParcelleMap({ programme = 'Écocité Alpha' }) {
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('map') // 'map' | 'form' | 'success'
  const [successData, setSuccessData] = useState(null)
  const [filterZone, setFilterZone] = useState('all')
  const [filterStatut, setFilterStatut] = useState('all')

  const filteredParcels = useMemo(() => {
    return PARCELS.filter((p) => {
      if (filterZone !== 'all' && p.zone !== filterZone) return false
      if (filterStatut !== 'all' && p.statut !== filterStatut) return false
      return true
    })
  }, [filterZone, filterStatut])

  function handleSelect(parcel) {
    setSelected(parcel)
    setView('map')
  }

  function handleReserve() {
    setView('form')
  }

  function handleSuccess(data) {
    setSuccessData(data)
    setView('success')
    window.open(data.waUrl, '_blank')
  }

  function handleReset() {
    setSelected(null)
    setView('map')
    setSuccessData(null)
  }

  const cfg = selected ? STATUS_CONFIG[selected.statut] : null

  return (
    <section id="carte" className="py-20 md:py-28 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-secondary-container flex-shrink-0" />
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                Plan de Lotissement — {programme}
              </p>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-black text-primary leading-tight">
              Carte interactive<br />
              <span className="text-secondary-container">des parcelles</span>
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-0 border border-outline-variant overflow-hidden">
            {Object.entries(COUNTS).map(([statut, count]) => {
              const c = STATUS_CONFIG[statut]
              return (
                <div key={statut} className="flex items-center gap-2 px-4 py-3 border-r border-outline-variant last:border-r-0 bg-surface-container-lowest">
                  <div className={cn('w-2.5 h-2.5 flex-shrink-0', c.bg)} />
                  <span className="text-xs font-label font-bold text-on-surface">{count}</span>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider hidden sm:inline">{c.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Zone:</span>
            <select
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              className="text-xs font-label font-bold border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Toutes</option>
              {ZONES.map((z) => <option key={z} value={z}>Zone {z}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Statut:</span>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="text-xs font-label font-bold border border-outline-variant bg-surface-container-lowest px-3 py-1.5 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Tous</option>
              <option value="disponible">Disponible</option>
              <option value="reserve">Réservé</option>
              <option value="occupe">Occupé</option>
            </select>
          </div>
          {(filterZone !== 'all' || filterStatut !== 'all') && (
            <button
              onClick={() => { setFilterZone('all'); setFilterStatut('all') }}
              className="text-[10px] font-label font-bold uppercase tracking-widest text-primary underline hover:text-secondary-container transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Main grid: map + panel */}
        <div className="grid lg:grid-cols-3 gap-0 border border-outline-variant">

          {/* SVG Map */}
          <div className="lg:col-span-2 bg-primary p-4 md:p-6 relative overflow-auto min-h-[420px] border-b lg:border-b-0 lg:border-r border-outline-variant rounded-2xl">
            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              {/* Zone filter highlight note */}
              {filterZone !== 'all' && (
                <div className="mb-3 inline-flex items-center gap-2 bg-secondary-container/20 border border-secondary-container/40 px-3 py-1.5">
                  <span className="text-secondary-container text-[10px] font-label font-bold uppercase tracking-widest">
                    Zone {filterZone} — {filteredParcels.length} lots
                  </span>
                </div>
              )}
              <LotissementSVG selected={selected} onSelect={handleSelect} />
            </div>
            {/* Legend */}
            <div className="relative z-10 flex gap-4 mt-4 flex-wrap">
              {Object.entries(STATUS_CONFIG).map(([k, c]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <div className={cn('w-3 h-3 flex-shrink-0', c.bg)} />
                  <span className="text-white/60 text-[9px] font-label font-bold uppercase tracking-wider">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="bg-surface-container-lowest border-l-4 border-l-secondary-container relative">

            {/* SUCCESS */}
            {view === 'success' && (
              <div className="p-8 flex flex-col items-center justify-center min-h-[360px] text-center">
                <span className="material-symbols-outlined text-5xl text-secondary-container block mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <h3 className="font-headline font-black text-primary text-xl mb-2">Demande envoyée !</h3>
                <p className="text-on-surface-variant text-sm font-body mb-1">
                  WhatsApp ouvert avec votre demande pré-remplie.
                </p>
                <p className="text-on-surface-variant text-xs font-body mb-6">
                  Notre équipe vous contacte sous 24h.
                </p>
                {successData?.waUrl && (
                  <a
                    href={successData.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-label font-bold text-primary underline hover:text-secondary-container mb-6 transition-colors"
                  >
                    Rouvrir WhatsApp
                  </a>
                )}
                <button
                  onClick={handleReset}
                  className="border border-outline-variant text-on-surface font-headline font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-surface-container transition-colors rounded-full"
                >
                  Voir d&apos;autres parcelles
                </button>
              </div>
            )}

            {/* FORM */}
            {view === 'form' && selected && (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={cn('w-2.5 h-2.5 flex-shrink-0', STATUS_CONFIG[selected.statut].bg)} />
                  <h3 className="font-headline font-bold text-primary text-base">
                    Réserver parcelle {selected.ref}
                  </h3>
                </div>
                <div className="bg-surface border border-outline-variant p-3 mb-5 flex justify-between text-xs rounded-2xl">
                  <span className="text-on-surface-variant font-body">Superficie</span>
                  <span className="font-headline font-bold text-primary">{selected.surface} m²</span>
                </div>
                <ReservationForm
                  parcel={selected}
                  programme={programme}
                  onSuccess={handleSuccess}
                  onCancel={() => setView('map')}
                />
              </div>
            )}

            {/* MAP detail panel */}
            {view === 'map' && (
              <div className="p-6 flex flex-col h-full">
                {!selected ? (
                  <div className="flex flex-col items-center justify-center flex-1 min-h-[360px] text-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant block mb-4" aria-hidden="true">
                      touch_app
                    </span>
                    <p className="text-on-surface-variant font-body text-sm max-w-xs">
                      Cliquez sur une parcelle <span className="text-green-600 font-bold">verte</span> ou <span className="text-orange-500 font-bold">orange</span> pour voir les détails.
                    </p>
                    <div className="mt-6 border border-outline-variant p-4 text-left w-full max-w-xs">
                      <p className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant mb-3">Tarification</p>
                      <div className="space-y-1.5">
                        {[
                          { label: '250–300 m²', prix: '3,75–4,5M FCFA' },
                          { label: '300–400 m²', prix: '4,5–6M FCFA' },
                          { label: '400–500 m²', prix: '6–7,5M FCFA' },
                        ].map((t) => (
                          <div key={t.label} className="flex justify-between text-xs">
                            <span className="text-on-surface-variant font-body">{t.label}</span>
                            <span className="font-headline font-bold text-primary">{t.prix}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Parcel header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-headline font-black text-primary text-2xl">
                          {selected.ref}
                        </h3>
                        <p className="text-on-surface-variant text-xs font-body">Zone {selected.zone} · Lot {selected.lot}</p>
                      </div>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-outline-variant hover:text-on-surface transition-colors"
                        aria-label="Fermer"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>

                    {/* Status badge */}
                    <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 mb-5 border', cfg.border)}>
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
                      <span className={cn('text-xs font-label font-black uppercase tracking-widest', cfg.text)}>{cfg.label}</span>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-0 border border-outline-variant mb-5">
                      {[
                        { label: 'Superficie', val: `${selected.surface} m²` },
                        { label: 'Prix estimé', val: `${(selected.prix / 1_000_000).toFixed(1).replace('.', ',')}M FCFA` },
                        { label: 'Programme', val: programme },
                        { label: 'Financement', val: 'Possible' },
                      ].map((d, i) => (
                        <div
                          key={d.label}
                          className={cn(
                            'p-3',
                            i % 2 === 0 ? 'border-r border-outline-variant' : '',
                            i < 2 ? 'border-b border-outline-variant' : '',
                          )}
                        >
                          <p className="text-[9px] font-label font-bold uppercase tracking-widest text-on-surface-variant mb-1">{d.label}</p>
                          <p className="text-sm font-headline font-bold text-on-surface">{d.val}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {selected.statut === 'disponible' ? (
                      <button
                        onClick={handleReserve}
                        className="w-full bg-secondary-container text-on-secondary-container font-headline font-black text-xs uppercase tracking-widest py-4 hover:shadow-tectonic-orange hover:brightness-105 transition-all flex items-center justify-center gap-2 rounded-full"
                      >
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark_add</span>
                        Réserver cette parcelle
                      </button>
                    ) : selected.statut === 'reserve' ? (
                      <div>
                        <div className="bg-orange-50 border border-orange-200 p-3 mb-3">
                          <p className="text-xs text-orange-700 font-body">
                            Cette parcelle est en cours de réservation. Contactez-nous pour vérifier sa disponibilité.
                          </p>
                        </div>
                        <a
                          href={`https://wa.me/242069610635?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par la parcelle ${selected.ref} (${selected.surface} m²) du ${programme} — est-elle encore disponible ?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full border-2 border-orange-500 text-orange-600 font-headline font-bold text-xs uppercase tracking-widest py-3 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 rounded-full"
                        >
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                          Vérifier disponibilité
                        </a>
                      </div>
                    ) : (
                      <div className="bg-surface-container p-3 border border-outline-variant rounded-2xl">
                        <p className="text-xs text-on-surface-variant font-body text-center">
                          Parcelle occupée — consultez les parcelles disponibles (en vert).
                        </p>
                      </div>
                    )}

                    {/* WhatsApp direct link */}
                    <a
                      href={`https://wa.me/242069610635?text=${encodeURIComponent(`Bonjour Fogatech, je voudrais des informations sur la parcelle ${selected.ref} du ${programme} (${selected.surface} m²).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 text-xs font-label font-bold text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Poser une question sur WhatsApp
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-x border-b border-outline-variant">
          {[
            { num: '01', title: 'Sélection', body: 'Cliquez sur une parcelle verte. Consultez les détails et le prix estimé.', color: 'border-secondary-container' },
            { num: '02', title: 'Réservation', body: 'Formulaire de pré-réservation — bloque la parcelle 48h sans frais.', color: 'border-primary' },
            { num: '03', title: 'Finalisation', body: 'Un conseiller Fogatech finalise l\'acte de vente et le plan de financement.', color: 'border-secondary-container' },
          ].map((s, i) => (
            <div
              key={s.num}
              className={cn(
                'p-8 bg-surface-container-lowest border-l-4',
                i < 2 ? 'border-b md:border-b-0 md:border-r border-outline-variant' : '',
                s.color,
              )}
            >
              <span className="font-headline font-black text-3xl text-on-surface/10 leading-none block mb-4">{s.num}</span>
              <h3 className="font-headline font-bold text-primary text-base mb-2">{s.title}</h3>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
