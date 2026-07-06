"use client";

import { useState } from "react";

type NavLink = { href: string; label: string };

export default function MobileNav({
  links,
  downloadCvHref,
  downloadCvLabel,
}: {
  links: NavLink[];
  downloadCvHref: string;
  downloadCvLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Menu"
        className="relative z-50 flex flex-col justify-center gap-1.5 w-6 h-6"
      >
        <span
          className={`block h-0.5 w-full bg-primary transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-full bg-primary transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-full bg-primary transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white overflow-y-auto px-margin-mobile py-10">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={downloadCvHref}
            onClick={() => setOpen(false)}
            className="inline-block mt-8 pt-8 border-t border-subtle w-full text-sm font-medium border-b-0"
          >
            <span className="border-b border-primary pb-1">{downloadCvLabel}</span>
          </a>
        </div>
      )}
    </div>
  );
}
