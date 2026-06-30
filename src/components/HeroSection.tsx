export default function HeroSection() {
  return (
    <section className="px-margin-mobile max-w-container-max mx-auto mb-section-gap reveal">
      <div className="max-w-5xl">
        <h1 className="font-headline text-display mb-8">
          Frontend Developer &amp; <br />
          <span className="text-accent italic">React · Next.js · UX/UI</span>
        </h1>
        <p className="font-body text-body-lg text-secondary max-w-2xl mb-12 leading-relaxed">
          Construyo interfaces modernas, accesibles y responsivas con React, Next.js y Laravel, combinando desarrollo frontend con una sólida base en UX/UI para crear productos fáciles de usar y mantener.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-subtle mb-12">
          <div>
            <span className="block font-label-mono text-[11px] text-secondary uppercase mb-2">
              Ubicación
            </span>
            <span className="text-sm font-medium">Buenos Aires, ARG</span>
          </div>
          <div>
            <span className="block font-label-mono text-[11px] text-secondary uppercase mb-2">
              Stack Principal
            </span>
            <span className="text-sm font-medium">React / Next.js / Laravel</span>
          </div>
          <div>
            <span className="block font-label-mono text-[11px] text-secondary uppercase mb-2">
              Enfoque
            </span>
            <span className="text-sm font-medium">Frontend · UX/UI · Accesibilidad</span>
          </div>
          <div>
            <span className="block font-label-mono text-[11px] text-secondary uppercase mb-2">
              Disponibilidad
            </span>
            <span className="text-sm font-medium">Disponible para nuevas oportunidades</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <a
            className="bg-primary text-white px-10 py-4 text-sm font-medium hover:bg-accent transition-colors"
            href="#proyectos"
          >
            Ver Proyectos
          </a>
          <a
            className="border border-primary px-10 py-4 text-sm font-medium hover:bg-surface-alt transition-colors inline-flex items-center gap-2"
            href="#"
          >
            <span className="material-symbols-outlined">download</span>
            Descargar CV
          </a>
        </div>
      </div>
    </section>
  );
}
