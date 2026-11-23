// components/estilos/ArbitraryValuesDemo.tsx
//
// Valores arbitrarios: el "botón de emergencia"
//
// Tailwind trae una escala fija de tamaños y colores (w-36 = 144px, w-40 = 160px...).
// Si necesitás un valor EXACTO que no está en la escala, lo escribís entre corchetes:
//   w-[147px]   bg-[#FF0055]   text-[22px]
// Usalos como último recurso: si llenás todo de corchetes, el diseño pierde consistencia.

import CodeBlock from "@/components/estilos/CodeBlock";

const widths = [
  { cls: "w-36", px: "144px", note: "de la escala", color: "bg-zinc-400" },
  { cls: "w-[147px]", px: "147px", note: "¡el que pidió el diseñador!", color: "bg-pink-500" },
  { cls: "w-40", px: "160px", note: "de la escala", color: "bg-zinc-400" },
];

// Para el ejemplo de "¿cómo lo hago funcionar?": valores que en la vida real vendrían de datos o props
const ancho = 147;
const tamano = "mediano";
// Opción 2: un objeto con las clases COMPLETAS. Tailwind las encuentra escritas y genera su CSS.
const clasesDeAncho = { chico: "w-24", mediano: "w-36", grande: "w-48" };

export default function ArbitraryValuesDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Medidas exactas */}
      <div className="rounded-xl border border-zinc-200 p-4">
        <p className="font-semibold">Un tamaño exacto</p>
        <p className="text-sm text-zinc-500">
          El diseñador quiere 147px, pero la escala salta de 144 a 160.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {/* Las clases (w-36, w-[147px], w-40) están escritas completas en el array
              "widths" de arriba: así Tailwind las encuentra y genera su CSS. */}
          {widths.map((w) => (
            <div key={w.cls} className="flex items-center gap-3">
              <div className={`h-6 shrink-0 rounded ${w.cls} ${w.color}`} />
              <p className="text-xs">
                <code className="font-mono font-semibold">{w.cls}</code>{" "}
                <span className="text-zinc-500">
                  = {w.px} · {w.note}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Colores exactos */}
      <div className="rounded-xl border border-zinc-200 p-4">
        <p className="font-semibold">Un color exacto (el de la marca)</p>
        <p className="text-sm text-zinc-500">
          Cuando te pasan un código hexadecimal que no está en la paleta.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex h-16 w-28 items-center justify-center rounded-lg bg-[#FF0055] font-mono text-xs text-white">
            bg-[#FF0055]
          </div>
          <div className="flex h-16 w-28 items-center justify-center rounded-lg bg-[#1da1f2] font-mono text-xs text-white">
            bg-[#1da1f2]
          </div>
        </div>
        <p className="mt-4 text-[22px] font-bold text-[#FF0055]">
          text-[22px] text-[#FF0055]
        </p>
      </div>

      <div className="md:col-span-2">
        <CodeBlock>{`<div className="w-[147px] bg-[#FF0055]">  // ✅ funciona
<div className={\`w-[\${ancho}px]\`}>         // ❌ NO funciona: la clase tiene que estar escrita entera`}</CodeBlock>
      </div>

      {/* ¿Cómo hacerlo funcionar cuando el valor es dinámico? */}
      <div className="md:col-span-2">
        <h3 className="font-semibold">
          🛠️ ¿Y si el valor viene de una variable? Dos formas que sí funcionan
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Tailwind genera el CSS leyendo tu código <strong>antes</strong> de que
          corra, así que no puede adivinar el valor de <code>ancho</code>. Hay que
          dárselo de otra forma:
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* Opción 1: la prop style */}
          <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-800">Opción 1 · La prop style</p>
            <p className="text-sm text-emerald-900">
              Para valores que cambian o vienen de datos (un porcentaje, un ancho
              calculado…).
            </p>
            <div className="h-6 rounded bg-pink-500" style={{ width: `${ancho}px` }} />
            <CodeBlock>{`const ancho = 147;

<div
  className="h-6 rounded bg-pink-500"
  style={{ width: \`\${ancho}px\` }}
/>`}</CodeBlock>
          </div>

          {/* Opción 2: objeto con clases completas */}
          <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-800">
              Opción 2 · Clases completas en un objeto
            </p>
            <p className="text-sm text-emerald-900">
              Para cuando los valores posibles son pocos y los conocés de antemano.
            </p>
            <div className={`h-6 rounded bg-pink-500 ${clasesDeAncho[tamano]}`} />
            <CodeBlock>{`const clasesDeAncho = {
  chico: "w-24",
  mediano: "w-36",
  grande: "w-48",
};

<div className={clasesDeAncho[tamano]} />`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
