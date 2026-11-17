// app/dashboard/reports/page.tsx  →  URL: /dashboard/reports
// Esta página sirve para mostrar cómo funciona error.tsx.
// Al tocar el botón, el componente lanza un error mientras se renderiza
// y Next.js muestra app/dashboard/error.tsx en su lugar.
// Fijate que el Sidebar (del layout) sigue funcionando: el error
// solo reemplaza el contenido de la página, no todo el sitio.

"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [shouldFail, setShouldFail] = useState(false);

  if (shouldFail) {
    throw new Error("No se pudieron cargar los reportes");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Reportes</h1>
      <p className="mt-1 text-zinc-600">
        Tocá el botón para simular un error al cargar los reportes.
      </p>
      <button
        onClick={() => setShouldFail(true)}
        className="mt-6 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
      >
        Generar reporte (falla a propósito)
      </button>
    </div>
  );
}
