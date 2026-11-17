// components/ParamsClientViewer.tsx
//
// Muestra cómo leer los parámetros de la URL desde un CLIENT COMPONENT:
// acá no recibimos `params` como prop, sino que usamos el hook useParams().

"use client";

import { useParams } from "next/navigation";

export default function ParamsClientViewer() {
  // useParams devuelve un objeto con la misma "key" que el nombre de la carpeta: [id] → params.id
  const params = useParams<{ id: string }>();

  // ¡Ojo! Todo lo que viene de la URL es texto (string).
  // Si necesitamos un número, hay que convertirlo con parseInt().
  const idAsNumber = parseInt(params.id, 10);

  return (
    <div className="rounded-md bg-sky-50 px-3 py-2 font-mono text-xs text-sky-900">
      <p className="mb-1 font-sans font-semibold">Client Component · useParams()</p>
      <p>params.id = &quot;{params.id}&quot; ({typeof params.id})</p>
      <p>
        parseInt(params.id) = {idAsNumber} ({typeof idAsNumber})
      </p>
    </div>
  );
}
