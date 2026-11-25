// app/fetching/productos/loading.tsx  →  UI de carga
//
// Mientras la página espera la respuesta de la API, Next.js muestra esto automáticamente
// (lo vimos en la clase 3 con /products). Con un Server Component no hace falta escribir
// useState(loading): alcanza con crear este archivo.

export default function Loading() {
  return (
    <div>
      <p className="text-2xl font-bold">Trayendo los productos de la API…</p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-72 animate-pulse rounded-xl border border-zinc-200 bg-zinc-200" />
        ))}
      </div>
    </div>
  );
}
