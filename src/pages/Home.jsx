import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import ProjetsPhares from "../components/ProjetsPhares";
import PourquoiNous from "../components/PourquoiNous";
import Process from "../components/Process";
import Reviews from "../components/Reviews";
import CtaFinal from "../components/CtaFinal";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <main>
      <SEO
        title="Fogatech BTP — Leader en Construction au Congo-Brazzaville"
        description="Génie civil, Smart City, Génie Rural et location d'engins à Brazzaville. 50+ chantiers livrés, ISO 9001, agrément Ministère BTP Congo."
        canonical="https://fogatech.cg"
      />
      <Hero />
      <ServicesGrid />
      <ProjetsPhares />
      <PourquoiNous />
      <Process />
      <Reviews compact />
      <CtaFinal />
    </main>
  );
}
