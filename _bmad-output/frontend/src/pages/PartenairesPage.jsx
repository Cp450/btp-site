import SEO from "../components/SEO";
import Partenaires from "../components/Partenaires";

export default function PartenairesPage() {
  return (
    <>
      <SEO
        title="Partenaires & Clients — Foga-Tech BTP Congo"
        description="Découvrez les partenaires stratégiques, fournisseurs et clients institutionnels de Foga-Tech BTP Congo. Institutions publiques, groupes internationaux et entreprises congolaises."
        canonical="https://fogatech.cg/partenaires"
      />

      {/* Page hero — full screen */}
      <section className="relative min-h-screen bg-[#002045] flex flex-col justify-end overflow-hidden px-6">
        {/* Blueprint glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 40%, rgba(254,147,44,0.12), transparent 50%), radial-gradient(circle at 85% 15%, rgba(37,99,235,0.08), transparent 55%), repeating-linear-gradient(90deg, rgba(254,147,44,0.04) 0px, rgba(254,147,44,0.04) 1px, transparent 1px, transparent 46px)`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 inset-x-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, #002045, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto text-center pb-16 pt-32 w-full">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-6 h-px bg-[#4A7BC8]/60 flex-shrink-0" />
            <span className="font-label font-bold text-[11px] uppercase tracking-[0.25em] text-[#234998]">
              Écosystème Foga-Tech
            </span>
            <span className="w-6 h-px bg-[#4A7BC8]/60 flex-shrink-0" />
          </div>
          <h1
            className="font-headline font-black text-white leading-[0.95] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            Partenaires &amp; clients
          </h1>
          <p className="font-body text-white/50 text-base max-w-xl mx-auto">
            Institutions, entreprises nationales et groupes internationaux —
            ensemble nous façonnons l&apos;infrastructure du Congo de demain.
          </p>
        </div>
      </section>

      {/* Grid partenaires + modales */}
      <Partenaires />
    </>
  );
}
