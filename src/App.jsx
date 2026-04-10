import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import SmartCity from './pages/SmartCity'
import GenieRural from './pages/GenieRural'
import DemandeDevis from './pages/DemandeDevis'
import ClientPortal from './pages/ClientPortal'
import Location from './pages/Location'
import ProjetDetail from './pages/ProjetDetail'
import SolutionsDurables from './pages/SolutionsDurables'
import InfrastructuresRurales from './pages/InfrastructuresRurales'
import LevagePisciculture from './pages/LevagePisciculture'
import DevisParticulier from './pages/DevisParticulier'
import WhatsAppButton from './components/WhatsAppButton'
import ChatbotFoga from './components/ChatbotFoga'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/smart-city" element={<SmartCity />} />
        <Route path="/smart-city/:slug" element={<ProjetDetail />} />
        <Route path="/genie-rural" element={<GenieRural />} />
        <Route path="/genie-rural/solutions-durables" element={<SolutionsDurables />} />
        <Route path="/genie-rural/infrastructures-rurales" element={<InfrastructuresRurales />} />
        <Route path="/genie-rural/levage-pisciculture" element={<LevagePisciculture />} />
        <Route path="/devis-particulier" element={<DevisParticulier />} />
        <Route path="/devis" element={<DemandeDevis />} />
        <Route path="/location" element={<Location />} />
        <Route path="/client/*" element={<ClientPortal />} />
      </Routes>
      <WhatsAppButton />
      <ChatbotFoga />
    </>
  )
}
