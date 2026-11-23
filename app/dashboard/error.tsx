// app/dashboard/error.tsx  →  Pantalla de error del dashboard
//
// Si alguna página dentro de /dashboard se rompe, Next.js muestra esto en su lugar.
// El resto del sitio (Navbar, Sidebar) sigue andando como si nada.
//
// Recibe dos props:
//   - error: lo que se rompió.
//   - retry: una función para volver a intentar mostrar la página.
//
// Ojo: los error.tsx SIEMPRE tienen que ser Client Components ("use client").

"use client";

export default function DashboardError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const message = error instanceof Error ? error.message : "Error desconocido";

  return (
    <div className="flex flex-col items-center py-12 text-center">
      <p className="text-5xl">💥</p>
      <h2 className="mt-4 text-xl font-bold">Algo salió mal</h2>
      <p className="mt-2 text-zinc-600">{message}</p>
      <button
        onClick={() => retry()}
        className="mt-6 rounded-lg bg-pink-600 px-5 py-2.5 font-medium text-white hover:bg-pink-700"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
