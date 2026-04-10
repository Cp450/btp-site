import { useState, useRef, useEffect } from 'react'

// ─── Knowledge base FR/Lingala ───────────────────────────────────────────────
const FAQS = [
  {
    triggers: ['devis', 'prix', 'combien', 'cout', 'tarif', 'budget', 'estimation'],
    response: '💰 Nos devis sont **gratuits et sous 24h** après visite technique. Vous pouvez aussi utiliser notre [Calculateur Budget](#calculateur) sur la page d\'accueil pour une estimation immédiate.\n\nPour un devis précis, envoyez-nous votre projet sur WhatsApp → +242 06 961 06 35',
    lingala: 'Devis na biso ezali ya ofele (gratuit). Tokosala estimasyon na 24h.',
  },
  {
    triggers: ['engin', 'grue', 'bulldozer', 'pelle', 'camion', 'location', 'réserver', 'louer'],
    response: '🚜 Notre parc comprend **65 engins** disponibles à la location :\n• Pelleteuses 200K FCFA/j\n• Bulldozers 250K FCFA/j\n• Grues mobiles 400K FCFA/j\n• Bétonnières 80K FCFA/j\n\nConfirmation sous 2h · Livraison chantier sous 24h.',
    lingala: 'Biso tozali na engins mingi. Tokopesa yo na 2h soki ozali na urgence.',
  },
  {
    triggers: ['délai', 'temps', 'durée', 'combien de temps', 'quand'],
    response: '📅 Les délais varient selon le type de projet :\n• Villa standard R+1 : **4–6 mois**\n• Immeuble R+3 : **10–14 mois**\n• Local commercial : **3–5 mois**\n• Route rurale 10km : **8–12 mois**\n\n**Garantie délai** : si retard imputable à Fogatech, pénalité contractuelle de 0.5%/semaine.',
    lingala: 'Soki maison ya R+1: 4 na 6 mois. Biso tozali na garantie ya délai.',
  },
  {
    triggers: ['certification', 'diplôme', 'qualité', 'iso', 'garantie', 'certifié'],
    response: '✅ Nos certifications :\n• **ISO 9001** (management qualité)\n• **ISO 14001** (environnement)\n• **HQE** (haute qualité environnementale)\n• **Ordre des Ingénieurs Congo**\n• **ONIMOB** (immobilier)\n\nToutes nos attestations sont disponibles en PDF sur demande.',
    lingala: 'Biso tozali na certification ISO 9001 na mingi lisusu. Tozali certifiés na Ordre des Ingénieurs.',
  },
  {
    triggers: ['paiement', 'payer', 'acompte', 'virement', 'momo', 'airtel', 'mobile money'],
    response: '💳 Modes de paiement acceptés :\n• **MTN MoMo** ✅\n• **Airtel Money** ✅\n• **Virement bancaire** ✅\n• **Espèces** (acompte initial uniquement)\n\nStructure typique : 30% acompte · 40% mi-travaux · 30% à la livraison.',
    lingala: 'Tozali kozua MTN MoMo, Airtel Money, na virement bancaire. 30% liboso, 40% nzela, 30% sika basilisi.',
  },
  {
    triggers: ['smart city', 'massina', 'f4', 'éco', 'solaire', 'panneau', 'domotique'],
    response: '🏙️ Notre projet **Éco-Cité Massina** :\n• 20 appartements F4 (200m² chacun)\n• Panneaux solaires · Domotique\n• Recyclage eau pluviale\n• Disponibles à la vente dès 2026\n\nContactez-nous pour la liste d\'attente et les conditions de préréservation.',
    lingala: 'Smart City ya Massina: appartements F4, soleil, domotique. Ozali na intérêt? Tango na biso.',
  },
  {
    triggers: ['whatsapp', 'contact', 'telephone', 'appel', 'joindre', 'numéro'],
    response: '📱 Nous joindre :\n• **WhatsApp** : +242 06 961 06 35\n• **Réponse garantie** sous 15 minutes (heures ouvrées)\n• Disponible 7j/7 pour les urgences chantier',
    lingala: 'WhatsApp: +242 06 961 06 35. Tokoyanola na 15 minutes.',
  },
  {
    triggers: ['brazzaville', 'congo', 'pointe-noire', 'zone', 'région', 'où', 'localisation'],
    response: '📍 Fogatech BTP opère principalement à :\n• **Brazzaville** et sa périphérie\n• **Pool** (génie rural)\n• **Pointe-Noire** (projets industriels)\n\nNous pouvons intervenir sur tout le territoire congolais pour les grands chantiers.',
    lingala: 'Biso tozali na Brazzaville, Pool, na Pointe-Noire. Tozali kokende na Congo yonso pour grands projets.',
  },
  {
    triggers: ['portfolio', 'projet', 'réalisation', 'exemple', 'travail précédent'],
    response: '🏗️ Consultez notre [Portfolio](/portfolio) pour voir nos 50+ réalisations avec :\n• Budgets réels affichés\n• Délais respectés\n• Notes clients vérifiées\n• Certifications par projet',
    lingala: 'Tala Portfolio na biso: misala 50+ na biso emonisami awa na site.',
  },
]

const GREETINGS = ['bonjour', 'bonsoir', 'salut', 'hello', 'sango', 'mbote', 'yo']
const THANKS = ['merci', 'ok', 'parfait', 'super', 'bien', 'boa']

function getBotResponse(input) {
  const lower = input.toLowerCase()

  if (GREETINGS.some((g) => lower.includes(g))) {
    return {
      text: '👋 Mbote! Bonjour!\n\nJe suis l\'assistant Fogatech BTP. Je parle **français et lingala**.\n\nComment puis-je vous aider?\n• Devis & tarifs\n• Location engins\n• Délais projets\n• Paiements\n• Nos réalisations',
      lingala: null,
    }
  }
  if (THANKS.some((t) => lower.includes(t))) {
    return { text: '🙏 Avec plaisir! N\'hésitez pas si vous avez d\'autres questions.\n\nPour un accompagnement personnalisé : **WhatsApp +242 06 961 06 35**', lingala: null }
  }

  for (const faq of FAQS) {
    if (faq.triggers.some((t) => lower.includes(t))) {
      return { text: faq.response, lingala: faq.lingala }
    }
  }

  return {
    text: 'Je n\'ai pas de réponse précise à cette question. Notre équipe peut vous répondre directement :\n\n👉 **WhatsApp** : +242 06 961 06 35\n\nRéponse garantie sous **15 minutes** en heures ouvrées.',
    lingala: 'Nabosani! Tindela biso WhatsApp: +242 06 961 06 35. Tokoyanola na 15 minutes.',
  }
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-congo underline">$1</a>')
    .replace(/\n/g, '<br/>')
    .replace(/^• /gm, '&bull; ')
}

const QUICK_REPLIES = [
  'Devis gratuit',
  'Location engins',
  'Délais construction',
  'Paiement MTN MoMo',
  'Smart City Massina',
]

export default function ChatbotFoga() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 0, from: 'bot',
      text: '👋 Mbote! Bonjour!\n\nJe suis l\'assistant **Fogatech BTP**.\nPosez-moi vos questions en **français ou lingala** !',
      lingala: null,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showLingala, setShowLingala] = useState({})
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response = getBotResponse(text)
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', ...response }])
      setTyping(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-stitch-blue shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Assistant Fogatech"
      >
        {open
          ? <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-congo text-white text-[9px] font-bold flex items-center justify-center">
            AI
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-44 right-4 z-40 w-80 sm:w-96 bg-foga-card border border-foga-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: '70vh' }}>
          {/* Header */}
          <div className="bg-stitch-blue px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">F</div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Assistant Fogatech</p>
              <p className="text-blue-200 text-xs">FR · Lingala · Répond en 15min</p>
            </div>
            <a
              href="https://wa.me/242069610635?text=Bonjour%2C%20je%20viens%20du%20chat%20Fogatech%20BTP"
              target="_blank" rel="noreferrer"
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  msg.from === 'user'
                    ? 'bg-stitch-blue text-white rounded-br-none'
                    : 'bg-foga-bg border border-foga-border text-white rounded-bl-none'
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                  {msg.lingala && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => setShowLingala((s) => ({ ...s, [msg.id]: !s[msg.id] }))}
                        className="text-[10px] text-stitch-grey hover:text-savane transition-colors"
                      >
                        {showLingala[msg.id] ? '▼ Lingala' : '▶ Voir en Lingala'}
                      </button>
                      {showLingala[msg.id] && (
                        <p className="text-xs text-savane mt-1 italic">{msg.lingala}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-foga-bg border border-foga-border rounded-2xl rounded-bl-none px-4 py-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-stitch-grey animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto border-t border-foga-border">
            {QUICK_REPLIES.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}
                className="flex-shrink-0 text-xs bg-foga-bg border border-foga-border text-stitch-grey hover:border-congo/50 hover:text-congo px-3 py-1.5 rounded-full transition-colors">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-foga-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Votre question… (FR ou Lingala)"
              className="flex-1 bg-foga-bg border border-foga-border text-white text-sm rounded-xl px-3 py-2 focus:border-stitch-blue outline-none"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="bg-stitch-blue disabled:opacity-40 hover:bg-blue-700 text-white px-3 py-2 rounded-xl transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
