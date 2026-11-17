// app/not-found.tsx  →  Página 404 de todo el sitio
//
// Se muestra cuando entrás a una URL que no existe.
// Probalo: escribí cualquier cosa en la barra de direcciones, como /no-existe.

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-6xl font-bold text-violet-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-zinc-600">
        No hay ninguna carpeta con un <code>page.tsx</code> para esta URL.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white hover:bg-violet-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
