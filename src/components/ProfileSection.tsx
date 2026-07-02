export default function ProfileSection() {
  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-section-gap reveal"
      id="perfil"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h2 className="font-label-mono text-accent uppercase tracking-widest">
            Perfil Profesional
          </h2>
        </div>
        <div className="md:col-span-8">
          <p className="font-headline text-headline-md mb-8 leading-tight">
            Mi trabajo se centra en transformar ideas complejas en interfaces
            intuitivas y sólidas.
          </p>
          <div className="grid grid-cols-1 gap-6">
            <p className="text-secondary leading-relaxed">
              Desarrollo interfaces web modernas, accesibles y mantenibles, transformando diseños en experiencias claras, rápidas y fáciles de usar.
            </p>
            <p className="text-secondary leading-relaxed">
              Mi enfoque combina desarrollo frontend y UX/UI para crear productos donde el diseño, la accesibilidad y el código trabajan en conjunto.
            </p>
            <p className="text-secondary leading-relaxed">
              Trabajo principalmente con React, Next.js y Laravel, siempre buscando construir soluciones escalables y centradas en las necesidades de las personas que las utilizan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
