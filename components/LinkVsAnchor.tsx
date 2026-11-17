// components/LinkVsAnchor.tsx
// Demostración: <Link> de Next.js vs la etiqueta <a> clásica.
//
// Este componente vive en el LAYOUT del catálogo, así que su estado (el contador)
// sobrevive mientras navegamos dentro del catálogo...
//   - con <Link>: Next.js cambia solo la página → el contador SE MANTIENE.
//   - con <a>:    el navegador pide la página completa de cero → el contador VUELVE A 0.
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LinkVsAnchor() {
  const [count, setCount] = useState(0);

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-dashed border-violet-300 bg-violet-50 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(count + 1)}
          className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-700"
        >
          Sumar +1
        </button>
        <span className="text-2xl font-bold text-violet-700">{count}</span>
      </div>

      <p className="flex-1 text-sm text-violet-900">
        Sumá algunos clics y después navegá con cada opción:
      </p>

      <div className="flex flex-wrap gap-2 text-sm">
        {/* ✅ Navegación del lado del cliente, con prefetching */}
        <Link
          href="/catalogo/ropa"
          className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-700"
        >
          ✅ &lt;Link&gt; a Ropa
        </Link>

        {/* ❌ Recarga completa de la página (pantalla en blanco, se pierde el estado).
            ESLint ya nos avisa que esto está mal (regla no-html-link-for-pages);
            la desactivamos SOLO en esta línea porque queremos mostrar el error a propósito. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/catalogo/tecnologia"
          className="rounded-md bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
        >
          ❌ &lt;a&gt; a Tecnología
        </a>
      </div>
    </div>
  );
}
