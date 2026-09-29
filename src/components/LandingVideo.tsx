"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
};

// Only one landing video plays at a time across the page.
let active: HTMLVideoElement | null = null;

// Plays only while the card is hovered (or, on touch screens, while it's in view),
// so the landing videos never download or run all at once.
export default function LandingVideo({ src, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest("article");
    if (!video || !card) return;

    const play = () => {
      if (active && active !== video) {
        active.pause();
        active.currentTime = 0;
      }
      active = video;
      video.play().catch(() => {});
    };
    const stop = () => {
      video.pause();
      video.currentTime = 0;
      if (active === video) active = null;
    };

    if (window.matchMedia("(hover: hover)").matches) {
      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", stop);
      return () => {
        card.removeEventListener("mouseenter", play);
        card.removeEventListener("mouseleave", stop);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : stop()),
      { threshold: 0.75 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 w-full h-full object-cover object-top"
    />
  );
}
