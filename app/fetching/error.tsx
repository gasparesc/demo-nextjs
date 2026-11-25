// app/fetching/error.tsx  →  Pantalla de error de /fetching y todas sus rutas hijas
//
// Si un Server Component de esta carpeta tira un error (por ejemplo, la API no responde),
// Next.js muestra esto en lugar de romper toda la página.
// Es lo que pasa cuando un fetch del servidor falla y no lo atrapamos con un try/catch.
//
// Recordá: los error.tsx SIEMPRE tienen que ser Client Components ("use client").

"use client";

export default function FetchingError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const message = error instanceof Error ? error.message : "Error desconocido";

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="text-5xl">🔌</p>
      <h2 className="mt-4 text-xl font-bold">No pudimos traer los datos</h2>
      <p className="mt-2 max-w-md text-zinc-600">
        Algo falló al hablar con la API. Revisá tu conexión a internet y volvé a intentar.
      </p>
      <p className="mt-2 font-mono text-xs text-zinc-400">{message}</p>
      <button
        onClick={() => retry()}
        className="mt-6 rounded-lg bg-pink-600 px-5 py-2.5 font-medium text-white hover:bg-pink-700"
      >
        Reintentar
      </button>
    </div>
  );
}
