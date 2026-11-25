// components/fetching/EffectFetchDemo.tsx
//
// Efectos secundarios: el hook useEffect.
//
// Un "efecto secundario" es TODO lo que pasa fuera de "pintar la pantalla": llamar a una
// API, iniciar un timer, escuchar el scroll... React sirve para pintar pantallas; para lo
// demás existe useEffect. La función que le pasás se ejecuta DESPUÉS de que el componente
// aparece en pantalla.
//
// Por eso, cuando hacés fetch en un Client Component, siempre ves 3 momentos:
//   1) Primer render: todavía no hay datos → mostramos "Cargando…"
//   2) useEffect corre (ya se pintó la pantalla) → empieza el fetch
//   3) Llegan los datos → setState → React vuelve a renderizar con la información
//
// Y a mano tenemos que manejar 3 estados: data, loading y error.

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import StrictModeNote from "@/components/fetching/StrictModeNote";
import { FAKESTORE_URL, formatUsd, type FakeProduct } from "@/lib/fakestore";

export default function EffectFetchDemo() {
  // Cada vez que cambia `runId` React crea el componente de cero (por la "key") y vuelve a
  // pedir los datos. Así podés repetir la demostración todas las veces que quieras.
  const [runId, setRunId] = useState(0);
  const [simulateError, setSimulateError] = useState(false);

  // Para provocar un error de red le pedimos los datos a un sitio que no existe
  const url = simulateError
    ? "https://no-existe.fakestoreapi.com/products/1"
    : `${FAKESTORE_URL}/products/1`;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* El componente en vivo */}
        <div className="flex flex-col gap-4">
          <div className="min-h-64 rounded-xl border border-zinc-200 p-4">
            <ProductLoader key={`${runId}-${url}`} url={url} />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button
              onClick={() => setRunId(runId + 1)}
              className="rounded-md bg-pink-600 px-4 py-1.5 font-semibold text-white hover:bg-pink-700 active:scale-95"
            >
              🔄 Volver a cargar
            </button>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={simulateError}
                onChange={(e) => setSimulateError(e.target.checked)}
              />
              Simular que la API se cayó
            </label>
          </div>
        </div>

        {/* El código */}
        <CodeBlock title="Lo que hace el componente de la izquierda">{`"use client"; // useEffect solo funciona en el cliente

import { useEffect, useState } from "react";

function ProductLoader({ url }) {
  // Los 3 estados que manejamos A MANO
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Esto corre DESPUÉS de que se pintó la pantalla
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No pudimos conectar");
        setLoading(false);
      });
  }, [url]); // ← el array: lo vemos en la próxima sección

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  return <h3>{product.title}</h3>;
}`}</CodeBlock>
      </div>

      <StrictModeNote>
        Si abrís la pestaña <em>Network</em> de las DevTools vas a ver el pedido dos veces; es solo en desarrollo.
      </StrictModeNote>
    </div>
  );
}

// El componente que hace el fetch. Está separado para poder "reiniciarlo" con la key.
function ProductLoader({ url }: { url: string }) {
  const [product, setProduct] = useState<FakeProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    // AbortController: si el componente desaparece antes de que llegue la respuesta,
    // cancelamos el pedido (así no actualizamos un componente que ya no existe)
    const controller = new AbortController();
    const start = performance.now();

    fetch(url, { signal: controller.signal })
      .then((res) => {
        // Ojo: fetch NO falla si la API contesta 404 o 500. Hay que revisarlo nosotros.
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data: FakeProduct) => {
        setProduct(data);
        setMs(Math.round(performance.now() - start));
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return; // lo cancelamos nosotros: no es un error
        setError("No pudimos conectar con la API");
        setLoading(false);
      });

    // Función de limpieza: React la llama cuando el componente se desmonta
    return () => controller.abort();
  }, [url]);

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Los 3 momentos, encendidos según el estado */}
      <ol className="flex flex-col gap-2 text-sm">
        <Step done n={1} text="Primer render: loading = true → se pinta «Cargando…»" />
        <Step done n={2} text="useEffect corre (ya se pintó la pantalla) y empieza el fetch" />
        <Step
          done={!loading}
          n={3}
          text={
            loading
              ? "Esperando la respuesta…"
              : error
                ? "El fetch falló → setError → nuevo render con el error"
                : `Llegó la respuesta en ${ms} ms → setProduct → nuevo render con los datos`
          }
          failed={!!error}
        />
      </ol>

      <div className="mt-auto rounded-lg bg-zinc-50 p-3">
        {loading && (
          <div className="flex animate-pulse items-center gap-3">
            <div className="h-16 w-16 rounded-lg bg-zinc-200" />
            <p className="text-sm text-zinc-500">Cargando…</p>
          </div>
        )}
        {error && <p className="text-sm font-medium text-red-700">🔴 {error}</p>}
        {product && (
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
              <Image src={product.image} alt={product.title} fill sizes="64px" className="object-contain p-1" />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-semibold">{product.title}</p>
              <p className="text-sm font-bold text-pink-700">{formatUsd(product.price)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Un paso de la línea de tiempo: se ve "apagado" hasta que ocurre
function Step({
  n,
  text,
  done,
  failed = false,
}: {
  n: number;
  text: string;
  done: boolean;
  failed?: boolean;
}) {
  return (
    <li className="flex items-start gap-2">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-colors ${
          !done ? "bg-zinc-300" : failed ? "bg-red-500" : "bg-emerald-500"
        }`}
      >
        {n}
      </span>
      <span className={`pt-0.5 transition-colors ${done ? "text-zinc-800" : "text-zinc-400"}`}>{text}</span>
    </li>
  );
}
