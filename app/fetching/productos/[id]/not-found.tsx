// app/fetching/productos/[id]/not-found.tsx
//
// Se muestra cuando la página llama a notFound(): acá, cuando la API no tiene ese producto.
// Probalo entrando a /fetching/productos/999

import Link from "next/link";

export default function ProductoNotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="text-5xl">🔍</p>
      <h2 className="mt-4 text-xl font-bold">Ese producto no existe</h2>
      <p className="mt-2 text-zinc-600">La API no tiene ningún producto con ese número.</p>
      <Link
        href="/fetching/productos"
        className="mt-6 rounded-lg bg-pink-600 px-5 py-2.5 font-medium text-white hover:bg-pink-700"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
