// app/products/loading.tsx  →  UI de carga
//
// Se muestra automáticamente mientras la página de /products (y sus hijas)
// todavía está cargando. Next.js la envuelve en un <Suspense> por nosotros.

export default function Loading() {
  return (
    <div>
      <p className="text-2xl font-bold">Cargando productos...</p>

      {/* "Esqueletos" grises que imitan las tarjetas */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-xl border border-zinc-200 bg-zinc-200"
          />
        ))}
      </div>
    </div>
  );
}
