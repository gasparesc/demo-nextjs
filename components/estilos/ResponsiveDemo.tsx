// components/estilos/ResponsiveDemo.tsx
//
// Responsive Design: Mobile-First
//
// Regla de oro: las clases SIN prefijo son para el celular (y todo lo que venga después).
// Los prefijos agregan cambios cuando la pantalla CRECE:
//   sm: ≥ 640px · md: ≥ 768px · lg: ≥ 1024px · xl: ≥ 1280px
//
// Todo este componente funciona sin JavaScript: es puro CSS generado por Tailwind.

import Image from "next/image";
import CodeBlock from "@/components/estilos/CodeBlock";

export default function ResponsiveDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1) Indicador de tamaño de pantalla: se muestra un solo cartel por vez.
             Truco: "hidden md:inline" = oculto, salvo desde md: en adelante. */}
      <div className="rounded-xl bg-zinc-900 p-4 text-center text-white">
        <p className="text-xs uppercase tracking-wide text-zinc-400">
          Ahora mismo tu pantalla es…
        </p>
        <p className="mt-1 text-xl font-bold">
          <span className="sm:hidden">📱 Celular · clases base (sin prefijo)</span>
          <span className="hidden sm:inline md:hidden">📱 Celular horizontal · sm:</span>
          <span className="hidden md:inline lg:hidden">📟 Tablet · md:</span>
          <span className="hidden lg:inline xl:hidden">💻 Notebook · lg:</span>
          <span className="hidden xl:inline">🖥️ Monitor grande · xl:</span>
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Achicá y agrandá la ventana (o abrí las DevTools con F12 y tocá el ícono
          del celular) para ver cómo cambia.
        </p>
      </div>

      {/* 2) El ejemplo clásico: w-full → md:w-1/2 → lg:w-1/3 */}
      <div>
        <h3 className="font-semibold">El ancho cambia según la pantalla</h3>
        <div className="mt-3 rounded-lg bg-zinc-100 p-2">
          <div className="w-full rounded-md bg-cyan-500 px-3 py-4 text-sm font-semibold text-white md:w-1/2 lg:w-1/3">
            <span className="md:hidden">w-full (todo el ancho)</span>
            <span className="hidden md:inline lg:hidden">md:w-1/2 (la mitad)</span>
            <span className="hidden lg:inline">lg:w-1/3 (un tercio)</span>
          </div>
        </div>
        <div className="mt-3">
          <CodeBlock>{`<div className="w-full md:w-1/2 lg:w-1/3">`}</CodeBlock>
        </div>
      </div>

      {/* 3) Un caso real: tarjeta que en el celular va apilada y en tablet va de costado */}
      <div>
        <h3 className="font-semibold">Un caso real: apilado en el celular, de costado en tablet</h3>
        <div className="mt-3 flex flex-col gap-4 rounded-xl border border-zinc-200 p-4 md:flex-row md:items-center">
          <div className="relative h-32 overflow-hidden rounded-lg bg-zinc-100 md:h-24 md:w-40 md:shrink-0">
            <Image src="/gta/auto-deportivo.webp" alt="Auto Deportivo" fill sizes="(min-width: 768px) 160px, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="text-lg font-bold md:text-2xl">Auto Deportivo</p>
            <p className="text-sm text-zinc-600">
              En el celular la imagen va arriba (<code>flex-col</code>). Desde
              tablet se pone al costado (<code>md:flex-row</code>) y el título se
              agranda (<code>md:text-2xl</code>).
            </p>
          </div>
        </div>
        <div className="mt-3">
          <CodeBlock>{`<div className="flex flex-col md:flex-row">
  <div className="h-24 md:w-40">🏎️</div>
  <p className="text-lg md:text-2xl">Auto Deportivo</p>
</div>`}</CodeBlock>
        </div>
      </div>

      {/* 4) El error más común */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm">
          <p className="font-semibold text-red-700">❌ Error común</p>
          <p className="mt-1 text-red-900">
            Usar <code>sm:</code> pensando en el celular:{" "}
            <code>sm:text-center</code> NO se aplica en un celular chico (menos de
            640px).
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
          <p className="font-semibold text-emerald-700">✅ Así sí</p>
          <p className="mt-1 text-emerald-900">
            La base es el celular y el prefijo es para cuando crece:{" "}
            <code>text-center md:text-left</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
