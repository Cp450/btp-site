import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function MentionsLegales() {
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="pt-24 pb-16 bg-surface min-h-screen">
      <SEO
        title="Mentions légales"
        description="Mentions légales de Fogatech BTP — éditeur, hébergeur, propriété intellectuelle et droit applicable."
        canonical="https://fogatech.cg/mentions-legales"
        noindex
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <nav className="mb-6">
          <Link to="/" className="text-primary text-sm font-body hover:text-secondary transition-colors">← Accueil</Link>
        </nav>
        <p className="text-on-surface-variant text-sm mb-8">Dernière mise à jour : {today}</p>

        <div className="bg-secondary-container/10 border border-secondary-container/20 rounded-xl p-4 mb-8">
          <p className="text-on-surface-variant text-sm">
            <strong>Avertissement :</strong> Ces mentions sont fournies à titre informatif et doivent être validées par un juriste avant publication définitive.
          </p>
        </div>

        <h1 className="font-headline text-4xl font-black text-primary mb-8">Mentions légales</h1>

        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">1. Éditeur du site</h2>
          <div className="font-body text-on-surface space-y-2">
            <p><strong>Raison sociale :</strong> Fogatech BTP</p>
            <p><strong>Adresse :</strong> Brazzaville, République du Congo</p>
            <p><strong>RCCM :</strong> En cours d'immatriculation</p>
            <p><strong>Directeur de publication :</strong> Fogatech BTP — Direction générale</p>
            <p><strong>Contact :</strong> contact@fogatech.cg | +242 06 961 06 35</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">2. Hébergeur</h2>
          <div className="font-body text-on-surface space-y-2">
            <p><strong>Vercel Inc.</strong></p>
            <p>340 S Lemon Ave #4133</p>
            <p>Walnut, CA 91789, USA</p>
            <p>Site : <a href="https://vercel.com" className="text-primary underline">vercel.com</a></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">3. Propriété intellectuelle</h2>
          <div className="font-body text-on-surface">
            <p>L'ensemble du contenu de ce site (textes, images, logos, codes) est la propriété exclusive de Fogatech BTP. Toute reproduction, diffusion ou exploitation commerciale sans autorisation écrite préalable est interdite.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">4. Responsabilité</h2>
          <div className="font-body text-on-surface">
            <p>Fogatech BTP s'efforce de fournir des informations exactes mais ne peut garantir l'exactitude, l'exhaustivité ou l'actualité des contenus. L'entreprise décline toute responsabilité en cas d'erreur ou d'indisponibilité du service.</p>
          </div>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">5. Droit applicable</h2>
          <div className="font-body text-on-surface">
            <p>Les présentes mentions légales sont régies par le droit congolais. Tout litige relève de la compétence exclusive des tribunaux de Brazzaville.</p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-outline-variant space-y-6">
          <div>
            <p className="text-on-surface-variant text-xs font-body uppercase tracking-widest mb-3">Voir aussi</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/confidentialite" className="text-primary text-sm font-body hover:text-secondary transition-colors">Politique de confidentialité</Link>
              <Link to="/cgu" className="text-primary text-sm font-body hover:text-secondary transition-colors">CGU</Link>
            </div>
          </div>
          <Link to="/" className="inline-block text-primary font-headline font-bold text-sm uppercase tracking-widest hover:text-secondary transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
