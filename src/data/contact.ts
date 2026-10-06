// Base URL of the site. Change it here when moving to a custom domain: metadata,
// Open Graph, schema.org, the sitemap and the CV all read it from this constant.
export const SITE_URL = "https://laura-pommares.vercel.app";

export const WHATSAPP_NUMBER = "5492346507655";
export const WHATSAPP_DISPLAY = "+54 9 2346 507655";
export const EMAIL = "laurapommares@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/laurapommares";
export const GITHUB_URL = "https://github.com/laupommares";

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoUrl({ subject, body }: { subject?: string; body?: string } = {}) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replaceAll("+", "%20");
  return `mailto:${EMAIL}${query ? `?${query}` : ""}`;
}

// "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x", for showing URLs as text.
export function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
