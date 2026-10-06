// Renders `text`, turning the first mention of `url`'s host (e.g. "somosulastudio.com")
// into a link to `url`. Without a url, or if the host isn't in the text, it's plain text.
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
