export default function ContactSection() {
  return (
    <section className="px-margin-mobile max-w-container-max mx-auto py-40 reveal" id="contacto">
      <div className="max-w-4xl">
        <h2 className="font-headline text-display mb-12">
          Hablemos de tu próximo <br />
          <span className="text-accent underline decoration-1 underline-offset-8">producto digital</span>.
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          <a
            className="text-3xl md:text-4xl font-headline font-bold hover:text-accent transition-colors"
            href="mailto:hello@laurapommares.com"
          >
            hello@laurapommares.com
          </a>
          <div className="flex gap-8">
            <a
              className="text-sm font-bold border-b-2 border-primary hover:border-accent hover:text-accent transition-all pb-1"
              href="#"
            >
              LinkedIn
            </a>
            <a
              className="text-sm font-bold border-b-2 border-primary hover:border-accent hover:text-accent transition-all pb-1"
              href="#"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
