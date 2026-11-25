// components/fetching/CustomHookDemo.tsx
//
// Un código más limpio: Custom Hooks.
//
// Un custom hook es una función propia que guarda lógica de React (useState + useEffect...)
// para no repetirla. Acá usamos el hook de hooks/useFetch.ts en DOS componentes distintos:
// cada uno pide cosas diferentes, pero ninguno repite el useEffect ni los useState.
//
// Es como un Personal Shopper: le decís qué querés (la url) y te trae todo limpio a casa.

"use client";

import { useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import { useFetch } from "@/hooks/useFetch";
import { FAKESTORE_URL, formatUsd, type FakeProduct } from "@/lib/fakestore";

export default function CustomHookDemo() {
  const [limit, setLimit] = useState(3);

  return (
    <div className="flex flex-col gap-8">
      {/* Antes y después */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-red-700">😩 Sin custom hook: cada componente repite todo</p>
          <CodeBlock title="La lista de productos de abajo, SIN hook">{`function ProductTitles({ limit }) {
  const url = \`https://fakestoreapi.com/products?limit=\${limit}\`;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loadedUrl, setLoadedUrl] = useState(null);
  const loading = loadedUrl !== url;

  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoadedUrl(url);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoadedUrl(url);
      });
    return () => controller.abort();
  }, [url]);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title} {p.price}</li>
      ))}
    </ul>
  );
}

// ...y Categories() tendría que repetir TODO esto
// otra vez, cambiando solo la url 😩`}</CodeBlock>
          <p className="text-xs text-zinc-500">
            ¿Y <code>loadedUrl</code>? Es otra forma de saber si estamos cargando, distinta a la de la sección 2:
            si los datos guardados no son de la url actual, es que todavía no llegaron. Sirve para cuando la url
            cambia (probalo abajo con el selector).
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-emerald-700">✨ Con custom hook: UNA línea por componente</p>
          <CodeBlock title="Los dos componentes de abajo, CON hook">{`function ProductTitles({ limit }) {
  const { data, loading, error } = useFetch(
    \`https://fakestoreapi.com/products?limit=\${limit}\`
  );

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title} {p.price}</li>
      ))}
    </ul>
  );
}

function Categories() {
  const { data, loading, error } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;
  return data.map((c) => <span key={c}>{c}</span>);
}`}</CodeBlock>
          <p className="text-sm text-zinc-600">
            Los <code>useState</code> y el <code>useEffect</code> de la izquierda ahora viven{" "}
            <strong>una sola vez</strong> en <code>hooks/useFetch.ts</code> (abrilo: es el mismo código, con
            comentarios). Cada componente solo pide su url y se ocupa de mostrar los datos:{" "}
            <em>separación de la lógica y la UI</em>.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>
              El nombre <strong>siempre empieza con <code>use</code></strong> (useFetch, useAuth…).
            </li>
            <li>Podés usarlo en todos los componentes que quieras.</li>
          </ul>
        </div>
      </div>

      {/* El hook funcionando */}
      <div className="rounded-xl border border-zinc-200 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">Mismo hook, dos componentes distintos</p>
          <label className="flex items-center gap-2 text-sm">
            Cuántos productos pedir:
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="rounded-md border border-zinc-300 bg-white px-2 py-1"
            >
              {[3, 5, 8].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Al cambiar el número cambia la url del hook, el efecto se vuelve a ejecutar y pide datos nuevos.
        </p>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <ProductTitles limit={limit} />
          <Categories />
        </div>
      </div>
    </div>
  );
}

// Componente 1: lista de productos
function ProductTitles({ limit }: { limit: number }) {
  const { data, loading, error } = useFetch<FakeProduct[]>(`${FAKESTORE_URL}/products?limit=${limit}`);

  return (
    <div>
      <p className="font-mono text-xs text-zinc-500">useFetch(&quot;…/products?limit={limit}&quot;)</p>
      {loading && <Skeleton lines={limit} />}
      {error && <p className="mt-2 text-sm text-red-700">🔴 {error}</p>}
      {data && (
        <ul className="mt-2 space-y-1 text-sm">
          {data.map((p) => (
            <li key={p.id} className="flex justify-between gap-3 border-b border-zinc-100 pb-1">
              <span className="truncate">{p.title}</span>
              <span className="shrink-0 font-semibold">{formatUsd(p.price)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Componente 2: categorías. Otra url, el MISMO hook
function Categories() {
  const { data, loading, error } = useFetch<string[]>(`${FAKESTORE_URL}/products/categories`);

  return (
    <div>
      <p className="font-mono text-xs text-zinc-500">useFetch(&quot;…/products/categories&quot;)</p>
      {loading && <Skeleton lines={3} />}
      {error && <p className="mt-2 text-sm text-red-700">🔴 {error}</p>}
      {data && (
        <div className="mt-2 flex flex-wrap gap-2">
          {data.map((category) => (
            <span key={category} className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
              {category}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Mientras carga: rayitas grises que laten
function Skeleton({ lines }: { lines: number }) {
  return (
    <div className="mt-2 space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-5 animate-pulse rounded bg-zinc-200" />
      ))}
    </div>
  );
}
