// components/ClickCounter.tsx
// Contador simple con useState.
// Como está dentro del layout del dashboard, NO se reinicia al navegar
// entre /dashboard, /dashboard/analytics y /dashboard/settings:
// el layout no se vuelve a renderizar, así que conserva su estado.
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
