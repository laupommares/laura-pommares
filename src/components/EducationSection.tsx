const studies = [
  {
    institution: "Universidad Nacional de Quilmes",
    degree: "Licenciatura en Comercio Internacional",
    period: "Mar. 2007 – Dic. 2014",
  },
];

export default function EducationSection() {
  return (
    <section
      className="px-margin-mobile max-w-container-max mx-auto mb-section-gap mt-30 reveal"
      id="educacion"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <h2 className="font-label-mono text-accent uppercase tracking-widest">
            Educación
          </h2>
        </div>
        <div className="md:col-span-8 space-y-16">
          {studies.map((study) => (
            <div key={study.institution}>
              <div className="flex flex-col md:flex-row justify-between mb-1">
                <div>
                  <h3 className="text-xl font-bold mb-1">{study.institution}</h3>
                  <p className="text-accent text-sm font-medium">
                    {study.degree}
                  </p>
                </div>
                <span className="font-label-mono text-secondary text-[12px] mt-2 md:mt-0">
                  {study.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
