import Hero from "../components/Hero";
import ServicesGrid from "../components/ServicesGrid";
import ProjetsPhares from "../components/ProjetsPhares";
import PourquoiNous from "../components/PourquoiNous";
import Process from "../components/Process";
import Reviews from "../components/Reviews";
import CtaFinal from "../components/CtaFinal";

export default function Home() {
  return (
    <main>
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
