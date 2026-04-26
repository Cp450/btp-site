import { Link } from "react-router-dom";
import { IMG_HERO_DEVIS } from "../lib/images";

export default function CtaFinal() {
  return (
    <section className="relative bg-primary overflow-hidden py-20 md:py-32">
      <img
        src={IMG_HERO_DEVIS}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-container/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-secondary-container font-headline font-bold text-sm uppercase tracking-widest">
          Mokolo na mokolo
        </p>
        <h2 className="font-headline text-4xl md:text-6xl font-black text-white mt-4 leading-tight">
          Construisons<br/>
          l&apos;avenir du Congo.
        </h2>
        <p className="text-on-primary/80 font-body text-lg mt-6 max-w-xl mx-auto">
          Que ce soit pour une villa, un immeuble, une route ou la location d&apos;engins — notre équipe vous répond en moins de 24h.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/devis"
            className="bg-secondary-container text-on-secondary-container font-headline font-black uppercase tracking-widest text-xs px-8 py-4 hover:shadow-tectonic-orange transition-all duration-200"
          >
            Demander un devis
          </Link>
          <a
            href="https://wa.me/242069610635"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white text-white font-headline font-bold uppercase text-xs tracking-widest px-8 py-4 hover:bg-white/10 transition-colors"
          >
            WhatsApp · +242 06 961 06 35
          </a>
        </div>
      </div>
    </section>
  );
}
