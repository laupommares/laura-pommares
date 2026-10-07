// Convierte en link la primera mención del dominio de `url` dentro de `text`.
export default function LinkedText({
  text,
  url,
  className,
}: {
  text: string;
  url?: string;
  className?: string;
}) {
  const host = url ? new URL(url).host.replace(/^www\./, "") : "";
  const at = host ? text.indexOf(host) : -1;
  if (!url || at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
        {host}
      </a>
      {text.slice(at + host.length)}
    </>
  );
}
