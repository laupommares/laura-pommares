const categories = [
  {
    name: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Alpine.js"],
  },
  {
    name: "Backend",
    items: ["Laravel / PHP", "Livewire", "PostgreSQL", "MySQL"],
  },
  {
    name: "Diseño / UX",
    items: ["Figma", "Design Systems", "WCAG / Accesibilidad", "Framer Motion", "Photoshop"],
  },
  {
    name: "Herramientas",
    items: ["Git / GitHub", "Jira", "Vercel", "Docker"],
  },
];

export default function TechStackSection() {
  return (
    <section className="py-16 bg-surface-alt border-y border-subtle reveal">
      <div className="px-margin-mobile max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-secondary mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {cat.name}
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
