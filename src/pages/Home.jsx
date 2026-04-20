import Hero from '../components/Hero'
import LiveDashboard from '../components/LiveDashboard'
import Configurateur from '../components/Configurateur'
import EnginsStock from '../components/EnginsStock'
import ChefsSection from '../components/ChefCard'
import CalculateurBudget from '../components/CalculateurBudget'
import Reviews from '../components/Reviews'


export default function Home() {
  return (
    <main>
      <Hero />
      <LiveDashboard />
      <CalculateurBudget />
      <ChefsSection />
      <Configurateur />
      <EnginsStock />
      <Reviews />
    </main>
  )
}
