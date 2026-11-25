// app/fetching/page.tsx  →  URL: /fetching
//
// Clase 6 · Efectos secundarios y fetching de APIs.
// Esta página es un "laboratorio": una sección por cada tema de la clase, igual que /estilos.
// Cada demo es un componente aparte dentro de components/fetching/.
//
// Acá conviven Client Components (las secciones 1 a 4, que usan useState y useEffect) y
// Server Components (las secciones 5 y 6, que hacen fetch con async/await).
// Esta página en sí es un Server Component. Los que esperan datos de la API van dentro de un
// <Suspense>: Next.js muestra el esqueleto gris y, cuando los datos llegan, lo reemplaza.

import { Suspense } from "react";
import LabHeader from "@/components/LabHeader";
import DemoSection from "@/components/estilos/DemoSection";
import ApiPeek from "@/components/fetching/ApiPeek";
import EffectFetchDemo from "@/components/fetching/EffectFetchDemo";
import DependencyArrayDemo from "@/components/fetching/DependencyArrayDemo";
import CustomHookDemo from "@/components/fetching/CustomHookDemo";
import ServerFetchDemo from "@/components/fetching/ServerFetchDemo";
import CacheDemo from "@/components/fetching/CacheDemo";
import ClientVsServerTable from "@/components/fetching/ClientVsServerTable";
import SectionSkeleton from "@/components/fetching/SectionSkeleton";

// El índice de arriba: cada link salta a la sección con ese id (#seccion-1, #seccion-2...)
const index = [
  "Conectar con una API",
  "useEffect",
  "Array de dependencias",
  "Custom Hooks",
  "Fetch en el servidor",
  "Caché",
  "Cliente vs Servidor",
];

export default function FetchingPage() {
  return (
    <div className="flex flex-col gap-8">
      <LabHeader
        eyebrow="Clase 6 · Efectos y fetching"
        title="Laboratorio de fetching 🌐"
        description="Hoy la app deja de usar datos de mentira y se conecta a internet de verdad. Una sección por tema: probá cada demo y abrí el archivo que se indica abajo para ver el código."
        items={index}
      />

      <DemoSection
        number={1}
        title="Conectando la app con el mundo exterior"
        file="components/fetching/ApiPeek.tsx"
        intro={
          <p>
            Hasta ahora usamos datos <em>mockeados</em> (los de <code>lib/products.ts</code>). Es como tener un menú
            de plástico de exhibición. En la vida real los datos vienen de una <strong>API</strong>: un servicio
            al que le pedís cosas con una URL y te contesta en formato JSON, como un mozo que te trae los datos en
            vez de comida. A la acción de ir a buscarlos se le llama <strong>fetching</strong>.
          </p>
        }
      >
        <ApiPeek />
      </DemoSection>

      <DemoSection
        number={2}
        title="Efectos secundarios: el hook useEffect"
        file="components/fetching/EffectFetchDemo.tsx"
        intro={
          <p>
            Un <em>efecto secundario</em> es todo lo que pasa fuera del renderizado: llamar a una API, iniciar un
            timer, escuchar el scroll… El render es el mago sacando el conejo de la galera; el{" "}
            <code>useEffect</code> es el asistente que, <strong>después</strong> del truco, entra a preparar lo
            que sigue. Solo funciona en Client Components (<code>&quot;use client&quot;</code>).
          </p>
        }
      >
        <EffectFetchDemo />
      </DemoSection>

      <DemoSection
        number={3}
        title="El control del tiempo: el array de dependencias"
        file="components/fetching/DependencyArrayDemo.tsx"
        intro={
          <p>
            El segundo argumento de <code>useEffect</code> decide <strong>cuándo</strong> se ejecuta. Es como
            pedirle a tu mamá que mire el horno: sin array lo mira a cada rato, con <code>[]</code> lo mira una
            sola vez, con <code>[temperatura]</code> solo cuando cambia la temperatura.
          </p>
        }
      >
        <DependencyArrayDemo />
      </DemoSection>

      <DemoSection
        number={4}
        title="Un código más limpio: Custom Hooks"
        file="hooks/useFetch.ts · components/fetching/CustomHookDemo.tsx"
        intro={
          <p>
            Repetir el mismo <code>useEffect</code> con sus tres <code>useState</code> en cada componente es un
            dolor de cabeza. Un <strong>custom hook</strong> es como contratar a un Personal Shopper: en vez de ir
            vos al súper, le decís <code>useFetch(url)</code> y te trae todo limpio.
          </p>
        }
      >
        <CustomHookDemo />
      </DemoSection>

      <DemoSection
        number={5}
        title="La magia de Next.js: fetching en el servidor"
        file="components/fetching/ServerFetchDemo.tsx"
        intro={
          <p>
            Next.js nos ofrece un atajo: hacer el fetch en un <strong>Server Component</strong>. Sin{" "}
            <code>useEffect</code>, sin <code>useState(loading)</code>, sin <code>&quot;use client&quot;</code>: el
            componente es <code>async</code> y usa <code>await fetch()</code>. Es cocinar en el restaurante:
            cuando el plato sale a la mesa, ya tiene todos los ingredientes.
          </p>
        }
      >
        <Suspense fallback={<SectionSkeleton height="h-72" />}>
          <ServerFetchDemo />
        </Suspense>
      </DemoSection>

      <DemoSection
        number={6}
        title="Next.js fetch: controlando la caché"
        file="components/fetching/CacheDemo.tsx"
        intro={
          <p>
            Next.js le da al <code>fetch()</code> nativo un superpoder: la <strong>caché</strong>. Con{" "}
            <code>force-cache</code> guarda la respuesta (como un programa de cocina grabado: rápido, pero es el
            menú de ayer). Con <code>no-store</code> consulta a la API en cada visita (como las noticias en vivo).
          </p>
        }
      >
        <CacheDemo />
      </DemoSection>

      <DemoSection
        number={7}
        title="Resumen: fetch en el cliente vs en el servidor"
        file="components/fetching/ClientVsServerTable.tsx"
        intro={<p>Los dos enfoques, lado a lado.</p>}
      >
        <ClientVsServerTable />
      </DemoSection>
    </div>
  );
}
