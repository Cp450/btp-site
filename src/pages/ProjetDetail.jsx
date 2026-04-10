import { useParams, Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const PROJETS = {
  beta: {
    slug: 'beta',
    label: 'BETA',
    titre: 'Résidence des Appartements',
    sous_titre: 'Résidence de Prestige',
    description: 'Une redéfinition monumentale de l\'habitat urbain. Conçue pour l\'excellence technique et le confort absolu au cœur de la Smart City.',
    hero_img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxzBr72lFkub9Be4EVolCjlDSqtn1PUOB3VFs-CEbAaDHxMZjybzQgK1twxjRZZsFb7Sz7nHyNM3MkI1hyC2q1KEac1Ff4CenwCNCU1hdjB_fs4K8uuvskqxAMxqcU_Me7Kso_98GGPgJds689Dwg3MTzZtmm-W4ggItgYVPVhXLBQbjLt0pWaMspYhFWgbWQ2wBA6_9zSMJZssOeTXRTv-RK2JNCrDj59YodBL',
    statut: 'En cours',
    avancement: 72,
    specs: [
      { icon: 'domain', label: 'Type', valeur: 'Appartements F4 Premium' },
      { icon: 'square_foot', label: 'Surface moyenne', valeur: '200 m² habitable' },
      { icon: 'groups', label: 'Unités totales', valeur: '48 résidences' },
    ],
    features: [
      { icon: 'bolt', titre: 'Énergie Intelligente', desc: 'Panneaux solaires photovoltaïques intégrés et gestion automatisée par IA.', dark: false },
      { icon: 'verified_user', titre: 'Sécurité Avancée', desc: 'Contrôle d\'accès biométrique, surveillance 24/7 et périmètre sécurisé.', dark: true },
    ],
    gallery: [
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKIRJFIQRADqGHNY2kL5u4koqiAGJfIVq_pIctOB0lwaMhbMsysgtMVotSksFUdTGwzllTv9cO3bhqN5Y1D-vXABpJL2pF1lwMm339-FrTQ6lEVkUECxoMB7ExqBf9W3-LZ4MVJQzJKGtg0orOWfas2xLzKhEjMungRJc_Z-4-j7quH89hpojHYEgyCRuKUek0QROnh9PY--gTOUd2IjRVJTCnUiyY4kio-oTv8ZxrUPc1sQDfgXFAfFnDgpTe2INPbbvUvBZRuz24', caption: 'Séjour Grand Angle' },
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtfhHUptmCyxIu9s0P6K0rBQhbTHuqU__Wj2iFUAVFhU_K9Sr8GmcuXJRjvOyniIf8blK-2mwcUGV6ccXY2JqpywQB6hJZ4U9tzQjI3wSvDwEyH51AtwFb6NR_5Upfu8jLrHUJT4PUZywUKFlnOiMK4F9qIH_cOwTqo-mEogwafLgvXZXlX_LyEyNgrFomvYAZ7BWsbV8yIpMrML-l7vlOOHT10DW2gP24IHromQWttmv1ELlSnxp9ZyL3vBpYagbyw3XrlHMkFrV1', caption: 'Cuisine Haute Performance' },
    ],
    cta: 'Réserver mon appartement',
    cta_msg: 'Bonjour Fogatech, je suis intéressé(e) par le Projet Beta — Résidence des Appartements. Pouvez-vous me donner plus d\'informations ?',
  },
  gamma: {
    slug: 'gamma',
    label: 'GAMMA',
    titre: 'Espaces Verts & Parcs Urbains',
    sous_titre: 'Infrastructure Écologique',
    description: 'Un poumon vert au cœur de la Smart City. Des parcs durables conçus pour le bien-être collectif et la biodiversité urbaine.',
    hero_img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhzeEW7Rgw4dqwEuFEcxE4_Bl6SF18eXWu4CXvm4Lg55ZJ6PAdjmRUgBH-M-5VWiABqntoSrf3RWEBdiKJWyr4Dzuf_BeGt8sCqNy7ONGtdxhNcoUl9aoJyyHEWDnJjjuW9kb3aXnSJE7JWq2PcqEfeaQQgslK9in0VpKH2dPH3dBz0ndqWYFGScUA0qIZ-gHHkV6Op0EepqM_hdcIePk2bzKgbwBkeMfwxQVhlPjdVRHPPBCjWI_taIDGBnwH8baqxYTn-7jxe4eQ',
    statut: 'Planification',
    avancement: 30,
    specs: [
      { icon: 'park', label: 'Surface verte', valeur: '45 hectares' },
      { icon: 'directions_walk', label: 'Allées pédestres', valeur: '12 km de parcours' },
      { icon: 'eco', label: 'Espèces végétales', valeur: '120+ espèces locales' },
    ],
    features: [
      { icon: 'water_drop', titre: 'Irrigation Intelligente', desc: 'Arrosage automatisé avec capteurs d\'humidité et récupération des eaux pluviales.', dark: false },
      { icon: 'energy_savings_leaf', titre: 'Biodiversité Certifiée', desc: 'Plantation d\'espèces endémiques congolaises pour reconstituer les écosystèmes locaux.', dark: true },
    ],
    gallery: [
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhzeEW7Rgw4dqwEuFEcxE4_Bl6SF18eXWu4CXvm4Lg55ZJ6PAdjmRUgBH-M-5VWiABqntoSrf3RWEBdiKJWyr4Dzuf_BeGt8sCqNy7ONGtdxhNcoUl9aoJyyHEWDnJjjuW9kb3aXnSJE7JWq2PcqEfeaQQgslK9in0VpKH2dPH3dBz0ndqWYFGScUA0qIZ-gHHkV6Op0EepqM_hdcIePk2bzKgbwBkeMfwxQVhlPjdVRHPPBCjWI_taIDGBnwH8baqxYTn-7jxe4eQ', caption: 'Parc Central au crépuscule' },
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKIRJFIQRADqGHNY2kL5u4koqiAGJfIVq_pIctOB0lwaMhbMsysgtMVotSksFUdTGwzllTv9cO3bhqN5Y1D-vXABpJL2pF1lwMm339-FrTQ6lEVkUECxoMB7ExqBf9W3-LZ4MVJQzJKGtg0orOWfas2xLzKhEjMungRJc_Z-4-j7quH89hpojHYEgyCRuKUek0QROnh9PY--gTOUd2IjRVJTCnUiyY4kio-oTv8ZxrUPc1sQDfgXFAfFnDgpTe2INPbbvUvBZRuz24', caption: 'Jardin communautaire' },
    ],
    cta: 'En savoir plus',
    cta_msg: 'Bonjour Fogatech, je m\'intéresse au Projet Gamma — Espaces Verts. Pouvez-vous me partager les détails du projet ?',
  },
  delta: {
    slug: 'delta',
    label: 'DELTA',
    titre: 'Infrastructure & Réseaux',
    sous_titre: 'Génie Civil Majeur',
    description: 'Le squelette technique de la Smart City. Routes, drainage, réseaux souterrains — une infrastructure pensée pour durer un siècle.',
    hero_img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbrTjzmDmff8UUw6g5LERhsrqabWrlUq6dQvdgYvqgO4Qe-kpWXY9rDIX8a1RaBM2UtIaFN2wWiIJAGXaj2JLniFoEuAFtgV9_-2yf_bGDkI0ud-U2IGn5oYbJPuR_rDQIAztjUnLsFwVYcGRdiY8FAcgFiazNN8z0r8jQIVhvm52f7SYCEWl3_Bktm_3tdekd3Tzh6pOygYxg5pxiM3H7uEhRV0_xyYeBj1gC0Z3xe7tEqwB4dXQuLvZxp7Ohaw9CvLYQSxmAHwc2',
    statut: 'En cours',
    avancement: 88,
    specs: [
      { icon: 'road', label: 'Voirie primaire', valeur: '28 km de routes' },
      { icon: 'water', label: 'Drainage', valeur: 'Réseau 45 km' },
      { icon: 'electrical_services', label: 'Électricité', valeur: '3 sous-stations' },
    ],
    features: [
      { icon: 'construction', titre: 'Terrassement Massif', desc: 'Excavation de 2,4 millions de m³ avec compactage certifié et contrôle géotechnique.', dark: false },
      { icon: 'sensors', titre: 'Monitoring IoT', desc: 'Capteurs embarqués dans les infrastructures pour surveillance continue en temps réel.', dark: true },
    ],
    gallery: [
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbrTjzmDmff8UUw6g5LERhsrqabWrlUq6dQvdgYvqgO4Qe-kpWXY9rDIX8a1RaBM2UtIaFN2wWiIJAGXaj2JLniFoEuAFtgV9_-2yf_bGDkI0ud-U2IGn5oYbJPuR_rDQIAztjUnLsFwVYcGRdiY8FAcgFiazNN8z0r8jQIVhvm52f7SYCEWl3_Bktm_3tdekd3Tzh6pOygYxg5pxiM3H7uEhRV0_xyYeBj1gC0Z3xe7tEqwB4dXQuLvZxp7Ohaw9CvLYQSxmAHwc2', caption: 'Pose de conduites souterraines' },
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiTzohMJixiz1WqObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe', caption: 'Réseau électrique haute tension' },
    ],
    cta: 'Suivre l\'avancement',
    cta_msg: 'Bonjour Fogatech, je souhaite des informations sur le Projet Delta — Infrastructure & Réseaux de la Smart City.',
  },
  epsilon: {
    slug: 'epsilon',
    label: 'EPSILON',
    titre: 'Parc Technologique',
    sous_titre: 'Innovation & Industrie',
    description: 'Un hub d\'innovation de 12 hectares. Bureaux high-tech, centres de données et laboratoires pour l\'économie numérique d\'Afrique centrale.',
    hero_img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD6o61AO-T5gRsMh5j29PTspIMctaxD2vNGDwsKp1MmlRS0uh5tMskNi3FccRRq54XFpxSgINKgQiO8lxOnY624EVsACq2u5dTu_h87yV5rXD9o35uS3g4--Y-EvwIH2Q41867e62_KROt-Y7EN5E9cdhv24LsZ6KDIeh5cB5tnpeaALQfne70OtlS-H86sR-kDgjzXOgbLbKEDhNHaXBovSYyO6uGJdX7dPq_KxiZfT6lsEYfHk5zZ4XaD7B7ERdDgmSyLDr8EKqv',
    statut: 'Planification',
    avancement: 18,
    specs: [
      { icon: 'business', label: 'Surface bureaux', valeur: '45 000 m²' },
      { icon: 'dns', label: 'Data centers', valeur: '2 centres Tier III' },
      { icon: 'groups', label: 'Emplois créés', valeur: '2 500+ emplois directs' },
    ],
    features: [
      { icon: 'wifi', titre: 'Connectivité Fibre', desc: 'Réseau fibre optique redondant 10Gbps pour chaque unité du parc technologique.', dark: false },
      { icon: 'solar_power', titre: 'Énergie Verte', desc: '100% énergies renouvelables : solaire + biomasse pour zéro émission carbone.', dark: true },
    ],
    gallery: [
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD6o61AO-T5gRsMh5j29PTspIMctaxD2vNGDwsKp1MmlRS0uh5tMskNi3FccRRq54XFpxSgINKgQiO8lxOnY624EVsACq2u5dTu_h87yV5rXD9o35uS3g4--Y-EvwIH2Q41867e62_KROt-Y7EN5E9cdhv24LsZ6KDIeh5cB5tnpeaALQfne70OtlS-H86sR-kDgjzXOgbLbKEDhNHaXBovSYyO6uGJdX7dPq_KxiZfT6lsEYfHk5zZ4XaD7B7ERdDgmSyLDr8EKqv', caption: 'Campus technologique' },
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFBa8zvSazu72kUb3-EfYjg_ngGkou23fHkLJb-ER0G8NVLWM6qRvK5KqjfrO-bcsp8tFbV_bUQKMeevgTWZO0qbTeayldvl24xe1cJadTbtMCtaLWawBXZM7ryM3F-j7iDushqTaQH65ltFUYBIEZ-AaNMycz24l-gWxxBIxpV26NG5I6dXudM4TU4ZBn5z3UdXWaJ3IufhwH3oSvBWgbKYHJLnFfdGZMARCskVvnqABFS4Y-xtp7jrhzO_6xJajKaNqH0sUomONm', caption: 'Centre de données haute densité' },
    ],
    cta: 'Réserver un espace',
    cta_msg: 'Bonjour Fogatech, je suis intéressé(e) par un espace dans le Parc Technologique Epsilon. Pouvez-vous me contacter ?',
  },
  zeta: {
    slug: 'zeta',
    label: 'ZETA',
    titre: 'Transit Center',
    sous_titre: 'Mobilité Urbaine',
    description: 'Le nœud de mobilité de la Smart City. Un hub intermodal reliant bus rapides, voies piétonnes et futures lignes de tramway.',
    hero_img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfm6sd09UMX2wYObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe',
    statut: 'Conception',
    avancement: 45,
    specs: [
      { icon: 'directions_bus', label: 'Quais bus', valeur: '24 quais couverts' },
      { icon: 'people', label: 'Capacité', valeur: '50 000 passagers/jour' },
      { icon: 'straighten', label: 'Surface', valeur: '18 000 m²' },
    ],
    features: [
      { icon: 'qr_code_scanner', titre: 'Billetterie Smart', desc: 'Système de ticket unique NFC pour tous les modes de transport, paiement mobile intégré.', dark: false },
      { icon: 'accessibility_new', titre: 'Accessibilité Totale', desc: 'PMR, ascenseurs intelligents et signalétique multilingue — français, lingala, anglais.', dark: true },
    ],
    gallery: [
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfm6sd09UMX2wYObICRTW1_m2CK_WLQRQtFX7Jm80BQfIDWKfGyYdK70LG39aFw_22HalTt9SiJPCb6JQ_2NqxF2dRnvRPeBjaQhzRodQDFYabQ83A5ccyYi11k6mu5Iz_pw6kcGqO4827W6iaE9fN2BEDuA0g7wgRzeJYDUM3GiRZEwJEpYtWlv11w4sEFRmk83gXkHMMVEYsOC5zpc2xu8G6KXPDW6kXSc8G526mrWqMhRWdzSWI1AgKFgxpdMqnjeW4X4ajWoe', caption: 'Hub intermodal principal' },
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD6o61AO-T5gRsMh5j29PTspIMctaxD2vNGDwsKp1MmlRS0uh5tMskNi3FccRRq54XFpxSgINKgQiO8lxOnY624EVsACq2u5dTu_h87yV5rXD9o35uS3g4--Y-EvwIH2Q41867e62_KROt-Y7EN5E9cdhv24LsZ6KDIeh5cB5tnpeaALQfne70OtlS-H86sR-kDgjzXOgbLbKEDhNHaXBovSYyO6uGJdX7dPq_KxiZfT6lsEYfHk5zZ4XaD7B7ERdDgmSyLDr8EKqv', caption: 'Salle des départs' },
    ],
    cta: 'Voir les plans',
    cta_msg: 'Bonjour Fogatech, je m\'intéresse au Projet Zeta — Transit Center. Pouvez-vous me partager les plans et l\'avancement ?',
  },
  eta: {
    slug: 'eta',
    label: 'ETA',
    titre: 'Réseau Énergie & Utilities',
    sous_titre: 'Infrastructure Critique',
    description: 'Le système nerveux énergétique de la Smart City. Réseau électrique intelligent, eau potable et assainissement pour 20 000 habitants.',
    hero_img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbrTjzmDmff8UUw6g5LERhsrqabWrlUq6dQvdgYvqgO4Qe-kpWXY9rDIX8a1RaBM2UtIaFN2wWiIJAGXaj2JLniFoEuAFtgV9_-2yf_bGDkI0ud-U2IGn5oYbJPuR_rDQIAztjUnLsFwVYcGRdiY8FAcgFiazNN8z0r8jQIVhvm52f7SYCEWl3_Bktm_3tdekd3Tzh6pOygYxg5pxiM3H7uEhRV0_xyYeBj1gC0Z3xe7tEqwB4dXQuLvZxp7Ohaw9CvLYQSxmAHwc2',
    statut: 'En cours',
    avancement: 60,
    specs: [
      { icon: 'bolt', label: 'Puissance installée', valeur: '45 MVA' },
      { icon: 'water_drop', label: 'Eau potable', valeur: '8 000 m³/jour' },
      { icon: 'solar_power', label: 'Solaire', valeur: '12 MW crête' },
    ],
    features: [
      { icon: 'smart_toy', titre: 'Smart Grid', desc: 'Réseau électrique auto-régulé avec stockage batterie et prédiction de charge par IA.', dark: false },
      { icon: 'recycling', titre: 'Eau Circulaire', desc: 'Traitement et réutilisation de 80% des eaux usées pour l\'irrigation des espaces verts.', dark: true },
    ],
    gallery: [
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbrTjzmDmff8UUw6g5LERhsrqabWrlUq6dQvdgYvqgO4Qe-kpWXY9rDIX8a1RaBM2UtIaFN2wWiIJAGXaj2JLniFoEuAFtgV9_-2yf_bGDkI0ud-U2IGn5oYbJPuR_rDQIAztjUnLsFwVYcGRdiY8FAcgFiazNN8z0r8jQIVhvm52f7SYCEWl3_Bktm_3tdekd3Tzh6pOygYxg5pxiM3H7uEhRV0_xyYeBj1gC0Z3xe7tEqwB4dXQuLvZxp7Ohaw9CvLYQSxmAHwc2', caption: 'Lignes haute tension' },
      { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhzeEW7Rgw4dqwEuFEcxE4_Bl6SF18eXWu4CXvm4Lg55ZJ6PAdjmRUgBH-M-5VWiABqntoSrf3RWEBdiKJWyr4Dzuf_BeGt8sCqNy7ONGtdxhNcoUl9aoJyyHEWDnJjjuW9kb3aXnSJE7JWq2PcqEfeaQQgslK9in0VpKH2dPH3dBz0ndqWYFGScUA0qIZ-gHHkV6Op0EepqM_hdcIePk2bzKgbwBkeMfwxQVhlPjdVRHPPBCjWI_taIDGBnwH8baqxYTn-7jxe4eQ', caption: 'Ferme solaire Smart City' },
    ],
    cta: 'Suivi en temps réel',
    cta_msg: 'Bonjour Fogatech, je souhaite des informations sur le Projet Eta — Réseau Énergie & Utilities.',
  },
}

const STATUT_COLORS = {
  'En cours': 'bg-green-100 text-green-800',
  'Planification': 'bg-blue-100 text-blue-800',
  'Conception': 'bg-orange-100 text-orange-800',
  'Livré': 'bg-primary text-white',
}

const NAV_PROJETS = ['beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta']

export default function ProjetDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const projet = PROJETS[slug]

  if (!projet) {
    return (
      <div className="pt-32 text-center min-h-screen bg-surface">
        <p className="text-on-surface-variant font-body text-lg mb-4">Projet introuvable.</p>
        <Link to="/smart-city" className="text-primary font-bold underline">← Retour Smart City</Link>
      </div>
    )
  }

  const whatsapp = () => {
    const msg = encodeURIComponent(projet.cta_msg)
    window.open(`https://wa.me/242069610635?text=${msg}`, '_blank')
  }

  return (
    <>
      <main className="pt-20 bg-surface min-h-screen">
        {/* Side nav (desktop) */}
        <div className="hidden lg:flex">
          <aside className="w-64 fixed left-0 top-20 bottom-0 bg-surface-container-low border-r border-outline-variant/20 z-30 overflow-y-auto">
            <div className="p-6">
              <Link to="/smart-city" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-outline hover:text-primary mb-8 transition-colors font-label">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Smart City
              </Link>
              <p className="text-xs font-bold uppercase tracking-widest text-outline mb-4 font-label">Phases du Projet</p>
              <nav className="space-y-1">
                {NAV_PROJETS.map(s => {
                  const p = PROJETS[s]
                  return (
                    <button
                      key={s}
                      onClick={() => navigate(`/smart-city/${s}`)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors rounded-lg ${slug === s ? 'text-primary font-bold bg-surface-container border-r-4 border-secondary-container' : 'text-on-surface-variant hover:bg-surface-container'}`}
                    >
                      <span className={`text-xs font-black mr-3 w-12 font-label ${slug === s ? 'text-secondary-container' : 'text-outline'}`}>{p.label}</span>
                      <span className="text-xs font-body truncate">{p.titre}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main with sidebar offset */}
          <div className="ml-64 flex-1">
            <PageContent projet={projet} onCta={whatsapp} />
          </div>
        </div>

        {/* Mobile (no sidebar) */}
        <div className="lg:hidden">
          <PageContent projet={projet} onCta={whatsapp} />
        </div>
      </main>
      <Footer />
    </>
  )
}

function PageContent({ projet, onCta }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[500px] md:h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={projet.hero_img}
            alt={projet.titre}
            className="w-full h-full object-cover"
            onError={e => { e.target.parentElement.style.background = '#002045' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        </div>
        <div className="relative z-10 p-8 lg:p-16 w-full max-w-4xl">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 mb-6 text-xs font-bold uppercase tracking-widest font-label rounded-full">
            {projet.sous_titre}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none tracking-tighter mb-6 font-headline">
            PROJET <span className="text-secondary-container">{projet.label}</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-xl font-body leading-relaxed mb-8">{projet.description}</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onCta}
              className="bg-secondary-container text-on-secondary-container px-8 py-4 font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-transform font-label rounded-lg"
            >
              {projet.cta}
            </button>
            <Link
              to="/smart-city"
              className="border-2 border-white/30 text-white px-8 py-4 font-extrabold text-sm uppercase tracking-widest hover:border-white transition-colors font-label rounded-lg"
            >
              ← Smart City
            </Link>
          </div>
        </div>
      </section>

      {/* Avancement */}
      <div className="bg-primary-container px-8 lg:px-16 py-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200 font-label">Avancement</span>
              <span className="text-xs font-bold text-secondary-container font-label">{projet.avancement}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary-container rounded-full transition-all duration-1000"
                style={{ width: `${projet.avancement}%` }}
              />
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold font-label ${STATUT_COLORS[projet.statut] || 'bg-white/10 text-white'}`}>
            {projet.statut}
          </span>
        </div>
      </div>

      {/* Specs */}
      <section className="bg-surface py-16 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <span className="text-secondary font-bold uppercase tracking-widest text-xs block mb-4 font-label">Construction & Design</span>
          <h2 className="text-3xl font-extrabold text-primary mb-10 font-headline">Spécifications Techniques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projet.specs.map(spec => (
              <div key={spec.label} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center group-hover:bg-primary transition-colors duration-300 rounded-lg">
                  <span className="material-symbols-outlined text-primary group-hover:text-white">{spec.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-outline font-label">{spec.label}</p>
                  <p className="text-base font-bold text-primary font-headline">{spec.valeur}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features bento */}
      <section className="bg-surface-container-low py-16 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {projet.features.map(f => (
            <div
              key={f.titre}
              className={`p-10 rounded-xl ${f.dark ? 'bg-primary text-white' : 'bg-surface-container-lowest'}`}
            >
              <span className={`material-symbols-outlined text-secondary-container mb-6 text-3xl block`}>{f.icon}</span>
              <h3 className={`text-xl font-extrabold mb-4 font-headline ${f.dark ? 'text-white' : 'text-primary'}`}>{f.titre}</h3>
              <p className={`text-sm leading-relaxed font-body ${f.dark ? 'text-blue-200' : 'text-on-surface-variant'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-16 px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-primary mb-8 font-headline">Aperçu Architectural</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projet.gallery.map((item, i) => (
              <div key={i} className={`relative group overflow-hidden rounded-xl ${i === 0 ? 'md:col-span-2' : ''} h-72`}>
                <img
                  src={item.img}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={e => { e.target.parentElement.style.background = '#1a365d' }}
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
                  <p className="text-white font-bold font-headline">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-6 font-headline">Prêt à investir dans l&apos;avenir ?</h2>
          <p className="text-blue-200 text-lg mb-10 font-body">
            Nos conseillers sont disponibles pour une présentation détaillée du projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onCta}
              className="bg-secondary-container text-on-secondary-container px-10 py-5 font-extrabold text-sm uppercase tracking-widest hover:scale-105 transition-transform font-label rounded-lg"
            >
              {projet.cta}
            </button>
            <Link
              to="/devis"
              className="bg-transparent border-2 border-white text-white px-10 py-5 font-extrabold text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all font-label rounded-lg"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
