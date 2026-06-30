"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const handleSmoothScroll = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 100,
        behavior: "smooth",
      });
    };

    document.addEventListener("click", handleSmoothScroll);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);

  return null;
}
