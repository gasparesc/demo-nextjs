// components/ClickCounter.tsx
//
// Un contador simple con useState.
//
// Está dentro del layout del dashboard, así que NO se reinicia cuando navegás
// entre /dashboard, /dashboard/analytics y /dashboard/settings.
// ¿Por qué? Porque al cambiar de página, Next.js reemplaza solo la página:
// el layout queda montado y se acuerda de su estado.

"use client";

import { useState } from "react";

export default function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-6 rounded-lg bg-violet-50 p-3 text-sm">
      <p className="text-zinc-600">Estado del layout:</p>
      <p className="my-1 text-2xl font-bold text-violet-700">{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="w-full rounded-md bg-violet-600 px-3 py-1.5 font-medium text-white hover:bg-violet-700"
      >
        Sumar +1
      </button>
      <p className="mt-2 text-xs text-zinc-500">
        Sumá algunos clics y cambiá de sección: el número se mantiene.
      </p>
    </div>
  );
}
