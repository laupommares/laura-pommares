export const WHATSAPP_NUMBER = "5492346507655";
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
