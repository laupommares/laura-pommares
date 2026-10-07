"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { localizedPath } from "@/i18n/config";

const STORAGE_KEY = "language-hint-dismissed";

// Solo sugiere la versión en inglés, sin redirigir. Fijo abajo para no mover el
// contenido; en mobile aparece después del hero para no taparlo.
export default function LanguageHint() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    const prefersEnglish = navigator.languages?.[0]?.toLowerCase().startsWith("en");
    if (dismissed || !prefersEnglish) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const hasHero = pathname === "/";
    if (!isMobile || !hasHero) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  if (!visible) return null;

  return (
    <aside
      lang="en"
      aria-label="Language"
      className="fixed z-40 bottom-3 inset-x-3 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-sm flex items-center gap-3 bg-background/95 backdrop-blur-sm border border-subtle shadow-lg px-4 py-3 text-[13px] leading-snug"
    >
      <p className="flex-1 text-secondary">
        This site is also available in English.{" "}
        <Link
          href={localizedPath("en", pathname)}
          hrefLang="en"
          className="font-medium text-primary underline underline-offset-2 decoration-subtle hover:text-accent hover:decoration-accent whitespace-nowrap"
        >
          View in English →
        </Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="shrink-0 grid place-items-center w-8 h-8 -mr-1 text-secondary hover:text-primary transition-colors"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}
