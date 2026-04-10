import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Footer from '../components/Footer'

const ENGINS_DATA = [
  {
    id: 'excavatrice',
    categorie: 'Terrassement',
    marque: 'Caterpillar',
    nom: 'Excavatrice Caterpillar 320',
    prix: '450 000 FCFA/j',
    disponible: true,
    poids: '22,5 T',
    puissance: '172 HP',
    description: 'Parfaite pour les travaux de précision et les grands terrassements. Efficacité énergétique optimisée.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiTzohMJixiz1WqObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe',
    specsIcon: ['settings_suggest', 'electric_bolt'],
  },
  {
    id: 'grue',
    categorie: 'Levage',
    marque: 'Liebherr',
    nom: 'Grue à tour Liebherr 280 EC-H',
    prix: 'Sur devis',
    disponible: true,
    poids: 'Jusqu\'à 70m',
    puissance: 'Cap. 12 T',
    description: 'Solution de levage haute performance pour les projets d\'envergure. Montage rapide et sécurité certifiée.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFBa8zvSazu72kUb3-EfYjg_ngGkou23fHkLJb-ER0G8NVLWM6qRvK5KqjfrO-bcsp8tFbV_bUQKMeevgTWZO0qbTeayldvl24xe1cJadTbtMCtaLWawBXZM7ryM3F-j7iDushqTaQH65ltFUYBIEZ-AaNMycz24l-gWxxBIxpV26NG5I6dXudM4TU4ZBn5z3UdXWaJ3IufhwH3oSvBWgbKYHJLnFfdGZMARCskVvnqABFS4Y-xtp7jrhzO_6xJajKaNqH0sUomONm',
    specsIcon: ['vertical_align_top', 'fitness_center'],
  },
  {
    id: 'tombereau',
    categorie: 'Transport',
    marque: 'Volvo CE',
    nom: 'Tombereau Articulé Volvo A40G',
    prix: '380 000 FCFA/j',
    disponible: true,
    poids: 'Charge: 39 T',
    puissance: '6×6 Tout terrain',
    description: 'Robustesse inégalée sur terrains difficiles. Confort opérateur et productivité maximale.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfm6sd09UMX2wYObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe',
    specsIcon: ['local_shipping', 'terrain'],
  },
  {
    id: 'bulldozer',
    categorie: 'Nivellement',
    marque: 'Komatsu',
    nom: 'Bulldozer Komatsu D65PX',
    prix: '410 000 FCFA/j',
    disponible: true,
    poids: '23,1 T',
    puissance: 'Lame: 4,3 m',
    description: 'Puissance de poussée exceptionnelle pour le nivellement de masse et la préparation de terrain.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD6o61AO-T5gRsMh5j29PTspIMctaxD2vNGDwsKp1MmlRS0uh5tMskNi3FccRRq54XFpxSgINKgQiO8lxOnY624EVsACq2u5dTu_h87yV5rXD9o35uS3g4--Y-EvwIH2Q41867e62_KROt-Y7EN5E9cdhv24LsZ6KDIeh5cB5tnpeaALQfne70OtlS-H86sR-kDgjzXOgbLbKEDhNHaXBovSYyO6uGJdX7dPq_KxiZfT6lsEYfHk5zZ4XaD7B7ERdDgmSyLDr8EKqv',
    specsIcon: ['width_full', 'speed'],
  },
  {
    id: 'pelle',
    categorie: 'Terrassement',
    marque: 'Komatsu',
    nom: 'Pelle hydraulique Komatsu PC200',
    prix: '200 000 FCFA/j',
    disponible: true,
    poids: '20 T',
    puissance: '148 HP',
    description: 'Polyvalente et maniable, idéale pour fouilles de fondations et travaux en site contraint.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiTzohMJixiz1WqObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe',
    specsIcon: ['construction', 'electric_bolt'],
  },
  {
    id: 'compacteur',
    categorie: 'Compactage',
    marque: 'Caterpillar',
    nom: 'Compacteur Caterpillar CS56B',
    prix: '150 000 FCFA/j',
    disponible: false,
    poids: '11,3 T',
    puissance: '130 HP',
    description: 'Compactage vibrant haute fréquence pour chaussées et plateformes industrielles.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfm6sd09UMX2wYObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe',
    specsIcon: ['speed', 'settings_suggest'],
  },
]

const CATEGORIES = ['Terrassement', 'Levage', 'Transport', 'Nivellement', 'Compactage']
const MARQUES = ['Caterpillar', 'Komatsu', 'Liebherr', 'Volvo CE']

export default function Location() {
  const [engins, setEngins] = useState(ENGINS_DATA)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [marque, setMarque] = useState('')
  const [dispo, setDispo] = useState(false)
  const [sort, setSort] = useState('recommande')
  const [dbEngins, setDbEngins] = useState(null)

  useEffect(() => {
    supabase.from('engins').select('*').then(({ data }) => {
      if (data && data.length) setDbEngins(data)
    })
  }, [])

  const toggleCat = (cat) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filtered = ENGINS_DATA.filter(e => {
    if (search && !e.nom.toLowerCase().includes(search.toLowerCase()) &&
        !e.categorie.toLowerCase().includes(search.toLowerCase())) return false
    if (categories.length && !categories.includes(e.categorie)) return false
    if (marque && e.marque !== marque) return false
    if (dispo && !e.disponible) return false
    return true
  }).sort((a, b) => {
    if (sort === 'prix') {
      const pa = parseInt(a.prix.replace(/\D/g, '')) || 999999
      const pb = parseInt(b.prix.replace(/\D/g, '')) || 999999
      return pa - pb
    }
    if (sort === 'dispo') return b.disponible - a.disponible
    return 0
  })

  const whatsapp = (nom) => {
    const msg = encodeURIComponent(`Bonjour Fogatech, je souhaite louer : ${nom}. Pouvez-vous me confirmer la disponibilité et les modalités ?`)
    window.open(`https://wa.me/242069610635?text=${msg}`, '_blank')
  }

  const reset = () => {
    setSearch('')
    setCategories([])
    setMarque('')
    setDispo(false)
    setSort('recommande')
  }

  return (
    <>
      <main className="pt-20 bg-surface min-h-screen">
        {/* Hero */}
        <section className="relative h-[420px] flex items-center bg-primary overflow-hidden">
          <div className="absolute inset-0 opacity-35">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbrTjzmDmff8UUw6g5LERhsrqabWrlUq6dQvdgYvqgO4Qe-kpWXY9rDIX8a1RaBM2UtIaFN2wWiIJAGXaj2JLniFoEuAFtgV9_-2yf_bGDkI0ud-U2IGn5oYbJPuR_rDQIAztjUnLsFwVYcGRdiY8FAcgFiazNN8z0r8jQIVhvm52f7SYCEWl3_Bktm_3tdekd3Tzh6pOygYxg5pxiM3H7uEhRV0_xyYeBj1gC0Z3xe7tEqwB4dXQuLvZxp7Ohaw9CvLYQSxmAHwc2"
              alt="Engins de chantier"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 font-label">
                Location Premium
              </span>
              <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-white leading-tight tracking-tighter mb-4">
                Conçus pour la <span className="text-secondary-container">Performance</span>,<br />
                Loués pour Durer.
              </h1>
              <p className="text-blue-100 text-lg max-w-lg font-body">
                Parc matériel moderne certifié. Robustesse, fiabilité et maintenance garantie pour vos chantiers les plus ambitieux.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-screen-2xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-80 shrink-0 space-y-6">
            <div className="bg-surface-container-low p-6 rounded-xl">
              <h3 className="text-primary font-headline font-bold text-xl mb-6">Recherche & Filtres</h3>
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase text-outline mb-2 tracking-widest font-label">
                    Mots-clés
                  </label>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Ex: Excavatrice..."
                    className="w-full bg-surface-container-high border-none rounded-sm px-4 py-3 pr-10 focus:ring-2 focus:ring-primary text-sm placeholder:text-outline font-body"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-9 text-outline text-lg">search</span>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs font-bold uppercase text-outline mb-3 tracking-widest font-label">
                    Catégorie
                  </label>
                  <div className="space-y-2">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={categories.includes(cat)}
                          onChange={() => toggleCat(cat)}
                          className="rounded-sm border-outline-variant text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors font-body">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marque */}
                <div>
                  <label className="block text-xs font-bold uppercase text-outline mb-3 tracking-widest font-label">
                    Marque
                  </label>
                  <select
                    value={marque}
                    onChange={e => setMarque(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary text-sm font-body"
                  >
                    <option value="">Toutes les marques</option>
                    {MARQUES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>

                {/* Disponibilité */}
                <div>
                  <label className="block text-xs font-bold uppercase text-outline mb-3 tracking-widest font-label">
                    Disponibilité
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setDispo(false)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${!dispo ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant'}`}
                    >
                      Tous
                    </button>
                    <button
                      onClick={() => setDispo(true)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${dispo ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-outline-variant'}`}
                    >
                      Immédiate
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full mt-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 font-label text-sm"
              >
                Réinitialiser les filtres
              </button>
            </div>

            {/* Support banner */}
            <div className="bg-primary-container p-6 rounded-xl text-white">
              <span className="material-symbols-outlined text-secondary-container mb-4 text-4xl block">support_agent</span>
              <h4 className="font-headline font-bold text-lg mb-2">Besoin d&apos;aide technique ?</h4>
              <p className="text-sm text-blue-100 mb-4 opacity-80 font-body">
                Nos experts vous conseillent sur le choix optimal du matériel pour votre projet.
              </p>
              <a
                href="https://wa.me/242069610635?text=Bonjour%20Fogatech%2C%20j'ai%20besoin%20d'aide%20pour%20choisir%20un%20engin."
                target="_blank"
                rel="noreferrer"
                className="text-secondary-container font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all font-label"
              >
                Contacter un expert <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Stock live from Supabase */}
            {dbEngins && (
              <div className="bg-surface-container-low p-6 rounded-xl">
                <h4 className="font-headline font-bold text-primary mb-4 text-sm uppercase tracking-widest">
                  Stock en temps réel
                </h4>
                <div className="space-y-3">
                  {dbEngins.map(e => (
                    <div key={e.id} className="flex items-center justify-between">
                      <span className="text-sm font-body text-on-surface-variant">{e.icon} {e.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                        {e.available}/{e.total}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8 border-b border-outline-variant/20 pb-4">
              <div>
                <h2 className="text-2xl font-headline font-bold text-primary">Engins Disponibles</h2>
                <p className="text-outline text-sm font-body">{filtered.length} matériel{filtered.length !== 1 ? 's' : ''} correspond{filtered.length === 1 ? '' : 'ent'} à vos critères</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-outline font-body">
                <span>Trier par :</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-transparent border-none text-primary font-bold focus:ring-0 p-0 cursor-pointer"
                >
                  <option value="recommande">Recommandé</option>
                  <option value="prix">Prix (Croissant)</option>
                  <option value="dispo">Disponibilité</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-on-surface-variant font-body">
                <span className="material-symbols-outlined text-5xl mb-4 block text-outline">search_off</span>
                Aucun engin ne correspond à vos filtres.
                <button onClick={reset} className="block mx-auto mt-4 text-primary font-bold underline">
                  Réinitialiser
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filtered.map(engin => (
                  <div key={engin.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={engin.img}
                        alt={engin.nom}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                      <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-sm text-[10px] font-bold text-white uppercase tracking-widest font-label">
                        {engin.categorie}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm font-label">
                        {engin.prix}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline font-bold text-xl text-primary">{engin.nom}</h3>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter font-label ${engin.disponible ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-red-100 text-red-700'}`}>
                          {engin.disponible ? 'Disponible' : 'Indisponible'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 my-4">
                        <div className="flex items-center gap-2 text-outline">
                          <span className="material-symbols-outlined text-lg">{engin.specsIcon[0]}</span>
                          <span className="text-xs font-medium font-body">{engin.poids}</span>
                        </div>
                        <div className="flex items-center gap-2 text-outline">
                          <span className="material-symbols-outlined text-lg">{engin.specsIcon[1]}</span>
                          <span className="text-xs font-medium font-body">{engin.puissance}</span>
                        </div>
                      </div>
                      <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 font-body">{engin.description}</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => whatsapp(engin.nom)}
                          className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-bold text-sm hover:bg-secondary transition-colors font-label"
                        >
                          Louer maintenant
                        </button>
                        <Link
                          to="/devis"
                          className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-lg text-primary hover:bg-surface-container-low transition-colors"
                          title="Demander un devis"
                        >
                          <span className="material-symbols-outlined">info</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Trust strip */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: 'verified', title: 'Matériel certifié', desc: 'Contrôle technique avant chaque location' },
                { icon: 'support_agent', title: 'Opérateur inclus', desc: 'Chauffeur qualifié sur demande +100K FCFA/j' },
                { icon: 'local_shipping', title: 'Livraison 24h', desc: 'Acheminement sur chantier dans toute la RDC' },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 p-6 bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined text-secondary-container text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-headline font-bold text-primary text-sm">{item.title}</p>
                    <p className="text-outline text-xs font-body mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
