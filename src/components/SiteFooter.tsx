export default function SiteFooter() {
  return (
    <footer className="border-t border-subtle py-20 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-margin-mobile max-w-container-max mx-auto">
        <div>
          <span className="text-primary font-bold text-lg tracking-tighter">
            LAURA POMMARÉS
          </span>
          <p className="font-label-mono text-[10px] text-secondary mt-1">
            © 2024 — Frontend Engineering & Design Systems
          </p>
        </div>
        <div className="flex gap-12 font-label-mono text-[10px] uppercase tracking-widest font-bold">
          <a className="hover:text-accent transition-colors" href="#proyectos">
            Proyectos
          </a>
          <a
            className="hover:text-accent transition-colors"
            href="#experiencia"
          >
            Experiencia
          </a>
          <a className="hover:text-accent transition-colors" href="#">
            Descargar CV
          </a>
        </div>
      </div>
    </footer>
  );
}
