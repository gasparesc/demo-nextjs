// components/fetching/CacheDemo.tsx
//
// Next.js: controlando la caché.
//
// Next.js mejora el fetch() nativo dándole memoria (caché). Con la opción `cache` elegís:
//
//   { cache: "force-cache" } → GUARDA la respuesta y la reutiliza. Rápido, datos fijos.
//                              Ideal para cosas que casi no cambian (un blog, un catálogo).
//   { cache: "no-store" }    → NO guarda nada: va a la API en CADA visita. Siempre actual.
//                              Ideal para datos en tiempo real (stock, precios).
//
// Es como un programa de cocina grabado (force-cache: instantáneo, pero es el menú de ayer)
// frente a las noticias en vivo (no-store: cuesta más, pero ves lo que pasa AHORA).
//
// ¿Cómo lo vemos? Pedimos exactamente lo mismo dos veces, una con cada opción, y miramos
// a qué hora contestó la API (viene en el encabezado "Date" de la respuesta).

import { Suspense } from "react";
import ApiError from "@/components/fetching/ApiError";
import ReloadButton from "@/components/fetching/ReloadButton";
import SectionSkeleton from "@/components/fetching/SectionSkeleton";
import { FAKESTORE_URL, formatTime } from "@/lib/fakestore";

export default function CacheDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Los dos paneles esperan a la API, así que van en su propio <Suspense>:
          el resto de la sección (botón, tabla) se muestra al instante. */}
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2">
            <SectionSkeleton height="h-56" />
            <SectionSkeleton height="h-56" />
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <CachePanel mode="force-cache" tag="Rápido, datos fijos" />
          <CachePanel mode="no-store" tag="Más lento, siempre actual" />
        </div>
      </Suspense>

      <div className="flex flex-col gap-3 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-700 sm:flex-row sm:items-center">
        <ReloadButton />
        <div className="space-y-1">
          <p>
            <strong>¿Los dos paneles muestran la misma hora?</strong> Es la primera visita: la caché todavía
            estaba vacía, así que <code>force-cache</code> también tuvo que ir a la API (y la guardó).
          </p>
          <p>
            Ahora recargá varias veces: la hora de la API de <code>force-cache</code> se queda{" "}
            <strong>clavada</strong> (sale de la caché, cada vez más vieja) y el fetch tarda muchísimo menos. La de{" "}
            <code>no-store</code> avanza con vos y tarda más, porque va a internet cada vez.
          </p>
        </div>
      </div>

      {/* Las opciones, resumidas */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600">
            <tr>
              <th className="px-4 py-3 font-medium">Opción</th>
              <th className="px-4 py-3 font-medium">Qué hace</th>
              <th className="px-4 py-3 font-medium">Ideal para</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-zinc-100 align-top">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{`{ cache: "force-cache" }`}</td>
              <td className="px-4 py-3">Guarda la respuesta y la reutiliza. Súper rápido.</td>
              <td className="px-4 py-3">Páginas casi estáticas (un blog)</td>
            </tr>
            <tr className="border-t border-zinc-100 align-top">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{`{ cache: "no-store" }`}</td>
              <td className="px-4 py-3">No guarda nada: consulta a la API en CADA visita.</td>
              <td className="px-4 py-3">Datos en tiempo real (stock, precios)</td>
            </tr>
            <tr className="border-t border-zinc-100 align-top">
              <td className="px-4 py-3 font-mono text-xs">(sin opciones)</td>
              <td className="px-4 py-3">
                Next.js decide. En desarrollo pide siempre; en producción, si la página es estática, lo pide una
                sola vez (al hacer el build). <strong>No</strong> es lo mismo que force-cache.
              </td>
              <td className="px-4 py-3">Cuando todavía no te importa la caché</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
        ⚠️ <strong>Ojo si ves tutoriales viejos:</strong> en Next.js 14 y anteriores{" "}
        <code>force-cache</code> era el comportamiento por defecto. Desde Next.js 15 la caché es{" "}
        <strong>opcional</strong>: si no pedís nada, no se guarda. Por eso, cuando quieras cachear, hay
        que escribir <code>force-cache</code> explícitamente.
      </p>
    </div>
  );
}

// Hace el fetch con la opción de caché elegida y devuelve lo que queremos mostrar.
// Está separada del componente porque medir la hora (Date.now) es un cálculo "impuro":
// da un resultado distinto cada vez, y los componentes tienen que ser predecibles.
async function fetchWithCache(mode: "force-cache" | "no-store") {
  const start = Date.now();
  try {
    const res = await fetch(`${FAKESTORE_URL}/products/1`, { cache: mode });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    // ¿Cuándo contestó la API? Si la respuesta vino de la caché, es un momento del pasado
    const apiDate = res.headers.get("date");
    await res.json();
    if (!apiDate) throw new Error("La respuesta no trae fecha");

    const now = new Date();
    return {
      apiDate,
      now,
      ms: Date.now() - start, // cuánto tardó el fetch: de la caché es casi instantáneo
      age: Math.max(0, Math.round((now.getTime() - new Date(apiDate).getTime()) / 1000)),
    };
  } catch {
    return null; // si algo falla, el panel muestra el cartel de error
  }
}

// Un panel = un fetch con una opción de caché distinta
async function CachePanel({ mode, tag }: { mode: "force-cache" | "no-store"; tag: string }) {
  const data = await fetchWithCache(mode);
  const isCached = mode === "force-cache";

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-4 ${
        isCached ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div>
        <code className="rounded bg-zinc-900 px-2 py-1 text-xs text-zinc-100">{`{ cache: "${mode}" }`}</code>
        <p className={`mt-2 font-semibold ${isCached ? "text-amber-800" : "text-emerald-800"}`}>{tag}</p>
      </div>

      {!data ? (
        <ApiError />
      ) : (
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-xs text-zinc-500">☁️ La API contestó a las</dt>
            <dd className="font-mono text-lg font-bold">{formatTime(data.apiDate)}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">🖥️ Este servidor armó la tarjeta a las</dt>
            <dd className="font-mono text-lg font-bold">{formatTime(data.now)}</dd>
          </div>
          <div className="flex gap-6">
            <div>
              <dt className="text-xs text-zinc-500">⏱️ El fetch tardó</dt>
              <dd className="font-mono font-bold">{data.ms} ms</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">🕰️ Antigüedad del dato</dt>
              <dd className="font-mono font-bold">{data.age} s</dd>
            </div>
          </div>
        </dl>
      )}
    </div>
  );
}
