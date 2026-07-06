import { getTranslations } from "next-intl/server";

type CategoryItem = { name: string; items: string[] };

export default async function TechStackSection() {
  const t = await getTranslations("TechStack");
  
  const categories = t.raw("categories") as CategoryItem[];

  return (
    <section className="py-16 bg-surface-alt border-y border-subtle reveal" id="stack">
      <div className="px-margin-mobile max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.name} className="p-5 bg-background border border-subtle">
              <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-secondary mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 bg-surface-alt border border-subtle font-label-mono text-[10px] uppercase tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
