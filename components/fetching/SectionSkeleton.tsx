// components/fetching/SectionSkeleton.tsx
//
// "Esqueleto" gris que se muestra MIENTRAS un Server Component espera los datos de la API.
// Se usa como `fallback` de un <Suspense>: Next.js manda el resto de la página enseguida
// y va completando este pedacito cuando llegan los datos (esto se llama "streaming").

export default function SectionSkeleton({ height = "h-48" }: { height?: string }) {
  return (
    <div
      className={`${height} animate-pulse rounded-xl border border-zinc-200 bg-zinc-100`}
      aria-label="Cargando datos de la API"
    />
  );
}
