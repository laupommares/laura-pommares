export default function NavHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-subtle">
      <div className="flex justify-between items-center h-16 px-margin-mobile max-w-container-max mx-auto">
        <a
          className="text-lg font-bold"
          href="#"
        >
          LAURA POMMARÉS
        </a>
        <nav className="hidden md:flex items-center gap-10">
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#proyectos"
          >
            Proyectos
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#experiencia"
          >
            Experiencia
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#perfil"
          >
            Perfil
          </a>
          <a
            className="text-sm font-medium hover:text-accent transition-colors"
            href="#contacto"
          >
            Contacto
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <a
            className="hidden md:block text-sm font-medium border-b border-primary hover:border-accent hover:text-accent transition-all"
            href="#"
          >
            Descargar CV
          </a>
          <a
            className="px-5 py-2.5 bg-primary text-white text-sm font-medium hover:bg-accent transition-colors"
            href="#contacto"
          >
            Escribir
          </a>
        </div>
      </div>
    </header>
  );
}
