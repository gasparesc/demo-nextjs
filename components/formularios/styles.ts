// components/formularios/styles.ts
//
// Las clases de Tailwind que repiten todos los formularios del laboratorio.
// Las guardamos en constantes para no copiar y pegar la misma tira de clases 20 veces.
// (Están escritas COMPLETAS: así Tailwind las encuentra y genera su CSS.)

export const labelClass = "block text-sm font-medium text-zinc-700";

// focus: → el borde rosa que te muestra en qué campo estás (también al navegar con Tab)
export const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200";

export const buttonClass =
  "rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:active:scale-100";
