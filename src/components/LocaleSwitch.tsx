"use client";

import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";

export default function LocaleSwitch({ currentLocale }: { currentLocale: Locale }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(locale: Locale) {
    if (locale === currentLocale) return;
    startTransition(() => {
      setLocale(locale);
    });
  }

  return (
    <div
      className="flex items-center gap-1.5 font-label-mono text-[11px]"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => handleChange("es")}
        disabled={isPending}
        aria-pressed={currentLocale === "es"}
        className={
          currentLocale === "es"
            ? "font-bold text-primary"
            : "text-secondary hover:text-accent transition-colors"
        }
      >
        ES
      </button>
      <span className="text-secondary">/</span>
      <button
        type="button"
        onClick={() => handleChange("en")}
        disabled={isPending}
        aria-pressed={currentLocale === "en"}
        className={
          currentLocale === "en"
            ? "font-bold text-primary"
            : "text-secondary hover:text-accent transition-colors"
        }
      >
        EN
      </button>
    </div>
  );
}
