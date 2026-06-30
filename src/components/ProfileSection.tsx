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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-secondary leading-relaxed">
              Mi trabajo consiste en transformar diseños en interfaces web modernas, accesibles y fáciles de usar.
              Disfruto desarrollar productos donde el código y la experiencia de usuario se complementan. 
            </p>
            <p className="text-secondary leading-relaxed">
              Mi formación en UX/UI me permite prestar atención a los detalles visuales, la accesibilidad y la usabilidad, mientras que mi experiencia con React, Next.js y Laravel me ayuda a construir interfaces mantenibles y orientadas a las necesidades del usuario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
