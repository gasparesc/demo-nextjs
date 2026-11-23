// components/Footer.tsx
//
// Server Component (no tiene "use client"): solo muestra contenido, no necesita interactividad.

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-zinc-500 sm:flex-row">
        <p>© 2026 Leonida Store · Demo de Next.js</p>
        <p>Este footer vive en el layout raíz (app/layout.tsx)</p>
      </div>
    </footer>
  );
}
