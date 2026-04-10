import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/client` },
    })
    setLoading(false)
    if (err) setError(err.message)
    else setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">📧</div>
        <h3 className="text-white font-bold text-xl mb-2">Lien envoyé !</h3>
        <p className="text-stitch-grey text-sm">
          Vérifiez <span className="text-white font-semibold">{email}</span>
        </p>
        <p className="text-xs text-stitch-grey mt-2">
          Cliquez le lien magic-link pour accéder à votre espace chantier.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">🏗️</div>
        <h2 className="text-2xl font-black text-white mb-1">Espace Client</h2>
        <p className="text-stitch-grey text-sm">Suivez votre chantier en temps réel</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-stitch-grey block mb-1">Votre email</label>
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            className="w-full bg-foga-bg border border-foga-border rounded-xl px-4 py-3 text-white text-sm focus:border-stitch-blue outline-none"
          />
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit" disabled={loading}
          className="w-full bg-stitch-blue disabled:opacity-50 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
        >
          {loading ? 'Envoi...' : 'Recevoir mon lien de connexion →'}
        </button>
        <p className="text-xs text-stitch-grey text-center">Magic link — aucun mot de passe requis</p>
      </form>
    </div>
  )
}

function Dashboard({ user, onLogout }) {
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial updates
    supabase
      .from('chantier_updates')
      .select('*')
      .eq('client_email', user.email)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data?.length) setUpdates(data)
        else setUpdates(FALLBACK_FEED)
        setLoading(false)
      })
      .catch(() => { setUpdates(FALLBACK_FEED); setLoading(false) })

    // Realtime subscription
    const channel = supabase
      .channel('chantier-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chantier_updates',
        filter: `client_email=eq.${user.email}`,
      }, (payload) => {
        setUpdates((prev) => [payload.new, ...prev])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [user.email])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-white">Mon Chantier</h2>
          <p className="text-xs text-stitch-grey">{user.email}</p>
        </div>
        <button onClick={onLogout} className="text-xs text-stitch-grey hover:text-white border border-foga-border rounded-lg px-3 py-1.5 transition-colors">
          Déconnexion
        </button>
      </div>

      {/* Progress */}
      <div className="bg-foga-card border border-foga-border rounded-2xl p-5 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-bold text-sm">Villa Nganga — Bacongo</h3>
          <span className="text-congo font-black text-lg">72%</span>
        </div>
        <div className="w-full bg-foga-bg rounded-full h-3">
          <div className="h-3 rounded-full bg-gradient-to-r from-stitch-blue to-savane transition-all" style={{ width: '72%' }} />
        </div>
        <div className="flex justify-between text-xs text-stitch-grey mt-2">
          <span>Démarré: 15 Jan 2026</span>
          <span>Livraison: 15 Juil 2026</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Avancement', val: '72%', color: 'text-congo' },
          { label: 'Chef chantier', val: '⭐ 4.9', color: 'text-yellow-400' },
          { label: 'Prochaine étape', val: 'J+8', color: 'text-blue-400' },
        ].map((s) => (
          <div key={s.label} className="bg-foga-card border border-foga-border rounded-xl p-3 text-center">
            <div className={`font-black text-lg ${s.color}`}>{s.val}</div>
            <div className="text-xs text-stitch-grey">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feed */}
      <h3 className="text-white font-bold text-sm mb-3">📸 Journal de chantier</h3>
      {loading ? (
        <div className="text-center py-8 text-stitch-grey text-sm">Chargement…</div>
      ) : (
        <div className="space-y-3">
          {updates.map((item) => (
            <div key={item.id} className="bg-foga-card border border-foga-border rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{item.photo ?? '📸'}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-blue-300">{item.author ?? item.chef_name}</span>
                    <span className="text-xs text-stitch-grey">{(item.created_at ?? item.date)?.slice(0, 10)}</span>
                  </div>
                  <p className="text-sm text-white mt-1">{item.text ?? item.content}</p>
                  {item.pct != null && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-foga-bg rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-savane" style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="text-xs text-savane font-bold">{item.pct}%</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <a
        href="https://wa.me/242069610635?text=Bonjour%20Chef%20Mbemba%2C%20j'ai%20une%20question%20sur%20mon%20chantier."
        target="_blank" rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 w-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] text-[#25D366] hover:text-white font-semibold py-3 rounded-xl text-sm transition-all"
      >
        <span>💬</span> Contacter Chef Mbemba sur WhatsApp
      </a>
    </div>
  )
}

const FALLBACK_FEED = [
  { id: 1, date: '2026-04-07', pct: 72, text: 'Dalle 2ème étage coulée. Prochaine étape: maçonnerie.', photo: '🏗️', author: 'Chef Mbemba' },
  { id: 2, date: '2026-04-01', pct: 58, text: 'Colonnes RDC terminées. Photos dispo dans la galerie.', photo: '📸', author: 'Chef Mbemba' },
  { id: 3, date: '2026-03-25', pct: 40, text: 'Fondations validées par ingénieur. Travaux en avance.', photo: '✅', author: 'Équipe Fogatech' },
]

export default function ClientPortal() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setUser(session.user)
      setChecking(false)
    })

    // Listen for auth state changes (magic link callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-foga-bg">
        <div className="text-stitch-grey text-sm">Vérification session…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-start justify-center bg-foga-bg px-4">
      <div className="w-full max-w-lg bg-foga-card border border-foga-border rounded-2xl p-6 md:p-8">
        {user
          ? <Dashboard user={user} onLogout={() => supabase.auth.signOut()} />
          : <LoginForm onLogin={setUser} />}
      </div>
    </div>
  )
}
