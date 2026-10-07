"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { localizedPath, type Locale } from "@/i18n/config";

export default function LocaleSwitch({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  const option = (locale: Locale, label: string, name: string) => (
    <Link
      href={localizedPath(locale, pathname)}
      hrefLang={locale}
      lang={locale}
      aria-label={name}
      aria-current={currentLocale === locale ? "page" : undefined}
      className={
        currentLocale === locale
          ? "font-bold text-primary"
          : "text-secondary hover:text-accent transition-colors"
      }
    >
      {label}
    </Link>
  );

  return (
    <div
      className="flex items-center gap-1.5 font-label-mono text-[11px]"
      role="group"
      aria-label={currentLocale === "en" ? "Language" : "Idioma"}
    >
      {option("es", "ES", "Español")}
      <span className="text-secondary" aria-hidden="true">
        /
      </span>
      {option("en", "EN", "English")}
    </div>
  );
}
