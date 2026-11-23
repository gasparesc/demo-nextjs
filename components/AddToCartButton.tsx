// components/AddToCartButton.tsx
//
// Botón "Agregar al carrito" con CLASES CONDICIONALES (clase 5).
//
// El color del botón depende de dos cosas:
//   - el stock (viene por props): si es 0 → gris, deshabilitado y con cursor-not-allowed.
//   - el estado `added` (useState): después de hacer clic → verde por 2 segundos.
//
// Para meter lógica de JavaScript dentro del className usamos un template literal
// (comillas invertidas ``) y el operador ternario: condición ? "clases si sí" : "clases si no".

"use client";

import { useState } from "react";

export default function AddToCartButton({ stock }: { stock: number }) {
  const [added, setAdded] = useState(false);
  const hasStock = stock > 0;

  function handleClick() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  // Elegimos las clases de color según el caso.
  // ⚠️ Siempre escribí la clase COMPLETA ("bg-gray-400"), nunca armada a pedazos
  // (`bg-${color}-400`): Tailwind solo genera las clases que encuentra escritas enteras.
  let colorClasses = "bg-pink-600 text-white hover:bg-pink-700 active:scale-95";
  if (!hasStock) colorClasses = "bg-gray-400 text-gray-100 cursor-not-allowed";
  else if (added) colorClasses = "bg-emerald-600 text-white";

  return (
    <button
      onClick={handleClick}
      disabled={!hasStock}
      className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${colorClasses}`}
    >
      {!hasStock ? "Sin stock" : added ? "¡Agregado! ✓" : "Agregar al carrito"}
    </button>
  );
}
