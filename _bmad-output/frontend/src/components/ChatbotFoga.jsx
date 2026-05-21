import { useState, useRef, useEffect } from 'react'
import DOMPurify from 'dompurify'

const FAQS = [
  {
    triggers: ['devis', 'prix', 'combien', 'cout', 'tarif', 'budget', 'estimation'],
    response: 'Nos devis sont **gratuits et sous 24h** après visite technique. Vous pouvez aussi utiliser notre [Calculateur Budget](#calculateur) sur la page d\'accueil pour une estimation immédiate.\n\nPour un devis précis, envoyez-nous votre projet sur WhatsApp → +242 06 961 06 35',
    lingala: 'Devis na biso ezali ya ofele (gratuit). Tokosala estimasyon na 24h.',
  },
  {
    triggers: ['engin', 'grue', 'bulldozer', 'pelle', 'camion', 'location', 'réserver', 'louer'],
    response: 'Notre parc comprend **65 engins** disponibles à la location :\n• Pelleteuses 200K FCFA/j\n• Bulldozers 250K FCFA/j\n• Grues mobiles 400K FCFA/j\n• Bétonnières 80K FCFA/j\n\nConfirmation sous 2h · Livraison chantier sous 24h.',
    lingala: 'Biso tozali na engins mingi. Tokopesa yo na 2h soki ozali na urgence.',
  },
  {
    triggers: ['délai', 'temps', 'durée', 'combien de temps', 'quand', 'planning'],
    response: 'Chaque chantier est unique — la durée dépend de plusieurs paramètres :\n• **Surface** et complexité technique\n• **Accessibilité** du site & logistique\n• **Saison** (sèche/pluies) et approvisionnement\n• Normes spécifiques (santé, ERP, industriel)\n\nNous nous engageons sur :\n• **Planning contractuel** détaillé au devis\n• **Reporting hebdomadaire** d\'avancement\n• Délais **fermes par écrit** dans le contrat\n\nPour une estimation précise, consultez notre [page devis](/devis) ou contactez-nous : **WhatsApp +242 06 961 06 35**',
    lingala: 'Tango ya travaux ezali na variables mingi. Tokoyebisa yo planning ya solo na devis.',
  },
  {
    triggers: ['certification', 'diplôme', 'qualité', 'iso', 'garantie', 'certifié'],
    response: 'Nos agréments &amp; certifications :\n• **Agrément Ministère BTP Congo**\n• **Ordre des Ingénieurs Congo**\n• **ONIMOB** (immobilier)\n• **Normes BNC &amp; Eurocode 2** appliquées\n• **HQE** (en cours)\n\nToutes nos attestations sont disponibles en PDF sur demande.',
    lingala: 'Tozali agréés na Ministère BTP na Congo, na Ordre des Ingénieurs.',
  },
  {
    triggers: ['paiement', 'payer', 'acompte', 'virement', 'momo', 'airtel', 'mobile money'],
    response: 'Modes de paiement acceptés :\n• **MTN MoMo**\n• **Airtel Money**\n• **Virement bancaire**\n• **Espèces** (acompte initial uniquement)\n\nStructure typique : 30% acompte · 40% mi-travaux · 30% à la livraison.',
    lingala: 'Tozali kozua MTN MoMo, Airtel Money, na virement bancaire. 30% liboso, 40% nzela, 30% sika basilisi.',
  },
  {
    triggers: ['smart city', 'massina', 'f4', 'éco', 'solaire', 'panneau', 'domotique'],
    response: 'Notre projet **Éco-Cité Massina** :\n• 20 appartements F4 (200m² chacun)\n• Panneaux solaires · Domotique\n• Recyclage eau pluviale\n• Disponibles à la vente dès 2026\n\nContactez-nous pour la liste d\'attente et les conditions de préréservation.',
    lingala: 'Smart City ya Massina: appartements F4, soleil, domotique. Ozali na intérêt? Tango na biso.',
  },
  {
    triggers: ['whatsapp', 'contact', 'telephone', 'appel', 'joindre', 'numéro'],
    response: 'Nous joindre :\n• **WhatsApp** : +242 06 961 06 35\n• **Réponse garantie** sous 15 minutes (heures ouvrées)\n• Disponible 7j/7 pour les urgences chantier',
    lingala: 'WhatsApp: +242 06 961 06 35. Tokoyanola na 15 minutes.',
  },
  {
    triggers: ['brazzaville', 'congo', 'pointe-noire', 'zone', 'région', 'où', 'localisation'],
    response: 'Fogatech BTP opère principalement à :\n• **Brazzaville** et sa périphérie\n• **Pool** (génie rural)\n• **Pointe-Noire** (projets industriels)\n\nNous pouvons intervenir sur tout le territoire congolais pour les grands chantiers.',
    lingala: 'Biso tozali na Brazzaville, Pool, na Pointe-Noire. Tozali kokende na Congo yonso pour grands projets.',
  },
  {
    triggers: ['portfolio', 'projet', 'réalisation', 'exemple', 'travail précédent'],
    response: 'Consultez notre [Portfolio](/portfolio) pour voir nos 50+ réalisations avec :\n• Budgets réels affichés\n• Délais respectés\n• Notes clients vérifiées\n• Certifications par projet',
    lingala: 'Tala Portfolio na biso: misala 50+ na biso emonisami awa na site.',
  },
]

const GREETINGS = ['bonjour', 'bonsoir', 'salut', 'hello', 'sango', 'mbote', 'yo']
const THANKS = ['merci', 'ok', 'parfait', 'super', 'bien', 'boa']

function getBotResponse(input) {
  const lower = input.toLowerCase()

  if (GREETINGS.some((g) => lower.includes(g))) {
    return {
      text: "Mbote! Bonjour!\n\nJe suis l'assistant Fogatech BTP. Je parle **français et lingala**.\n\nComment puis-je vous aider?\n• Devis & tarifs\n• Location engins\n• Délais projets\n• Paiements\n• Nos réalisations",
      lingala: null,
    }
  }
  if (THANKS.some((t) => lower.includes(t))) {
    return { text: "Avec plaisir! N'hésitez pas si vous avez d'autres questions.\n\nPour un accompagnement personnalisé : **WhatsApp +242 06 961 06 35**", lingala: null }
  }

  for (const faq of FAQS) {
    if (faq.triggers.some((t) => lower.includes(t))) {
      return { text: faq.response, lingala: faq.lingala }
    }
  }

  return {
    text: "Je n'ai pas de réponse précise à cette question. Notre équipe peut vous répondre directement :\n\n**WhatsApp** : +242 06 961 06 35\n\nRéponse garantie sous **15 minutes** en heures ouvrées.",
    lingala: 'Nabosani! Tindela biso WhatsApp: +242 06 961 06 35. Tokoyanola na 15 minutes.',
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMessage(text) {
  const escaped = escapeHtml(text);
  const formatted = escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-secondary-container underline">$1</a>')
    .replace(/\n/g, "<br/>")
    .replace(/^• /gm, "&bull; ");
  return DOMPurify.sanitize(formatted, {
    ALLOWED_TAGS: ["strong", "a", "br"],
    ALLOWED_ATTR: ["href", "class"],
    ALLOWED_URI_REGEXP: /^(https?:|\/|#)/i,
  });
}

let _chatId = 0
const nextChatId = () => { _chatId += 1; return _chatId }

const QUICK_REPLIES = [
  'Devis gratuit',
  'Location engins',
  'Planning chantier',
  'Paiement MTN MoMo',
  'Smart City Massina',
  'Nos certifications',
]

export default function ChatbotFoga() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 0, from: 'bot',
      text: "Mbote! Bonjour!\n\nJe suis l'assistant **Fogatech BTP**.\nPosez-moi vos questions en **français ou lingala** !",
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
    const userMsg = { id: nextChatId(), from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response = getBotResponse(text)
      setMessages((m) => [...m, { id: nextChatId(), from: 'bot', ...response }])
      setTyping(false)
    }, 800)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary-container transition-colors"
        aria-label="Assistant Fogatech"
      >
        {open
          ? <span className="material-symbols-outlined text-on-primary text-2xl" aria-hidden="true">close</span>
          : <span className="material-symbols-outlined text-on-primary text-2xl" aria-hidden="true">chat</span>
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container text-[9px] font-bold flex items-center justify-center">
            AI
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop mobile uniquement — clic ferme */}
          <div
            onClick={() => setOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-slide-up"
            aria-hidden="true"
          />

          {/* Panel — fullscreen mobile, floating desktop */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Assistant Fogatech BTP"
            className="fixed z-50 bg-surface-container-low shadow-2xl flex flex-col overflow-hidden animate-fade-slide-up
                       inset-0
                       md:inset-auto md:bottom-44 md:right-4 md:w-[400px] md:rounded-2xl md:border md:border-outline-variant"
            style={{ maxHeight: '100dvh' }}
          >
            {/* Header sticky */}
            <div className="flex-shrink-0 bg-primary px-4 py-3 flex items-center gap-3 border-b border-white/10">
              {/* Avatar F + indicateur en ligne */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-base font-black text-on-secondary-container font-headline">
                  F
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-primary animate-pulse" aria-hidden="true" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-on-primary font-bold text-sm leading-tight">Assistant Fogatech</p>
                <p className="text-on-primary/60 text-[11px] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                  En ligne · FR · Lingala
                </p>
              </div>

              <a
                href="https://wa.me/242069610635?text=Bonjour%2C%20je%20viens%20du%20chat%20Fogatech%20BTP"
                target="_blank" rel="noreferrer"
                aria-label="Contacter sur WhatsApp"
                className="flex-shrink-0 w-9 h-9 rounded-full bg-on-primary/15 hover:bg-on-primary/25 text-on-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
              </a>

              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="flex-shrink-0 w-9 h-9 rounded-full hover:bg-on-primary/15 text-on-primary flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Messages scroll */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 bg-surface-container-lowest">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-black text-on-secondary-container font-headline mt-1">
                      F
                    </div>
                  )}
                  <div className={`max-w-[78%] px-4 py-2.5 text-sm shadow-sm ${
                    msg.from === 'user'
                      ? 'bg-primary text-on-primary rounded-2xl rounded-br-md'
                      : 'bg-surface border border-outline-variant text-on-surface rounded-2xl rounded-bl-md'
                  }`}>
                    <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                    {msg.lingala && (
                      <div className="mt-3 pt-2.5 border-t border-outline-variant/40">
                        <button
                          onClick={() => setShowLingala((s) => ({ ...s, [msg.id]: !s[msg.id] }))}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-success transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">translate</span>
                          {showLingala[msg.id] ? 'Masquer Lingala' : 'Voir en Lingala'}
                        </button>
                        {showLingala[msg.id] && (
                          <p className="text-xs text-success mt-2 italic leading-relaxed">{msg.lingala}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2 justify-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-black text-on-secondary-container font-headline mt-1">
                    F
                  </div>
                  <div className="bg-surface border border-outline-variant rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-on-surface-variant/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies — flex-wrap pour tout afficher */}
            <div className="flex-shrink-0 px-3 py-2.5 border-t border-outline-variant bg-surface-container-low">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-[11px] font-medium bg-surface border border-outline-variant text-on-surface-variant hover:border-secondary-container hover:bg-secondary-container/10 hover:text-secondary-container px-3 py-1.5 rounded-full transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input sticky bottom */}
            <div className="flex-shrink-0 p-3 border-t border-outline-variant bg-surface-container-low flex gap-2 items-center rounded-2xl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Votre question… (FR ou Lingala)"
                className="flex-1 bg-surface border border-outline-variant text-on-surface text-sm px-4 py-2.5 rounded-full focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                aria-label="Envoyer"
                className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container hover:shadow-tectonic-orange disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center transition-all"
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
