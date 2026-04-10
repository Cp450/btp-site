import { useState } from 'react'
import { supabase } from '../lib/supabase'

const PLOTS = Array.from({ length: 30 }, (_, i) => ({
  id: `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`,
  available: Math.random() > 0.4,
}))

function PlotMap() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ nom: '', tel: '', type: 'Achat Villa F4 Clé en main' })
  const [sent, setSent] = useState(false)

  async function handleReserve(e) {
    e.preventDefault()
    const waMsg = encodeURIComponent(
      `Bonjour Fogatech, je souhaite réserver la parcelle ${selected} - Smart City Massina.\nNom: ${form.nom}\nTél: ${form.tel}\nType: ${form.type}`
    )
    window.open(`https://wa.me/242069610635?text=${waMsg}`, '_blank')
    setSent(true)
  }

  return (
    <section className="py-24 bg-surface-container-low overflow-hidden" id="carte">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-headline text-4xl font-black text-primary tracking-tighter">CARTE INTERACTIVE</h2>
            <p className="text-on-surface-variant mt-2">Choisissez votre parcelle pour commencer votre projet de vie.</p>
          </div>
          <div className="flex gap-6 bg-surface-container-lowest p-4 shadow-card rounded">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#4CAF50] rounded-sm" />
              <span className="text-sm font-bold uppercase tracking-wider text-on-surface">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#FF9800] rounded-sm" />
              <span className="text-sm font-bold uppercase tracking-wider text-on-surface">Occupé</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 relative bg-primary-container p-6 md:p-10 rounded-xl shadow-inner min-h-[400px] overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="relative z-10 grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
              {PLOTS.map((p) => (
                <button
                  key={p.id}
                  disabled={!p.available}
                  onClick={() => setSelected(p.id)}
                  className={`aspect-square rounded-sm text-[10px] font-bold transition-all ${
                    selected === p.id
                      ? 'bg-secondary-container text-on-secondary-container scale-110 shadow-lg'
                      : p.available
                      ? 'bg-[#4CAF50] hover:bg-[#4CAF50]/80 text-white cursor-pointer hover:scale-105'
                      : 'bg-[#FF9800]/60 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {p.id}
                </button>
              ))}
            </div>
          </div>

          {/* Reservation form */}
          <div className="bg-surface-container-lowest p-8 shadow-tectonic relative">
            <div className="absolute top-0 right-0 w-1 h-full bg-secondary-container" />
            {sent ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-5xl text-[#4CAF50] block mb-4">check_circle</span>
                <h3 className="font-headline font-bold text-primary text-xl mb-2">Demande envoyée !</h3>
                <p className="text-on-surface-variant text-sm">Un conseiller vous contacte sous 24h.</p>
              </div>
            ) : (
              <>
                <h3 className="font-headline font-bold text-primary text-xl mb-1">
                  {selected ? `Parcelle ${selected} sélectionnée` : 'Sélectionnez une parcelle'}
                </h3>
                <p className="text-on-surface-variant text-xs mb-6">Formulaire de pré-réservation — 48h de blocage</p>
                <form onSubmit={handleReserve} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">Nom Complet</label>
                    <input required value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                      placeholder="Jean Dupont"
                      className="w-full bg-surface-container-low border-b-2 border-primary/20 focus:border-primary p-3 text-sm outline-none transition-all font-body" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">Téléphone</label>
                    <input required value={form.tel} onChange={(e) => setForm((f) => ({ ...f, tel: e.target.value }))}
                      placeholder="+242 06 --- ---"
                      className="w-full bg-surface-container-low border-b-2 border-primary/20 focus:border-primary p-3 text-sm outline-none transition-all font-body" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">Type d'achat</label>
                    <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                      className="w-full bg-surface-container-low border-b-2 border-primary/20 focus:border-primary p-3 text-sm outline-none font-body">
                      <option>Achat de terrain uniquement</option>
                      <option>Achat Villa F4 Clé en main</option>
                      <option>Investissement Locatif</option>
                    </select>
                  </div>
                  <button type="submit" disabled={!selected}
                    className="w-full bg-primary disabled:opacity-40 text-white py-4 font-headline font-black uppercase tracking-widest text-xs hover:bg-secondary transition-colors mt-4">
                    Réserver via WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1. Sélection', text: 'Cliquez sur une parcelle verte. Consultez les détails et le prix.', color: 'border-secondary-container' },
            { step: '2. Réservation', text: 'Formulaire de pré-réservation — bloque la parcelle 48h.', color: 'border-primary' },
            { step: '3. Finalisation', text: 'Un conseiller Fogatech finalise l\'acte de vente et le plan de financement.', color: 'border-secondary-container' },
          ].map((s) => (
            <div key={s.step} className={`p-8 bg-surface-container-lowest shadow-card border-l-4 ${s.color}`}>
              <h3 className="font-headline font-bold text-primary text-xl mb-2">{s.step}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SmartCity() {
  return (
    <main className="pt-[72px] bg-surface text-on-surface font-body">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8MDPfggwup0Z3SMuGo46YI_szPnqojJEOiIgeG7a8sPmKoQCy7envx4wXyca8xs2EehEmZ9IBcz0TKSIkOJaXi79-5nxqogXRMVweQfAjHATDzsccQcBxhA7Qv9dwFQ6Gp4nQ-WGBn1fLxpFFeZJ23ZcpoI18HNfg06Ka53Qm32eP-eFt77ziIa5Rd4qO1edD-9YMbCbdNpxV3pRoxEjtsDqBazTqpEczxJo2jaSeWflxYw_7sCIBHn8iY8MWWD2iRZ7qFMHQmmR8"
            alt="Smart City Congo Brazzaville"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-20 max-w-4xl py-20">
          <span className="inline-block px-4 py-1 mb-6 bg-secondary-container text-on-secondary-container text-xs font-label font-bold tracking-widest uppercase rounded-full">
            Projet Monumental
          </span>
          <h1 className="font-headline font-black text-5xl md:text-7xl text-white tracking-tighter mb-6 leading-none">
            SMART CITY<br /><span className="text-secondary-container">CONGO</span>
          </h1>
          <p className="text-white/90 text-xl font-body font-medium max-w-2xl mb-10 leading-relaxed">
            Une révolution urbaine au cœur de Brazzaville. 20 000 logements intelligents conçus pour la durabilité, la sécurité et le confort moderne.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <a href="#carte" className="bg-white text-primary px-8 py-4 font-headline font-bold uppercase tracking-tight flex items-center gap-3 group transition-all hover:bg-surface-container-low">
              Réserver un Terrain
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <div className="text-white">
              <div className="text-3xl font-headline font-black">20 000</div>
              <div className="text-xs font-label font-bold uppercase opacity-60">Logements Prévus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa F4 */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <h2 className="font-headline text-4xl font-black text-primary tracking-tighter mb-8 leading-tight">
              LE MODÈLE F4 :<br />L'EXCELLENCE DE PLAIN-PIED
            </h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed font-body">
              Nos maisons de plain-pied redéfinissent l'espace de vie moderne. Avec une surface de 200m², chaque villa F4 allie architecture robuste et finitions haut de gamme.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'straighten', title: '200 m² Habitables', sub: 'Espace optimisé' },
                { icon: 'bed', title: '3 Chambres + Salon', sub: 'Confort familial' },
                { icon: 'solar_power', title: 'Autonomie Énergétique', sub: 'Smart Ready' },
                { icon: 'wifi', title: 'Fibre optique & Domotique', sub: 'Connectivité totale' },
              ].map((f) => (
                <div key={f.icon} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-secondary-container text-3xl">{f.icon}</span>
                  <div>
                    <div className="font-body font-bold text-primary">{f.title}</div>
                    <div className="text-xs uppercase font-label font-bold text-on-surface-variant">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-container z-0" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj22-ZgDzvTwdYvTwd2xj5eGJJ_Os0Lq870L-2TU-6UPmUYbuf7kikM_ybHoTvlkyGdqcRttCQrh3oXRAhFhsfZAiWq-RSTIPuOkJ7nXv-b7dgONbXhEjlPOnLRXtno0cDFtrQeQKSINYaIZX4lyMZhtoAmLVzYXVbpXCnknHH7IuNpJ2DDmag_F7B885H-xa-koGo7M7MahqkdFEh4V8l_J9Be84gtlIXDwCgQZyYgQzgti4FqXXqnqzH0prsllppn14uhv3Dp7Qu"
              alt="Villa F4 Fogatech Smart City"
              className="relative z-10 w-full aspect-video object-cover shadow-tectonic-lg rounded"
            />
          </div>
        </div>
      </section>

      {/* Carte interactive */}
      <PlotMap />

      {/* Stats */}
      <section className="bg-primary py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { val: '20k', label: 'Logements Totaux' },
              { val: '500+', label: 'Hectares Aménagés' },
              { val: '12', label: 'Parcs & Espaces Verts' },
              { val: '100%', label: 'Sécurisé & Connecté' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-5xl md:text-6xl font-headline font-black text-secondary-container mb-2">{s.val}</div>
                <div className="text-xs font-label font-bold tracking-widest uppercase opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-headline text-3xl font-black text-primary tracking-tighter mb-4">PRENEZ RENDEZ-VOUS</h2>
          <p className="text-on-surface-variant mb-8 font-body">Votre futur chez-vous commence ici. Contactez un expert Fogatech.</p>
          <a
            href="https://wa.me/242069610635?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20Smart%20City%20Massina"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 font-headline font-black uppercase tracking-widest text-xs hover:bg-secondary transition-colors"
          >
            <span className="material-symbols-outlined">chat</span>
            Contacter un expert →
          </a>
        </div>
      </section>
    </main>
  )
}
