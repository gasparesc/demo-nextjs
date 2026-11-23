// components/estilos/ConditionalClassesDemo.tsx
//
// Clases condicionales: el estilo cambia según el ESTADO de React.
//
// La receta es siempre la misma:
//   1. Comillas invertidas (template literal) en vez de comillas comunes: className={`...`}
//   2. Adentro, ${ } para meter JavaScript.
//   3. Un ternario: condición ? "clases si es true" : "clases si es false"
//
// Necesita "use client" porque usa useState (clase 2) y useParams (clase 4).
//
// El ejemplo 2 (pestañas) junta TODO lo visto hasta ahora:
//   - Rutas catch-all (clase 4): la página vive en app/estilos/[[...tab]]/page.tsx.
//   - useParams() (clase 4): lee qué pestaña pide la URL.
//   - Clases condicionales (clase 5): resalta la pestaña que coincide con la URL.
// La pestaña activa NO se guarda en useState: la fuente de la verdad es la URL.
// Ventaja: podés copiar el link /estilos/envios y mandárselo a alguien.

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import CodeBlock from "@/components/estilos/CodeBlock";

// "slug" es el texto que va en la URL (sin tildes ni espacios). "label" es lo que se ve.
const tabs = [
  {
    slug: "descripcion",
    label: "Descripción",
    content: "Deportivo biplaza con luces cian, ideal para recorrer Ocean Drive al atardecer.",
  },
  {
    slug: "envios",
    label: "Envíos",
    content: "Entrega en 3 a 5 días hábiles en toda Leonida. Envío gratis en compras de más de $1.000.000.",
  },
  {
    slug: "resenas",
    label: "Reseñas",
    content: "⭐⭐⭐⭐⭐ “Lo manejé por toda la costa y es una joya.” — Lucia.",
  },
];

export default function ConditionalClassesDemo() {
  // Ejemplo 1: el botón básico
  const [isActive, setIsActive] = useState(false);

  // Ejemplo 2: pestañas controladas por la URL
  // En /estilos         → params = {}                      → no hay pestaña, usamos la primera
  // En /estilos/envios  → params = { tab: ["envios"] }
  const params = useParams<{ tab?: string[] }>();
  const [activeSlug = "descripcion"] = params.tab ?? [];
  const activeTab = tabs.find((tab) => tab.slug === activeSlug);

  // Ejemplo 3: el "semáforo" de un formulario
  const [email, setEmail] = useState("");
  const isEmpty = email === "";
  const hasError = !isEmpty && !email.includes("@");

  return (
    <div className="flex flex-col gap-8">
      {/* ---------- Ejemplo 1: el botón básico ---------- */}
      <div className="grid gap-4 md:grid-cols-2 md:items-center">
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-semibold">1. Un botón que se prende y se apaga</h3>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`rounded-lg px-4 py-2 font-semibold text-white transition ${
              isActive ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {isActive ? "Activado" : "Desactivado"}
          </button>
          <p className="font-mono text-sm">
            isActive ={" "}
            <span className={isActive ? "text-green-600" : "text-gray-500"}>
              {String(isActive)}
            </span>
          </p>
        </div>
        <CodeBlock>{`<button className={\`px-4 py-2 \${
  isActive ? "bg-green-500" : "bg-gray-400"
}\`}>`}</CodeBlock>
      </div>

      {/* ---------- Ejemplo 2: pestañas ---------- */}
      <div className="grid gap-4 md:grid-cols-2 md:items-start">
        <div>
          <h3 className="font-semibold">2. Pestañas controladas por la URL</h3>
          <p className="text-sm text-zinc-500">
            Tocá una pestaña y mirá la barra de direcciones: cambia a{" "}
            <code>/estilos/envios</code>. Probá también escribir una pestaña que no
            existe, como <code>/estilos/algo</code>.
          </p>

          {/* Cada pestaña es un <Link>: cambia la URL, y la URL define cuál está activa.
              scroll={false} evita que la página salte hacia arriba al navegar. */}
          <div className="mt-3 flex gap-1 border-b border-zinc-200">
            {tabs.map((tab) => (
              <Link
                key={tab.slug}
                href={`/estilos/${tab.slug}#seccion-6`}
                scroll={false}
                className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeSlug === tab.slug
                    ? "border-pink-600 text-pink-700"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Contenido de la pestaña, también condicional: si el slug no existe, mostramos un error */}
          <div
            className={`mt-3 rounded-lg p-3 text-sm ${
              activeTab ? "bg-zinc-50 text-zinc-700" : "bg-red-50 text-red-700"
            }`}
          >
            {activeTab ? (
              activeTab.content
            ) : (
              <>
                🔴 La pestaña <strong>«{activeSlug}»</strong> no existe.{" "}
                <Link href="/estilos#seccion-6" scroll={false} className="font-semibold underline">
                  Volver al inicio
                </Link>
              </>
            )}
          </div>

          <p className="mt-3 font-mono text-xs text-zinc-500">
            useParams() → {JSON.stringify(params)}
          </p>
        </div>
        <CodeBlock>{`// app/estilos/[[...tab]]/page.tsx
const params = useParams<{ tab?: string[] }>();
const [activeSlug = "descripcion"] = params.tab ?? [];

<Link
  href={\`/estilos/\${tab.slug}\`}
  className={\`border-b-2 \${
    activeSlug === tab.slug
      ? "border-pink-600 text-pink-700"
      : "border-transparent text-zinc-500"
  }\`}
>
  {tab.label}
</Link>`}</CodeBlock>
      </div>

      {/* ---------- Ejemplo 3: el semáforo ---------- */}
      <div className="grid gap-4 md:grid-cols-2 md:items-start">
        <div>
          <h3 className="font-semibold">3. El semáforo: mensajes de error y de éxito</h3>
          <p className="text-sm text-zinc-500">
            Escribí un email con y sin <code>@</code>.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="lucia@vicecity.com"
            className={`mt-3 w-full rounded-lg border-2 px-3 py-2 outline-none transition-colors ${
              isEmpty
                ? "border-zinc-300"
                : hasError
                  ? "border-red-500 bg-red-50"
                  : "border-green-500 bg-green-50"
            }`}
          />
          <p
            className={`mt-2 text-sm font-medium ${
              isEmpty ? "text-zinc-400" : hasError ? "text-red-600" : "text-green-600"
            }`}
          >
            {isEmpty ? "⚪ Esperando…" : hasError ? "🔴 Le falta el @" : "🟢 ¡Email válido!"}
          </p>
        </div>
        <CodeBlock>{`const hasError = !email.includes("@");

<input className={\`border-2 \${
  hasError
    ? "border-red-500 bg-red-50"
    : "border-green-500 bg-green-50"
}\`} />`}</CodeBlock>
      </div>
    </div>
  );
}
