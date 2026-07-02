"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="cv-no-print mt-14 bg-primary text-white px-10 py-4 text-sm font-medium hover:bg-accent transition-colors"
    >
      Imprimir / Guardar como PDF
    </button>
  );
}
