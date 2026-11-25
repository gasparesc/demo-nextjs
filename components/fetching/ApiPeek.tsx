// components/fetching/ApiPeek.tsx
//
// Conectando la app con el mundo exterior.
//
// Una API REST es como un mozo: le pedís algo con una URL y te trae los datos en formato
// JSON (en vez de comida). A la acción de ir a buscar esos datos se le llama FETCHING.
//
// Acá el fetch se dispara con un CLIC (un evento). Más adelante lo vas a ver dispararse
// solo, apenas aparece el componente (con useEffect).

"use client";

import { useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";
import { FAKESTORE_URL } from "@/lib/fakestore";

type Result = { status: number; ms: number; body: string } | { error: string };

export default function ApiPeek() {
  const [id, setId] = useState(1);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  // La URL se arma con: la dirección de la API + el recurso (/products) + cuál (/1)
  const url = `${FAKESTORE_URL}/products/${id}`;

  async function handleFetch() {
    setLoading(true);
    const start = performance.now();
    try {
      const res = await fetch(url); // 1) hacemos el pedido y esperamos (await)
      const text = await res.text(); // 2) leemos la respuesta
      setResult({
        status: res.status,
        ms: Math.round(performance.now() - start),
        // Si el producto no existe, la FakeStore API contesta "200 OK" pero SIN datos
        body: text ? JSON.stringify(JSON.parse(text), null, 2) : "(la respuesta vino vacía: ese producto no existe)",
      });
    } catch {
      setResult({ error: "No pudimos conectar. ¿Tenés internet?" });
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-5">
        {/* El diagrama: nuestra app <-> fetching <-> la API */}
        <div className="flex items-center gap-2 text-center text-sm font-semibold">
          <div className="flex-1 rounded-xl bg-pink-100 p-3 text-pink-800">
            🖥️
            <br />
            Nuestra app Next.js
          </div>
          <div className="flex flex-col items-center text-xs text-zinc-500">
            <span className="text-lg text-pink-500">⇄</span>
            Fetching
          </div>
          <div className="flex-1 rounded-xl bg-sky-100 p-3 text-sky-800">
            ☁️
            <br />
            FakeStore API
          </div>
        </div>

        <div className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700">
          <p className="font-semibold">¿Dónde hacemos el fetching?</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>En el cliente</strong> (el navegador), con <code>useEffect</code>: secciones 2, 3 y 4.
            </li>
            <li>
              <strong>En el servidor</strong>, con <code>async/await</code>: secciones 5 y 6.
            </li>
          </ul>
        </div>

        {/* Probalo vos */}
        <div className="rounded-xl border border-zinc-200 p-4">
          <p className="font-semibold">Probalo: pedile un producto a la API</p>
          <p className="mt-1 font-mono text-xs break-all text-zinc-500">GET {url}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <label className="flex items-center gap-2">
              Producto nº
              <input
                type="number"
                min={1}
                max={999}
                value={id}
                onChange={(e) => setId(Number(e.target.value))}
                className="w-20 rounded-md border border-zinc-300 px-2 py-1 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </label>
            <button
              onClick={handleFetch}
              disabled={loading}
              className={`rounded-md px-4 py-1.5 font-semibold text-white transition ${
                loading ? "cursor-wait bg-gray-400" : "bg-pink-600 hover:bg-pink-700 active:scale-95"
              }`}
            >
              {loading ? "Pidiendo…" : "Pedir datos"}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            La API tiene productos del 1 al 20. Probá también con el 999 y fijate qué pasa.
          </p>
        </div>
      </div>

      {/* La respuesta */}
      <div className="flex flex-col gap-3">
        {result === null && (
          <div className="flex h-full min-h-48 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-6 text-center text-sm text-zinc-500">
            Tocá &quot;Pedir datos&quot; y acá vas a ver lo que contesta la API.
          </div>
        )}

        {result && "error" in result && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            🔴 {result.error}
          </div>
        )}

        {result && "status" in result && (
          <>
            <p className="text-sm">
              Respuesta:{" "}
              <strong className={result.status === 200 ? "text-emerald-600" : "text-red-600"}>
                {result.status}
              </strong>{" "}
              · tardó <strong>{result.ms} ms</strong> · formato <strong>JSON</strong>
            </p>
            <CodeBlock title="La respuesta de la API">{result.body}</CodeBlock>
          </>
        )}
      </div>
    </div>
  );
}
