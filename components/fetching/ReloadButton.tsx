// components/fetching/ReloadButton.tsx
//
// Botón para recargar la página entera (lo mismo que apretar F5).
// Necesita ser un Client Component porque usa window, que solo existe en el navegador.

"use client";

export default function ReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="rounded-md bg-pink-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-pink-700 active:scale-95"
    >
      🔄 Recargar la página (F5)
    </button>
  );
}
